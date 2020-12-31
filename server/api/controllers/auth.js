const User = require('../models/user');

exports.createUpdateUser = async (req,res) =>{
    const {name,picture,email} = req.user;
    await User.findOneAndUpdate({
        email
    },{
        name,
        picture
    },{
        new:true
    })
    .then((result)=>{
        if(result){
            res.json(result);
        } else {
            const newUsr = new User({
                email,
                name,
                picture
            }).save();
            res.json(newUsr);
        }  
    }).catch(err =>{
        console.log(err);
    })
}

exports.currentUser = async(req,res)=>{
    await User.findOne({email:req.user.email})
    .then((r) =>{
        res.json(r);
    }).catch(err =>{
        console.log(err);
    })
}