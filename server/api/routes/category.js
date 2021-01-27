const express = require('express'),
      router  = express.Router(),
      {create, read, update, remove, list} = require('../controllers/cat'),
      {authCheck, adminCheck} = require('../middleWares/auth');


    router.post('/category',authCheck,adminCheck,create);
    router.get('/category/:slug',read);
    router.get('/categories',list);
    router.put('/category/:slug',authCheck,adminCheck,update);
    router.delete('/category/:slug',authCheck,adminCheck,remove);

module.exports = router;