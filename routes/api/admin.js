const express = require('express');
const Admin = require('../../models/Admin');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const sendMail = require('../../config/mail');
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
//@route    POST api/admin/fwpwd
//@desc     Forgot password Admin
//@access   Private
router.post(
  '/fwpwd',
  [check('email', 'Please enter a valid Email').not().isEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email } = req.body;
      let admin = await Admin.findOne({ email });
      if (admin) {
        const payload = {
          admin: {
            id: admin.id,
          },
        };
        jwt.sign(
          payload,
          config.get('jwtsecret'),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            sendMail(
              email,
              'Resetting your password',
              `<p>Please click on this <a href='http://localhost:3000/adminfpwd/${token}'>link</a> to reset your password</p>`
            );
            res.json({
              msg:
                'A mail with a link has been sent to your email. Please click it to reset your password',
            });
          }
        );
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    POST api/admin/fwpwd
//@desc     Forgot password Admin
//@access   Private
router.put(
  '/fwpwd',
  [
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { param, password } = req.body;
      const { id } = jwt.verify(param, config.get('jwtsecret'));
      const salt = await bcrypt.genSalt(10);
      encryptpassword = await bcrypt.hash(password, salt);
      let admin = await Admin.findOneAndUpdate(
        { id },
        { $set: { password: encryptpassword } },
        { new: true }
      );
      return res.json(admin);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);
module.exports = router;
