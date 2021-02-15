const express = require('express'),
      router  = express.Router(),
      {upload,remove} = require('../controllers/cloudinary'),
      {authCheck, adminCheck} = require('../middleWares/auth');

router.post("/upload-images",authCheck,adminCheck,upload)
router.post("/remove-image",authCheck,adminCheck,remove)

module.exports = router;