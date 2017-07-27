
/*
   fun Mod.fn.init   obj -> Mod.fn.init.prototype  constructor - > Mod.fn.init -> Mod.prototype.init
   obj - > Mod.prototype

   Module define Mod

   实例化调用Mod()

   函数方法调用Mod

   方法介绍
    1、实例化方法
       
    (1)sliceText  截取指定字符长度以...为结尾 (Parameters opt,callback)
       opt = {
           text:string,
           start:number,
           end:number
       }
       callback 回调格式参数err,obj(错误err,处理返回的对象obj)

    (2)dateCount  统计日期和对应下日期文章个数(Parameters opt,callback)
       opt = {
           doc:obj      //处理的数据库返回文档格式，数组格式例如：[{},{}];
           mod:digital  //默认月份返回数字格式，word格式为单词模式 
       }
       callback 回调格式参数err,obj(错误err,处理返回的对象obj)
    2、静态方法
     (1)、isEmptyObject（判断纯对象是否为空）-》{}
        直接写入验证对象
     (2)、paging分页，实现自动配置分页
        pages默认写入默认样式
          例如：
              pages = {
                pagen:4,                      //分页显示个数 
                pn:2,                         //分页间隔
                allNum:c,                     //当前数据总数  -》数据库查询得到
                curNum:query.page || 1 ,      //当前显示第几页 可变动参数
                onePageNum:8                  //每页显示条数 
              };
      (3) handleError 处理所有错误信息提示          

*/
var Mod = (function(){
    var ufined,
        Mod = function(){
    	     return new Mod.fn.init();
        };
    Mod.fn = Mod.prototype = {
       constructor : Mod,
       init:function(){
          
       },
       sliceText:function(opt,callback){
          var st,end,text,flg,symbol="...",result,err='';
          text = opt.text || "";
          st = Number(opt.start,10) || 0;
          flg=(typeof text).toLowerCase() === "string" && text.length>0 ? true : false; 
          if(flg)
          {  
             if(text.length>0)
             {
                end = (end > text.length) ? (text.length) : (Number(opt.end,10));
                if(st<0 && end<0  && st>end)
                {  
                   result = text; 
                   symbol = '';
                }else{
                   if(text.length<=end)
                   {
                      result = text; 
                      symbol = ''; 
                   }else{
                      result = text.slice(st,end); 
                   }
                } 
                err = '';
             }else{
                err="text is null string!";
             }
          }else{ 
            err = "not string!";
          }
          //回调
          if(callback)
          {
             callback(err,result+symbol);
          } 
       },
       dateCount:function(opt,callback){
          var ydates = {},
              months = {},
              dates,
              mod='digital',
              err;
              
          if(typeof opt === "function")
          {
              callback = opt;   
          }
          if((typeof opt).toLowerCase() === "object" && "lenght" in opt===false)
          {
              dates = opt.doc || {},
              mod = (opt.mod).toLowerCase() || mod;
          }
          if(!dates && (typeof dates).toLowerCase()!="object" &&  ("length" in dates)===false)
          {
              err = "数据处理错误！";
          }else{
              for(var i=0;i<dates.length;i++)
              {
                 var k = new Date(dates[i]['date']);
                 var year = k.getFullYear();
                 var m = k.getMonth()+1;
                 if(!ydates[year])
                 {
                    ydates[year] = {};
                 }
                 if(!ydates[year][m])
                 {
                    ydates[year][m] = {};
                    ydates[year][m]['n'] = 0;
                 }
                 ++ydates[year][m]['n'];
              } 
              //如果模式为word将数字格式装换为对应英文展示
              if(mod==="word")
              {
                  for(var a in ydates)
                  {
                      for(var b in ydates[a])
                      {
                           var c = setWord(b); 
                           months[a] = ydates[a];
                           months[a][c] = ydates[a][b];
                           delete months[a][b];
                      } 
                  } 
                  ydates = months;
              }
              err = "";
          }
          //月份转换为英文格式
          function setWord(m)
          {  
              var str = '';
              switch(Number(m,10))
              {
                  case 1: str += "January";
                          break;
                  case 2: str += "February";
                          break;
                  case 3: str += "March";
                          break;
                  case 4: str += "April";
                          break;
                  case 5: str += "May";
                          break;
                  case 6: str += "June";
                          break;         
                  case 7: str += "July";
                          break;
                  case 8: str += "August";
                          break; 
                  case 9: str += "September";
                          break; 
                  case 10:str += "October";
                          break;
                  case 11:str += "November";
                          break;
                  case 12:str += "December";
                          break; 
                  default :str='';
              }
              return str.length>0 ? str : '';
          }
          return callback ? (callback(err,ydates)) : callback(err);
       }
    };
    Mod.fn.init.prototype = Mod.fn;
    Mod.test1 = function()
    {
        console.log(this);
    };
    Mod.handleError = function(err,fn){
        var status,msg,success;
        if(err)
        {
           if(err.name=="notdatas")
           {
              msg = err.message ;
              status = err.status;
           }
        }else{
           status = 200; 
           msg = "success"; 
        }
        return {
           status:status || 400,
           msg:msg || "数据错误"
        };
    };
    Mod.isEmptyObject = function(obj)
    {
        for(var n in obj)
        {
            return false;
        } 
        return true;
    };
    Mod.paging = function(pages)
    {
        var curNum = pages.curNum || 1, 
            allNum = pages.allNum || 0,
            pagen = pages.pagen || 4,
            pn = pages.pn || 3,
            iclass = pages.iclass || '',  //模板分类
            pm,
            startn,       //分页起始码
            endn,         //分页结束码
            pageNum,      //总分页数码
            nextPage,     //是否显示下一页
            prePage,      //是否显示上一页
            err;          //错误提示 
        allNum < pages.onePageNum ? (onePageNum = allNum,curNum=-1,pageNum=0) : (onePageNum = pages.onePageNum,pageNum=Math.ceil(allNum/onePageNum));     
        //console.log(allNum+'s');
        pagen > pageNum ? (pagen=pageNum) : pagen;
        if(allNum<=0)
        {
            err = new Error("数据内容条数小于0");
            return {
               err:err
            };
        } 
        if(pageNum>0)
        {  
           curNum < 0 ? (prePage = false,nextPage=false) : curNum>0 && (curNum-pn <= 0) ? (prePage = false,nextPage=true) : (curNum-pageNum>=-1) ? (prePage = true,nextPage=false) : (prePage = true,nextPage=true);
           pm = (curNum>pageNum-pagen+1) ? pageNum-pagen+1 : curNum; 
           //当设置显示页等于总分页不显示上一页，下一页，首末页
           if(pageNum==pagen)
           {
               prePage = false;
               nextPage=false;
           } 
        }
        return {
           iclass:iclass,
           pageNum:pageNum,
           pagen:pagen,
           curNum:curNum,
           onePageNum:onePageNum,
           startn : parseInt(pm,10)-pn<=0 ? (endn=pagen,1) : (endn=((curNum>pageNum-pagen+1) ? (parseInt(pm,10)-1+pagen) : (parseInt(pm,10)-1+pagen-1)),((curNum>pageNum-pagen+1)?parseInt(pm,10):parseInt(pm,10)-1)),
           endn: endn,
           prePage:prePage,
           nextPage:nextPage,
           preNum : (parseInt(curNum)-1)<0 ? 1 : (parseInt(curNum)-1),
           nextNum : (parseInt(curNum)+1)>pageNum ? pageNum : (parseInt(curNum)+1)
        };   
    };
    return Mod;
})();


module.exports = Mod;