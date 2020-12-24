const match=require('../models/matchModel')
const matchTime=require('../models/matchTimeModel')

//bu metod yeni bir maç kaydı oluşturur.
const matchCreate=async(req,res)=>{
    try{//istelien tarih, saat ve stad da daha önce bir kayıt olup olmadığı kontrol ediliyor.
        var checkMatch=await match.find({matchDate:req.body.matchDate,matchStart:req.body.matchStart,stadiumId:req.body.stadiumId})
        if(checkMatch.length==0)
        {//istelien tarih saat ve stad değerlerinde kayıt yoksa yeni bir kayıt oluşturur.
            const newMatch = new match(req.body)
            const post = await newMatch.save()
            if(post) return res.status(200).json(post) //başarılı
            else return res.status(400).json({msg:'Kayıt Oluştururken Hata Oluştu!'}) //hatalı
        }
        else
        return res.status(400).json({msg:'İlgili Alanlar Daha Önce Kullanılmış!'}) //ilgili hata mesajı
    }
    catch(err){ return res.status(404).json({err}) }
}
//bu metod ilgili kriterleri sağlayan maç listesini geri gönderir.
const matctList=async(req,res)=>{
    //gelen tarih ve stad id sine göre maç saatlerini geri döndürür.
    //tarih ve stad id yi body kısmına gömülü olacaktır.
    try{
        const list=await match.find({matchDate:req.body.matchDate,stadiumId:req.body.stadiumId})
        if(list)
            res.status(200).json(list)
        else
            res.status(400).json({msg:'Maçlar Listelenemedi!'})
    }
    catch(err){ res.status(404).json({err}) }
}
//bu metod maç kayıtlarını ve maç kayıtlarına ait kullanıcı bilgilerini birleştirip gönderir.
const matchUserList=async(req,res)=>{   
    try{
        var post=await match.find({}).populate('userId').populate('stadiumId').exec()
        if(post) return res.status(200).json(post)
        else return res.status(400).json({msg:'Maçlar Listelenemedi!'})
    }
    catch(err){ return res.status(404).json({err}) }
}
//bu metod parametre olarak gönderilen id değerine sahip maç kayıtlarını user ve stadium ile ilişkilendirerek
//geri gönderir.
const matchDetailList=async(req,res)=>{
    try{
        var post=await match.find({_id:req.params.id}).populate('userId').populate('stadiumId').exec()
        if(post) return res.status(200).json(post)
        else return res.status(400).json({msg:'Maçlar Listelenemedi!'})
    }
    catch(err){ return res.status(404).json({err}) }
}
//bu metod parametre olarak gelen id değerine göre ilgili kaydı siler.
const matchDelete=async(req,res)=>{  
    //Admin herhangi bir koşula bağlı olmadan silecektir ancak user ise maça 1 gün kalana kadar kaydı silebilecektir.
    //Kontrol web tarafında yapılacaktır.
    try{
        var post=await match.findByIdAndDelete({_id:req.params.id})
        if(post) return res.status(201).json(post)
        else return res.status(404).json({msg:'Silme İşlemi Başarısız!'})
    }
    catch(err){ return res.status(404).json({err}) }
}
//bu metod gönderilen maç bilgilerini ilgili tarih saat ve stadta kayıtlı maç yoksa maçın tarih saat ve stad alanını günceller.
const matchTimeUpdate=async(req,res)=>{  
    try{
        const matchCheck=await match.findById({_id:req.body._id})
        if(matchCheck)//id kontrol ediliyor.
        {
            const checkMatchTime=await matchTime.find({startTime:req.body.matchStart})
            if(checkMatchTime[0].status==true)//ilgili saate maç kaydı oluşturulabilirliği kontrol ediliyor.
            {
                const matchTimeCheck=await match.find({matchDate:req.body.matchDate,matchStart:req.body.matchStart,stadiumId:req.body.stadiumId})
                if(matchTimeCheck.length==0)
                {//ilgili tarih saat ve stadta maç yoksa günceller.
                    delete req.body.service
                    delete req.body.userId
                    delete req.body.note
                    delete req.body.totalPrice
                    const post = await match.findByIdAndUpdate({_id:req.body._id},req.body,{new:true})
                    if(post){
                        return res.status(200).json(post)
                    }
                    else{
                        return res.status(400).json({msg:"Kayıt Güncellenemedi!"})}
                }
                else{
                     return res.status(205).json({msg:"İlgili Tarih Saat Ve Stadta Kayıtlı Maç Var!"})
                }
            }
            else {
                return res.status(205).json({msg:"İlgili Saat İçin Rezervasyon Yapılamaz!"})}
        }
        else{
            return res.status(400).json({msg:"Maç Bulunamadı!"})
        }
    }
    catch(err){ return res.status(404).json({err}) }
}

module.exports={
    matchCreate,
    matctList,
    matchUserList,
    matchDelete,
    matchDetailList,
    matchTimeUpdate
}