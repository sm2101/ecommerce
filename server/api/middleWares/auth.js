const admin = require('../../firebase/index'),
User = require('../models/user');

exports.authCheck = async (req,res,callBack)=>{
    console.log('authh check hit');
    try{
        const usr = await admin
        .auth()
        .verifyIdToken(req.headers.authtoken);
        req.user = usr;
    }catch(err){
        res.status(401).json({
            err:'Inavlid or Expired Token'
        })
    }
    callBack();
}

exports.adminCheck = async (req,res,callBack) =>{
    console.log('admin check hit')
    console.log(req.user);
    const {email} = req.user;
    await User.findOne({email}).then(result=>{
        if(result.role !== "admin"){
            console.log(".")
            res.status(403).json({
                err:'Admin access denied'
            })
        } else {
            callBack();
        }
    }).catch(err =>{
        console.log(err);
    })
}