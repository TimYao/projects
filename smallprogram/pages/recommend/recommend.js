//recommend.js
var datas = require('../modules/data.js'); //数据
var bindView = require('../modules/bindView.js'); //调用tab切换
var merData = require('../modules/merData.js'); //合并数据与标注

//获取应用实例
var app = getApp();
Page({
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    current:0,
    isswiper:true,
    h:"",     //默认横向切换内容内容高度
    maxh:""   //设置可视区域高度
  },
  //事件处理函数
  bindViewTap:function(e){
    bindView.bindView.bindViewTap(e,this);
  },
  //tab控制
  tapSwitch:function(e){
    bindView.bindView.tapSwitch(e,this);
  },
  linkContent:function(e){
    bindView.bindView.linkContent(e,this);
  },
  //tab touch切换
  touchchange:function(e){
     var curindex = Number(e.detail.current,10);
     bindView.bindView.tapSwitch(e,this,curindex);
  },
  scrollTolower:function(e){
      bindView.bindView.scrollTolower(e,this);
  },
  onLoad: function () {
      var _this = this;

      /**** 数据初始化*****/ 
      //初始化tab标题
      this.data["tabTitle"] = datas.datas["tabTitle"];
      //tabTitle 调用合并标注数据
      merData.merData.merData({
          addStatus:'a',
          parentFlg:'tabTitle'
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
      bindView.bindView.commons.setHeight(_this,{cuth:100});
      //初始化
      bindView.bindView.commons.init(_this,{datas:this.data["tabTitle"],root:'recommend-root',curindex:0});
  }
})
