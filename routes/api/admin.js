const express = require('express');
const Admin = require('../../models/Admin');
const Request = require('../../models/Request');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const adminauth = require('../../middleware/adminauth');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const sendMail = require('../../config/mail');
//@route    put api/admin/
//@desc     Get All admins
//@access   Private
router.get('/', adminauth, async (req, res) => {
  try {
    const alladmin = await Admin.find().select('-password');
    return res.json(alladmin);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
});
//@route    put api/admin/users
//@desc     Get All Users
//@access   Private
router.get('/', adminauth, async (req, res) => {
  try {
    const allusers = await User.find().select('-password');
    return res.json(allusers);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
});
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
              `<p>Please click on this <a href='https://guarded-caverns-78180.herokuapp.com/adminfpwd/${token}'>link</a> to reset your password</p>`
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

//@route    GET api/admin/getreqs requests
//@desc     Get All requests
//@access   Private
router.get('/getreqs', adminauth, async (req, res) => {
  try {
    const allreqs = await Request.find().populate('user');
    return res.json(allreqs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/admin/getreq/id requests
//@desc     Get particular id request
//@access   Private
router.get('/getreq/:id', adminauth, async (req, res) => {
  try {
    const allreqs = await Request.findById({
      _id: req.params.id,
    }).populate('user', ['name', 'email']);
    return res.json(allreqs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route    put api/admin/getreq/id requests
//@desc     put particular id request
//@access   Private
router.put('/getreq/:id', adminauth, async (req, res) => {
  try {
    const allreqs = await Request.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: { projectLoc: req.body.projectLoc, status: 1 } },
      { new: true }
    ).populate('user', ['name', 'email']);
    sendMail(
      allreqs.user.email,
      `Regarding your Request for `,
      `<p>Your Request has been completed.<a href='https://guarded-caverns-78180.herokuapp.com/login'>Log In</a> to view the result</p>`
    );
    return res.json(allreqs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//get recent requests
router.get('/recentreqs', async (req, res) => {
  try {
    const recentreqs = await Request.find().sort({ _id: -1 }).limit(5);
    return res.json(recentreqs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route    DELETE api/admin/:id requests
//@desc     Delete particular user and requests
//@access   Private
router.delete('/:id', async (req, res) => {
  try {
    const users = await User.findByIdAndDelete({ _id: req.params.id });
    const reqdelete = await Request.deleteMany({ user: req.params.id });
    return res.json(reqdelete);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
