const requestType = require('../models/GeneralDefinitions/requestType')
const serviceStatus=require('../models/GeneralDefinitions/serviceStatus');
const serviceType=require('../models/GeneralDefinitions/serviceType');

const addRequestType  =async (req,res) => {
    const newRequestType = new requestType(req.body);
    try{
        const post=await newRequestType.save();
        if(!post) throw Error('İstek Türü Eklenemedi!');
        
        res.status(200).json(post);
    }
    catch(err){res.status(400).json({msg : err});}
}
const updateRequestType  =async (req, res) => {
    try{
        const post = await requestType.findByIdAndUpdate({_id:req.params.id},req.body,{new:true});
        if(post==null || post==false){return res.status(400).json({"message":"İstek Türü Güncellenemedi!"});}
        return res.status(200).json(post);
    }
        catch(err){res.status(404).json({"message":err});}
}
const listRequestType=async(req,res) => {
    try{
        const allRequireTypes=await requestType.find({});
        return res.status(200).json(allRequireTypes);
    }
    catch(err) {res.status(404).json({"message":err});}
}
const addServiceStatus=async (req,res) => {
    const newServiceStatus=new serviceStatus(req.body);
    try{
        const post=await newServiceStatus.save();
        if(!post) throw Error('Servis Durumu Eklenemedi!');
        
        res.status(200).json(post);
    }
    catch(err){res.status(400).json({msg : err});}
}
const updateServiceStatus=async (req,res) => {
    try{
        const post = await serviceStatus.findByIdAndUpdate({_id:req.params.id},req.body,{new:true});
        if(post==null || post==false){return res.status(400).json({"message":"Servis Durumu Güncellenemedi!"});}
        return res.status(200).json(post);
    }
        catch(err){res.status(404).json({"message":err});}
}
const listServiceStatus=async(req,res) => {
    try{
        const allServiceStatus=await serviceStatus.find({});
        return res.status(200).json(allServiceStatus);
    }
    catch(err) {res.status(404).json({"message":err});}
}
const addServiceType=async (req,res)=>{
    const newServiceType=new serviceType(req.body);
    try{
        const post=await newServiceType.save();
        if(!post) throw Error('Servis Türü Eklenemedi!');
        
        res.status(200).json(post);
    }
    catch(err){res.status(400).json({msg : err});}
}
const updateServiceType=async(req,res)=> {
    try{
        const post = await serviceType.findByIdAndUpdate({_id:req.params.id},req.body,{new:true});
        if(post==null || post==false){return res.status(400).json({"message":"Servis Türü Güncellenemedi!"});}
        return res.status(200).json(post);
    }
        catch(err){res.status(404).json({"message":err});}
}
const listServiceType=async(req,res) => {
    try{
        const allServiceType=await serviceType.find({});
        return res.status(200).json(allServiceType);
    }
    catch(err) {res.status(404).json({"message":err});}
}

module.exports={
    addRequestType,
    updateRequestType,
    addServiceStatus,
    updateServiceStatus,
    addServiceType,
    updateServiceType,
    listServiceType,
    listServiceStatus,
    listRequestType
}