const mongoose = require('mongoose')
const {Schema} = mongoose
const {ObjectId} = Schema

const cartSchema = new Schema({
    products :[
        {
            product:{
                type:ObjectId,
                ref:'Product'
            },
            count:{
                type:Number
            },
            price:{
                type:Number
            }
        }
    ],
    cartTotal: Number,
    totalAfterDiscount:Number,
    orderedBy :{
        type : ObjectId,
        ref : "User"
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("Cart", cartSchema);