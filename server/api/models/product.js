const mongoose = require("mongoose"),
      {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
        text:true
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        index:true
    },
    description:{
        type:String,
        required:true,
        maxlength:2000,
        text:true
    },
    price:{
        type:Number,
        required:true,
        maxlength:32,
        trim:true
    },
    category:{
        type:ObjectId,
        ref:"Cat"
    },
    subCat:[{
        type:ObjectId,
        ref:"SubCat"
    }],
    quantity:{
        type:Number,
        required:true
    },
    sold:{
        type:Number,
        default:0
    },
    images:{
        type:Array
    },
    shipping:{
        type:String,
        enum:["Yes","No"]
    },
    color:{
        type:String
    },
    // rating:[{
    //     star:{
    //         type:Number,
    //     },
    //     postedBy :{
    //         type:ObjectId,
    //         ref:"User"
    //     }
    // }]
},{
    timestamps:true
})

module.exports = mongoose.model('Product',productSchema);