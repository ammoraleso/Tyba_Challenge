const express = require('express');
const User = require('../models/userSchema');
const Transaction = require('../models/transactionSchema');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/addUser', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const transaction = new Transaction({ transaction: '/addUser' });
    await transaction.save();
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.nick, req.body.password);
    const token = await user.generateAuthToken();
    const transaction = new Transaction({ transaction: '/login' });
    await transaction.save();
    res.send({ user: user, token: token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    const transaction = new Transaction({ transaction: '/logout' });
    await transaction.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    const transaction = new Transaction({ transaction: '/logoutAll' });
    await transaction.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
