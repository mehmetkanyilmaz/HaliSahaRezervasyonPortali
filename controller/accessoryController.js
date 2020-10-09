const accessory=require('../models/accessoryModel');

const addAccessory=async(req,res)=>{
    try{
        const newAccessory=new accessory(req.body);
        const post=await newAccessory.save();

        if(post)  res.status(200).json(post); 
        else res.status(400).json({msg:'Aksesuar Eklenemedi!'});
    }
    catch(err){res.status(404).json({msg:err});}
}

const listAccessory=async(req,res)=>{
    try{
        const post=await accessory.find({});
        if(post){
            if(post.length>0){
                res.status(200).json(post);
            }
            else res.status(300).json({msg:'Listede Hiç Aksesuar Yoktur!'});
        }
        else res.status(400).json({msg:'Aksesuarlar Listelenemedi!'});
    }
    catch(err){res.status(404).json({msg:err});}
}

module.exports={
    addAccessory,
    listAccessory
}