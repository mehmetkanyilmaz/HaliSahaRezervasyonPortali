const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const WorkOrderAccessorySchema=new Schema({
    accessoryId:{//ilgili aksesuarın id si
        type:String,
    },
    accessoryUserId:{//aksusuarı ekleyen kullanıcı
        type:String
    }
},{collection:'workorderaccessory'});

module.exports=mongoose.model('workorderaccessory',WorkOrderAccessorySchema);