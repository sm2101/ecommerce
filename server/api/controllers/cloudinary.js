const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

exports.upload = async (req,res) =>{
    console.log("upload route hit");
    let result = await cloudinary.uploader.upload(req.body.img,{
        public_id:`${Date.now()}`,
        resource_type:'auto'
    });
    res.json({
        public_id:result.public_id,
        url:result.secure_url
    })
}

exports.remove = (req,res) =>{
    let img_id = req.body.public_id;
    console.log(img_id)
    cloudinary.uploader.destroy(img_id,(result,err) =>{
        console.log(err);
        if(err) return res.status(400).json(err);
        res.status(200).json({
            msg:"File deleted"
        })
    })
}