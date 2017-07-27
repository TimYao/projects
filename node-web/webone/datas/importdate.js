/* 导入文章数据*/
var datas = require('../datas/datas');
function createDates(model,collection)
{
    for(var j in datas)
    {
        if(j.toLowerCase()===collection.toLowerCase())
        {
            for(var k in datas[j])
            {
                addDatas(datas[j][k]);
            }
            
        }
    }

    function addDatas(data)
    {
        model.create(data,function(err,a){
             console.log(err);
        });
    }
}

module.exports = createDates;
