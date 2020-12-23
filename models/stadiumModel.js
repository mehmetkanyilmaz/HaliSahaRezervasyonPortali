const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const StadiumSchema=new Schema({
    stadiumName:{//stad adı
        type:String,
        unique:true,
        required:true
    },
    stadStatus:{//stad durumu false ise maç rezervasyonu yapılmaz.
        type:Boolean,
        default:true
    }
},{collation:'stad'})

module.exports=mongoose.model('stad',StadiumSchema);