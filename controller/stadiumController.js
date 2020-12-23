const stadium=require('../models/stadiumModel')
const match=require('../models/matchModel')

//bu metod stad bilgilerini geri gönderir.
const stadiumList=async(req,res)=>{
    try{
        const stadiumList=await stadium.find({})
        if(stadiumList) return res.status(200).json(stadiumList)
        else return res.status(400).json({msg:'Stadlar Listelenemedi!'})
    }
    catch(err){ return res.status(404).json({err}) }
}
//bu metod yeni bir stad oluşturur.
const stadiumCreate=async(req,res)=>{
    try{
        const stadiumList=await stadium.find({stadiumName:req.body.stadiumName})
        if(stadiumList.length>0) {
            return res.status(205).json({msg:'Stad İsmi Daha Önce Kullanılmış!'})
        }
        else{//gönderilen stad adı daha önce kullanılmamışsa yeni bir kayıt oluşturur.
            delete req.body._id
            const newStad=new stadium(req.body)
            const post=await newStad.save()
            if(post) {
                return res.status(201).json(post)
            }
            else {
                return res.status(400).json({msg:'Stad Oluşturulamadı!'})
            }
        }
    }
    catch(err){ return  res.status(404).json(err) }
}
//bu metod body kısmında gönderilen stad bilgilerini günceller.
const stadiumUpdate=async(req,res)=>{
    try{
            const oneStad=await stadium.findById({_id:req.body._id})
            if(oneStad){//gönderilen id kontol ediliyor.
                const checkStadName=await stadium.find({stadiumName:req.body.stadiumName})
                if(checkStadName.length>0 && checkStadName._id==oneStad._id)//gönderilen stad adı başka bir
                //kayıtta mevcut ise 205 durum kodu gönderir.
                    return res.status(205).json({msg:'Stad Adı Mevcut'})
                else{//son olarak gönderilen değerler doğru ise güncelleme yapar.
                    const post=await stadium.findByIdAndUpdate({_id:req.body._id},req.body,{new:true})
                    if(post) return res.status(201).json(post)
                }
                
            }
            else return res.status(400).json({msg:'Stad Bulunamadı!'})
    }
    catch(err){ return res.status(404).json({err}) }

}
//bu metod parametre olarak gönderilen id değerine sahip statda hiç kayıtlı maç yoksa siler.
const stadiumDelete=async(req,res)=>{
    try{
        var checkStad=await stadium.find({_id:req.params.id})
        if(checkStad.length>0)//stad kontrol ediliyor.
        {
            var checkMatch=await match.find({stadiumId:req.params.id})
            if(checkMatch.length>0){//stada kayıtlı maç varsa 205 durum kodu gönderir.
                 return res.status(205).json({msg:'Bu Stada Kayıtlı Maç Var, Silemezsin!'})
                }
            else {
                var post=await stadium.findByIdAndDelete({_id:req.params.id})
                if(post)
                    return res.status(200).json()
                else return res.status(400).json({msg:'Silme İşlemi Başarısız!'})
            }
        }
        else {
            return res.status(400).json({msg:'Silme İşlemi Başarısız!'})
        }
    }
catch(err){ return res.status(404).json({err}) }
}

module.exports={
    stadiumList,
    stadiumCreate,
    stadiumUpdate,
    stadiumDelete
}