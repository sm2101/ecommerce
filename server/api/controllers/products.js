const Product = require('../models/product'),
      slugify = require('slugify');

exports.create = async (req,res) =>{
    try{
        req.body.slug = slugify(req.body.title);
        const product = await new Product(req.body).save();
        res.json(product)
    } catch(err){
        console.log(err);
        res.status(400).json({
            error:"Product creation failed",
            err
        })
    }
};
exports.list = async (req,res) =>{

    res.json(await Cat.find({}).sort({ createdAt: -1 }).exec());

};
exports.read = (req,res) =>{
    Cat.findOne({slug:req.params.slug}).then(result =>{
        res.json(result);
    }).catch(err =>{
        res.status(400).json({
            err,
            error:"Something wrong occured"
        })
    })
};
exports.update = (req,res) =>{
    const {name} = req.body
    Cat.findOneAndUpdate(
        {slug:req.params.slug},
        {name,slug:slugify(name)},
        {new:true}
        ).then(result =>{
            res.json({
                result,
                msg:"Category updated"
            })
        }).catch(err =>{
            res.status(400).json({
                err,
                error:"Category update failed"
            })
        })
};
exports.remove = (req,res) =>{
    Cat.findOneAndDelete({slug:req.params.slug}).then(result =>{
        console.log(result);
        res.json(result)
    }).catch(err =>{
        console.log(err)
        res.status(400).json({
            err,
            error:"Category deletion failed"
        })
    })
};