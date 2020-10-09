const expense=require('../models/otherExpenseModel');

const addOtherExpense=async(req,res)=>{
    try{
        const newExpense=new expense(req.body);
        const post=await newExpense.save();

        if(post)  res.status(200).json(post); 
        else res.status(400).json({msg:'Diğer Masraf Eklenemedi!'});
    }
    catch(err){res.status(404).json({msg:err});}
}

const listOtherExpense=async(req,res)=>{
    try{
        const post=await expense.find({workOrderId:req.params.id});
        if(post){
            if(post.length>0){
                res.status(200).json(post);
            }
            else res.status(300).json({msg:'Listede Hiç Diğer Masraf Yoktur!'});
        }
        else res.status(400).json({msg:'Diğer Masraflar Listelenemedi!'});
    }
    catch(err){res.status(404).json({msg:err});}
}

module.exports={
    addOtherExpense,
    listOtherExpense
}