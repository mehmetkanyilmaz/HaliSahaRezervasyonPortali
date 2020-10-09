const mongoose = require('mongoose');
const { collection } = require('./deviceModel');
const Schema = mongoose.Schema;

const ProductBrandSchema=new Schema({
    productName:{
        type:String,
        required:true,
        unique:true
    }
},{collection:'productBrand'});

module.exports = mongoose.model('productBrand',ProductBrandSchema);