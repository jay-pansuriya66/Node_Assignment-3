require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
const adminRoutes = require('./routes/adminRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration for admin
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    touchAfter: 24 * 3600
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
  }
}));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ERP System</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .container {
          background: white;
          padding: 60px;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          text-align: center;
          max-width: 600px;
        }
        h1 {
          color: #667eea;
          font-size: 42px;
          margin-bottom: 20px;
        }
        p {
          color: #666;
          font-size: 18px;
          margin-bottom: 40px;
        }
        .links {
          display: flex;
          gap: 20px;
          justify-content: center;
        }
        .btn {
          padding: 15px 40px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 18px;
          font-weight: 500;
          transition: all 0.3s;
          display: inline-block;
        }
        .btn-admin {
          background: #667eea;
          color: white;
        }
        .btn-admin:hover {
          background: #5568d3;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
        .btn-employee {
          background: #27ae60;
          color: white;
        }
        .btn-employee:hover {
          background: #229954;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(39, 174, 96, 0.4);
        }
        .info {
          margin-top: 40px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
          text-align: left;
        }
        .info h3 {
          color: #333;
          margin-bottom: 10px;
        }
        .info p {
          font-size: 14px;
          margin-bottom: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🏢 ERP System</h1>
        <p>Welcome to the Employee Resource Planning System</p>
        
        <div class="links">
          <a href="/admin/login" class="btn btn-admin">🔐 Admin Panel</a>
          <a href="http://localhost:3000" class="btn btn-employee">👤 Employee Portal</a>
        </div>

        <div class="info">
          <h3>📝 Information:</h3>
          <p><strong>Admin Panel:</strong> Login with default credentials (admin/admin123)</p>
          <p><strong>Employee Portal:</strong> React-based frontend (run on port 3000)</p>
          <p><strong>API Endpoint:</strong> http://localhost:${PORT}/api/employee</p>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Admin routes (with EJS views)
app.use('/admin', adminRoutes);

// Employee API routes (for React frontend)
app.use('/api/employee', employeeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════════════╗
  ║                                                       ║
  ║          🏢 ERP SYSTEM BACKEND SERVER                ║
  ║                                                       ║
  ║  Server running on: http://localhost:${PORT}        ║
  ║  Admin Panel: http://localhost:${PORT}/admin/login  ║
  ║  API Endpoint: http://localhost:${PORT}/api/employee║
  ║                                                       ║
  ║  Environment: ${process.env.NODE_ENV || 'development'}                          ║
  ║  Database: ${process.env.MONGODB_URI}              ║
  ║                                                       ║
  ╚═══════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
