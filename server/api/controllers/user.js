const User = require('../models/user'),
      Product = require('../models/product')
      Cart = require('../models/cart');

exports.userCart = async (req, res) =>{
    const { cart } = req.body;
    console.log(cart)
    let products = []
    const user = await User.findOne({email:req.user.email}).exec()
    // check if cart already exist
    let cartExist = await Cart.findOne({orderedBy: user._id}).exec(); 
    if(cartExist){
        cartExist.remove()
    }
    for(let i = 0; i < cart.length; i++){
        let object = {}

        object.product = cart[i]._id
        object.count = cart[i].count
        let {price} = await Product.findById(cart[i]._id).select("price").exec()
        object.price = price;
        products.push(object);
    }
    console.log(products)
    let cartTotal = 0 
    for (let i = 0; i < products.length; i++) {
        cartTotal = cartTotal + products[i].price * products[i].count;
      }
    let newCart = await new Cart({
        products,
        cartTotal,
        orderedBy:user._id
    }).save()

    res.json({
        ok:true
    })
}
exports.getCart = async(req,res) =>{
    const user = await User.findOne({email:req.user.email}).exec();

    let cart = await Cart.findOne({orderedBy : user._id})
    .populate(
        'products.product',
        "_id title price totalAfterDiscount"
    ).exec()
    const {products, cartTotal, totalAfterDiscount} = cart;
    res.json({
        products,
        cartTotal,
        totalAfterDiscount
    })
}

exports.emptyCart = async(req,res) =>{
    const user = await User.findOne({email:req.user.email}).exec()

    const cart =  await Cart.findOneAndRemove({orderedBy:user._id}).exec()

    res.json(cart);
}

exports.saveAddress = async(req,res) =>{
    const addr = await User.findByIdAndUpdate({email:req.user.email},{address:req.body.address}).exec()
    res.json({
        ok:true
    })
}