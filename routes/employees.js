const express = require('express');

const router = express.Router();
const utils = require('../utils');

const Employees = require('../models/employee');
const passport = require('passport');

// handle get and return all the collection items
router.get('/', utils.requireLogin, (req, res) => {
  Employees.find({}, (err, employees) => {
    if (err) return res.send(err);
    employees = eSort(employees);
    res.render('iEmployees', { employees, count: employees.length });
  });
});

// handle search
// router.post('/', (req, res) => {
//   console.log(req.body);
//   Employees.find(req.body, (err, employees) => {
//     console.log(employees);
//     if (err) return res.send(err);
//     employees = eSort(employees);
//     Employees.count(req.body, (errc, count) => {
//       if (errc) return res.send(errc);
//       res.send(employees);
//       // res.render('iEmployees', { employees, count });
//       // res.redirect('/');
//     });
//   });
// });

/*
* FROM ET
* handle search by regex and case insensitve
* */
router.get('/search', utils.requireLogin, (req, res, next) => {
  const query = {};
  query[req.query.stype] = {
    $regex: req.query.search,
    $options: 'i', // case insensitivity to match upper and lower cases. For an example, see
  };
  Employees.find(query, (err, employees) => {
    if (err) return next(err);
    employees = eSort(employees);
    res.render('iEmployees', { employees, count: employees.length }); // Employees.count(), counts everything in model, this only counts the length of the result
  });
});

/*
* FROM ET using jquery
* handle search by regex and case insensitve
* */
router.post('/search/jquery', utils.requireLogin, (req, res, next) => {
  const { key, value } = req.body;
  const query = {};
  query[key] = {
    $regex: value,
    $options: 'i', // case insensitivity to match upper and lower cases. For an example, see
  };

  Employees.find(query, (err, employees) => {
    if (err) return next(err);
    employees = eSort(employees);
    res.json({ employees, count: employees.length });
  });
});

// handle search (need exact input)
// router.get('/search/:name/:value', utils.requireLogin, (req, res, next) => {
//   const o = {};
//   o[req.params.name] = req.params.value;
//   // o[req.params.name] = { $regex: `/w*${req.params.value}w*/`, $options: 'i' };
//   Employees.find(o, (err, employees) => {
//     if (err) return next(err);
//     res.render('iEmployees', { employees });
//   });
// });

// render employees edit page
router.get('/update/:id', utils.requireLogin, (req, res, next) => {
  Employees.findById(req.params.id, (err, e) => {
    if (err) return next(err);
    res.render('dEmployee', { e });
  });
});

// handle employees edit page
router.post('/update/:id', utils.requireLogin, (req, res, next) => {
  Employees.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
    if (err) return next(err);
    res.redirect('/employees');
  });
});

// handle delete page
router.post('/delete', utils.requireLogin, (req, res, next) => {
  Employees.findOneAndRemove(req.body.id, (err) => {
    if (err) return next(err);
    res.json({ result: 'success' });
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
router.post('/signup', utils.requireLogin, (req, res, next) => {
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

// // render resetPw page
// router.get('/resetpw', utils.requireLogin, (req, res) => {
//   Employees.findByUsername(req.body.username, (err, e) => {
//     if (err) res.send(err);
//     res.render('resetPw', { e });
//   });
// });

// handle login page
router.post('/resetpw', utils.requireLogin, (req, res) => {
  Employees.findByUsername(req.body.username, async (err, e) => {
    if (err) res.send(err);
    await e.setPassword(req.body.newPassword);
    e.save();
    return res.redirect('/employees');
  });
});

// render signout page
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/employees/login');
});

const eSort = employees => employees.sort((a, b) => {
  if (a.role < b.role) return -1;
  if (a.role > b.role) return 1;
  return 0;
}).sort((a, b) => {
  if (a.role === b.role && a.lastname < b.lastname) return -1;
  if (a.role === b.role && a.lastname > b.lastname) return 1;
  return 0;
}).sort((a, b) => {
  if (a.role === b.role && a.lastname === b.lastname && a.firstname < b.firstname) return -1;
  if (a.role === b.role && a.lastname === b.lastname && a.firstname > b.firstname) return 1;
  return 0;
});

module.exports = router;
