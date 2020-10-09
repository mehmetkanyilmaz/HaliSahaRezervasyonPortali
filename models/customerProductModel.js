const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerProductSchema=new Schema({
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
});
module.exports = mongoose.model('customerProduct',CustomerProductSchema);