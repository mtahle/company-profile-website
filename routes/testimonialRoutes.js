const express = require('express');
const Testimonial = require('../models/Testimonial');
const { isAuthenticated } = require('./middleware/authMiddleware');
const router = express.Router();

// Route to submit a new testimonial
router.post('/testimonials', isAuthenticated, async (req, res) => {
  try {
    const { author, message } = req.body;
    await Testimonial.create({ author, message });
    res.redirect('/');
  } catch (error) {
    console.error('Error submitting testimonial:', error);
    res.status(500).send('Error submitting testimonial');
  }
});

module.exports = router;