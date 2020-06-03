const express = require('express');
const User = require('../../models/User');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
//Email Verification
router.put('/', async (req, res) => {
  try {
    const token = req.body.token;
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
    return res.json({ success: 'success' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
