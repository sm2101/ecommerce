const express = require("express"),
  router = express.Router(),
  {
    userCart,
    getCart,
    emptyCart,
    saveAddress,
    applyCoupon,
    createOrder,
    getOrders,
  } = require("../controllers/user");
const { authCheck } = require("../middleWares/auth");

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getCart);
router.delete("/user/cart", authCheck, emptyCart);

router.post("/user/address", authCheck, saveAddress);
router.post("/user/cart/coupon", authCheck, applyCoupon);

router.post("/user/order", authCheck, createOrder);
router.get("/user/orders", authCheck, getOrders);
module.exports = router;
