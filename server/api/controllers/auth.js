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
    }).then((result)=>{
        if(result){
            res.status(200).json(result)
        } else {
            const newUsr = new User({
                email,
                name,
                picture
            }).save();
            res.status(200).json(newUsr);
        }  
    })
}