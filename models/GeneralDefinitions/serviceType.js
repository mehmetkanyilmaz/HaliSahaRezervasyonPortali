const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceTypeSchema =  new Schema({
    serviceName:{//servisin adı(yerinde servis, teknik servis, gözlem...vs)
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    serviceHourlyWage:{//servisin saatlik ücreti
        type:Number,
        required:true,
        default:0
    }
    ,
    serviceColor:{//servisin listede gözükeceği renk
        type:String,
        trim:true,
        required:false
    }
},{collection : 'serviceType'});

const serviceType = mongoose.model('serviceType',serviceTypeSchema)
module.exports = serviceType
//module.exports=mongoose.model('serviceTypes',serviceTypeSchema);