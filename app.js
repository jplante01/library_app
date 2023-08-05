// This file creates an express application object (named app, by convention), 
// sets up the application with various settings and middleware, and then exports 
// the app from the module.

// Useful node libraries
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// create the app
var app = express();

// The app.set function takes two arguments: the name of the property you want to
// set and the value you want to assign to that property.
// app.set(name, value);

// view engine setup
// set the path to the views directory
app.set('views', path.join(__dirname, 'views'));
// set the view engine property to pug
app.set('view engine', 'pug');

// app.use function is a middleware function that is used to mount middleware 
// functions in the application's request processing pipeline. Middleware functions 
// are functions that have access to the request object (req), the response object (res), 
// and the next middleware function in the application's request-response cycle.

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// express.static is for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// The paths specified ('/' and '/users') are treated as a prefix to 
// routes defined in the imported files. So for example, if the imported users
// module defines a route for /profile, you would access that route at /users/profile
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
