const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Booking, Spot } = require('../../db/models');
const router = express.Router();
const { validateBookingBody } = require('../../utils/validation');
const { Op } = require('sequelize');

// GET all bookings for the current logged-in user
//*****************************************************************
router.get('/', requireAuth, async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { user_id: req.user.id },
      include: {
        model: Spot,
        as: 'spot',
        attributes: [
          'id', 'owner_id', 'address', 'city', 'state', 'country',
          'lat', 'lng', 'name', 'price', 'preview_image'
        ],
      },
    });

    res.status(200).json({ Bookings: bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});
//*****************************************************************

// CREATE A BOOKING FROM A SPOT
// **********************************************************
router.post('/spots/:spotId', requireAuth, validateBookingBody, async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
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
            { [Op.and]: [{ start_date: { [Op.lte]: startDate } }, { end_date: { [Op.gte]: startDate } }] },
            { [Op.and]: [{ start_date: { [Op.lte]: endDate } }, { end_date: { [Op.gte]: endDate } }] }
          ],
        },
      });

      if (conflictingBookings) {
        return res.status(403).json({
          message: "Sorry, this spot is already booked for the specified dates",
          errors: {
            startDate: "Start date conflicts with an existing booking",
            endDate: "End date conflicts with an existing booking",
          },
        });
      }

      const newBooking = await Booking.create({
        user_id: userId,
        spot_id: spotId,
        start_date: startDate,
        end_date: endDate,
      });

      res.status(200).json({
        id: newBooking.id,
        spot_id: newBooking.spotId,
        user_id: newBooking.userId,
        startDate: newBooking.start_date,
        endDate: newBooking.end_date,
        created_at: newBooking.created_at,
        updated_at: newBooking.updated_at,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  // **********************************************************

module.exports = router;
