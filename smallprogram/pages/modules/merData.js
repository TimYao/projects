/**
 * merdata.js
 * 合并请求过来的数据与标注数据返回
*/
var data = require('data.js').datas;
exports.merData = {
    merData:function(opt){
       var comData,comFlgs;  
       var msg="合并失败，缺少合并字段！"; 
       var addStatus = (opt.addStatus).toLowerCase() || 'a';  //a 为合并到每一个层级中，s合并到单层中,默认合并到所有层中 
       var parentFlg = opt.parentFlg;
       var flgs = data.AddFlg;
       //var merFlgs = opt.merFlgs;
       //var merDatas = opt.merDatas;
       if(!parentFlg){
           return msg 
       } 
       //搜索到指定合并的数据
       for(var a in data){
           if(a===parentFlg){ 
               comData = data[a];
               comFlgs = flgs[a];
               break;
           }
       }
       if(comData && comFlgs){ 
           //深层合并
           if(addStatus=="a"){
               if(comFlgs.length>0){
                    for(var i=0;i<comFlgs.length;i++){
                        if(comData.length>0){
                            for(var j=0;j<comData.length;j++){
                                if(comFlgs[i]["tag"] in comData[j]===false){
                                      comData[j][comFlgs[i]["tag"]] = comFlgs[i]["value"];
                                }
                            }
                        }
                        
                    }
                }
           }else if(addStatus=="s"){  //单层合并
                //说明是对象
                if(!comData.length){
                    if(comFlgs.length>0){
                         for(var i=0;i<comFlgs.length;i++){ 
                             if(comFlgs[i]["tag"] in comData === false){
                                    comData[comFlgs[i]["tag"]] = comFlgs[i]["value"];
                             }
                         }
                    }
                }
           }
           
       }
    }
}