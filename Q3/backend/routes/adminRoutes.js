const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const adminAuth = require('../middleware/adminAuth');
const { sendEmployeeCredentials } = require('../config/email');

// Generate random password
function generatePassword(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Admin Login Page
router.get('/login', (req, res) => {
  if (req.session && req.session.admin) {
    return res.redirect('/admin/dashboard');
  }
  res.render('admin/login', { error: null });
});

// Admin Login POST
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    req.session.admin = { username };
    return res.redirect('/admin/dashboard');
  }
  
  res.render('admin/login', { error: 'Invalid credentials' });
});

// Admin Dashboard
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.render('admin/dashboard', { 
      admin: req.session.admin,
      employees,
      success: req.query.success,
      error: req.query.error
    });
  } catch (error) {
    res.render('admin/dashboard', { 
      admin: req.session.admin,
      employees: [],
      error: 'Error fetching employees'
    });
  }
});

// Create Employee Page
router.get('/employees/create', adminAuth, (req, res) => {
  res.render('admin/create-employee', { 
    admin: req.session.admin,
    error: null 
  });
});

// Create Employee POST
router.post('/employees/create', adminAuth, async (req, res) => {
  try {
    const { name, email, department, position, baseSalary, allowances, deductions, phone, address } = req.body;
    
    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.render('admin/create-employee', { 
        admin: req.session.admin,
        error: 'Employee with this email already exists' 
      });
    }

    // Generate password
    const password = generatePassword();
    
    // Create employee
    const employee = new Employee({
      name,
      email,
      password,
      department,
      position,
      baseSalary: parseFloat(baseSalary) || 0,
      allowances: parseFloat(allowances) || 0,
      deductions: parseFloat(deductions) || 0,
      phone,
      address,
    });

    await employee.save();

    // Send email with credentials
    const emailResult = await sendEmployeeCredentials(employee, password);
    
    const successMessage = emailResult.success 
      ? `Employee created successfully. Credentials sent to ${email}`
      : `Employee created but email failed to send: ${emailResult.message}`;

    res.redirect(`/admin/dashboard?success=${encodeURIComponent(successMessage)}`);
  } catch (error) {
    console.error('Create employee error:', error);
    res.render('admin/create-employee', { 
      admin: req.session.admin,
      error: 'Error creating employee: ' + error.message 
    });
  }
});

// Edit Employee Page
router.get('/employees/edit/:id', adminAuth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.redirect('/admin/dashboard?error=' + encodeURIComponent('Employee not found'));
    }
    res.render('admin/edit-employee', { 
      admin: req.session.admin,
      employee,
      error: null 
    });
  } catch (error) {
    res.redirect('/admin/dashboard?error=' + encodeURIComponent('Error loading employee'));
  }
});

// Update Employee POST
router.post('/employees/edit/:id', adminAuth, async (req, res) => {
  try {
    const { name, email, department, position, baseSalary, allowances, deductions, phone, address, status } = req.body;
    
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.redirect('/admin/dashboard?error=' + encodeURIComponent('Employee not found'));
    }

    // Update fields
    employee.name = name;
    employee.email = email;
    employee.department = department;
    employee.position = position;
    employee.baseSalary = parseFloat(baseSalary) || 0;
    employee.allowances = parseFloat(allowances) || 0;
    employee.deductions = parseFloat(deductions) || 0;
    employee.phone = phone;
    employee.address = address;
    employee.status = status;

    await employee.save();

    res.redirect('/admin/dashboard?success=' + encodeURIComponent('Employee updated successfully'));
  } catch (error) {
    console.error('Update employee error:', error);
    const employee = await Employee.findById(req.params.id);
    res.render('admin/edit-employee', { 
      admin: req.session.admin,
      employee,
      error: 'Error updating employee: ' + error.message 
    });
  }
});

// Delete Employee
router.post('/employees/delete/:id', adminAuth, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.redirect('/admin/dashboard?error=' + encodeURIComponent('Employee not found'));
    }
    res.redirect('/admin/dashboard?success=' + encodeURIComponent('Employee deleted successfully'));
  } catch (error) {
    res.redirect('/admin/dashboard?error=' + encodeURIComponent('Error deleting employee'));
  }
});

// View Employee Details
router.get('/employees/view/:id', adminAuth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.redirect('/admin/dashboard?error=' + encodeURIComponent('Employee not found'));
    }
    res.render('admin/view-employee', { 
      admin: req.session.admin,
      employee 
    });
  } catch (error) {
    res.redirect('/admin/dashboard?error=' + encodeURIComponent('Error loading employee'));
  }
});

// Admin Logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destroy error:', err);
    }
    res.redirect('/admin/login');
  });
});

module.exports = router;
