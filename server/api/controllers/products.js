const Product = require('../models/product'),
      slugify = require('slugify'),
      User = require('../models/user');

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

exports.rating = async(req,res) =>{
    let prod = await Product.findById(req.params.productId).exec();
    let user = await User.findOne({email: req.user.email}).exec();
    const {star} = req.body;

    let exist = prod.rating.find((ele) => (
        ele.postedBy.toString() === user._id.toString()
    ))
    if(exist === undefined){
        let newRating = await Product.findByIdAndUpdate(prod._id,{
            $push :{ rating:{
                star,
                postedBy: user._id
            } }
        },{
            new : true
        }
        ).exec();
        res.json(newRating);
    } else {
        const updateRating = await Product.updateOne(
            {
                rating : { $elemMatch : exist },
            },
            {
                $set : { "rating.$.star": star }
            },
            {
                new : true
            }
        ).exec()
        res.json(updateRating);
    }
}

exports.listRelated = async(req,res) =>{
    const prod = await Product.findById(req.params.productId).exec();
    const related = await Product.find({
        _id:{$ne : prod._id},
        category:prod.category,
    }).limit(4)
    .populate('category')
    .populate('subCat')
    .exec()

    res.json(related);
}