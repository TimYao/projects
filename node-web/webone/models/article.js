/*
  文章表控制
*/
var db = require('../server');
var Schema = require('mongoose').Schema,
    _Article = new Schema({
    	aid:Number,
    	title:String,
    	content:String,
    	date:{
    		type:Date,
    		default:Date.now
    	},
    	access:Number,
        cateid:Number,
        catetitle:String,
        catecommid:Number,
        recommid:Number,
        imgsrc:String
    },{collection:"article"});

var article = db.model('Article',_Article);

//启动创建数据
//var createdate = require('../datas/importdate');
//createdate(article,'article');

module.exports = article;








