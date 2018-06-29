const express = require('express');

const router = express.Router();
const utils = require('../utils');

const Collections = require('../models/cataloging');

// handle get and return all the collection items
router.get('/', utils.requireLogin, (req, res, next) => {
  Collections.find({ status: { isDeaccessed: false } }, (err, collections) => {
    if (err) return next(err);
    collections = cSort(collections);
    res.render('iCollections', { collections, count: collections.length });
  });
});

// render add collection
router.get('/add', utils.requireLogin, (req, res) => {
  res.render('addCollection');
});

// handle add new collection
router.post('/add', utils.requireLogin, async (req, res, next) => {
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

// handle search collections
router.get('/search/:name/:value', utils.requireLogin, (req, res, next) => {
  const query = {};
  query[req.params.name] = {
    $regex: req.params.value,
    $options: 'i', // case insensitivity to match upper and lower cases. For an example, see
  };
  Collections.find(query, (err, collections) => {
    if (err) return next(err);
    collections = cSort(collections);
    res.render('iCollections', { collections, count: collections.length });
  });
});

// render collection detail page
router.get('/details/:id', utils.requireLogin, (req, res, next) => {
  Collections.findById(req.params.id, (err, c) => {
    if (err) return next(err);
    res.render('dCollection', { c });
  });
});

// render collection update page
router.get('/update/:id', utils.requireLogin, (req, res, next) => {
  Collections.findById(req.params.id, (err, c) => {
    if (err) return next(err);
    res.render('uCollection', { c });
  });
});

// handle update collection
router.post('/update/:id', utils.requireLogin, (req, res, next) => {
  Collections.findByIdAndUpdate(req.params.id, { $set: req.body }, (err) => {
    if (err) return next(err);
    res.redirect('/collections');
  });
});

// handle delete session
router.post('/delete', utils.requireLogin, (req, res, next) => {
  Collections.findById({ _id: req.body.id }, (err, c) => {
    if (err) return next(err);
    c.status.isDeaccessed = true;
    c.status.date = Date.now();
    c.status.reason = req.body.reason;
    c.status.disposalMethod = req.body.disposalMethod;
    c.save((errs) => {
      if (errs) return next(errs);
      res.redirect('/collections');
    });
  });
});

const cSort = collections => collections.sort((a, b) => {
  if (a.pid < b.pid) return -1;
  if (a.pid > b.pid) return 1;
  return 0;
});

module.exports = router;
