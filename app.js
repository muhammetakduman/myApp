var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


const usersRouter = require('./routes/users.js');
const rateLimit = require('express-rate-limit');
const db = require('./config/database.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

var indexRouter = require('./routes/index');
var Auth = require('./routes/auth.js');

var app = express();
app.use('./users', usersRouter)
app.use(cors());
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route tanımlamaları
app.use('/', indexRouter);
app.use('/auth', Auth);
app.use('/users', usersRouter);

// 404 Middleware - en sona koy
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler middleware
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
