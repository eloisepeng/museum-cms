// user auth
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Employees = require('./models/employee');

// passport config
// passport.use(Employees.createStrategy());
passport.use(new LocalStrategy(Employees.authenticate()));
passport.serializeUser(Employees.serializeUser());
passport.deserializeUser(Employees.deserializeUser());
