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

    let prod = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate('category')
    .populate('subCat')
    .sort([['createdAt','desc']])
    .exec()

    res.json(prod)

};
exports.read = async (req,res) =>{
    let prod = await Product.findOne({slug:req.params.slug})
    .populate("category")
    .populate("subCat")
    .exec();

    res.json(prod);
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
    Product.findOneAndDelete({slug:req.params.slug}).then(result =>{
        console.log(result);
        res.json(result)
    }).catch(err =>{
        console.log(err)
        res.status(400).json({
            err,
            error:"Product deletion failed"
        })
    })
};