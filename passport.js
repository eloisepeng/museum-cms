const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Employees = require('./models/employee');

passport.use(Employees.createStrategy());

passport.serializeUser(Employees.serializeUser());
passport.deserializeUser(Employees.deserializeUser());
