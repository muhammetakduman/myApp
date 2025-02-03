const express = require('express');
const { register, login } = require('../controllers/auth.js')
const rateLimit = require('express-rate-limit');
const router = express.Router();


const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: 'Too many requests from this IP, please try again in a minute.',
    headers: true
});

router.use(function (req, res, next) {
    console.log(`rate limit cagrıldı : ${req.originalUrl}`)
    next();
})

router.post('/register', limiter, register)
router.post('/login', limiter, login)

module.exports = router;