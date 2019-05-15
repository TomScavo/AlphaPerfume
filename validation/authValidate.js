const { check } = require('express-validator/check');

module.exports = authValidate = [
  check('email', '电子邮件格式错误').isEmail(),
  check('password', '密码必须在6到12个字之间').isLength({ min: 6, max: 12 })
];
