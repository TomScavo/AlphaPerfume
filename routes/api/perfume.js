const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator/check');

const Perfume = require('../../models/Perfume');
const perfumeValidate = require('../../validation/perfumeValidate');
const auth = require('../../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const perfumes = await Perfume.find();
    res.json({ perfumes });
  } catch {
    err => {
      console.error(err.message);
      res.status(500).send('Server Error');
    };
  }
});

router.get('/male', async (req, res) => {
  try {
    const perfumes = await Perfume.find({ gender: 'male' });
    res.json({ perfumes });
  } catch {
    err => {
      console.error(err.message);
      res.status(500).send('Server Error');
    };
  }
});

router.get('/female', async (req, res) => {
  try {
    const perfumes = await Perfume.find({ gender: 'female' });
    res.json({ perfumes });
  } catch {
    err => {
      console.error(err.message);
      res.status(500).send('Server Error');
    };
  }
});

router.get('/search/:value', async (req, res) => {
  const value = new RegExp(`.*${req.params.value}.*`, 'i');
  try {
    const results = await Perfume.find({ name: value });
    res.json({ results });
  } catch {
    err => {
      console.error(err.message);
      res.status(500).send('Server Error');
    };
  }
});

router.get('/item/:id', async (req, res) => {
  try {
    const perfume = await Perfume.findById(req.params.id);
    res.json({ perfume });
  } catch {
    err => {
      console.error(err.message);
      res.status(500).send('Server Error');
    };
  }
});

//add perfume
router.post('/', perfumeValidate, async (req, res) => {
  //check out if have format issue
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  //init form values
  const {
    gender,
    name,
    handle,
    description,
    twoPrc,
    twoLeft,
    fivePrc,
    fiveLeft,
    tenPrc,
    tenLeft
  } = req.body;

  //build new perfume schema
  const newPerfume = {
    name,
    handle,
    description,
    gender,
    type: {
      two: {
        left: Number(twoLeft),
        price: Number(twoPrc)
      },

      five: {
        left: Number(fiveLeft),
        price: Number(fivePrc)
      },
      ten: {
        left: Number(tenLeft),
        price: Number(tenPrc)
      }
    }
  };

  //check out if the perfume already exist if exist then update perfume's info
  try {
    const perfume = await Perfume.findOne({ handle });

    //add new perfume
    if (!perfume) {
      new Perfume(newPerfume).save();
      return res.json({ msg: '成功添加香水信息' });
    }

    //update perfume
    const rePerfume = await Perfume.findOneAndUpdate(
      { handle },
      { $set: newPerfume },
      { new: true }
    );
    res.json({ msg: '成功更新香水信息' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//delete perfme item
router.delete('/:id', auth, async (req, res) => {
  try {
    const perfume = await Perfume.findByIdAndDelete(req.params.id);

    if (!perfume) {
      return res.status(404).json({ msg: 'perfume not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
