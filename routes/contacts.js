const express = require('express');

const router = express.Router();
const utils = require('../utils');

const Contacts = require('../models/person');

// handle get and return all contact informations
router.get('/', utils.requireLogin, (req, res) => {
  Contacts.find({}, (err, contacts) => {
    if (err) return next(err);
    contacts = cSort(contacts);
    Contacts.count({ status: 'Active' }, (erra, aCount) => {
      if (erra) return next(erra);
      Contacts.count({ status: 'Inactive' }, (erri, iCount) => {
        if (erri) return next(erri);
        res.render('iContacts', { contacts, aCount, iCount });
      });
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
  const query = {};
  query[req.params.name] = {
    $regex: req.params.value,
    $options: 'i', // case insensitivity to match upper and lower cases. For an example, see
  };
  Contacts.find(query, (err, contacts) => {
    if (err) return next(err);
    contacts = cSort(contacts);
    res.render('iContacts', { contacts, count: contacts.length });
  });
});


// render collection detail page
router.get('/update/:id', utils.requireLogin, (req, res, next) => {
  Contacts.findById(req.params.id, (err, c) => {
    if (err) return next(err);
    res.render('dContact', { c });
  });
});

// handle update collection
router.post('/update/:id', utils.requireLogin, (req, res, next) => {
  Contacts.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
    if (err) return next(err);
    res.redirect('/contacts');
  });
});

// handle delete session
router.post('/delete', utils.requireLogin, (req, res, next) => {
  Contacts.findByIdAndUpdate(req.body.id, { $set: { status: 'Inactive' } }, (err) => {
    if (err) return next(err);
    res.json({ result: 'success' });
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
    await c.save();
    // redirect after procedure
    res.redirect('/contacts');
  } catch (err) {
    next(err);
  }
});

const cSort = contacts => contacts.sort((a, b) => {
  if (a.status < b.status) return -1;
  if (a.status > b.status) return 1;
  return 0;
}).sort((a, b) => {
  if (a.status === b.status && a.type < b.type) return -1;
  if (a.status === b.status && a.type > b.type) return 1;
  return 0;
}).sort((a, b) => {
  if (a.status === b.status && a.type === b.type && a.lastname < b.lastname) return -1;
  if (a.status === b.status && a.type === b.type && a.lastname > b.lastname) return 1;
  return 0;
}).sort((a, b) => {
  if (a.status === b.status && a.type === b.type && a.lastname === b.lastname && a.firstname < b.firstname) return -1;
  if (a.status === b.status && a.type === b.type && a.lastname === b.lastname && a.firstname > b.firstname) return 1;
  return 0;
});

module.exports = router;
