const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator/check');

const authValidate = require('../../validation/authValidate');
const auth = require('../../middleware/auth');

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//POST @/api/auth
//Login user

router.post('/', authValidate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //init values from request;
  const { email, password } = req.body;

  try {
    //find user
    const user = await User.findOne({ email });

    //check if the user exist
    if (!user) {
      return res
        .status(404)
        .json({ errors: [{ param: 'email', msg: '用户不存在' }] });
    }

    //check password is match
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ param: 'password', msg: '密码错误' }] });
    }

    //create payload for token
    const payload = {
      user: user.id
    };

    //create token
    const token = await jwt.sign(payload, config.get('jwtSecret'), {
      expiresIn: 36000
    });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
