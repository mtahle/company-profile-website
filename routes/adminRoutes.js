const express = require('express');
const { isAdmin } = require('./middleware/adminMiddleware');
const router = express.Router();

// Admin dashboard main page
router.get('/admin', isAdmin, (req, res) => {
  res.render('admin/dashboard');
});

// Additional admin routes can go here

module.exports = router;