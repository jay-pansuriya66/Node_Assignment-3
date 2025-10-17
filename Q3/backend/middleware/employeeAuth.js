const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

// Middleware to verify JWT token for employee authentication
const employeeAuth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided. Authorization denied.' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find employee
    const employee = await Employee.findById(decoded.id);
    
    if (!employee) {
      return res.status(401).json({ message: 'Invalid token. Employee not found.' });
    }

    if (employee.status !== 'active') {
      return res.status(401).json({ message: 'Account is inactive. Contact administrator.' });
    }

    // Attach employee to request
    req.employee = employee;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please login again.' });
    }
    res.status(500).json({ message: 'Server error during authentication.' });
  }
};

module.exports = employeeAuth;
