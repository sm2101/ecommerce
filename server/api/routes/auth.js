const express = require('express'),
      router  = express.Router(),
      {createUpdateUser,currentUser} = require('../controllers/auth'),
      {authCheck, adminCheck} = require('../middleWares/auth');


router.post('/createUser',authCheck,createUpdateUser);
router.post('/currentUser',authCheck,currentUser);
router.post('/admin',authCheck,adminCheck,currentUser);

module.exports = router;