var db = require('../server');
var Schema = require('mongoose').Schema,
    _Nav = new Schema({
    	nid:Number,
    	recommid:Number,
        fg:String,
    	title:String,
    	date:{
    		type:Date,
    		default:Date.now
    	},
    	access:Number
    },{collection:"navs"});

var nav = db.model('Nav',_Nav);
//启动创建数据
//var createdate = require('../datas/importdate');
//createdate(nav,'navs');
module.exports = nav;






