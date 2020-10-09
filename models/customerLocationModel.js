const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerLocationSchema = new Schema({
    locationName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    locationAuthorized:{
        type:String,
        required:false,
        trim:true
    },
    locationGsm:{
        type:Number,
        required:false,
        trim:true,
        maxlength:11
    },
    locationLandPhone:{
        type:Number,
        required:false,
        trim:true,
        maxlength:11
    },
    locationEmail:{
        type:String,
        required:false,
        trim:true
    },
    locationsAddress:{
        type:String,
        required:false,
        trim:true,
        maxlength:100
    }
});

module.exports = mongoose.model('customerLocation',CustomerLocationSchema);