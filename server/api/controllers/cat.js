const Cat = require('../models/category'),
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
exports.list = (req,res) =>{

    Cat.find({}.sort({createdAt:-1})).then(result =>{
        res.json(result);
    }).catch(err =>{
        res.status(400).json({
            error:"Fetching categories failed",
            err
        })
    })
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
        res.json({
            msg:`Category "${result.Name}" has been deleted`
        })
    }).catch(err =>{
        res.status(400).json({
            err,
            error:"Category deletion failed"
        })
    })
};