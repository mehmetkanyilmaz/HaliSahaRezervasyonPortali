const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const WorkOrderWorkmanshipProcessSchema=new Schema({
    userId:{
        type:String,
    },
    startDate:{
        type:Date
    },
    finishDate:{
        type:Date
    }
},{collection:'workorderworkmanshipprocesss'});

module.exports=mongoose.model('workorderworkmanshipprocesss',WorkOrderWorkmanshipProcessSchema)