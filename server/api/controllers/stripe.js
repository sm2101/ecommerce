const User = require("../models/user"),
  Cart = require("../models/cart"),
  Product = require("../models/product"),
  Coupon = require("../models/coupon"),
  stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  const { couponApplied } = req.body;
  const user = await User.findOne({ email: req.user.email }).exec();
  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderedBy: user._id,
  }).exec();

  let finalAmount = 0;
  if (couponApplied && totalAfterDiscount) {
    finalAmount = Math.round(totalAfterDiscount);
  } else {
    finalAmount = cartTotal;
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount * 100,
    currency: "inr",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    finalAmount,
  });
};
