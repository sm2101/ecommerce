const express = require("express"),
  router = express.Router(),
  { create, remove, list } = require("../controllers/coupon"),
  { authCheck, adminCheck } = require("../middleWares/auth");

router.post("/coupon", authCheck, adminCheck, create);
router.get("/coupons", list);
router.delete("/coupon/:couponId", authCheck, adminCheck, remove);

module.exports = router;
