//map.js
/**
 *   model控制跳转页面，默认undefined为图谱列表页，-1为没有图谱列表，1为进入图谱结构详细结构图
 *   
 *   collectKnowledge收藏知识
 * 
 * */

//获取应用实例
var app = getApp();
var datas = require('../modules/data.js'); //数据
var bindView = require('../modules/bindView.js'); //调用
var merData = require('../modules/merData.js'); //合并数据与标注

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
  collectKnowledge:function(e){
    bindView.bindView.collectKnowledge(e,this);
  },
  scrollTolower:function(e){
      bindView.bindView.scrollTolower(e,this);
  },
  onLoad: function (e) {
      //var _this = this,listcontent,model;
      var model;
      this.data.model = model = Number(e.model,10) || "undefined";  //跳转参数获取
  },
  onShow:function(e){ 
      var _this = this,listcontent,model=this.data.model;

      //初始化列表值
      listcontent = this.data["tabContent"] = datas.datas["tabContent"];
      this.data["myKnowldegemap"] = datas.datas["myKnowldegemap"];
      //初始化底部tab
      this.data["tabBottomBar"] = datas.datas["tabBottomBar"];

      //tabBottomBar 调用合并标注数据
      merData.merData.merData({
          addStatus:'a',
          parentFlg:'tabBottomBar'
      });

      //设置高度
      bindView.bindView.commons.setHeight(_this,{cuth:50});
      //初始化
      bindView.bindView.commons.init(_this,{datas:this.data["tabBottomBar"],curindex:0,root:"root"});
      //图谱结构
      if(model==1){
          this.data.model = 1;
          return false;
      }  
      
      //存在图片列表内容
      if(listcontent["contentlist"][0]["knowledgemap"].length>0 && model=="undefined"){
           this.data.model = "undefined";
      }else{
           this.data.model = -1;
      }    
  }
})
