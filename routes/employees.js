const express = require('express');

const router = express.Router();
const utils = require('../utils');

const Employees = require('../models/employee');
const passport = require('passport');

// handle get and return all the collection items
router.get('/', utils.requireLogin, (req, res) => {
  Employees.find({}, (err, employees) => {
    if (err) return res.send(err);
    Employees.count({}, (errc, count) => {
      if (errc) return res.send(errc);
      res.render('iEmployees', { employees, count });
    });
  });
});

// render login page
router.get('/login', (req, res) => {
  res.render('login');
});

// handle login page
router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(req.user);
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
        firstname: req.body.firstname,
        lastname: req.body.lastname,
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
