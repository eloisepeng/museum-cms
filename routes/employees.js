const express = require('express');

const router = express.Router();

const Employees = require('../models/employee');
const passport = require('passport');

// handle get and return all the collection items
router.get('/', (req, res) => {
  Employees.find({}, (err, e) => {
    if (err) return res.send(err);
    res.render('iEmployees', { e });
  });
});

// render login page
router.get('/login', (req, res) => {
  res.render('login');
});

// handle login page
router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('logged in');
  res.redirect('/collections');
});

// render signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// handle signup page
router.post('/signup', (req, res, next) => {
  if (req.body.password === req.body.confirmPassword) {
    Employees.register(
      new Employees({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        address: {
          num: req.body.addrNum,
          street: req.body.addrSt,
          city: req.body.addrCity,
          province: req.body.addrProv,
          country: req.body.addrCountry,
          zip: req.body.zip,
        },
        phone: req.body.phone,
        role: req.body.role,
      }),
      req.body.password,
      (err) => {
        if (err) return next(err);
        passport.authenticate('local')(req, res, () => res.redirect('/collections'));
      },
    );
  } else {
    return next({ message: 'Password does not match' });
  }
});

// render signout page
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/employees/login');
});

module.exports = router;
