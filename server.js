const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// In-memory storage for bookings (for demonstration purposes)
let bookings = [];

// POST endpoint to create a booking
app.post('/api/bookings', (req, res) => {
  const bookingData = req.body;

  // Validate booking data
  if (!bookingData || !Array.isArray(bookingData) || bookingData.length === 0) {
    return res.status(400).json({ error: 'Invalid booking data' });
  }

  // Add booking to the in-memory array
  bookings.push(...bookingData);
  res.status(201).json({ message: 'Booking created successfully', data: bookingData });
});

// GET endpoint to retrieve pending bookings
app.get('/api/bookings/pending', (req, res) => {
  // For demonstration, return all bookings
  res.json(bookings);
});

// PATCH endpoint to update booking status
app.patch('/api/bookings/status', (req, res) => {
  const { name, newStatus } = req.body;
  const booking = bookings.find(b => b.name === name);
  
  if (booking) {
    booking.bookingStatus = newStatus;
    return res.json({ message: 'Booking status updated', booking });
  }
  
  res.status(404).json({ error: 'Booking not found' });
});

// DELETE endpoint to delete completed bookings
app.delete('/api/bookings/completed', (req, res) => {
  bookings = bookings.filter(b => b.bookingStatus !== 'Completed');
  res.json({ message: 'Completed bookings deleted' });
});

// Start the server
app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
