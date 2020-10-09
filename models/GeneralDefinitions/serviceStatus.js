const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceStatusSchema=new Schema({
    serviceStatusName:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    serviceStatusColor:{
        type:String,
        trim:true,
        required:false
    }
},{collection : 'serviceStatus'});

const serviceStatus = mongoose.model('serviceStatus',serviceStatusSchema)
module.exports = serviceStatus
//module.exports=mongoose.model('servicesStatus',serviceStatusSchema);