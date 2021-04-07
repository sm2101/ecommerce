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
    addToWishlist,
    getWishlist,
    updateWishlist,
    createCashOrder,
  } = require("../controllers/user");
const { authCheck } = require("../middleWares/auth");

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getCart);
router.delete("/user/cart", authCheck, emptyCart);

router.post("/user/address", authCheck, saveAddress);
router.post("/user/cart/coupon", authCheck, applyCoupon);

router.post("/user/order", authCheck, createOrder);
router.post("/user/order-cod", authCheck, createCashOrder);
router.get("/user/orders", authCheck, getOrders);

router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, getWishlist);
router.put("/user/wishlist", authCheck, updateWishlist);
module.exports = router;
