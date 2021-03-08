const express = require('express'),
      router  = express.Router(),
      {userCart, getCart, emptyCart, saveAddress} = require('../controllers/user');
const {authCheck} = require('../middleWares/auth');

router.post('/user/cart', authCheck, userCart)
router.get('/user/cart',authCheck,getCart);
router.delete('/user/cart',authCheck,emptyCart);
router.post('user/address',authCheck,saveAddress);
module.exports = router;