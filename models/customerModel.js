const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    customerCategory:{
        type:String,
        trim: true,
        required: true
    },
    customerName:{
        type:String,
        trim: true,
        required: true,
        unique:true
    },
    customerLocations:{
        type:Array
    },
    customerProducts:[{
        locationId:{
            type:String,
            required:true
        },
        productId:{
            type:String,
            required:true
        },
        productSerialNumber:{
            type:String,
            required:true,
            unique:true
        }
    }]
},{collection:'customer'});

module.exports = mongoose.model('customer',CustomerSchema);