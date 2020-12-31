const mongoose = require('mongoose'),
Schema = mongoose.Schema,
{ObjectId} = Schema;

const usrSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        index:true,
    },
    role:{
        type:String,
        default:"Customer"
    },
    cart:{
        type:Array,
        default:[]
    },
    address:{
        type:String
    },
    picture:{
        type:String
    }
    // wishlist: [{type:ObjectId,ref:"Product"}]
},
{timestamps:true}
);

module.exports = mongoose.model('User',usrSchema);