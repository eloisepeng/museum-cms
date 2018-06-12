const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

// connect mongoDB
mongoose.connect('mongodb://eloise:peng1994@ds141098.mlab.com:41098/cairo-museum');
mongoose.connection.once('open', () => console.log('MongoDB connected'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * middlewares
 * note: middleware is running in sequence, from top to bottom
 */
app.use(bodyParser.json()); // parse client request data to json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev')); // log requests in server console
/**
 * you need to use session middleware to create session store
 * if you want to use passport session
*/
app.use(session({
  secret: 'eloisepeng',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // only set this to true if you are in HTTPS connection
}));

app.use(passport.initialize());
app.use(passport.session());

/**
 * set local variables, so you can use it in template engine
 */
app.locals.moment = require('moment');

// import routers
const index = require('./routes/index');
const collections = require('./routes/collections');
const employees = require('./routes/employees');

// apply router middleware
app.use('/', index);
app.use('/collections', collections);
app.use('/employees', employees);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  // node js global object
  // const: value not change; let: value will change
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next)=> {
  res.send(err.message);
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 3000;

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port, ()=>{
  console.log(`Server running on http://localhost:${port}`)
});