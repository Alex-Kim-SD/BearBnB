const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check, validationResult } = require('express-validator');

const spotValidation = [
  check('address').notEmpty().withMessage('Please provide a valid address.'),
  check('city').notEmpty().withMessage('Please provide a valid city.'),
  check('state').notEmpty().withMessage('Please provide a valid state.'),
  check('country').notEmpty().withMessage('Please provide a valid country.'),
  check('lat').isNumeric().withMessage('Please provide a valid latitude.'),
  check('lng').isNumeric().withMessage('Please provide a valid longitude.'),
  check('name').notEmpty().withMessage('Please provide a valid name.'),
  check('description').notEmpty().withMessage('Please provide a valid description.'),
  check('price').isNumeric().withMessage('Please provide a valid price.'),
];

// GET-SPOTS
// **********************************************************
router.get('/', async (req, res, next) => {
  try {
    const spots = await Spot.findAll({
      attributes: [
        'id', 'owner_id', 'address', 'city', 'state', 'country', 'lat', 'lng',
        'name', 'description', 'price', 'created_at', 'updated_at', 'preview_image', 'avg_rating'
      ],
    });

    res.json(spots);
  } catch (err) {
    next(err);
  }
});
// **********************************************************

// CREATE-SPOT
// **********************************************************
router.post('/', requireAuth, spotValidation, async (req, res, next) => {
  const { owner_id, address, city, state, country, lat, lng, name, description, price } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newSpot = await Spot.create({
      owner_id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    });

    res.status(201).json(newSpot);
  } catch (err) {
    next(err);
  }
});
// **********************************************************




module.exports = router;
