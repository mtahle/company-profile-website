function isAdmin(req, res, next) {
  if (req.session && req.session.userId) {
    const User = require('../../models/User');
    User.findById(req.session.userId, (err, user) => {
      if (err || !user) {
        console.error('Admin Middleware - Error fetching user:', err);
        return res.status(401).send('Unauthorized');
      }
      if (user.isAdmin) {
        return next();
      } else {
        return res.status(403).send('Access denied');
      }
    });
  } else {
    return res.status(401).send('You need to login');
  }
}

module.exports = {
  isAdmin
};