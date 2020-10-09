const device=require('../models/Device/deviceModel');
const deviceBrand=require('../models/Device/deviceBrandModel');
const productBrand=require('../models/Device/productBrandModel');


const addDevice=async(req,res)=>{
    const newDevice=new device(req.body);
    try{
        const post=await newDevice.save();
        if(post) res.status(200).json(post);
        else res.status(400).json({msg:"Cihaz Eklenemedi!"});
    }
    catch(err){res.status(404).json({msg : err});}
}
const listDevice=async(req,res)=>{
   try{
        const post=await device.find({});
        if(post) res.status(200).json(post);
        else res.status(400).json({msg:"Listeleme Başarısız!"});
   }
   catch(err){res.status(404).json({msg : err});}
}
const addBrand=async(req,res)=>{
    try{
        const newDeviceBrand=new deviceBrand(req.body);
        const post=await newDeviceBrand.save();
        if(post) res.status(200).json(post);
        else res.status(400).json({msg:"Kayıt Eklenemedi"});
    }
    catch(err){res.status(404).json({msg : err});}
}
const listBrand=async (req,res)=>{
    try{
    const post=await deviceBrand.find({deviceId:req.params.id});
    if(post) res.status(200).json(post);
    else res.status(400).json({msg:"Markalar Listelenemedi!"})
}
catch(err){res.status(404).json({msg : err});}
}
const addProduct=async(req,res)=>{
    try{
        const newProductBrand=new productBrand(req.body);
        
        const post=await deviceBrand.findOneAndUpdate(
            {_id:req.params.id},
            {
               $push:{
                    brandProduct:newProductBrand
                }
            },
            {new:true}
        );
        if(post) res.status(200).json(post);
        else res.status(400).json({msg:"Kayıt Eklenemedi"});
    }
    catch(err){res.status(404).json({msg : err});}
}
const listProduct=async(req,res)=>
{
    try{
        const post=await deviceBrand.find({_id:req.params.id});
        if(post){
            var newPost;
            post.forEach(element => {
                newPost=element.brandProduct;
            });
            if(post) res.status(200).json(newPost);
            else res.status(400).json({msg:"Kayıtlar Listelenemedi!"});
        }
    }
    catch(err){res.status(404).json({msg : err});}
}
const listBrandProduct=async(req,res)=>{//model id si verilen cihazın marka adı ve model adını geri döndürür
    var marka;
    var model;
    var flag=new Boolean(false);
    const allBrands=await deviceBrand.find({});
    allBrands.forEach(element => {
        if(flag==false){
        element.brandProduct.forEach(element2 => {
            if(element2._id==String(req.params.id))
               {
                model=element2.productName;
                marka=element.brandName;
               flag=true;
            }
       
        });
    }
    });
   
    res.status(200).json({brand:marka,product:model,productId:req.params.id});
   

}

module.exports={
    addDevice,
    listDevice,
    addBrand,
    listBrand,
    addProduct,
    listProduct,
    listBrandProduct
}