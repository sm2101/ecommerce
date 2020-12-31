const express = require('express'),
      router  = express.Router(),
      {createUpdateUser} = require('../controllers/auth'),
      {authCheck} = require('../middleWares/auth');
router.post('/createUser',authCheck,createUpdateUser);

module.exports = router;