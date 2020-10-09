const workmanship=require('../models/workmanshipModel');

const addWorkmanship=async(req,res)=>{
    try{
        const newWorkmanship=new workmanship(req.body);
        const post=await newWorkmanship.save();
        if(post) res.status(200).json(post);
        else res.status(400).json({msg:"İşçilik Eklenemedi!"});
    }
    catch(err) {res.status(404).json({msg:err}); }
}

const listWorkmanShip=async(req,res)=>{
    try{
        const post=await workmanship.find({});
        if(post){
            if(post.length>0){
                res.status(200).json(post);
            }
            else res.status(300).json({msg:"Listede Hiç İşçilik Yok!"});
        }
        else res.status(400).json({msg:"İşçilikler Listelenemedi!"});
    }
    catch(err) {res.status(404).json({msg:err}); }
}

module.exports={
    addWorkmanship,
    listWorkmanShip
}