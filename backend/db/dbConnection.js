const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/HaliSahaDb',{
    useCreateIndex: true, 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false
})
.then(() => console.log("vt bağlanıldı"))
.catch(hata => console.log("db bağlantı hatası"));