const express = require('express'),
      router  = express.Router(),
      {createUpdateUser,currentUser} = require('../controllers/auth'),
      {authCheck} = require('../middleWares/auth');


router.post('/createUser',authCheck,createUpdateUser);
router.post('/currentUser',authCheck,currentUser);

module.exports = router;