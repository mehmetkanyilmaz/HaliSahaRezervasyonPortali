const mongoose=require('mongoose')
const Schema=mongoose.Schema

const MatchTimeSchema=new Schema({
    startTime:{//başlangıç saati
        type:String
    },
    stopTime:{//bitiş saati
        type:String
    },
    matchPrice:{//ilgili saat için maç ücreti
        type:Number,
        default:0.0
    },
    servicePrice:{//ilgili saat için servis ücreti
        type:Number,
        default:0.0
    },
    status:{//false ise ilgili saate maç rezervasyonu yapılamaz.
        type:Boolean,
        default:true
    }
},{collation:'matchTime'})

module.exports=mongoose.model('matchTime',MatchTimeSchema)