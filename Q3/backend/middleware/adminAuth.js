// Middleware to check if admin is authenticated via session
const adminAuth = (req, res, next) => {
  if (req.session && req.session.admin) {
    return next();
  }
  
  // For API routes, send JSON response
  if (req.path.startsWith('/api/')) {
    return res.status(401).json({ message: 'Unauthorized. Please login as admin.' });
  }
  
  // For page routes, redirect to login
  return res.redirect('/admin/login');
};

module.exports = adminAuth;
