const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models');
const { User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models'); // Import User and SpotImage models
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { check, validationResult } = require('express-validator');
const { validateReviewBody, validateBookingBody  } = require('../../utils/validation')




// DELETE SPOT IMAGE
// **********************************************************
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    try {
      const { imageId } = req.params;

      const imageToDelete = await SpotImage.findOne({
        where: {
          id: imageId
        },
      });
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

  module.exports = router;
