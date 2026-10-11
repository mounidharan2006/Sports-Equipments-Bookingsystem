const express = require('express');
const { createBooking, getMyBookings, getBooking, cancelBooking, getAllBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect } = require('../../../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // All booking routes protected

router.route('/')
    .post(createBooking);

router.get('/my', getMyBookings);
router.get('/admin/all', getAllBookings);

router.route('/:id')
    .get(getBooking);

router.patch('/:id/cancel', cancelBooking);
router.patch('/admin/:id/status', updateBookingStatus);

module.exports = router;
