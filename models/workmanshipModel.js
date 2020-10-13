const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkmanshipSchema= new Schema({
    workmanshipName:{//işçilik adı
        type:String,
        required:true,
        unique:true
    },
    workmanshipCost:{//işçilik ücreti
        type:Number,
        default:0.0,
        required:false
    },
    laborCost:{//İşçilik maliyeti, gelir gider hesaplarken kullanılacak
        type:Number,
        default:0.0,
        required:false 
    },
    workmanshipExplanation:{//işçilik açıklaması
        type:String,
        required:false
    }
},{collection:'workmanship'});

module.exports=mongoose.model('workmanship',WorkmanshipSchema);