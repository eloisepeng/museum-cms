const express = require('express');

const router = express.Router();
const utils = require('../utils');

const Collections = require('../models/cataloging');

// handle get and return all the collection items
router.get('/', utils.requireLogin, (req, res, next) => {
  Collections.find({}, (err, c) => {
    if (err) return next(err);
    res.render('iCollections', { c });
  });
});

// render add collection
router.get('/add', (req, res) => {
  res.render('addCollection');
});

// handle add new collection
router.post('/add', async (req, res, next) => {
  try {
    // create and save new case
    const c = new Collections(req.body);
    c.save();
    // redirect after procedure
    res.redirect('/collections');
  } catch (err) {
    next(err);
  }
});

// // render collection detail page
// router.get('/:id', (req, res, next) => {
//   Collections.findById(req.params.id, (err, c) => {
//     if (err) return next(err);
//     res.render('detailCollection', { c });
//   });
// });

// // handle update collection
// router.post('/update/:id', (req, res, next) => {
//   Collections.update({ _id: req.params.id }, { $set: req.body }, (err) => {
//     if (err) return next(err);
//     res.redirect('/collections');
//   });
// });

// // handle delete session
// router.post('/:id/delete', (req, res, next) => {
//   Collections.findById(req.params.id, async (err, c) => {
//     if (err) return next(err);
//     if (c.status.isDeaccessed === true) return res.send('------------collection not exists----------');
//     c.status.isDeaccessed = true;
//     c.status.date = Date.now();
//     await c.save();
//     return res.send('-----------delete flagged------------');
//   });
// });

module.exports = router;
