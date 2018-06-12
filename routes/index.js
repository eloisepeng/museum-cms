const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', (req, res) => {
  console.log("yolo")
});

module.exports = router;