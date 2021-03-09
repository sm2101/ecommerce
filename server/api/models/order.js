const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  { ObjectId } = Schema;

const orderSchema = new Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: {
          type: Number,
        },
      },
    ],
    paymentIntent: {},
    ordderStatus: {
      type: String,
      default: "Not Proccessed",
      enum: [
        "Not Proccessed",
        "Proccessing",
        "Dispatched",
        "Cancelled",
        "Delivered",
      ],
    },
    orderedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
