const express = require('express');
const router = express.Router();
//@route    GET api/admin
//@desc     test route
//@access   private
router.get('/', (req, res) => {
  res.send('Admin Route');
});
module.exports = router;
