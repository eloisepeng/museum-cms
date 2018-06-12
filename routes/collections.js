const express = require('express');
const passport = require('passport');

const router = express.Router();

const Collections = require('../models/cataloging');

// handle get and return all the collection items 
router.get('/', (req, res) => {
  Collections.find({}, (err, collections) => {
    if (err) return next(err);
    res.send(collections)
  })
});


module.exports = router;