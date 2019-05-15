const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator/check');

const router = express.Router();

const User = require('../../models/User');
const registerValidate = require('../../validation/registerValidate');

router.get('/', (req, res) => res.send('user works'));

//POST @/api/user
// user
router.post('/', registerValidate, async (req, res) => {
  //check data is valid
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    //find if user exeisted
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ errors: [{ param: 'email', msg: '该电子邮箱已经注册过了' }] });

    const newUser = new User({
      email,
      password
    });

    //bcrypt hash password
    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    const payload = {
      user: newUser.id
    };
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
