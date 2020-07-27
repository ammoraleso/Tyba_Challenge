const express = require('express');
const auth = require('../middleware/auth');

const router = new express.Router();

router.get('/helloWorld', auth, (req, res) => {
  res.send({
    title: 'Hellow world',
  });
});

module.exports = router;
