const express = require('express');

const router = express.Router();

const Contacts = require('../models/person');

// handle get and return all contact informations
router.get('/', (req, res) => {
  Contacts.find({}, (err, contacts) => {
    if (err) return next(err);
    res.send(contacts);
  });
});

module.exports = router;
