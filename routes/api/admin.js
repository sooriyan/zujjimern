const express = require('express');
const Admin = require('../../models/Admin');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const router = express.Router();
//@route    POST api/admin
//@desc     Register Admin
//@access   Public
router.post(
  '/',
  [
    check('name', 'Enter a valid Admin Name').not().isEmpty(),
    check('email', 'Enter a valid Email').isEmail(),
    check(
      'password',
      'Enter a password with minimum length of 6 or more'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Admin Already Exists' }] });
      }
      admin = new Admin({
        name,
        email,
        password,
      });
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
      await admin.save();
      // Return json webtoken
      res.send('Admin Registered');
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);
module.exports = router;
