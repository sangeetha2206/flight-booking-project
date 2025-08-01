   const express = require('express');
   const router = express.Router();
   const bookingsController = require('../controllers/bookings');

   // CRUD Endpoints
   router.post('/', bookingsController.createBookings); // Create booking
   router.get('/pending', bookingsController.getPendingBookings); // Get pending bookings
   router.get('/completed', bookingsController.getCompletedBookings); // Get completed bookings
   router.patch('/status', bookingsController.updateBookingStatus); // Update booking status
   router.delete('/completed', bookingsController.deleteCompletedBookings); // Delete completed bookings

   module.exports = router;
   