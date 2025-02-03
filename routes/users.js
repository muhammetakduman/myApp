var express = require('express');
var router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const { getUserById } = require('../controllers/userController'); // Burada {} içinde olmalı

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/users', function (req, res, next) {

});

router.get('/:id', authMiddleware, getUserById);

module.exports = router;
