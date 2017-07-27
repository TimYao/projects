/*
  文章表控制
*/
var db = require('../server');
var Schema = require('mongoose').Schema,
    _Posts = new Schema({
    	pid:Number,
    	title:String,
        content:String,
    	date:{
    		type:Date,
    		default:Date.now
    	},
    	access:Number,
        classi:Number,
        cateid:Number,
        postcommid:Number,
        imgsrc:String
    },{collection:"posts"});

var posts = db.model('Posts',_Posts);



//启动创建数据
//var createdate = require('../datas/importdate');
//createdate(posts,'posts');

module.exports = posts;







