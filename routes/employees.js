const express = require('express');

const router = express.Router();

const Employees = require('../models/employee');

// handle get and return all the collection items
router.get('/', (req, res) => {
  Employees.find({}, (err, employees) => {
    if (err) return next(err);
    res.send(employees);
    console.log(employees);
  });
});

module.exports = router;
