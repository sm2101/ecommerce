const express = require('express'),
      router  = express.Router(),
      {create, read, update, remove, list} = require('../controllers/subCat'),
      {authCheck, adminCheck} = require('../middleWares/auth');


    router.post('/sub-category',authCheck,adminCheck,create);
    router.get('/sub-category/:slug',read);
    router.get('/sub-categories',list);
    router.put('/sub-category/:slug',authCheck,adminCheck,update);
    router.delete('/sub-category/:slug',authCheck,adminCheck,remove);

module.exports = router;