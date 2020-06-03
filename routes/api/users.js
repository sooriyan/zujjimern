const express = require('express');
const sendMail = require('../../config/mail');
const config = require('config');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Request = require('../../models/Request');
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
//@route    GET api/user
//@desc     Register route
//@access   Public
router.post(
  '/',
  [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('location', 'Please Enter a Location').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, location } = req.body;
    try {
      let user = await User.findOne({ email });
      // See if user exists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exist' }] });
      }
      user = new User({
        name,
        email,
        password,
        location,
      });
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      // Return json webtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtsecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          sendMail(
            user.email,
            'Complete Registration',
            `https://guarded-caverns-78180.herokuapp.com/emailverify/${token}`
          );
          res.send('Mail has been sent to the User Email');
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);
//@route    POST api/users/fwpwd
//@desc     Forgot password User
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
      let user = await User.findOne({ email });
      if (user) {
        const payload = {
          user: {
            id: user.id,
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
              `<p>Please click on this <a href='https://guarded-caverns-78180.herokuapp.com/fpwd/${token}'>link</a> to reset your password</p>`
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

//@route    POST api/users/fwpwd
//@desc     Forgot password Users
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
      console.log(param, password);
      const { user } = jwt.verify(param, config.get('jwtsecret'));
      const { id } = user;
      const salt = await bcrypt.genSalt(10);
      encryptpassword = await bcrypt.hash(password, salt);
      let updateduser = await User.findByIdAndUpdate(
        { _id: id },
        { $set: { password: encryptpassword } },
        { new: true }
      );
      return res.json(updateduser);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    POST api/users/request
//@desc     Create Request
//@access   Private
router.post(
  '/request',
  [
    auth,
    [
      check('noofrooms', 'Please enter no of words').not().isEmpty(),
      check('sqfeet', 'Please enter square feet').not().isEmpty(),
      check('projectName', 'Please enter Name').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        noofrooms,
        sqfeet,
        planDetails,
        mbrTheme,
        mbrSpecialComments,
        cbrTheme,
        cbrSpecialComments,
        gbrTheme,
        gbrSpecialComments,
        livingroomTheme,
        livingroomComments,
        diningRoomTheme,
        dinningRoomComments,
        hallTheme,
        hallComments,
        otherSpecialComments,
        projectName,
      } = req.body;
      const request = new Request({
        noofrooms,
        sqfeet,
        planDetails,
        mbrTheme,
        mbrSpecialComments,
        cbrTheme,
        cbrSpecialComments,
        gbrTheme,
        gbrSpecialComments,
        livingroomTheme,
        livingroomComments,
        diningRoomTheme,
        dinningRoomComments,
        hallTheme,
        hallComments,
        otherSpecialComments,
        projectName,
        user: req.user.id,
      });
      const saverequest = await request.save();
      return res.json(saverequest);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/requests', auth, async (req, res) => {
  try {
    const getUserrequests = await Request.find({ user: req.user.id }).sort({
      _id: -1,
    });
    res.json(getUserrequests);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route    GET api/users/getreq/id requests
//@desc     Get particular id request
//@access   Private
router.get('/getreq/:id', auth, async (req, res) => {
  console.log(req.params.id);
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
module.exports = router;
