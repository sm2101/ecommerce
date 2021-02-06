const SubCat = require('../models/subCat'),
slugify = require('slugify');

exports.create = async (req,res) =>{
    try{
        const {name} = req.body;
        const subCat = await new SubCat({
            name,
            slug:slugify(name)
        }).save();
        res.json(subCat)
    } catch(err){
        console.log(err);
        res.status(400).json({
            error:"Sub Category creation failed",
            err
        })
    }
};
exports.list = async (req,res) =>{

    res.json(await SubCat.find({}).sort({ createdAt: -1 }).exec());
};
exports.read = (req,res) =>{
    SubCat.findOne({slug:req.params.slug}).then(result =>{
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
    SubCat.findOneAndUpdate(
        {slug:req.params.slug},
        {name,slug:slugify(name)},
        {new:true}
        ).then(result =>{
            res.json({
                result,
                msg:"Sub Category updated"
            })
        }).catch(err =>{
            res.status(400).json({
                err,
                error:"Sub Category update failed"
            })
        })
};
exports.remove = (req,res) =>{
    SubCat.findOneAndDelete({slug:req.params.slug}).then(result =>{
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