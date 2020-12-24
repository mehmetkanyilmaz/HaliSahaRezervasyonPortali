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
    //try{
        //İlk önce veritabanında kayıtlı maç saati yoksa bir kayıt oluşturur.
        const time0=await matchTime.find({startTime:"00:00"})
        if(time0.length==0 || time0==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="00:00"
            newTime.stopTime="01:00"
            const post=await newTime.save()
        }
        const time1=await matchTime.find({startTime:"01:00"})
        if(time1.length==0 || time1==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="01:00"
            newTime.stopTime="02:00"
            const post=await newTime.save()
        }
        const time2=await matchTime.find({startTime:"02:00"})
        if(time2.length==0 || time2==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="02:00"
            newTime.stopTime="03:00"
            const post=await newTime.save()
        }
        const time3=await matchTime.find({startTime:"03:00"})
        if(time3.length==0 || time3==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="03:00"
            newTime.stopTime="04:00"
            const post=await newTime.save()
        }
        const time4=await matchTime.find({startTime:"04:00"})
        if(time4.length==0 || time4==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="04:00"
            newTime.stopTime="05:00"
            const post=await newTime.save()
        }
        const time5=await matchTime.find({startTime:"05:00"})
        if(time5.length==0 || time5==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="05:00"
            newTime.stopTime="06:00"
            const post=await newTime.save()
        }
        const time6=await matchTime.find({startTime:"06:00"})
        if(time6.length==0 || time6==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="06:00"
            newTime.stopTime="07:00"
            const post=await newTime.save()
        }
        const time7=await matchTime.find({startTime:"07:00"})
        if(time7.length==0 || time7==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="07:00"
            newTime.stopTime="08:00"
            const post=await newTime.save()
        }
        const time8=await matchTime.find({startTime:"08:00"})
        if(time8.length==0 || time8==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="08:00"
            newTime.stopTime="09:00"
            const post=await newTime.save()
        }
        const time9=await matchTime.find({startTime:"09:00"})
        if(time9.length==0 || time9==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="09:00"
            newTime.stopTime="10:00"
            const post=await newTime.save()
        }
        const time10=await matchTime.find({startTime:"10:00"})
        if(time10.length==0 || time10==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="10:00"
            newTime.stopTime="11:00"
            const post=await newTime.save()
        }
        const time11=await matchTime.find({startTime:"11:00"})
        if(time11.length==0 || time11==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="11:00"
            newTime.stopTime="12:00"
            const post=await newTime.save()
        }
        const time12=await matchTime.find({startTime:"12:00"})
        if(time12.length==0 || time12==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="12:00"
            newTime.stopTime="13:00"
            const post=await newTime.save()
        }
        const time13=await matchTime.find({startTime:"13:00"})
        if(time13.length==0 || time13==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="13:00"
            newTime.stopTime="14:00"
            const post=await newTime.save()
        }
        const time14=await matchTime.find({startTime:"14:00"})
        if(time14.length==0 || time14==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="14:00"
            newTime.stopTime="15:00"
            const post=await newTime.save()
        }
        const time15=await matchTime.find({startTime:"15:00"})
        if(time15.length==0 || time15==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="15:00"
            newTime.stopTime="16:00"
            const post=await newTime.save()
        }
        const time16=await matchTime.find({startTime:"16:00"})
        if(time16.length==0 || time16==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="16:00"
            newTime.stopTime="17:00"
            const post=await newTime.save()
        }

        const time17=await matchTime.find({startTime:"17:00"})
        if(time17.length==0 || time17==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="17:00"
            newTime.stopTime="18:00"
            const post=await newTime.save()
        }
        const time18=await matchTime.find({startTime:"18:00"})
        if(time18.length==0 || time18==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="18:00"
            newTime.stopTime="19:00"
            const post=await newTime.save()
        }
        const time19=await matchTime.find({startTime:"19:00"})
        if(time19.length==0 || time19==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="19:00"
            newTime.stopTime="20:00"
            const post=await newTime.save()
        }
        const time20=await matchTime.find({startTime:"20:00"})
        if(time20.length==0 || time20==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="20:00"
            newTime.stopTime="21:00"
            const post=await newTime.save()
        }
        const time21=await matchTime.find({startTime:"21:00"})
        if(time21.length==0 || time21==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="21:00"
            newTime.stopTime="22:00"
            const post=await newTime.save()
        }
        const time22=await matchTime.find({startTime:"22:00"})
        if(time22.length==0 || time22==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="22:00"
            newTime.stopTime="23:00"
            const post=await newTime.save()
        }
        const time23=await matchTime.find({startTime:"23:00"})
        if(time23.length==0 || time23==undefined)
        {
            const newTime=new matchTime()
            newTime.startTime="23:00"
            newTime.stopTime="00:00"
            const post=await newTime.save()
        }

        const timeList=await matchTime.find({})
        if(timeList) return res.status(200).json(timeList)
        else return res.status(400).json({msg:'Maç Saatleri Listelenemedi!'})
    //}
    //catch(err){return res.status(404).json({err}) }
    /*
    try{
        const list=await matchTime.find({})
        if(list) return res.status(200).json(list)
        else return res.status(400).json({msg:'Maç Saatleri Listelenemedi!'})
    }
    catch(err){ return res.status(404).json({err}) }
    */
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