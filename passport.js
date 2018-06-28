// user auth
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Employees = require('./models/employee');

// passport config
// passport.use(Employees.createStrategy());
passport.use(new LocalStrategy(Employees.authenticate()));
// passport.use(new LocalStrategy(
//   {
//     usernameField: 'username',
//     passwordField: 'password',
//   },
//   (username, password, done) => {
//     User.findOne({
//       username: username,
//     }, (error, user) => {
//       if (error) {
//         return done(error);
//       }
//       if (!user) {
//         return done(null, false, {
//           message: 'Username or password incorrect',
//         });
//       }
//       return done(null, user);
//     });
//   },
// ));
passport.serializeUser(Employees.serializeUser());
passport.deserializeUser(Employees.deserializeUser());
