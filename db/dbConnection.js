const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/TeknikServisDb',{useUnifiedTopology:true, useNewUrlParser:true})
.then(() => console.log("vt bağlanıldı"))
.catch(hata => console.log("db bağlantı hatası"));