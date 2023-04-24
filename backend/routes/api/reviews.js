const express = require('express');
const { Review } = require('../../db/models');
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

// Create a new review for a spot
//*****************************************************************

//*****************************************************************
module.exports = router;
