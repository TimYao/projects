/*
  admin 后台功能
*/
/*
   错误提示模块待开发中......
*/

var express = require('express'),
    adrouter = express.Router(),
    path = require('path'),
    libs = require('../libs/libs'),//功能处理函数模块
    getModule = require('../libs/module'),
    navs = require('../models/nav'),
    administrator = require('../models/administrator'),
    categories = require('../models/categories'),
    articles = require('../models/article'), //文章表
    images = require('../models/images'), //图片表
    ids = require('../models/ids'),
    //multer = require('../libs/upload'), //上传图功能
    //multer = require('multer'),
    //upload = multer({ dest: '../public/images' }),
    crypto = require('crypto'),
    utility = require('utility'),
    viewmessages = {
        'auther':'',
        'message':{},
        'contents':'',
        'view':''
    },
    adrouterpath = {
        'index':'/index',
        'login':'/login',
        'logout':'/logout'
    },
    adviewpath = {
        'index':'admin',
        'login':'login'
    },
    rootdir = '/admin';



//管理员登陆
/*************************login*****************************/
adrouter.get(adrouterpath['login'],function(req,res,next){
   var query = req.query || {},
       viewmessages = {},
       alldates = {
          query : {},
          options : {}
       },
       message = {},
       pages;  
   //viewmessages.view = "admin";
   //alldates['view'] = 'display';
   res.render(adviewpath['login']);
});

//登陆进入
adrouter.post(adrouterpath['login'],function(req,res,next){
   var body = req.body || {},
       name = body.name,
       password = body.password;
   getModule.getNav(administrator,{name:name},{},{},function(err,doc){
      //验证后台是否登陆
      if(name===doc[0]['name'] && password===utility.base64decode(doc[0]['password']))
      { 
         req.session.name = name;
         req.session.password = password;
         res.redirect(rootdir+adrouterpath['index']);     
      }else{
         res.render(adviewpath['login']);
      }
   });  
});

//登出
adrouter.get(adrouterpath['logout'],function(req,res,next){
    req.session.name='';
    req.session.password='';
    req.session.destroy();
    res.redirect(rootdir+adrouterpath['login']);
});

/********************进入后台管理******************************/
//后台管理
adrouter.get(adrouterpath['index'],function(req,res,next){
   var query = req.query || {},
       user = req.session.name,
       pwd = req.session.password,
       viewmessages = {},
       alldates = {
          query : {},
          options : {}
       },
       optables=navs,
       message = {},
       pagecon;
    if(!user || !pwd)
    {
        res.redirect(rootdir+adrouterpath['login']);
        return;
    }
  
   //contorl current view    
   viewmessages.view = "admin"; 
   alldates['view'] = 'display';
   
   //add Features      
   if(query.mod=="addNav")
   {
      alldates['view'] = 'addNav';  
   }else if(query.mod=="addIstrator"){
      alldates['view'] = 'addIstrator';  
   }else if(query.mod=="addFenlei")
   {  
      alldates['view'] = 'contents';
      alldates['subview'] = "addFenlei"; 
   }else if(query.mod=="addArticle"){
      alldates['view'] = 'contents';
      if(query['cateid'])
      {
          alldates['options']['cateid'] = query['cateid'];
      } 
      alldates['subview'] = "addArticle";
   }

   //访问展示不同模板控制
   if(query.iclass)
   {
     var iclass = (query.iclass).toLowerCase();
     if(iclass=="nav")
     {
        alldates['view'] = "listNav";  //导航列表
        //导航请求呈现  
        if(query.flg)
        {
           alldates['query'].flg = query.flg;
           alldates['options'].nid = query.nid;
        }else{
           alldates['query'].flg = 'all';
        } 
        optables = navs;
     }else if(iclass=="contents"){  //内容管理
        var iclass= (query.list).toLowerCase();
        alldates['view'] = "contents";
        alldates['query'].flg = 'all';
        alldates['query'].list = iclass; 
        if(query['cateid'])
        {
            if(iclass==="articles")
            {
               alldates['options']['cateid'] = query['cateid'];
            }
        } 
        optables = (iclass==="categories") ? categories : (iclass==="articles") ? articles : '';

     }else if(iclass=="adminstor")  //管理员管理
     {
        alldates['view'] = "alladminstor";
        alldates['query'].flg = 'all';
        optables = administrator;
     }
   } 

   //导航列表所有功能操作 
   if(query.options)
   {
      switch((query.options).toLowerCase())
      {
         case'edit':alldates['options'].view = 'edit';      //编辑操作
                    alldates['options'].nid = query.nid; 
                    alldates['options']['cateid'] ? delete alldates['options']['cateid'] : ''; 
                    delete alldates['options']['recomed'];
                    delete alldates['options']['deletes'];
                    delete alldates['options']['showpwd'];
                    delete alldates['options']['isDecry'];
                    delete alldates['query']['flg'];
                    break;
         case'recommid':var recomedn = 1;
                        alldates['options'].nid = query.nid; 
                        alldates['options'].recomed = parseInt(query.recomed,10)>0 ? ('true',recomedn = 3) : ('false',recomedn = 1);  //推送操作
                        delete alldates['options']['view'];
                        alldates['options']['cateid'] ? delete alldates['options']['cateid'] : ''; 
                        delete alldates['options']['deletes'];
                        delete alldates['options']['showpwd'];
                        delete alldates['options']['isDecry'];
                       break;   
         case'delete': alldates['query'].flg = 'all';     //删除操作     
                       alldates['options'].nid = query.nid; 
                       if(query.cateid)
                       {
                          alldates['options']['cateid'] = query.cateid;
                       } 
                       alldates['options'].deletes = true;
                       delete alldates['options']['view'];
                       delete alldates['options']['recomed'];
                       delete alldates['options']['showpwd'];
                       delete alldates['options']['isDecry'];
                       break;
         case'showpwd':alldates['options'].showpwd = 'showpwd';  
                       alldates['options'].nid = query.nid;
                       alldates['options'].isDecry = query.isDecry;
                       alldates['options']['cateid'] ? delete alldates['options']['cateid'] : ''; 
                       delete alldates['options']['recomed'];
                       delete alldates['options']['deletes'];
                       delete alldates['options']['view'];
                       break;                
         default:'';              
      }
    
      //推送功能
      if(alldates['options']['recomed'])
      {   
          getModule.updateNav(optables,{
             nid:alldates['options'].nid 
          },{
             recommid:recomedn
          },{upsert:true},function(err,doc){
             //这里处理URL跳转问题 
             var url;
             alldates['query']['flg'] === "all" ? (url = 'iclass=nav&flg='+alldates['query']['flg']) : (url = 'iclass=nav&flg='+alldates['query']['flg']+'&'+'nid='+alldates['options']['nid']);
             res.redirect(rootdir+adrouterpath['index']+'?'+url);
          });
          return ; 
      }else if(alldates['options']['deletes'])//删除功能
      { 
         var url,con,optable;
         alldates['view'] == "alladminstor" ? (optable=administrator,con={amid:alldates['options'].nid},url = "?iclass=adminstor&flg=all") : alldates['view'] == "listNav" ? (optable=navs,con={nid:alldates['options'].nid},url = "?iclass=nav&flg=all") : (alldates['view'] == "contents" && alldates['query']['list'] == "categories") ? (optable=categories,con={cid:alldates['options'].nid},url = "?iclass=contents&list=categories&flg=all") : (alldates['view'] == "contents" && alldates['query']['list'] == "articles") ? (optable=articles,con={aid:alldates['options'].nid},url = "?iclass=contents&list=articles&flg=all&cateid="+alldates['options'].cateid) : '';
         getModule.deleteNav(optable,con,function(err){
             if(err)
             {
                var error = libs.handleError(err);
             }
             res.redirect(rootdir+adrouterpath['index']+url);    
         });
         return;
      }else if(alldates['options']['showpwd'])
      {
         var url,con,optable;
         con = {amid:alldates['options']['nid']};
         //alldates['view'] == "alladminstor" ? (optable=administrator,con={amid:alldates['options'].nid},url = "?iclass=adminstor&flg=all") : alldates['view'] == "listNav" ? (optable=navs,con={nid:alldates['options'].nid},url = "?iclass=nav&flg=all&nid=-1") : '';
         getModule.getNav(optables,con,{'password':true},{},function(err,doc){
             //控制是加密还是解密
             var pwd = (alldates['options']['isDecry'])=="true" ? utility.base64decode(doc[0]['password']) : (doc[0]['password']);
             if(err)
             {
                return;
             }else{
                res.send(JSON.parse('{"status":true,"pwd":"'+pwd+'"}'));
             }
         });
         return ;
      }
   } 
   
   //cateid 为文章对应分类下ID查询号
   pagecon = !libs.isEmptyObject(alldates['options']&&alldates['options']['cateid']) ? alldates['options'] : {"__v":0};
   //分页展示数据
   var counts = optables.count(pagecon,function(err,c){
       var e,leftnum = 5,lists='',promise01; //默认右侧导航展示5条 推送条目
       //c=-1;  //测试id
       if(c<0) 
       {
          e = new Error('还没有数据哦') || err;
          e.name="notdatas";
          e.status = 200;
          var errors = libs.handleError(e);
          if(errors.msg)
          {
              message.status = 200;
              message.msg = errors.msg;
              viewmessages.message = message;
          }
          viewmessages.contents = alldates;
          res.render(adviewpath['index'],{viewmessages:viewmessages});
       }else{
           
          //控制右侧展示导航内容
          var promise = getModule.getNav(navs,{"recommid":3},null,{},function(err,navdata){
                var infors = libs.handleError(err);
                message.status = infors.status;
                message.msg = infors.msg;
                message.status==200 ? (alldates['leftnavs'] =  navdata) : 0;
                alldates['leftnum'] = leftnum > parseFloat(navdata.length,10) ? parseFloat(navdata.length,10) : leftnum;
          }); 
          promise.then(function(){
              var con01 = {}; //控制查询条件
              
              //导航列表展示  管理员列表页
              if(alldates['view']==="listNav" || alldates['view']==="alladminstor" || alldates['view'] ==="contents")
              {  
                 //当为添加时直接跳转到view
                 if(alldates['view']==="contents")
                 {
                    lists = alldates['query']['list'] ? (alldates['query']['list']) : '';
                    //添加功能去除查询
                    if(alldates['subview'] && (alldates['subview'].slice(0,3)).toLowerCase()==="add")
                    { 
                        if((alldates['subview']).toLowerCase()==="addarticle")
                        {   
                            var con = {cateid:alldates['options']['cateid']};
                            var opt = {};
                            optables = categories;
                        }
                        promise.then(function(){
                            if((alldates['subview']).toLowerCase()==="addarticle")
                            {
                                getModule.getNav(optables,con,null,opt,function(err,doc){
                                    var infors = libs.handleError(err);
                                    message.status = infors.status;
                                    message.msg = infors.msg;
                                    viewmessages.message = message;
                                    alldates['selectdata'] = doc;
                                    viewmessages.contents = alldates;
                                    res.render(adviewpath['index'],{viewmessages:viewmessages});
                                });
                            }else{    //这里是否可以最终删除------
                                message.status = 200;
                                message.msg = ''; 
                                viewmessages.message = message;
                                viewmessages.contents = alldates; 
                                res.render(adviewpath['index'],{viewmessages:viewmessages}); 
                            }  
                        });
                        return ;
                    }
                 }
                 
                 if(alldates['query']['flg']==="all")
                 {
                   //控制所有分页请求
                   var  pages = {
                        pagen:4,                       //分页显示个数 
                        pn:2,                          //分页间隔
                        allNum:c,                      //当前数据总数
                        curNum:query.page || 1 ,       //当前显示第几页
                        onePageNum:8,                  //每页显示条数 
                        iclass:alldates['view']==="listNav" ? 'nav' : alldates['view']==="alladminstor" ? 'admin' : (lists) ? (lists==="categories") ? (lists="categories") : (lists==="articles") ? (lists="articles") : '' : ''
                   };

                   var lastpages = libs.paging(pages),
                       limitn = lastpages.curNum < 0 ? 0 : pages.onePageNum, 
                       pageNum = lastpages.pageNum,    //当小于等于0是不做分页
                       skipn = pageNum>0? ((lastpages.curNum-1)*pages.onePageNum || 0) : 0,
                       con = alldates['view']==="listNav"? ({"nid":1}) : alldates['view']==="alladminstor" ? ({"amid":1}) : (lists && lists==="categories") ? ({"cid":1}) : (lists && lists==="articles") ? ({"aid":1}) : '',  //排序1为正序-1倒序
                       opt = {"sort":con,"limit":limitn,"skip":skipn},
                       file = '';
                 }else{
                    opt = {};
                 } 
                 //查询表ID控制   
                 var oid = alldates['view']==="listNav" ? ('nid') : alldates['view']==="alladminstor" ? ('amid') : (lists && lists==="categories") ? ('cid') : (lists && lists==="articles") ? ('aid') : '';
                 
                 //编辑内容设置 /单条导航数据浏览控制   
                 if(alldates['options']['view']==="edit" || alldates['query']['flg']!="all")
                 {    
                   var datesd = alldates['options']['view'] ? alldates['options'] : alldates['options'],
                       isView = alldates['options']['view'] ? 'view' : '';
                   for(var b in datesd)
                   {
                       
                       if(b!=isView)
                       {  
                           con01[oid] = datesd[b]; 
                       } 
                   } 
                   opt = {};
                 }
                 
                 //表查询控制    
                 alldates['view']==="listNav"? (file='navs') : alldates['view']==="alladminstor" ? (file='alladminstors') : (lists && lists==="categories") ? (file='categories') : (lists && lists==="articles") ? (con01=alldates['options']['view'] ? con01 : alldates['options'] ,file='articles') : '';
                 promise01 = getModule.getNav(optables,con01,null,opt,function(err,navdata){
                    var infors = libs.handleError(err);
                    message.status = infors.status;
                    message.msg = infors.msg;
                    message.status == 200 ? (alldates['options']['view']==="edit" || alldates['query']['flg']!="all" ? alldates['options']['mdata'] = navdata : alldates[file] = navdata) : 0;
                 });     
                 !libs.isEmptyObject(lastpages) ? (alldates['pages']=lastpages) : '';
              }
               
              (promise01 || promise).then(function(){
                viewmessages.message = message;
                //内容管理 (标注内容模板，方便模板遍历)
                if(alldates['query']['list'] && alldates['view']==="contents")
                {
                    alldates['listview'] = lists;
                }  
                viewmessages.message = message;
                viewmessages.contents = alldates;
                res.render(adviewpath['index'],{viewmessages:viewmessages});
              });
          });
       }    
   }); 
});

//编辑/添加
// adrouter.post(adrouterpath['index'],function(req,res,next){ 
//    var body = req.body || {},
//        query = req.query || {},
//        mod = (query.mod).toLowerCase() || '',
//        mid='56540452e93c3c6677b99da8',
//        optable,
//        con,
//        updatecon,
//        datas={},
//        redirectUrl;

//    query.iclass ? (query.iclass==="nav" ? (con={nid:body.nid},updatecon={title:body.title,fg:body.fg,access:body.access,date : new Date()},redirectUrl=rootdir+adrouterpath['index']+"?iclass=nav&flg=all&nid=-1",optable=navs) : query.iclass==="adminstor" ? (con={amid:body.amid},updatecon={name:body.name,password:utility.base64encode(body.password),access:body.access,date:new Date()},redirectUrl=rootdir+adrouterpath['index']+'?iclass=adminstor&flg=all',optable = administrator) : query.iclass==="categories" ? (con={cid:body.cid},updatecon={title:body.title,catecommid:body.catecommid,access:body.access,date : new Date()},redirectUrl=rootdir+adrouterpath['index']+"?iclass=contents&list=categories&flg=all&nid=-1",optable = categories) : query.iclass==="articles" ? (con={aid:body.aid},updatecon={title:body.title,recommid:body.recommid,content:body.content,access:body.access,date : new Date()},redirectUrl=rootdir+adrouterpath['index']+"?iclass=contents&list=articles&flg=all&cateid="+body.cateid,optable = articles): '') : '';  
//    //编辑
//    if(mod=="edit")
//    {
//      getModule.updateNav(optable,con,{
//         '$set':updatecon
//      },{upsert:true},function(err,doc){
//         res.redirect(redirectUrl);
//      });
//      return;
//    }else if(mod=="addNav")//创建导航
//    {  
//       optable = navs;
//       con = {_id:mid,id:'nid'};
//       redirectUrl = rootdir+adrouterpath['index']+'?iclass=nav&flg=all&nid=-1';
//       var promise = getModule.findupdateid(ids,con);
//    }else if(mod=="addmintor")//创建管理员
//    {
//       optable = administrator;
//       con = {_id:mid,id:'adid'};
//       redirectUrl = rootdir+adrouterpath['index']+'?iclass=adminstor&flg=all';
//       var promise = getModule.findupdateid(ids,con);
//    }else if(mod=="addcate")  //分类创建
//    {
//        optable = categories;
//        con = {_id:mid,id:'cid'};
//        redirectUrl = rootdir+adrouterpath['index']+'?iclass=contents&list=categories&flg=all';
//        var promise = getModule.findupdateid(ids,con);
//    }else if(mod=="addarticle")
//    {
//        optable = articles;
//        con = {_id:mid,id:'aid'};
//        imids = ids;
//        redirectUrl = rootdir+adrouterpath['index']+'?iclass=contents&list=articles&flg=all';
//        var promise = getModule.findupdateid(ids,con);
//    }
   


//    //提交操作合并
//    if(promise)
//    {
//       promise.exec(function(err,doc){
//           var ids,jurl='',upimgcon={}; 
//           mod = (mod.toLowerCase());
//           mod=="addnav" ? (ids = doc['nid'],dates ={nid:ids,title:body.title,fg:body.fg,recommid:parseFloat(body.recommid),access:body.access,date:new Date()}) : mod=="addmintor" ? (ids=doc['adid'],dates ={amid:ids,name:body.name,password:utility.base64encode(body.password),access:body.access,date:new Date()}) : mod=="addcate" ? (ids = doc['cid'],dates ={cid:ids,title:body.title,cateid:parseFloat(body.cateid,10),catecommid:parseFloat(body.catecommid),access:body.access,date:new Date()}) : mod=="addarticle" ? (ids = doc['aid'],dates ={aid:ids,catetitle:body.catetitle,cateid:parseFloat(body.cateid,10),catecommid:parseFloat(body.catecommid),recommid:parseFloat(body.recommid),content:body.content,title:body.title,access:body.access,date:new Date()},upimgcon={aid:ids,cateid:parseFloat(body.cateid,10),access:body.access,catecommid:body.catecommid,imgsrc:body.uploadimg,date:new Date()}) : '';
          
//           // multer(req,res,function(err){
//           //     console.log(req.body);
//           //     next();
//           // });
//           getModule.creates(optable,dates,function(err,doc){
//               if(err)
//               {
//                  var error = libs.handleError(err);
//                  return;
//               }
//               mod=="addarticle" ? (jurl="&cateid="+dates.cateid) : "";

//               res.redirect(redirectUrl+jurl);
//           });
//           //console.log(multer);
          
//           // if(!libs.isEmptyObject(upimgcon) && mod==="addarticle")
//           // {  
//           //    var imgtable = images;
//           //    var imgcon = {_id:mid,id:'imid'};
//           //    var promise02 = getModule.findupdateid(imids,imgcon); 
//           //     promise02.exec(function(err,doc){
//           //         getModule.creates(imgtable,upimgcon,function(err,doc){
//           //              if(err)
//           //              {
//           //                 var error = libs.handleError(err);
//           //                 return ;
//           //              }
//           //              console.log(req.files);
//           //              // multer(req,res,function(err){
//           //              //      if(err)
//           //              //      {
//           //              //          return;
//           //              //      }else{
//           //              //         if(req.statusCode==200)
//           //              //         {
//           //              //             res.redirect(redirectUrl+jurl); 
//           //              //         } 
//           //              //      }
//           //              // });
//           //              // if(Object.keys(req.files).length==0)
//           //              // {
//           //              //     console.log('no files upload');
//           //              // }else{
//           //              //     if(req.statusCode==200)
//           //              //     {
                               
//           //              //     } 
//           //              // }
                       
//           //         });
//           //     });
//           // }
//       });
//       return ;
//    }
// });



module.exports = adrouter;