/*
   功能数据操作模块函数
   findupdateid  对ID进行动态更新自动生成
   getNav  查找数据
   updateNav  更新数据
   deleteNav  删除数据
   creates  创建数据

*/


var getNav = function(model,con,filept,opt,fn){
  var promise = model.find(con,filept,opt).exec(function(err,docs){
        fn(err,docs);
  });
  return promise;
};
var updateNav = function(model,con,doc,opt,fn){
  model.update(con,doc,opt,function(err){
      fn ? (fn(err,doc)) : '';
  });	
};
var deleteNav = function(model,con,fn){
  model.remove(con,function(err){
      fn ? (fn(err)) : '';
  });
};
var creates = function(model,con,fn)
{
    var promise = model.create(con,function(err,doc){
       fn ? (fn(err,doc)) : ''; 
    });
    return promise;
};
var findupdateid = function(model,opt,fn)
{
    var _id,id,err;
    _id = opt._id || '';
    id = opt.id || ''; 
    if(!_id || !id)
    {
       err=new Error("请定义查询ID！");
       fn ? (fn(err)) : '';
       return false;
    }
    var mkid = JSON.parse('{"'+id+'":1}');
    var doc = model.findByIdAndUpdate(_id,{$inc:mkid},{new:true});
    return doc;
};

//导出模块方法
module.exports = {
	 getNav:getNav,
	 updateNav:updateNav,
	 deleteNav:deleteNav,
   creates:creates,
   findupdateid:findupdateid  
};

