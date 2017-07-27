/*
  文章表控制
*/
var db = require('../server');
var Schema = require('mongoose').Schema,
    _Categories = new Schema({
    	cid:Number,
    	title:String,
    	date:{
    		type:Date,
    		default:Date.now
    	},
    	access:Number,
        cateid:Number,
        catecommid:Number
    },{collection:"categories"});

var categories = db.model('Categories',_Categories);



//启动创建数据
//var createdate = require('../datas/importdate');
//createdate(categories,'categories');

module.exports = categories;







