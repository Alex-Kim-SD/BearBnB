const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models');

router.get('/', async (req, res, next) => {
  try {
    const spots = await Spot.findAll({
      attributes: [
        'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng',
        'name', 'description', 'price', 'createdAt', 'updatedAt', 'previewImage', 'avgRating'
      ],
    });

    res.json(spots);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
