/*
   用户登录，注册，权限表控制
*/
var db = require('../server');
var Schema = require('mongoose').Schema,
    _User = new Schema({
    	id:Number,
    	name:String,
    	password:String,
    	date:{
    		type:Date,
    		default:Date.now
    	},
    	access:Number
    },{collection:"user"});

var user = db.model('User',_User);







