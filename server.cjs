const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import API route handlers
const registerHandler = require('./app/api/register.cjs');
const registrationsHandler = require('./app/api/registrations.cjs');
const attendeesHandler = require('./app/api/attendees/[attendeeId].cjs');
const ticketHandler = require('./app/api/ticket/[ticketId].cjs');

// API Routes
app.post('/register', registerHandler);
app.get('/registrations', registrationsHandler);
app.put('/attendees/:attendeeId', attendeesHandler);
app.delete('/attendees/:attendeeId', attendeesHandler);
app.get('/ticket/:ticketId', ticketHandler);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});