const customer=require('../models/customerModel');
const customerLocation=require('../models/customerLocationModel');
const customerProduct=require('../models/customerProductModel');

const addCustomer=async (req,res) => {
    const newCustomer= new customer(req.body);
    try{
        const post=await newCustomer.save();
        if(!post) throw Error('Müşteri Eklenemedi!');
        res.status(200).json(post);
    }
    catch(err){res.status(400).json({msg : "kjdvnkdnfdfs"});}
}
const listCustomer=async(req,res) =>{
    try{
    const post=await customer.find({});
    if(post) res.status(200).json(post);
    else res.status(400).json({msg:'Müşteriler Listelenemedi'});
    }
    catch(err){ res.status(404).json({msg:err});}
}
const addCustomerLocation=async(req,res) =>{
    try{
        const newCustomeLocation= new customerLocation(req.body);
        const post=await customer.findOneAndUpdate(
            {_id:req.params.id},
            {
                $push:{
                    customerLocations:newCustomeLocation
                }
            },
            {new:true}
        );
        if(post) res.status(200).json(post);
        else res.status(400).json({msg:"Kayıt Eklenemedi"});
    }
    catch(err){res.status(404).json({msg : err});}
}
const listCustomerLocation=async(req,res)=>{
    try{
        var post=await customer.findById({_id:req.params.id});
        var newPost=post.customerLocations;
        if(post) res.status(200).json(newPost);
        else res.status(400).json({msg:'Müşteri Konumu Listelenemedi!'});
    }
    catch(err) {res.status(404).json({msg:err})}
}
const addCustomerProduct=async(req,res)=>{
    try{
        const newCustomerProduct=new customerProduct(req.body);
        const post=await customer.findOneAndUpdate(
            {_id:req.params.id},
            {
                $push:{
                    customerProducts:newCustomerProduct
                }
            },
            {new:true}
        );
        if(post) res.status(200).json(post);
        else res.status(400).json({msg:"Kayıt Eklenemedi"});
    }
    catch(err){res.status(404).json({msg : err});}
}
const listCustomerProduct=async(req,res)=>{
    try{
        var post=await customer.findById({_id:req.params.id});
        var newPost=post.customerProducts;
        if(post && newPost) res.status(200).json(newPost);
        else res.status(400).json({msg:'Müşterinin Ürünleri Listelenemedi!'})
    }
    catch(err){res.status(404).json({msg:err});}
}

module.exports={
    addCustomer,
    listCustomer,
    addCustomerLocation,
    listCustomerLocation,
    addCustomerProduct,
    listCustomerProduct
}