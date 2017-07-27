/*
   评论表控制
*/
var db = require('../server');
var Schema = require('mongoose').Schema,
    _Coments = new Schema({
        aid:Number,
    	comid:Number,
    	name:String,
    	title:String,
        content:String,
    	date:{
    		type:Date,
    		default:Date.now
    	},
    	access:Number
    },{collection:"coments"});

var coments = db.model('Coments',_Coments);







