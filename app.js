// Back-end dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mysql = require('mysql');
const view_engine = require('ejs');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const dotenv = require('dotenv');
const OpenAI = require('openai-api');

// Load environment variables from .env file
dotenv.config();

// Routes declarations
var gets = require('./routes/gets');
var posts = require('./routes/posts');
var apis = require('./routes/apis');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Declaration of directories from Routes
app.use('/', gets);
app.use('/', posts);
app.use('/', apis);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {

  next(createError(404));

});

// Error handler
app.use(function(err, req, res, next) {

  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');

});

module.exports = app;