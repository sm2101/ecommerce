const User = require("../models/user"),
  Product = require("../models/product"),
  Cart = require("../models/cart"),
  Coupon = require("../models/coupon"),
  Order = require("../models/order");

exports.userCart = async (req, res) => {
  const { cart } = req.body;
  console.log(cart);
  let products = [];
  const user = await User.findOne({ email: req.user.email }).exec();
  // check if cart already exist
  let cartExist = await Cart.findOne({ orderedBy: user._id }).exec();
  if (cartExist) {
    cartExist.remove();
  }
  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    let { price } = await Product.findById(cart[i]._id).select("price").exec();
    object.price = price;
    products.push(object);
  }
  console.log(products);
  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }
  let newCart = await new Cart({
    products,
    cartTotal,
    orderedBy: user._id,
  }).save();

  res.json({
    ok: true,
  });
};
exports.getCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();
  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({
    products,
    cartTotal,
    totalAfterDiscount,
  });
};

exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();

  res.json(cart);
};

exports.saveAddress = async (req, res) => {
  const addr = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();
  res.json({
    ok: true,
  });
};

exports.applyCoupon = async (req, res) => {
  const { coupon } = req.body;
  const valid = await Coupon.findOne({ name: coupon }).exec();

  if (valid === null) {
    res.status(400).json({
      err: "Inavlid Coupon",
    });
  } else {
    const user = await User.findOne({ email: req.user.email }).exec();
    let { products, cartTotal } = await Cart.findOne({ orderedBy: user._id })
      .populate("products.product", "_id title price")
      .exec();

    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * valid.discount) / 100
    ).toFixed(2);

    await Cart.findOneAndUpdate(
      { orderedBy: user._id },
      { totalAfterDiscount },
      { new: true }
    ).exec();

    res.json({
      totalAfterDiscount,
    });
  }
};

exports.createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse;
  const user = await User.findOne({ email: req.user.email }).exec();

  const { products } = await Cart.findOne({ orderedBy: user._id }).exec();
  let order = await new Order({
    products,
    paymentIntent,
    orderedBy: user._id,
  }).save();
  // decrement quantity incriment sold
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: {
          _id: item.product._id,
        },
        update: {
          $inc: { quantity: -item.count, sold: +item.count },
        },
      },
    };
  });
  let updated = await Product.bulkWrite(bulkOption, {});
  res.json({
    ok: true,
  });
};
exports.getOrders = async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).exec();
  let useOrders = await Order.find({ orderedBy: user._id })
    .populate("products.product")
    .exec();
  res.json(useOrders);
};