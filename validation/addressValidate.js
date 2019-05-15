const { body, check } = require('express-validator/check');

module.exports = addressValidate = [
  check('province', '此处为必填区域。')
    .not()
    .isEmpty(),
  check('city', '此处为必填区域。')
    .not()
    .isEmpty(),
  check('area', '此处为必填区域。')
    .not()
    .isEmpty(),
  check('detail', '此处为必填区域。')
    .not()
    .isEmpty(),
  check('name', '姓名必须在1到15字之间').isLength({ min: 1, max: 15 }),
  body('number').custom(value => {
    if (!/^1(3|4|5|7|8)\d{9}$/.test(value)) {
      throw new Error('电话格式错误');
    } else {
      return true;
    }
  })
];
