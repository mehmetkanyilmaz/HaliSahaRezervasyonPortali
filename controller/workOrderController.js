const workOrder=require('../models/workOrderModel');
const workOrderAccessory=require('../models/workOrderAccessoryModel');
const workOrderWorkmanship=require('../models/workOrderWorkmanshipModel');
const workOrderWorkmanshipProcess=require('../models/workOrderWorkmanshipProcess');

const addWorkOrder=async(req,res)=>{
    try{
        const newWorkOrder=new workOrder(req.body);
        const post=await newWorkOrder.save();
        if(post) res.status(200).json(post);
        else res.status(400).json({msg:'İş Emri Oluşturulamadı'});
    }
    catch(err){ res.status(404).json({err}); }
}
const listWorkOrder=async(req,res)=>{
    try{
        const post=await workOrder.find({});
        if(post)
        {
            if(post.length>0) res.status(200).json(post);
            else res.status(300).json({msg:'Listede Kayıtlı Hiç İş Emri Yoktur!'})
        }
        else res.status(400).json({msg:'İş Emirleri Listelenemedi!'});}
    catch(err){ res.status(404).json({err}); }    
}
const listOneWorkOrder=async(req,res)=>{
    try{
        const post=await workOrder.findById({_id:req.params.id});
        if(post) res.status(200).json(post);
        else res.status(400).json({msg:'İlgili İş Emri Bulunamadı!'});
    }
    catch(err) { res.status(404).json({msg:err}); }
}
const addAccessory=async(req,res)=>{
    try{
        const newWorkOrderAccessory=new workOrderAccessory(req.body);
        const post=await workOrder.findOneAndUpdate(
            {_id:req.params.id},
            {
                $push:{
                    workOrderAccessory:newWorkOrderAccessory
                }
            },
            {new:true}
        );
        if(post) res.status(200).json(post);
        else res.status(400).json({msg:"Aksesuar Eklenemedi"});
    }
    catch(err){ res.status(404).json({msg:err}); }
}
const addWorkmanship=async(req,res)=>{
    try{
        const newWorkOrderWorkmanship=new workOrderWorkmanship(req.body);
        const post=await workOrder.findOneAndUpdate(
            {_id:req.params.id},
            {
                $push:{
                    workmanship:newWorkOrderWorkmanship
                }
            },
            {new:true}
        );
        if(post) res.status(200).json(post);
        else res.status(400).json({msg:"İşçilik Eklenemedi"});
    }
    catch(err){ res.status(404).json({msg:err}); }
}
const addWorkmanshipProcess=async(req,res)=>{
    try{
        const newWorkOrderWorkmanshipProcess=new workOrderWorkmanshipProcess(req.body);
        const post=await workOrder.findOneAndUpdate(
            {_id:req.params.id},
            {
                $push:{
                    workmanshipProcess:newWorkOrderWorkmanshipProcess
                }
            },
            {new:true}
        );
        if(post) res.status(200).json(post);
        else res.status(400).json({msg:"İşlem Eklenemedi"});
    }
    catch(err){ res.status(404).json({msg:err}); }
}

module.exports={
    addWorkOrder,
    listWorkOrder,
    listOneWorkOrder,
    addAccessory,
    addWorkmanship,
    addWorkmanshipProcess
}