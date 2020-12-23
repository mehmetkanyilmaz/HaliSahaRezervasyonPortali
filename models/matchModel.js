const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const MatchSchema=new Schema({
    userId:{//maç kullanıcı ilişkisi için
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
    },
    matchDate:{//maç tarihi
        type:Date,
        required:true
    },
    matchStart:{//maç başlangıç saati
        type:String
    },
    matchStop:{//maç bitiş saati
        type:String
    },
    stadiumId:{//maç stad ilişkisi için
        type:mongoose.Types.ObjectId,
        ref:'stad'
    },
    service:{//maç için servis durumunu belirtir
        type:Boolean,
        default:false
    },
    note:{//maça kayıtlı not bilgisi
        type:String
    },
    totalPrice:{//maça ait toplam ücret (maç ve varsa servis ücreti)
        type:Number
    }
},{collation:'match'})

module.exports=mongoose.model('match',MatchSchema)