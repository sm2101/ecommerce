const express = require('express'),
      router  = express.Router(),
      {createUpdateUser} = require('../controllers/auth');
router.get('/createUser',createUpdateUser)

module.exports = router;