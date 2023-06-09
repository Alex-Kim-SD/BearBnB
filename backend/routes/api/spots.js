const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models');
const { User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { check, validationResult } = require('express-validator');
const { validateReviewBody, validateBookingBody  } = require('../../utils/validation')


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
// get all spots
router.get('/', async (req, res, next) => {
  try {
    const spots = await Spot.findAll({
      attributes: [
        'id', 'owner_id', 'address', 'city', 'state', 'country', 'lat', 'lng',
        'name', 'description', 'price', 'created_at', 'updated_at', 'avg_rating', 'preview_image'
      ],
    });
    res.status(200).json({ Spots: spots });
  } catch (err) {
    next(err);
  }
});

// CREATE-SPOT
// **********************************************************
router.post('/', requireAuth, spotValidation, async (req, res, next) => {
  const { owner_id, address, city, state, country, lat, lng, name, description, price, preview_image } = req.body;
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
      price,
      preview_image
    });

    res.status(201).json(newSpot);
  } catch (err) {
    next(err);
  }
});
// **********************************************************

// GET-ALL-SPOTS-OWNED-BY-CURRENT-USER
// **********************************************************
router.get('/current', requireAuth, async (req, res, next) => {
  try {
    const currentUserId = req.user.id;

    const spots = await Spot.findAll({
      where: {
        owner_id: currentUserId,
      },
      attributes: [
        'id', 'owner_id', 'address', 'city', 'state', 'country', 'lat', 'lng',
        'name', 'description', 'price', 'created_at', 'updated_at', 'preview_image', 'avg_rating'
      ],
    });

    res.status(200).json({ Spots: spots });
  } catch (err) {
    next(err);
  }
});
// **********************************************************

// GET-SPOT-DETAILS-BY-ID
// **********************************************************
router.get('/:id', async (req, res, next) => {
  try {
    const spotId = req.params.id;

    const spot = await Spot.findOne({
      where: {
        id: spotId,
      },
      attributes: [
        'id', 'owner_id', 'address', 'city', 'state', 'country', 'lat', 'lng',
        'name', 'description', 'price', 'created_at', 'updated_at', 'preview_image', 'avg_rating'
      ],
      include: [
        {
          model: SpotImage,
          as: 'spotImages',
          attributes: ['id', 'url', 'preview'],
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'first_name', 'last_name'],
        },
      ],
    });


    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    res.status(200).json(spot);
  } catch (err) {
    next(err);
  }
});
// **********************************************************

// ADD IMAGE TO SPOT ID
// **********************************************************
router.post('/:id/images', requireAuth, async (req, res, next) => {
  const spotId = req.params.id;
  const { url, preview } = req.body;

  const spot = await Spot.findOne({
    where: {
      id: spotId,
      owner_id: req.user.id,
    },
  });

  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  const newImage = await SpotImage.create({
    spot_id: spot.id,
    url,
    preview,
  });

  res.status(200).json({
    id: newImage.id,
    url: newImage.url,
    preview: newImage.preview,
  });
});
// **********************************************************

// EDIT SPOT BY ID
// **********************************************************
router.put('/:id', requireAuth, async (req, res, next) => {
  const currentUserId = req.user.id;
  const spotId = req.params.id;
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    avg_rating,
    description,
    price
  } = req.body;

  // Validate the request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Bad Request', errors: errors.mapped() });
  }

  try {
    // Find the spot to update
    const spot = await Spot.findOne({
      where: {
        id: spotId,
        owner_id: currentUserId,
      },
    });

    // If the spot doesn't exist, return a 404 response
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    // Update the spot's properties
    if (address) spot.address = address;
    if (city) spot.city = city;
    if (state) spot.state = state;
    if (country) spot.country = country;
    if (lat) spot.lat = lat;
    if (lng) spot.lng = lng;
    if (name) spot.name = name;
    if (description) spot.description = description;
    if (price) spot.price = price;
    if (avg_rating) spot.avg_rating = avg_rating

    // Save the updated spot to the database
    await spot.save();

    // Return the updated spot object
    res.json(spot);
  } catch (err) {
    next(err);
  }
});
// **********************************************************

// DELETE-SPOT
// **********************************************************
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const spotId = req.params.id;

    // Check if spot exists
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    // Check if authenticated user is the owner of the spot
    // if (req.user.id !== spot.owner_id) {
    //   return res.status(401).json({ message: 'You are not authorized to perform this action.' });
    // }

    // Delete the spot
    await SpotImage.destroy({ where: { spot_id: spotId } });
    await Review.destroy({ where: { spot_id: spotId } });
    await Booking.destroy({ where: { spot_id: spotId } });
    await Spot.destroy({ where: { id: spotId } });
    await spot.destroy();

    res.status(200).json({ message: 'Successfully deleted' });
  } catch (err) {
    next(err);
  }
});
// **********************************************************

// GET-ALL-REVIEWS-BY-SPOT-ID
// **********************************************************
router.get('/:spotId/reviews', async (req, res, next) => {
  try {
    const spotId = req.params.spotId;

    // Find the spot with the specified id and include its reviews
    const spotReviews = await Review.findAll({
      where: {
        spot_id: spotId,
      },
      include: [
        {
          model: User,
          as: 'user', // change the alias to match the association alias
          attributes: ['id', 'first_name', 'last_name'],
        },
        {
          model: ReviewImage,
          as: 'reviewImages',
          attributes: ['id', 'url'],
        },
      ],
      order: [['created_at', 'DESC']],
    });

    if (!spotReviews || spotReviews.length === 0) {
      console.log('backend/routes/spots.js spotReviewsDNE', spotReviews)
      return res.status(201).json({ message: "Couldn't find any reviews for the specified spot" }); // maybe adjust status code
    }

    res.status(200).json({ Reviews: spotReviews });
  } catch (err) {
    next(err);
  }
});
// **********************************************************

// CREATE NEW REVIEW FOR SPOT
// **********************************************************
router.post('/:spotId/reviews', requireAuth, validateReviewBody, async (req, res) => {
  try {
    const { spotId } = req.params;
    const { review, stars } = req.body;
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const existingReview = await Review.findOne({ where: { user_id: userId, spot_id: spot.id } });

    if (existingReview) {
      return res.status(500).json({ message: 'User already has a review for this spot' });
    }

    const newReview = await Review.create({
      user_id: userId,
      spot_id: spot.id,
      review,
      stars,
    });
    // Update avg_rating
    const reviews = await Review.findAll({ where: { spot_id: spot.id } });
    const avg_rating = reviews.reduce((acc, cur) => acc + cur.stars, 0) / reviews.length;
    await spot.update({ avg_rating });
    console.log('\n',"BACKEND CREATE NEW REVIEW | newReview", newReview,'\n',);
    res.status(201).json({
      id: newReview.id,
      userId: newReview.user_id,
      spotId: newReview.spot_id,
      review: newReview.review,
      stars: newReview.stars,
      createdAt: newReview.created_at,
      updatedAt: newReview.updated_at
    });
  } catch (err) {
    // console.log('\n',"Error when creating review:", err.message, err.stack,'\n',);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// DELETE SPOT IMAGE
// **********************************************************
router.delete('/:spotId/images/:imageId', requireAuth, async (req, res, next) => {
  try {
    const { spotId, imageId } = req.params;

    // Find the spot and the image to delete
    const spot = await Spot.findOne({
      where: {
        id: spotId,
        owner_id: req.user.id,
      },
    });
    const imageToDelete = await SpotImage.findOne({
      where: {
        id: imageId,
        spot_id: spotId,
      },
    });

    // If the spot or image doesn't exist, return a 404 response
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }
    if (!imageToDelete) {
      return res.status(404).json({ message: "Spot Image couldn't be found" });
    }

    // Delete the image
    await imageToDelete.destroy();

    res.status(200).json({ message: 'Successfully deleted' });
  } catch (err) {
    next(err);
  }
});
// **********************************************************

// CREATE A BOOKING FROM A SPOT
// **********************************************************
router.post('/:spotId/bookings', requireAuth, validateBookingBody, async (req, res) => {
  try {
    const { start_date, end_date } = req.body;
    const { spotId } = req.params;
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId === userId) {
      return res.status(403).json({ message: "Unauthorized to book your own spot" });
    }

    const conflictingBookings = await Booking.findOne({
      where: {
        spot_id: spotId,
        [Op.or]: [
          { [Op.and]: [{ start_date: { [Op.lte]: start_date } }, { end_date: { [Op.gte]: start_date } }] },
          { [Op.and]: [{ start_date: { [Op.lte]: end_date } }, { end_date: { [Op.gte]: end_date } }] }
        ],
      },
    });

    if (conflictingBookings) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          start_date: "Start date conflicts with an existing booking",
          end_date: "End date conflicts with an existing booking",
        },
      });
    }

    const newBooking = await Booking.create({
      user_id: userId,
      spot_id: spotId,
      start_date: start_date,
      end_date: end_date,
    });

    res.status(200).json({
      id: newBooking.id,
      spot_id: newBooking.spotId,
      user_id: newBooking.userId,
      start_date: newBooking.start_date,
      end_date: newBooking.end_date,
      created_at: newBooking.created_at,
      updated_at: newBooking.updated_at,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});
// **********************************************************

// GET-ALL-BOOKINGS-FOR-A-SPOT
// **********************************************************
router.get('/:id/bookings', requireAuth, async (req, res, next) => {
  try {
    const spotId = req.params.id;
    const currentUserId = req.user.id;

    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const bookings = await Booking.findAll({
      where: {
        spot_id: spotId,
      },
    });

    if (spot.ownerId === currentUserId) {
      const bookingsWithUsers = await Promise.all(bookings.map(async (booking) => {
        const user = await User.findByPk(booking.userId, {
          attributes: ['id', 'first_name', 'last_name'],
        });
        return { ...booking.dataValues, User: user };
      }));

      return res.status(200).json({ Bookings: bookingsWithUsers });
    }

    return res.status(200).json({ Bookings: bookings });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
