/*
   用户登录，注册，权限表控制
*/
var db = require('../server');
var Schema = require('mongoose').Schema,
    _Adminer = new Schema({
    	amid:Number,
    	name:String,
    	password:String,
    	date:{
    		type:Date,
    		default:Date.now
    	},
    	access:Number
    },{collection:"adminer"});

var adminer = db.model('Adminer',_Adminer);


module.exports = adminer;




