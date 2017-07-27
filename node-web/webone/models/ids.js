var db = require('../server');
var Schema = require('mongoose').Schema,
    _Id = new Schema({
    	nid:Number,
    	aid:Number,
    	cid:Number,
    	comid:Number,
    	lid:Number,
    	pid:Number,
    	adid:Number,
        imid:Number,
    	user:String
    },{collection:"ids"});

var ids = db.model('Id',_Id);
module.exports = ids;






