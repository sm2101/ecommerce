const Cat = require('../models/category'),
    Product = require('../models/product'),
SubCat = require('../models/subCat'),
slugify = require('slugify');

exports.create = async (req,res) =>{
    try{
        const {name} = req.body;
        const category = await new Cat({
            name,
            slug:slugify(name)
        }).save();
        res.json(category)
    } catch(err){
        console.log(err);
        res.status(400).json({
            error:"Category creation failed",
            err
        })
    }
};
exports.list = async (req,res) =>{
    const category = await Cat.find({}).sort({ createdAt: -1 }).exec()
    res.json(category);

};
exports.read = async(req,res) =>{
    const category = await Cat.findOne({slug:req.params.slug}).exec();
    const products = await Product.find({category})
    .populate('category')
    .populate('subCat')
    .exec()
    res.json({
        category,
        products
    });
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

exports.getSubs = (req,res) =>{
    console.log("endpoint reached")
    SubCat.find({parent:req.params.id}).then(subs =>{
        res.json(subs)
    }).catch(err =>{
        console.log(err);
    })
}