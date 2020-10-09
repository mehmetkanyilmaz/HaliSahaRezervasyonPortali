const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestTypeSchema =  new Schema({
    requestName:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    requestColor:{
        type:String,
        trim:true,
        required:false
    }
},{collection : 'requestType'});

const requestType = mongoose.model('requestType',requestTypeSchema)
module.exports = requestType

//module.exports=mongoose.model('requestTypes',requestTypeSchema);