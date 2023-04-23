// routes/api/spots.js

const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models');

router.get('/', async (req, res, next) => {
  try {
    const spots = await Spot.findAll();
    return res.json({ Spots: spots });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
