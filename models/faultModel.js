const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FaultSchema= new Schema({
    faultName:{//arıza adı
        type:String,
        required:true,
        unique:false
    },
    faultType:{//arıza tipi sadace belirtilen arıza yada tespit edilen arıza olabilir
        type:String,
        required:true,
        unique:false
    }
},{collection:'fault'});

module.exports=mongoose.model('fault',FaultSchema);