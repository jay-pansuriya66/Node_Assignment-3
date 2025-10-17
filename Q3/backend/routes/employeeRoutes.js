const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const Leave = require('../models/Leave');
const employeeAuth = require('../middleware/employeeAuth');

// Employee Login
router.post('/login', async (req, res) => {
  try {
    const { empId, password } = req.body;

    if (!empId || !password) {
      return res.status(400).json({ message: 'Please provide employee ID and password' });
    }

    // Find employee by empId
    const employee = await Employee.findOne({ empId });

    if (!employee) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if account is active
    if (employee.status !== 'active') {
      return res.status(401).json({ message: 'Account is inactive. Contact administrator.' });
    }

    // Verify password
    const isMatch = await employee.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: employee._id, empId: employee.empId },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      employee: employee.getPublicProfile(),
    });
  } catch (error) {
    console.error('Employee login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get Employee Profile
router.get('/profile', employeeAuth, async (req, res) => {
  try {
    res.json({
      success: true,
      employee: req.employee.getPublicProfile(),
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Apply for Leave
router.post('/leave/apply', employeeAuth, async (req, res) => {
  try {
    const { date, reason } = req.body;

    if (!date || !reason) {
      return res.status(400).json({ message: 'Please provide date and reason' });
    }

    const leave = new Leave({
      employeeId: req.employee._id,
      empId: req.employee.empId,
      employeeName: req.employee.name,
      date: new Date(date),
      reason,
    });

    await leave.save();

    res.status(201).json({
      success: true,
      message: 'Leave application submitted successfully',
      leave,
    });
  } catch (error) {
    console.error('Leave application error:', error);
    res.status(500).json({ message: 'Error submitting leave application' });
  }
});

// Get Employee Leave Applications
router.get('/leave/list', employeeAuth, async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.employee._id }).sort({ appliedDate: -1 });

    res.json({
      success: true,
      leaves,
    });
  } catch (error) {
    console.error('Get leaves error:', error);
    res.status(500).json({ message: 'Error fetching leave applications' });
  }
});

// Update Leave Status (for admin use via API)
router.put('/leave/:id/status', employeeAuth, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: 'Leave application not found' });
    }

    // Check if the leave belongs to the employee
    if (leave.employeeId.toString() !== req.employee._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to update this leave application' });
    }

    leave.status = status;
    await leave.save();

    res.json({
      success: true,
      message: 'Leave status updated successfully',
      leave,
    });
  } catch (error) {
    console.error('Update leave status error:', error);
    res.status(500).json({ message: 'Error updating leave status' });
  }
});

// Verify Token (for frontend)
router.get('/verify', employeeAuth, (req, res) => {
  res.json({
    success: true,
    message: 'Token is valid',
    employee: req.employee.getPublicProfile(),
  });
});

module.exports = router;
