const express = require('express'),
      router  = express.Router(),
      {create, read, update, remove, list} = require('../controllers/products'),
      {authCheck, adminCheck} = require('../middleWares/auth');


    router.post('/product',authCheck,adminCheck,create);
    router.get('/product/:slug',read);
    router.get('/products',list);
    router.put('/product/:slug',authCheck,adminCheck,update);
    router.delete('/product/:slug',authCheck,adminCheck,remove);

module.exports = router;