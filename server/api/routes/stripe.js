const express = require("express"),
  router = express.Router();

const { createPaymentIntent } = require("../controllers/stripe");
const { authCheck } = require("../middleWares/auth");

router.post("/create-payment-intent", authCheck, createPaymentIntent);

module.exports = router;
