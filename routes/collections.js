const express = require('express');

const router = express.Router();
const utils = require('../utils');

const Collections = require('../models/cataloging');

// handle get and return all the collection items
router.get('/', utils.requireLogin, (req, res, next) => {
  Collections.find({ status: { isDeaccessed: false } }, (err, collections) => {
    if (err) return next(err);
    Collections.count({ status: { isDeaccessed: false } }, (erra, count) => {
      if (erra) return next(erra);
      res.render('iCollections', { collections, count });
    });
  });
});

// render add collection
router.get('/add', utils.requireLogin, (req, res) => {
  res.render('addCollection');
});

// handle add new collection
router.post('/add', async (req, res, next) => {
  try {
    // create and save new case
    const c = new Collections(req.body);
    await c.save();
    // redirect after procedure
    res.redirect('/collections');
  } catch (err) {
    next(err);
  }
});

// render collection detail page
router.get('/details/:id', (req, res, next) => {
  Collections.findById(req.params.id, (err, c) => {
    if (err) return next(err);
    console.log(c);
    res.render('dCollection', { c });
  });
});

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
