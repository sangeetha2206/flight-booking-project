   const Booking = require('../models/Booking');

   // Create a new booking
   exports.createBookings = async (req, res) => {
       try {
           const bookings = await Booking.bulkCreate(req.body);
           res.status(201).json(bookings);
       } catch (error) {
           res.status(500).json({ error: 'Booking creation failed' });
       }
   };

   // Get pending bookings
   exports.getPendingBookings = async (req, res) => {
       try {
           const bookings = await Booking.findAll({ where: { bookingStatus: 'Not confirmed' } });
           res.json(bookings);
       } catch (error) {
           res.status(500).json({ error: 'Fetch failed' });
       }
   };

   // Update booking status
   exports.updateBookingStatus = async (req, res) => {
       try {
           const { name, newStatus } = req.body;
           const booking = await Booking.findOne({ where: { name } });
           if (booking) {
               booking.bookingStatus = newStatus;
               await booking.save();
               res.json(booking);
           } else {
               res.status(404).json({ error: 'Booking not found' });
           }
       } catch (error) {
           res.status(500).json({ error: 'Update failed' });
       }
   };

   // Get completed bookings
   exports.getCompletedBookings = async (req, res) => {
       try {
           const bookings = await Booking.findAll({ where: { bookingStatus: 'Completed' } });
           res.json(bookings);
       } catch (error) {
           res.status(500).json({ error: 'Fetch failed' });
       }
   };

   // Delete completed bookings
   exports.deleteCompletedBookings = async (req, res) => {
       try {
           await Booking.destroy({ where: { bookingStatus: 'Completed' } });
           res.json({ message: 'Completed bookings deleted' });
       } catch (error) {
           res.status(500).json({ error: 'Delete failed' });
       }
   };
   