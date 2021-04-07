const Order = require("../models/order");

exports.getOrders = async (req, res) => {
  let orders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();
  res.json(orders);
};

exports.updateOrder = async (req, res) => {
  const { orderId, ordderStatus } = req.body;

  let updated = await Order.findByIdAndUpdate(
    orderId,
    { ordderStatus },
    { nre: true }
  ).exec();
  res.json(updated);
};
