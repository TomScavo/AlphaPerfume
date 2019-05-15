const { check } = require('express-validator/check');

module.exports = cartValidate = [
  check('id', 'id缺失')
    .not()
    .isEmpty(),
  check('ml', '容量类型缺失')
    .not()
    .isEmpty(),
  check('price', '价格缺失')
    .not()
    .isEmpty()
];
