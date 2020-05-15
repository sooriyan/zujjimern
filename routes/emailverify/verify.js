const express = require('express');
const User = require('../../models/User');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
//Email Verification
router.get('/:token', async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, config.get('jwtsecret'));
    const { id } = decoded.user;
    console.log(id);
    const status = { status: 1 };
    let doc = await User.findByIdAndUpdate(
      { _id: id },
      { status: 1 },
      (err, res) => {
        if (err) throw err;
      }
    );
    return res.redirect('/login');
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
});
//Forgot Password - User

//Forgot Password - Admin

module.exports = router;
