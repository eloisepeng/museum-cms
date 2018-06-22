const express = require('express');

const router = express.Router();

// handle get and return all the collection items
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
