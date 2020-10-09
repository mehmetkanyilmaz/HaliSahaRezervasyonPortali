const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceSchema=new Schema({
    deviceName:{
        type:String,
        required:true,
        unique:true
    }
},{collection:'device'});

module.exports = mongoose.model('device',DeviceSchema);