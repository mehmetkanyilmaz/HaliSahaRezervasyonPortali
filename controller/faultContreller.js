const fault=require('../models/faultModel');

const addFault=async(req,res)=>{
    try{
        const newFault=new fault(req.body);
        const post=await newFault.save();

        if(post)  res.status(200).json(post); 
        else res.status(400).json({msg:'Arıza Eklenemedi!'});
    }
    catch(err){res.status(404).json({msg:err});}
}

const listFault=async(req,res)=>{
    try{
        const post=await fault.find({});
        if(post){
            if(post.length>0){
                res.status(200).json(post);
            }
            else res.status(300).json({msg:'Listede Hiç Arıza Yoktur!'});
        }
        else res.status(400).json({msg:'Arızalar Listelenemedi!'});
    }
    catch(err){res.status(404).json({msg:err});}
}

module.exports={
    addFault,
    listFault
}