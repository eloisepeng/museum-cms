const express = require('express');

const router = express.Router();

const Contacts = require('../models/person');

// handle get and return all contact informations
router.get('/', (req, res) => {
  Contacts.find({}, (err, c) => {
    if (err) return next(err);
    // res.send(`contacts------------${contacts}`);
    res.render('iContacts', { c });
  });
});

// // render add collection
// router.get('/add', (req, res) => {
//   res.render('addContact');
// });

// // handle add new collection
// router.post('/add', async (req, res, next) => {
//   try {
//     // create and save new case
//     const c = new Contacts(req.body);
//     c.save();
//     // redirect after procedure
//     res.redirect('/contacts');
//   } catch (err) {
//     next(err);
//   }
// });

// // render collection detail page
// router.get('/:id', (req, res, next) => {
//   Contacts.findById(req.params.id, (err, c) => {
//     if (err) return next(err);
//     res.render('detailContact', { c });
//   });
// });

// // handle update collection
// router.post('/update/:id', (req, res, next) => {
//   Contacts.update({ _id: req.params.id }, { $set: req.body }, (err) => {
//     if (err) return next(err);
//     res.redirect('/contacts');
//   });
// });

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
