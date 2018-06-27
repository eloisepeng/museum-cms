const express = require('express');

const router = express.Router();
const utils = require('../utils');

const Employees = require('../models/employee');
const passport = require('passport');

router.post('/', (req, res) => {
  console.log(req.body);
});

// handle get and return all the collection items
router.get('/', utils.requireLogin, (req, res) => {
  Employees.find({}, (err, employees) => {
    if (err) return res.send(err);
    employees = employees.sort((a, b) => {
      if (a.role < b.role) return -1;
      if (a.role > b.role) return 1;
      return 0;
    }).sort((a, b) => {
      if (a.role === b.role && a.lastname < b.lastname) return -1;
      if (a.role === b.role && a.lastname > b.lastname) return 1;
      return 0;
    }).sort((a, b) => {
      if (a.role === b.role && a.lastname === b.lastname && a.lastname < b.lastname) return -1;
      if (a.role === b.role && a.lastname === b.lastname && a.lastname > b.lastname) return 1;
      return 0;
    });
    Employees.count({}, (errc, count) => {
      if (errc) return res.send(errc);
      res.render('iEmployees', { employees, count });
    });
  });
});

// render employees edit page
router.get('/update/:id', utils.requireLogin, (req, res, next) => {
  Employees.findById(req.params.id, (err, e) => {
    if (err) return next(err);
    res.render('dEmployees', { e });
  });
});

// handle employees edit page
router.post('/update/:id', utils.requireLogin, (req, res, next) => {
  Employees.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
    if (err) return next(err);
  });
});

// render login page
router.get('/login', (req, res) => {
  res.render('login');
});

// handle login page
router.post('/login', passport.authenticate('local'), (req, res) => {
  Employees.findByIdAndUpdate(req.user._id, { $set: { lastLogin: new Date() } }, (err) => {
    if (err) res.send(err);
    return res.redirect('/collections');
  });
});

// render signup page
router.get('/signup', utils.requireLogin, (req, res) => {
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
        lastLogin: new Date(),
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
