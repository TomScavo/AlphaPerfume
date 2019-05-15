const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator/check');

const auth = require('../../middleware/auth');
const Address = require('../../models/Address');
const addressValidate = require('../../validation/addressValidate');

//get address
router.get('/', [auth], async (req, res) => {
  try {
    const address = await Address.findOne({ user: req.user });
    if (!address) return res.status(404).json({ msg: 'there no address' });
    res.json({ address });
  } catch {
    err => {
      console.error(err.message);
      res.status(500).send('Server Error');
    };
  }
});

//add or change user address
router.post('/', [auth, addressValidate], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, number, province, city, area, detail } = req.body;
  const newAddress = {
    user: req.user,
    name,
    number,
    province,
    city,
    area,
    detail
  };
  try {
    //if there don't have address then add address else update address
    const address = await Address.findOne({ user: req.user });
    //update address
    if (address) {
      await Address.findOneAndUpdate(
        { user: req.user },
        { $set: newAddress },
        { new: true }
      );
      return res.json({ msg: '更新地址成功' });
    }
    //add address
    await new Address(newAddress).save();
    return res.json({ msg: '添加地址成功' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
