const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceBrandSchema=new Schema({
    brandName:{
        type:String,
        required:true,
        unique:true
    },
    deviceId:{
        type:String,
        required:true
    },
    brandProduct:[{
        productName:{
            type:String,
            unique:true
        }
    }]
},{collection:'deviceBrand'});

module.exports = mongoose.model('deviceBrand',DeviceBrandSchema);