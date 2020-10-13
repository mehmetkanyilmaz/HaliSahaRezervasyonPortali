const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const WorkOrderWorkmanshipSchema=new Schema({
    workmanshipId:{//ilgili işçilik id si
        type:String
    },
    workmanshipCost:{//işçilik ücreti
        type:Number,
        default:0
    },
    laborCost:{//işçilik maliyeti
        type:Number,
        default:0
    },
    workmanshipUserId:{//işçiliği sisteme ekleyen kullanıcı
        type:String
    }
},{collection:'workorderworkmanship'});

module.exports=mongoose.model('workorderworkmanship',WorkOrderWorkmanshipSchema)