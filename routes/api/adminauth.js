const express = require('express');
const router = express.Router();
//@route    GET api/adminauth
//@desc     test route
//@access   public
router.get('/', (req, res) => {
  res.send('Admin Auth Route');
});
module.exports = router;
