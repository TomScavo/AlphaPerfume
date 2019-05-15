const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator/check');

const cartValidate = require('../../validation/cartValidate');
const auth = require('../../middleware/auth');
const Cart = require('../../models/Cart');
// const Perfume = require('../../models/Perfume');

//get everything in the shopping cart
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user });
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//add perfume to shoopping cart
router.post('/', [auth, cartValidate], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { id, ml, price, handle, name } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user });

    //create new shopping cart
    if (!cart) {
      //check if the left is equal to zero
      // const perfume = await Perfume.findById(id);
      // perfume.type.d;
      const newCart = {
        user: req.user,
        items: [
          {
            perfume: id,
            handle,
            name,
            format: {
              ml,
              price,
              amount: 1
            }
          }
        ]
      };
      await new Cart(newCart).save();
      return res.json({ msg: '已添加到购物车' });
    } else {
      //check if the item is already in the shopping cart
      let perfumeIsExesit = false;
      cart.items.forEach(async (item, index) => {
        //if the ml and the id is the same then add one
        if (item.perfume.toString() === id && item.format.ml === ml) {
          //item sum add one
          perfumeIsExesit = true;
          cart.items[index].format.amount++;
          await Cart.findOneAndUpdate(
            { user: req.user },
            { $set: cart },
            { new: true }
          );

          return res.json({ msg: '数量加1' });
        }
      });
      //add new item to shopping cart
      if (!perfumeIsExesit) {
        const newItem = {
          perfume: id,
          handle,
          name,
          format: {
            ml,
            price,
            amount: 1
          }
        };
        cart.items.unshift(newItem);
        await cart.save();
        return res.json({ msg: '已添加到购物车列表' });
      }
    }
  } catch (err) {
    res.status(500).send('Server error');
  }
});

//edit items number;
router.post('/amount', auth, async (req, res) => {
  const { id, isIncrease, ml } = req.body;
  const cart = await Cart.findOne({ user: req.user });
  //find the item and eidt the amount
  cart.items.forEach(async (item, index) => {
    if (item.perfume.toString() === id && item.format.ml === ml) {
      if (isIncrease) {
        cart.items[index].format.amount++;
        const newCart = await Cart.findOneAndUpdate(
          { user: req.user },
          { $set: cart },
          { new: true }
        );

        return res.json({ cart: newCart });
      } else {
        //check if the amout less then 1
        if (cart.items[index].format.amount <= 1)
          return res.status(400).json({ msg: '不能再少了' });
        cart.items[index].format.amount--;
        const newCart = await Cart.findOneAndUpdate(
          { user: req.user },
          { $set: cart },
          { new: true }
        );

        return res.json({ cart: newCart });
      }
    }
  });
});

//delete item from shopping cart
router.delete('/:perfumeId', auth, async (req, res) => {
  const perfumeId = req.params.perfumeId;
  const cart = await Cart.findOne({ user: req.user });
  //find the item and delete it
  cart.items.forEach(async (item, index) => {
    if (item.id.toString() === perfumeId) {
      cart.items.splice(index, 1);
      const newCart = await Cart.findOneAndUpdate(
        { user: req.user },
        { $set: cart },
        { new: true }
      );
      return res.json({ cart: newCart });
    }
  });
});

module.exports = router;
