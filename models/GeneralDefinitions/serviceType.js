const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceTypeSchema =  new Schema({
    serviceName:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    serviceColor:{
        type:String,
        trim:true,
        required:false
    }
},{collection : 'serviceType'});

const serviceType = mongoose.model('serviceType',serviceTypeSchema)
module.exports = serviceType
//module.exports=mongoose.model('serviceTypes',serviceTypeSchema);