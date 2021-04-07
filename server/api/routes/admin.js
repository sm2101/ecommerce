const express = require("express"),
  router = express.Router(),
  { getOrders, updateOrder } = require("../controllers/admin");
const { authCheck, adminCheck } = require("../middleWares/auth");

router.get("/admin/orders", authCheck, adminCheck, getOrders);
router.put("/admin/order-status", authCheck, adminCheck, updateOrder);

module.exports = router;
