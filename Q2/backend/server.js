const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory database (for demonstration)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '5555555555', role: 'Moderator' }
];

let nextId = 4;

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// POST create new user
app.post('/api/users', (req, res) => {
  const { name, email, phone, role } = req.body;
  
  // Validation
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone are required' });
  }

  // Check if email already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const newUser = {
    id: nextId++,
    name,
    email,
    phone,
    role: role || 'User'
  };

  users.push(newUser);
  console.log('Created new user:', newUser);
  res.status(201).json(newUser);
});

// PUT update user
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, phone, role } = req.body;
  
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Check if email exists for other users
  const existingUser = users.find(u => u.email === email && u.id !== id);
  if (existingUser) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  users[userIndex] = {
    id,
    name: name || users[userIndex].name,
    email: email || users[userIndex].email,
    phone: phone || users[userIndex].phone,
    role: role || users[userIndex].role
  };

  console.log('Updated user:', users[userIndex]);
  res.json(users[userIndex]);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  console.log('Deleted user:', deletedUser);
  res.json({ message: 'User deleted successfully', user: deletedUser });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log('🚀 Express API Server is running!');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`📡 API Endpoint: http://localhost:${PORT}/api/users`);
  console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
  console.log('='.repeat(60));
  console.log('\nAvailable Routes:');
  console.log('  GET    /api/users      - Get all users');
  console.log('  GET    /api/users/:id  - Get user by ID');
  console.log('  POST   /api/users      - Create new user');
  console.log('  PUT    /api/users/:id  - Update user');
  console.log('  DELETE /api/users/:id  - Delete user');
  console.log('\nPress Ctrl+C to stop the server\n');
});

module.exports = app;
