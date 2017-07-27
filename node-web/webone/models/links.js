/*
  文章表控制
*/
var db = require('../server');
var Schema = require('mongoose').Schema,
    _Links = new Schema({
    	linkid:Number,
    	title:String,
    	content:String,
    	date:{
    		type:Date,
    		default:Date.now
    	},
    	access:Number,
        classi:Number,
        linkcommid:Number,
        imgsrc:String
    },{collection:"links"});

var links = db.model('Links',_Links);

module.exports = links;








