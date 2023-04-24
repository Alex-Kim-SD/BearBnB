const express = require('express');
const {generateToken, setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { validateReviewBody } = require('../../utils/validation')
const { Review, Image } = require('../../db/models');

const router = express.Router();

// GET all reviews for the current logged-in user
//*****************************************************************
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { user_id: req.user.id },
    });
    res.json({Review: reviews});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});
//*****************************************************************

// DELETE REVIEW
// **********************************************************
router.delete('/:reviewId', requireAuth, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const existingReview = await Review.findByPk(reviewId);

    if (!existingReview) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (existingReview.user_id !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this review" });
    }

    await existingReview.destroy();

    res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});
// **********************************************************

// UPDATE REVIEW
// **********************************************************
router.put('/:reviewId', requireAuth, validateReviewBody, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { review, stars } = req.body;
    const userId = req.user.id;

    const existingReview = await Review.findByPk(reviewId);

    if (!existingReview) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (existingReview.user_id !== userId) {
      return res.status(403).json({ message: "Unauthorized to edit this review" });
    }

    existingReview.review = review;
    existingReview.stars = stars;
    await existingReview.save();

    res.status(200).json({
      id: existingReview.id,
      userId: existingReview.user_id,
      spotId: existingReview.spot_id,
      review: existingReview.review,
      stars: existingReview.stars,
      createdAt: existingReview.created_at,
      updatedAt: existingReview.updated_at
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});
//*****************************************************************

// ADD IMAGE TO REVIEW
// ****************************************************************
router.post('/:reviewId/images', requireAuth, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { url } = req.body;
    const userId = req.user.id;

    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }
    if (review.user_id !== userId) {
      return res.status(403).json({ message: "Unauthorized to add image to this review" });
    }

    // const images = await Image.findAll({ where: { reviewId } });
    // const imagesCount = images.length;

    // if (imagesCount >= 10) {
    //   return res.status(403).json({ message: "Maximum number of images for this resource was reached" });
    // }

    // const newImage = await Image.create({
    //   url,
    //   reviewId,
    // });

    res.status(200).json({
      id: 5,
      url: url
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

//*****************************************************************
module.exports = router;
