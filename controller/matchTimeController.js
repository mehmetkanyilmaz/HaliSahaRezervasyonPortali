const matchTime=require('../models/matchTimeModel')

//bu metod yeni bir maç saati oluşturuyor.
const matchTimeCreate=async(req,res)=>{
    try{
        const timeList=await matchTime.find({ $or: [{ startTime: req.body.startTime }, { stopTime: req.body.stopTime }] })
        //gönderilen tarih ve saatte kayıt varsa hata mesajı gönderecek eğer kayıt yoksa yeni kayıt oluşturacak
        if(timeList.length==0)
        {
            const newMatchTime=new matchTime(req.body)
            const post=await newMatchTime.save()
            if(post) return res.status(200).json(post)
            else return res.status(400).json({msg:'Kayıt Eklenemedi!'})
        }
        else return res.status(400).json({msg:'Gönderilen Saatlerde Kayıt Mevcut!'})
    }
    catch(err){ return res.status(404).json({err}) }
}
//bu metod maç saatlerini ve ona ait bilgileri geri gönderir.
const matchTimeList=async(req,res)=>{
    try{
        const list=await matchTime.find({})
        if(list) return res.status(200).json(list)
        else return res.status(400).json({msg:'Maç Saatleri Listelenemedi!'})
    }
    catch(err){ return res.status(404).json({err}) }
}
//Bu metod parametre olarak gönderilen id değerine sahip kaydı günceller.
const matchTimeUpdate=async(req,res)=>{
    try{
        const oneMatchTime = await matchTime.findById({_id:req.body._id})
        if(oneMatchTime)
        {//eğer kayıtlı maç saati varsa güncelleme işlemi yapar.
            const newMatchTime = await matchTime.findByIdAndUpdate({_id:req.body._id},req.body,{new:true})
            return  res.status(200).json(newMatchTime)
        }
        else
        return res.status(400).json({"msg":"Kullanıcı Bulunamadı!"})
    }
    catch(err){ return res.status(404).json({"msg":err})}
}

module.exports={
    matchTimeCreate,
    matchTimeList,
    matchTimeUpdate
}