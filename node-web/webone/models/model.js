/*
   关于网站模块分类定义


    Param
     对首页展示的模块和导航定义
       mid -> 模块ID
       title -> 模块标题
       recmid -> 推荐模块id (更新3标注为推荐)
       access -> 权限ID(控制什么权限展示某些模块)

*/

var db = require('../server'),
    Schema = require('mongoose').Schema,
    _Model = new Schema({
       mid:Number,
       title:String,
       recmid:Number,
       date:{
       	  type:Date,
       	  default:Date.now
       },
       access:Number
    },{collection:'model'});

var models = db.model('models','_Model');

var pages = require('../config/pages');