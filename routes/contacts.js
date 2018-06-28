const express = require('express');

const router = express.Router();
const utils = require('../utils');

const Contacts = require('../models/person');

// handle get and return all contact informations
router.get('/', utils.requireLogin, (req, res) => {
  Contacts.find({}, (err, contacts) => {
    if (err) return next(err);
    Contacts.count({}, (errc, count) => {
      if (errc) return next(errc);
      res.render('iContacts', { contacts, count, title: 'Contacts' });
    });
  });
});

// // handle get and return all contact informations
// router.get('/search/:type', utils.requireLogin, (req, res) => {
//   Contacts.find({ type: req.params.type }, (err, contacts) => {
//     if (err) return next(err);
//     Contacts.count({ type: req.params.type }, (errc, count) => {
//       if (errc) return next(errc);
//       let title = '';
//       if (req.params.type === 'doners') {
//         title = 'Doners';
//       } else {
//         title = 'Sellers';
//       }
//       res.render('iContacts', { contacts, count, title });
//     });
//   });
// });

// handle search contact
router.get('/search/:name/:value', utils.requireLogin, (req, res, next) => {
  const o = {};
  o[req.params.name] = req.params.value;
  Contacts.find(o, (err, contacts) => {
    if (err) return next(err);
    res.render('iContacts', { contacts });
  });
});

// render add collection
router.get('/add', utils.requireLogin, (req, res) => {
  res.render('addContact');
});

// handle add new collection
router.post('/add', utils.requireLogin, async (req, res, next) => {
  try {
    // create and save new case
    const c = new Contacts(req.body);
    c.type = req.body.type;
    c.save();
    // redirect after procedure
    res.redirect('/contacts');
  } catch (err) {
    next(err);
  }
});

// render collection detail page
router.get('/update/:id', (req, res, next) => {
  Contacts.findById(req.params.id, (err, c) => {
    if (err) return next(err);
    res.render('dContact', { c });
  });
});

// handle update collection
router.post('/update/:id', (req, res, next) => {
  Contacts.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
    if (err) return next(err);
    res.redirect('/contacts');
  });
});

// // handle delete session
// router.post('/:id/delete', (req, res, next) => {
//   Contacts.findById(req.params.id, async (err, c) => {
//     if (err) return next(err);
//     if (c.status === 'Inactive') return res.send('------------contact not exists----------');
//     c.status = 'Inactive';
//     await c.save();
//     return res.send('-----------delete flagged------------');
//   });
// });

module.exports = router;
