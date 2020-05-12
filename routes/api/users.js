const express = require('express');
const router = express.Router();
//@route    GET api/user
//@desc     test route
//@access   private
router.get('/', (req, res) => {
  res.send('User Route');
});
module.exports = router;
