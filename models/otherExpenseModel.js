const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OtherExpenseSchema= new Schema({
    workOrderId:{//hangi iş emrinin diğer masrafı olduğu için gereklidir.
        type:String,
        required:true,
        unique:false
    },
    fee:{//diğer masrafın ücreti
        type:Number,
        required:true,
        unique:false,
        default:0
    },   
    quantity:{//diğer masrafın miktarı
        type:Number,
        required:true,
        unique:false,
        default:1
    },
    explanation:{
        type:String,
        required:true,
        unique:false
    }
},{collection:'otherexpense'});

module.exports=mongoose.model('otherexpense',OtherExpenseSchema);