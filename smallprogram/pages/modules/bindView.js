//bindView.js
/****
 *    函数封装整个点击方法
 * 
 *    bindViewTap 低部tab标题切换
 *    tapSwitch  顶部tab切换(精选图谱，精选知识)
 *    linkContent 链接跳转页面(所有页面的链接跳转路由)
 *    collectKnowledge 收藏知识
 *    scrollTolower 滑动加载
 *    searchKey 搜索点击变化
 *    enterKey  搜索键入记录搜索值并触发联想
 *    cancelEnterKey 取消搜索触发联想消失
 *    queryContent 搜索内容实现
 *    commons  该包中的公用函数定义
 *        setCurrent  标注对应数据下当前状态 返回数据
 *        clearCurrent 清理掉所有当前样式，按指定条件添加样式
 *        setStatus   设置数据中的参数值变化，控制模板的渲染
 *        enterKey    监测搜索框键入值变化，联想触发
 *        cancelEnterKey 搜索下取消，删除值，去除联想
 *        showLenovo  控制模板渲染是否展示联想框
 *        queryContent  搜索内容结果页控制，包括点击联想框点击搜索条目指定请求返回
 *             函数中的参数requestUrl控制推荐和我的的请求地址
 *        init初始化一些启动脚本   ---isswiper控制在有tab切换下添加是否计算内容高度
 *        setHeight 计算内容高度，保证内容展示
 *        toBack路由规则，暂续中......
 * 
 * 
 * ****/

exports.bindView = {    
   bindViewTap:function(e,_root){
      var _this = this;   
      var data = _root.data.tabBottomBar;
      var curindex = Number(e.currentTarget.dataset.index,10);
      this.commons.setCurrent({
          curindex : curindex,  
          datas : data,
          root : 'root' 
      });
      //跳转
      wx.redirectTo({
            url:e.currentTarget.dataset.href
      });
   },
   tapSwitch:function(e,_root,curindex){
      var currentindex = _root.data.current =  Number(e.target.dataset.index,10)>=0 ? Number(e.target.dataset.index,10) : curindex;
      var maxh = _root.data.tabContent.contentlist[_root.data.current].size*_root.data.tabContent.contentlist[_root.data.current].oh+"rpx";
      var datas = _root.data.tabTitle;
      //设置点击展示当前样式
      this.commons.setCurrent({
          curindex : currentindex,  
          datas : datas,
          root : 'recommend-root',
          callback:function(datas){
            //切换屏幕设置
            _root.setData({
                  current:_root.data.current,
                  h:maxh,
                  tabTitle:datas
            });
          } 
      });
      
   },
   linkContent:function(e,_root){
       var href = e.currentTarget.dataset.href; //链接
       var id = e.currentTarget.dataset.id; //ID
       var titles = e.currentTarget.dataset.titles; //层级标题关系
       var classi = e.currentTarget.dataset.classi || e.currentTarget.dataset.title; //分类 
       var model = Number(e.currentTarget.dataset.model,10); //跳转参数 undefined,-1,1,2
       var _url = href;
       if(model===1 || model===2){
         _url = href+"?model="+model
       }
       if(model===2){
           _url+="&kntitle="+classi;  
       }
       wx.navigateTo({
          url:_url,
          success:function(){
              _root.data.model = model; 
          }
       });
   },
   collectKnowledge:function(e,_root){
        wx.showModal({
            title: '提示',
            content: '收藏知识图谱成功',
            success: function(res) {
                if (res.confirm) {
                    //console.log('用户点击确定')
                }
            }
        });
   },
   scrollTolower:function(e,_root){
        var direc;
        if(e.detail){
            direc = (e.detail.direction).toLowerCase(); 
            //滑到底部了 
            if(direc==="bottom"){
                _root.setData({
                    isLoading:true
                });
            }
            setTimeout(function(){
                _root.setData({
                    isLoading:'undefined'
                });
            },1000);
        }
   },
   searchKey:function(_root,opt){
        //搜索状态显示
        this.commons.setStatus(opt,function(datas){
              _root.setData({
                   searchModule:datas 
              });
        });
   },
   enterKey:function(_root,opt){ 
       var ev,value,This=this; 
       opt["_root"] = _root;
       ev = opt.e;
       this.commons.enterKey(opt,function(datas){
            //调用联想下拉
            if(ev){
                value = ev.detail.value;
                if(value){
                    if(_root.data.isShow){
                        _root.setData({
                            isShow:false
                        });
                    }
                    datas = This.commons.showLenovo(datas);
                }
            }
            _root.setData({
                searchModule : datas,
                searchValue : value ? ev.detail.value : '' 
            });  
       });
   },
   cancelEnterKey:function(_root,opt){
       var This = this;
       this.commons.cancelEnterKey(opt,function(datas){
           opt.attrs = [{key:"isLenovo",value:undefined}];
           This.commons.setStatus(opt,function(datas){
                _root.setData({
                    searchModule:datas,
                    searchValue:""
                });
           });
           
       });
   },
   queryContent:function(_root,opt){
      var This = this; 
      this.commons.queryContent(_root,opt,function(_root,lastValue){
           //搜索最后合并的字段  requestUrl-搜索的类型请求地址 searchValue-搜索框内容
           if(lastValue){
               if(lastValue["requestUrl"]){
                    //这里写请求内容
                    if(opt.datakey){
                        var data = require('data.js')["datas"][opt.datakey];//测试数据
                        //设置隐藏联想 
                        This.commons.setStatus({datas:_root.data.searchModule,attrs:[{key:"isLenovo",value:undefined}]},function(data){
                               _root.setData({
                                   searchModule:data
                               });
                        });
                        //控制搜索结果页展示
                        _root.setData({
                            searchContent:data,
                            isShow:true
                        });
                    }
               } 
           }
      });
   },
   commons:{
       setCurrent:function(opt){
            var curindex = opt.curindex || 0;
            var datas = opt.datas || {};
            var curoot = opt.root || ''; 
            var callback = opt.callback;
            if(datas){
                  for(var i=0;i<datas.length;i++){
                      if(curindex===i){
                           datas[i].root = curoot;
                      }else{
                           datas[i].root = "";
                      } 
                  } 
                  if(callback){
                      callback(datas);
                  }
            }
       },
       clearCurrent:function(opt){
            var datas = opt.datas || {};
            var curindex = opt.curindex >=0 ? opt.curindex : -1;
            var root = opt.root || '';
            if(datas){ 
                  for(var i=0;i<datas.length;i++){
                        datas[i].root = "";
                  }
                  if(curindex>=0){ 
                        datas[curindex].root = root;
                  }
            }
       },
       setStatus:function(opt,callback){
           var datas,attrs,key,value;
           datas = opt.datas;
           attrs = opt.attrs;
           if(!datas){
              return false;
           }
           if(attrs.length>0){
               for(var i=0;i<attrs.length;i++){
                   var curoot = attrs[i];
                   if(curoot){
                       key = curoot.key;
                       value = curoot.value;
                       for(var a in datas){
                           if(key===a){
                               datas[a] = value;
                           }else{
                               datas[key] = value;
                           }
                       }   
                   }
               }
           }
           if(callback){
              callback(datas); 
           }
       },
       enterKey:function(opt,callback){
          var _root,e,datas,value;
          e = opt.e;
          _root = opt._root;
          datas = opt.datas;
          if(e){
             value = e.detail;
          }
          if(value){
              this.setStatus({datas:datas,attrs:[{key:"isEnterKey",value:true}]},callback);
          }
       },
       cancelEnterKey:function(opt,callback){
           var datas = opt.datas;  
           this.setStatus(opt,callback);
       },
       showLenovo:function(datas){
           datas["isLenovo"] = true;
           return datas;
       },
       queryContent:function(_root,opt,callback){
           var ev = opt.e; 
           var types = ev.currentTarget.dataset.type;
           var searchValue,requestUrl;
           var lastValue = {}; 
           if(_root.data.searchValue){
                searchValue = _root.data.searchValue;
           }
           //搜索类型为推荐recommend  --- 搜索类型为我的my
           if(types==="recommend"){
               requestUrl = "true";
           }else if(types==="my"){
               requestUrl="true";
           }
           lastValue["requestUrl"] = requestUrl;
           lastValue["searchValue"] = searchValue;
           callback?(callback(_root,lastValue)):void(0);
       },
       init:function(_root,opt){
           if(_root.data.isswiper){
              //设置初始化tab下内容高度  
              _root.data.h = _root.data.tabContent.contentlist[_root.data.current].size*_root.data.tabContent.contentlist[_root.data.current].oh+"rpx";
           }  
           this.clearCurrent(opt);
       },
       setHeight:function(_root,opt){
           var h = opt.cuth;  
             //设置滚动可视区域高度
            wx.getSystemInfo( {
                  success: function( res ) {
                        _root.data.maxh = res.windowHeight-h+'px';
                  }
            });
       },
       toBack:function(_root,opt){
           var model = opt.model;
           //var ktitle = opt.ktitle;
           var status,curstatus;
           var _url;
           if(model==1){
               status = "undefined";  
               _url = "../map/map"; 
           }else if(model==2){
               status = 1;  
               _url = "../map/map?model="+status; 
           }else if(model==3){
               status = 2;  
               _url = "../list/list?model="+status;   
           }
           if(_url==undefined){
               return false;
           }
           wx.navigateTo({url:_url});
       },
       toAjax:function(opt){
           
       }  
   }
};

