const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccessorySchema=new Schema({
    accessoryName:{
        type:String,
        required:true,
        unique:true
    }
},{collection:'accessory'});

module.exports=mongoose.model('accessory',AccessorySchema);