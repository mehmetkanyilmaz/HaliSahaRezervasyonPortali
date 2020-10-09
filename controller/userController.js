const User=require('../models/userModel');

const addUser = async (req, res) => {
    const newUser=new User(req.body);

    try{
        const post=await newUser.save();
        if(!post) throw Error('Kayıt Eklenemedi!');

        res.status(200).json(post);
    }
    catch(err){ res.status(400).json({msg : err});}
}
const updateUser=async (req,res) =>{
    try{
        const oneUser = await User.findById({_id:req.params.id});
        if(oneUser)
        {
            const newUser = await User.findByIdAndUpdate({_id:req.params.id},req.body,{new:true});
            return res.status(200).json(newUser);
        }
        else    res.status(400).json({"message":"Kullanıcı Bulunamadı!"});
    }
    catch(err){res.status(404).json({"message":err});}
}
const listAllUsers=async(req,res)=>{
    try{
        const allUsers= await User.find({});
        return res.status(200).json(allUsers);
    }
    catch(err){  res.status(404).json({"message":err});}
}
const listOneUser=async(res,req)=>{
    try{
        const oneUser= await User.findById({_id:req.params.id});
        return res.status(200).json(oneUser);
    }
    catch(err){ res.status(404).json({"message":err});}
}
module.exports={
    addUser,
    updateUser,
    listAllUsers,
    listOneUser
}