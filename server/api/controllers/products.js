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

    console.log("ALL PRODUCTS")
    console.log(prod)
    res.json(prod)

};
exports.read = async (req,res) =>{
    let prod = await Product.findOne({slug:req.params.slug})
    .populate("category")
    .populate("subCat")
    .exec();

    res.json(prod);
};
exports.update = async (req,res) =>{
    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const updated = await Product.findOneAndUpdate({slug : req.params.slug},req.body, {new:true})
        res.json(updated)
    } catch (err){
        res.status(400).json(err);
    }
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

exports.listLanding = async(req,res) =>{
    try{
        const {sort, order, page} = req.body;
        const prods = await Product.find({})
            .skip((page -1)*4)
            .populate("category")
            .populate("subCat")
            .sort([[sort,order]])
            .limit(4)
            .exec();
        console.log(prods)
        res.json(prods)
    }catch(err){
        console.log(err)
        res.status(400).json({
            err,
            Error:"Product fetching failed"
        })
    }
}
exports.productCount = async (req,res) =>{
    let total = await Product.find({}).estimatedDocumentCount().exec();
    res.json(total)
}