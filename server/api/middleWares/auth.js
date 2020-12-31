const admin = require('../../firebase/index');

exports.authCheck = async (req,res,callBack)=>{
    console.log(req.headers);
    try{
        const usr = await admin.auth().verifyIdToken(req.headers.authtoken);
        req.user = usr;
        callBack();
    }catch(err){
        res.status(401).json({
            err:'Inavlid or Expired Token'
        })
    }
    callBack();
}