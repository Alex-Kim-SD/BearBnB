const express = require('express');
const router = express.Router();
const { Review, User, Spot, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

// GET-ALL-REVIEWS-OF-CURRENT-USER
// **********************************************************
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const currentUserId = req.user.id;
    const reviews = await Review.findAll({
      where: {
        user_id: currentUserId,
      },
      attributes: [
        'id',
        'user_id',
        'spot_id',
        'review',
        'stars',
        'created_at',
        'updated_at'
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'first_name', 'last_name']
        },
        {
          model: Spot,
          attributes: [
            'id',
            'owner_id',
            'address',
            'city',
            'state',
            'country',
            'lat',
            'lng',
            'name',
            'price',
            'preview_image'
          ]
        },
        {
          model: ReviewImage,
          attributes: ['id', 'url']
        }
      ]
    });

    res.status(200).json({ Reviews: reviews });
  } catch (err) {
    next(err);
  }
});
// **********************************************************


module.exports = router;
