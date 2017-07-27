var mongoose = require('mongoose'),
    dataurl = 'mongodb://localhost:27017/blog',
    mongos = mongoose.connect(dataurl),
    db = mongos.connection;
    //db1 = mongoose.createConnection('mongodb://localhost/blog');


//数据库连接信息提示
db.on('connected',function(){
   console.log("database connect is "+dataurl);
});
db.on('error',function(err){
   console.log(err);
});
db.on('disconnected',function(){
   console.log("mongoose connection is disconnected");
});

module.exports = db;

//connected error disconnected 
