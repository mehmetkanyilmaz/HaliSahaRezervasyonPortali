const user=require('../models/userModel')

//bu metod yeni bir kullanıcı oluşturur.
const userCreate=async(req,res)=>{
    try{
        var checkUser=await user.findOne({mailAdress:req.body.mailAdress}).count()//girilen mail adresi daha önce kullanılıp kullanılmadığını tespit etmek için.
        if(checkUser>0){
            return res.status(205).json({msg:"Bu Mail Adresi Kullanılıyor!"})
        }
        else{//girilen değerler uygun ise kullanıcıyı kayıt eder.
            delete req.body._id
            const newUser=new user(req.body)
            const post=await newUser.save()
            if(post) return res.status(200).json(post)
            else return res.status(400).json({msg:"Kayıt Oluşturulamadı!"})
        }
    }
    catch(err){ return res.status(404).json({err}) }
}

//bu metod var olan kullanıcıyı günceller.
const userUpdate=async(req,res)=>{
    try{
        const oneUser = await user.findById({_id:req.body._id})//gönderilen kullanıcıyı id adresine göre listeledik.
        if(oneUser)
        {//eğer kayıtlı kullanıcı varsa güncelleme işlemi yapacağız.
            const checkMail=await user.find({mailAdress:req.body.mailAdress})
            const checkMailUser=await user.find({_id:req.body._id,mailAdress:req.body.mailAdress})
            if(checkMail.length==0){
                const newUser = await user.findByIdAndUpdate({_id:req.body._id},req.body,{new:true})
                return res.status(200).json(newUser)
            }
            else if(checkMailUser.length==1) {
                const newUser = await user.findByIdAndUpdate({_id:req.body._id},req.body,{new:true})
                return res.status(200).json(newUser)
                }
                else return res.status(205).json({msg:"Mail Adresi Mevcut"})
        }
        else
        return res.status(400).json({"msg":"Kullanıcı Bulunamadı!"})
    }
    catch(err){return res.status(404).json({"msg":err})}
}

//bu metod id değeri parametre olarak gönderilen kullanıcının bilgilerini geri gönderir.
const userListOne=async(req,res)=>{
    try{
        const oneUser = await user.findById({_id:req.params.id})//ilgili kullanıcının bütün bilgileri listelendi.
        if(oneUser)
            return res.status(200).json(oneUser)
        else
        return res.status(400).json({"msg":"Kullanıcı Bulunamadı!"})
    }
    catch(err){return res.status(404).json({"msg":err})}
}

//bu metod kullanıcının oturum açması için kullanılır.
const userLogin=async(req,res)=>{
    try{
        const post=await user.find({mailAdress:req.body.mailAdress,password:req.body.password})
        if(post.length>0)
        return res.status(200).json(post);
        else
        return res.status(400).json({msg:false});
    }
    catch(err){return res.status(404).json({"msg":err})}
}

module.exports={
    userCreate,
    userUpdate,
    userListOne,
    userLogin
}