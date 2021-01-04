const admin = require('../../firebase/index'),
User = require('../models/user');

exports.authCheck = async (req,res,callBack)=>{
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
    const {email} = req.user;
    await User.findOne({email}).then(res=>{
        if(res.role !== 'admin'){
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