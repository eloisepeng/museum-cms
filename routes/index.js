const express = require('express');
const passport = require('passport');

const router = express.Router();

// handle get and return all the collection items 
router.get('/', (req, res) => {
    res.send(`get index`); 
});

module.exports = router;