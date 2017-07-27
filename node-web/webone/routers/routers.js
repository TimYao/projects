/*
  navs  导航
  article 文章列表 
  comment 评论
  user  用户
*/


var express = require('express'),
    router = express.Router(),
    path = require('path'),
    libs = require('../libs/libs'),//功能处理函数模块
    multer = require('../libs/upload'), //上传图功能
    getModule = require('../libs/module'),
    navs = require('../models/nav'),
    article = require('../models/article'), //文章表
    links = require('../models/links'), //友情链接表
    categories = require('../models/categories'), //文章分类表
    posts = require('../models/posts'), //帖子文章表
    //sdir = __dirname.substring(0,__dirname.indexOf('start')),
    viewmessages = {
        'auther':'',
        'message':{},
        'contents':'',
        'view':''
    },
    routerpath = {
    	'index':'/index',
    	'login':'/login/in',
    	'loginout':'/login/out',
    	'register':'/register',
        'edit':'/edit',
        'del':'/del',
        'classific':'/classific'
    },
    viewpath = {
        'index':'index',
        'del':'del',
        'classific':'classific'
    };



//get request
/*
  index  
    recommid:3 推荐内容展示  
    about_us 关于我们展示  
    ydates 统计日期和文章个数
    links  友情链接
    categories 文章分类  catecommid 推荐展示文章分类ID
    hotposts  帖子，postcommid 帖子热门推荐
*/
router.get(routerpath['index'],function(req,res,next){
    var iop = 0;
        message = {},
        nav = {},
        alldates = {},
        arrdatas = [],
        title_length = 26, //文章标题截断字数
        about_content = 200,  //文章内容截断字数
        posts_content = 120,   //帖子
        symbol = "...",    //省略号
        i=0;

    //文章推荐
    article.find({"recommid":3,"classi":1}).sort({'date':'desc'}).limit(4).exec(function(err,docs){
        if(err)
        {
            message.status = 400;
            message.msg = '服务器数据错误';
            viewmessages.message = message;
            viewmessages.contents = '';
            viewmessages.view = '';
        }else{
            //推荐展示位置
            for(a in docs)
            { 
                if(docs[a]['title'].length>=title_length)
                {
                    var stitle = docs[a]['title'].slice(0,title_length-3);
                    docs[a]['title'] = stitle+symbol;
                }
                //截取内容指定长度文字
                libs().sliceText({
                    text:docs[a]['content'],
                    start:0,
                    end:50
                },function(err,content){
                    docs[a]['content'] = content;
                }); 
            }
            
            alldates["recommid_msg"] = docs;
            //about us
            article.find({"classi":2}).exec(function(err,docs){
                if(err)
                {
                    message.status = 400;
                    message.msg = '服务器数据错误';
                    viewmessages.message = message;
                    viewmessages.contents = '';
                    viewmessages.view = '';
                }else{
                    if(docs.length>0)
                    {
                       //截取内容指定长度文字
                        libs().sliceText({
                            text:docs[0]['content'],
                            start:0,
                            end:about_content
                        },function(err,content){
                            docs[0]['content'] = content;
                        });
                        alldates["about_msg"] = docs; 
                    }     
                }
                //日期统计文章
                article.find({"classi":1}).where("date").exec(function(err,docs){
                     if(err)
                     {
                        message.status = 400;
                        message.msg = '服务器数据错误';
                        viewmessages.message = message;
                        viewmessages.contents = '';
                        viewmessages.view = ''; 
                     }else{
                        //处理日期格式，统计文章数
                        libs().dateCount({
                            doc:docs,
                            mod:'word'
                        },function(err,ydates){
                             if(ydates)
                             {
                                alldates["ydates"] = ydates;
                             }
                        }); 
                     }
                     //友情链接推荐数据
                     links.find({"classi":3,"linkcommid":3}).exec(function(err,docs){
                         if(err)
                         {
                            message.status = 400;
                            message.msg = '服务器数据错误';
                            viewmessages.message = message;
                            viewmessages.contents = '';
                            viewmessages.view = '';
                         }else{
                            for(c in docs)
                            {
                                if(docs[c]['title'].length>=title_length)
                                {
                                    var stitle = docs[c]['title'].slice(0,title_length-3);
                                    docs[c]['title'] = stitle+symbol;
                                } 
                            }
                            alldates['links'] = docs;
                            message.status = 200;
                            message.msg = 'scuess';
                         }

                         //categories   catecommid推荐展示文章ID
                         categories.find({"classi":1,"catecommid":3}).exec(function(err,docs){
                             if(err)
                             {
                                message.status = 400;
                                message.msg = '服务器数据错误';
                                viewmessages.message = message;
                                viewmessages.contents = '';
                                viewmessages.view = '';
                             }else{
                                //处理分类标题太长
                                for(ca in docs)
                                {
                                    if(docs[ca]['title'].length>=title_length)
                                    {
                                        var stitle = docs[c]['title'].slice(0,title_length-3);
                                        docs[ca]['title'] = stitle+symbol;
                                    } 
                                }
                                alldates['categories'] = docs;
                                message.status = 200;
                                message.msg = 'scuess'; 
                             }
                             //hot posts
                             posts.find({"classi":1,"postcommid":3}).exec(function(err,docs){
                                 if(err)
                                 {
                                    message.status = 400;
                                    message.msg = '服务器数据错误';
                                    viewmessages.message = message;
                                    viewmessages.contents = '';
                                    viewmessages.view = '';
                                  }else{
                                    //推荐帖子处理
                                    for(var a in docs)
                                    { 
                                        //截取内容指定长度文字
                                        libs().sliceText({
                                            text:docs[a]['content'],
                                            start:0,
                                            end:posts_content
                                        },function(err,content){
                                            docs[a]['content'] = content;
                                        }); 
                                    }
                                    alldates['hotposts'] = docs;
                                 }
                                 //调用导航模块
                                 getModule.getNav(navs,{"recommid":3},{},{},function(err,navdata){
                                      if(err)
                                      {
                                         message.status = 400;
                                         message.msg = '服务器数据错误';
                                         viewmessages.message = message;
                                         viewmessages.contents = '';
                                         viewmessages.view = ''; 
                                      }else{
                                         alldates['navs'] = navdata;
                                         message.status = 200;
                                         viewmessages.message=message;
                                         viewmessages.contents = alldates;
                                         viewmessages.view = 'index';
                                         res.render(viewpath['index'],{viewmessages:viewmessages});
                                      }  
                                 }); 
                             });
                         });
                     });
                }); 
            });
        }     
    });    
});



//login/loginout
router.get(routerpath['login'],function(req,res,next){

});
router.get(routerpath['loginout'],function(req,res,next){

});


//classific 模块分类展示
router.get(routerpath['classific'],function(req,res,next){
    var modelId = req.classid,classis={},alldates={},message={};
    getModule.getNav(navs,{"recommid":3},{},{},function(err,navdata){
        if(err)
        {
             message.status = 400;
             message.msg = '服务器数据错误';
             viewmessages.message = message;
             viewmessages.contents = '';
             viewmessages.view = ''; 
        }else{
             alldates['navs'] = navdata;
             message.status = 200;
             viewmessages.message=message;
             viewmessages.contents = alldates;
             viewmessages.view = 'classific';
             res.render(viewpath['classific'],{viewmessages:viewmessages});
       }   
    });
});


//post request


//put request
router.put(routerpath['del'],function(req,res,next){
    console.log(req.url);
    res.render(viewpath['del']);
});

module.exports = router;