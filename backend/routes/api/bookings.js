const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Booking, Spot, User } = require('../../db/models');
const router = express.Router();
const { validateBookingBody } = require('../../utils/validation');
const { Op } = require('sequelize');

// GET all bookings for the current logged-in user
//*****************************************************************
router.get('/current', requireAuth, async (req, res) => {
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
// UPDATE an existing booking
// **********************************************************
router.put('/:bookingId', requireAuth, validateBookingBody, async (req, res) => {
  try {
    const { start_date, end_date } = req.body;
    const { bookingId } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking couldn't be found" });
    }

    if (booking.user_id !== userId) {
      return res.status(403).json({ message: "Unauthorized to edit this booking" });
    }
    if (new Date(booking.end_date) <= new Date()) {
      return res.status(403).json({ message: "Past bookings can't be modified" });
    }

    // Check for booking conflicts
    const conflictingBookings = await Booking.findOne({
      where: {
        id: { [Op.ne]: bookingId },
        spot_id: booking.spot_id,
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

    await booking.update({
      start_date,
      end_date,
    });

    res.status(200).json({
      id: booking.id,
      spotId: booking.spotId,
      userId: booking.userId,
      start_date: booking.start_date,
      end_date: booking.end_date,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});
// **********************************************************

// DELETE A BOOKING
// **********************************************************
router.delete('/:bookingId', requireAuth, async (req, res) => {
  try {
    const { bookingId } = req.params;
    const currentUserId = req.user.id;

    const booking = await Booking.findByPk(bookingId, {
      include: [
        {
          model: Spot,
          as: 'spot',
          attributes: ['owner_id']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id']
        }
      ],
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking couldn't be found" });
    }

    if (booking.user.id !== currentUserId && booking.spot.ownerId !== currentUserId) {
      return res.status(403).json({ message: "Unauthorized to delete this booking" });
    }

    if (new Date(booking.startDate) <= new Date()) {
      return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
    }

    await booking.destroy();

    res.status(200).json({ message: 'Successfully deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});
// **********************************************************
module.exports = router;
