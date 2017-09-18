//list.js
//获取应用实例
var datas = require('../modules/data.js'); //数据
var bindView = require('../modules/bindView.js'); //调用

//获取应用实例
var app = getApp();
Page({
  data: {
     model:3
  },
  //事件处理函数
  bindViewTap:function(e){
    bindView.bindView.bindViewTap(e,this);
  },
  linkContent:function(e){
    bindView.bindView.linkContent(e,this);
  },
  onLoad: function () {
      var _this = this;

      /**** 数据初始化*****/ 
      //初始化tab列表值
      this.data["tabContent"] = datas.datas["tabContent"];
      //初始化底部tab
      this.data["tabBottomBar"] = datas.datas["tabBottomBar"];
      // wx.showActionSheet({
      //   itemList: ['收藏'],
      //   success: function(res) {
      //     if (!res.cancel) {
      //       console.log(res.tapIndex)
      //     }
      //   }
      // });
  },
  onUnload:function(p){
    var model;
    model = Number(this.data.model,10); 
    //bindView.bindView.commons.toBack(this,{model:model});
  }
})

