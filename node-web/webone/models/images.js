/*
  文章表控制
*/
var db = require('../server');
var Schema = require('mongoose').Schema,
    _Image = new Schema({
        imid:Number,
    	aid:Number,
    	date:{
    		type:Date,
    		default:Date.now
    	},
    	access:Number,
        cateid:Number,
        catecommid:Number,
        recommid:Number,
        imgsrc:String
    },{collection:"images"});

var images = db.model('Image',_Image);

module.exports = images;








