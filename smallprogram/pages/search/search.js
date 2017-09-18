//search.js
/** 
 *   linkContent  链接路由
 *   searchKey  点击搜索状态
 *   enterKey 输入搜索状态
 *   cancelEnterKey 取消搜索中状态
 *   cancelEnter 恢复到非搜索状态 
 *   queryContent 搜索查询内容
*/




//获取应用实例
var datas = require('../modules/data.js'); //数据
var bindView = require('../modules/bindView.js'); //调用
var merData = require('../modules/merData.js'); //合并数据与标注

//获取应用实例
var app = getApp();
Page({
  data: {
    maxh:""   //设置可视区域高度
  },
  //事件处理函数
  bindViewTap:function(e){
    bindView.bindView.bindViewTap(e,this); 
  },
  linkContent:function(e){
    bindView.bindView.linkContent(e,this);
  },
  searchKey:function(event){
     var _this = this;
     bindView.bindView.searchKey(_this,{e:event,datas:this.data["searchModule"],attrs:[{key:"searchstatus",value:true}]});
  },
  enterKey:function(event){
     var _this = this; 
     bindView.bindView.enterKey(_this,{e:event,datas:this.data["searchModule"]});
  },
  cancelEnterKey:function(event){
     var _this = this;
     bindView.bindView.cancelEnterKey(_this,{e:event,datas:this.data["searchModule"],attrs:[{key:"focus",value:true},{key:"isEnterKey",undefined}]});
  },
  cancelEnter:function(){
    var _this = this;
    bindView.bindView.searchKey(_this,{e:event,datas:this.data["searchModule"],attrs:[{key:"searchstatus",value:false}]});
  },
  queryContent:function(event){
      bindView.bindView.queryContent(this,{e:event,datakey:"searchContent"}); 
  },
  onLoad: function (){
      var _this = this;
      /**** 数据初始化*****/ 
      //初始化搜索模块
      this.data["searchModule"] = datas.datas["searchModule"];
      //tabBottomBar 调用合并标注数据
      merData.merData.merData({
          addStatus:'s',
          parentFlg:'searchModule'
      });
      //初始化tab列表值
      this.data["tabContent"] = datas.datas["tabContent"];
      //初始化底部tab
      this.data["tabBottomBar"] = datas.datas["tabBottomBar"];
      //tabBottomBar 调用合并标注数据
      merData.merData.merData({
          addStatus:'a',
          parentFlg:'tabBottomBar'
      });
      //设置高度
      bindView.bindView.commons.setHeight(_this,{cuth:50});
  }
})

