const express = require('express'),
      router  = express.Router(),
      {create, 
        read, 
        update, 
        remove, 
        list, 
        listLanding, 
        productCount, 
        rating,
        listRelated
    } = require('../controllers/products'),
      {authCheck, adminCheck} = require('../middleWares/auth');


    router.post('/product',authCheck,adminCheck,create);
    router.get('/products/total',productCount)
    router.get('/product/:slug',read);
    router.get('/products/:count',list);
    router.put('/product/:slug',authCheck,adminCheck,update);
    router.delete('/product/:slug',authCheck,adminCheck,remove);

    router.post('/products',listLanding);
    router.put("/product/rating/:productId",authCheck, rating)
    router.get('/product/related/:productId',listRelated);
module.exports = router;