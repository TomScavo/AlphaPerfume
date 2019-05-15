const { body, check } = require('express-validator/check');

module.exports = registerValidate = [
  check('email', '电子邮件格式错误').isEmail(),
  check('password', '密码必须在6到12个字之间').isLength({ min: 6, max: 12 }),
  body('password2').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('请确保密码匹配。');
    } else {
      return true;
    }
  })
];
