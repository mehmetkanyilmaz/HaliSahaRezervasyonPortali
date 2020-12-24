const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    nameAndSurname:{//üyenin adı ve soyadı
        type:String,
        required:true
    },
    mailAdress:{//üyenin mail adresi
        type:String,
        required:true,
        unique:true
    },
    password:{//üyenin şifresi
        type:String,
        required:true,
        minlength:6
    },
    phoneNumber:{//üyenin telefon numarası
        type:String,
        minlength:10,
        maxlength:10
    },
    role:{//kullanıcının yetkisini belirtir, U => normal kullanıcı, A => admin
        type:String,
        default:"U"
    } 
},{collection:'user'})

module.exports=mongoose.model('user',UserSchema);