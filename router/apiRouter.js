const express = require('express');
const auth = require('../middleware/auth');
const axios = require('axios');
const getCode = require('../geocode');
const Transaction = require('../models/transactionSchema');

const router = new express.Router();

router.get('/getRestaurants', auth, async (req, res) => {
  let url = 'https://places.sit.ls.hereapi.com/places/v1/discover/explore';
  const apikey = '10BL3qzKkB3iM3e__Fc05Vb74y6Wy0X_Ig7TeSBodho';
  const cat = 'eat-drink';

  try {
    const codeRes = await getCode(req.query.city);
    let at = `${codeRes.latitude},${codeRes.longitude}`;
    url = `${url}?apikey=${apikey}&cat=${cat}&at=${at}`;
    const response = await axios.get(url);
    const transaction = new Transaction({ transaction: '/getRestaurants' });
    await transaction.save();
    return res.send(response.data.results.items);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.get('/getTransactions', auth, async (req, res) => {
  try {
    const allTransaction = await Transaction.find({});
    res.send(allTransaction);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;
