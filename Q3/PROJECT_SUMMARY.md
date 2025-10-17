# 🎯 ERP System - Project Summary

## Overview
Complete Employee Resource Planning (ERP) system combining **Questions 3, 4, and 5** into a single comprehensive full-stack application.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    ERP SYSTEM                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────┐         ┌──────────────────┐    │
│  │  Admin Panel     │         │ Employee Portal   │    │
│  │  (EJS + Session) │         │ (React + JWT)     │    │
│  │                  │         │                   │    │
│  │  • Login         │         │  • Login          │    │
│  │  • Dashboard     │         │  • Dashboard      │    │
│  │  • CRUD Employees│         │  • Profile        │    │
│  │  • Salary Calc   │         │  • Leave App      │    │
│  │  • Email Send    │         │  • Leave History  │    │
│  └────────┬─────────┘         └──────────┬────────┘    │
│           │                              │             │
│           ├──────────────┬───────────────┤             │
│           │              │               │             │
│  ┌────────▼──────────────▼───────────────▼────────┐   │
│  │         Express.js Backend Server              │   │
│  │  • Session Management (Admin)                  │   │
│  │  • JWT Authentication (Employee)               │   │
│  │  • RESTful APIs                                │   │
│  │  • Email Service                               │   │
│  └────────┬───────────────────────────────────────┘   │
│           │                                            │
│  ┌────────▼────────────────────────────────────────┐  │
│  │         MongoDB Database                        │  │
│  │  • Employees Collection                         │  │
│  │  • Leave Applications Collection                │  │
│  │  • Sessions Collection                          │  │
│  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 Project Components

### 1. Backend Server (Node.js + Express)
**Location:** `Q3/backend/`

**Key Features:**
- Dual authentication system (Session + JWT)
- RESTful API architecture
- Email notifications
- Password encryption
- Salary auto-calculation

**Tech Stack:**
- Express.js - Web framework
- Mongoose - MongoDB ODM
- EJS - Template engine
- bcryptjs - Password hashing
- jsonwebtoken - JWT tokens
- nodemailer - Email service
- express-session - Session management

### 2. Admin Panel (EJS Templates)
**Location:** `Q3/backend/views/admin/`

**Pages:**
- Login page
- Dashboard with employee list
- Create employee form
- Edit employee form
- View employee details

**Features:**
- Session-based authentication
- Full CRUD operations
- Auto-generate empId and password
- Salary calculation UI
- Responsive design

### 3. Employee Portal (React)
**Location:** `Q3/frontend/`

**Pages:**
- Login page
- Dashboard with summary cards
- Profile page with detailed info
- Leave application page

**Features:**
- JWT-based authentication
- Context API for state management
- Protected routes
- Real-time API integration
- Modern responsive UI

---

## 🔐 Authentication Systems

### Admin Authentication (Session-based)
```
Admin Login → Create Session → Store in MongoDB → Set Cookie
                                                   ↓
                          Access Protected Routes ←┘
```

**Flow:**
1. Admin enters username/password
2. Server validates credentials
3. Creates session in MongoDB
4. Sets session cookie in browser
5. Cookie sent with each request
6. Middleware validates session

### Employee Authentication (JWT)
```
Employee Login → Generate JWT Token → Return to Client
                                      ↓
                     Store in LocalStorage
                                      ↓
                     Attach to API Requests (Authorization Header)
                                      ↓
                     Middleware Validates Token
```

**Flow:**
1. Employee enters empId/password
2. Server validates credentials
3. Generates JWT token (24h expiry)
4. Client stores token in localStorage
5. Token sent with each API request
6. Middleware validates token

---

## 💾 Database Schema

### Employees Collection
```javascript
{
  _id: ObjectId,
  empId: "EMP0001",           // Auto-generated
  name: "John Doe",
  email: "john@company.com",
  password: "$2a$10$...",      // Hashed with bcrypt
  department: "IT",
  position: "Developer",
  baseSalary: 50000,
  allowances: 5000,
  deductions: 2000,
  salary: 53000,              // Calculated: base + allowances - deductions
  joiningDate: ISODate("2024-01-15"),
  phone: "+91 9876543210",
  address: "123 Main St",
  status: "active",
  createdAt: ISODate("2024-01-15"),
  updatedAt: ISODate("2024-01-15")
}
```

### Leave Applications Collection
```javascript
{
  _id: ObjectId,
  employeeId: ObjectId("..."), // Reference to Employee
  empId: "EMP0001",
  employeeName: "John Doe",
  date: ISODate("2024-02-20"),
  reason: "Personal work",
  status: "pending",           // pending, approved, rejected
  appliedDate: ISODate("2024-01-15"),
  createdAt: ISODate("2024-01-15"),
  updatedAt: ISODate("2024-01-15")
}
```

### Sessions Collection (Auto-managed)
```javascript
{
  _id: "session_id",
  expires: ISODate("2024-01-16"),
  session: {
    cookie: {...},
    admin: { username: "admin" }
  }
}
```

---

## 🔄 Core Workflows

### 1. Employee Creation Workflow
```
Admin Dashboard
    ↓
Click "Add New Employee"
    ↓
Fill Form (name, email, dept, position, salary components)
    ↓
Submit Form
    ↓
Backend Processing:
  • Auto-generate empId (EMP0001, EMP0002...)
  • Generate random password (8 chars + special)
  • Calculate net salary
  • Hash password with bcrypt
  • Save to MongoDB
  • Send email with credentials
    ↓
Success → Redirect to Dashboard
    ↓
Employee receives email with empId and password
```

### 2. Employee Login & Profile View
```
Employee Portal Login
    ↓
Enter empId + password
    ↓
Backend validates credentials
    ↓
Generate JWT token (24h expiry)
    ↓
Return token + employee data
    ↓
Client stores token in localStorage
    ↓
Redirect to Dashboard
    ↓
View Profile → API call with JWT token
    ↓
Display employee details and salary breakdown
```

### 3. Leave Application Workflow
```
Employee Dashboard
    ↓
Navigate to "Leave Application"
    ↓
Click "Apply for Leave"
    ↓
Fill form (date, reason)
    ↓
Submit form
    ↓
API call with JWT token
    ↓
Backend validation:
  • Verify JWT token
  • Validate date (not in past)
  • Create leave record (status: pending)
    ↓
Save to MongoDB
    ↓
Return success
    ↓
Update leave history table
```

---

## 🎨 UI/UX Design

### Color Palette
- **Primary:** #667eea (Purple Blue)
- **Secondary:** #764ba2 (Purple)
- **Success:** #27ae60 (Green)
- **Danger:** #e74c3c (Red)
- **Warning:** #f39c12 (Orange)
- **Info:** #3498db (Blue)

### Design Principles
- **Gradient Background:** Purple gradient for modern look
- **Card-based Layout:** Clean separation of content
- **Responsive Design:** Mobile-first approach
- **Smooth Animations:** Hover effects and transitions
- **Clear Typography:** Segoe UI for readability
- **Status Indicators:** Color-coded badges
- **Form Validation:** Real-time feedback

---

## 📊 API Endpoints Reference

### Admin API (Session-protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/login` | Login page |
| POST | `/admin/login` | Login handler |
| GET | `/admin/dashboard` | Employee list |
| GET | `/admin/employees/create` | Create form |
| POST | `/admin/employees/create` | Create employee |
| GET | `/admin/employees/edit/:id` | Edit form |
| POST | `/admin/employees/edit/:id` | Update employee |
| POST | `/admin/employees/delete/:id` | Delete employee |
| GET | `/admin/employees/view/:id` | View details |
| GET | `/admin/logout` | Logout |

### Employee API (JWT-protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/employee/login` | Login & get token |
| GET | `/api/employee/profile` | Get profile |
| GET | `/api/employee/verify` | Verify token |
| POST | `/api/employee/leave/apply` | Apply leave |
| GET | `/api/employee/leave/list` | Get leaves |

---

## 🔒 Security Implementation

### 1. Password Security
- **Hashing Algorithm:** bcrypt
- **Salt Rounds:** 10
- **Storage:** Never store plain passwords
- **Generation:** Random 8-char with special characters

### 2. Authentication Security
- **Admin:** Session-based with secure cookies
- **Employee:** JWT with 24-hour expiration
- **Token Storage:** LocalStorage (client-side)
- **Session Storage:** MongoDB with auto-expiry

### 3. API Security
- **Middleware Protection:** All routes protected
- **Token Validation:** JWT signature verification
- **Session Validation:** Check session existence
- **CORS:** Controlled origins only
- **Error Handling:** No sensitive data in errors

### 4. Input Validation
- **Client-side:** HTML5 validation + React validation
- **Server-side:** Mongoose schema validation
- **Sanitization:** Express body parsing
- **XSS Protection:** EJS auto-escaping

---

## 📈 Performance Optimizations

1. **Database Indexing**
   - Index on empId (unique)
   - Index on email (unique)
   - Index on employeeId in leaves

2. **Session Management**
   - MongoDB session store
   - Auto-cleanup of expired sessions
   - 24-hour session lifetime

3. **Frontend Optimization**
   - React Context for global state
   - Conditional rendering
   - Lazy loading of routes (can be added)

4. **API Optimization**
   - Selective field projection
   - Proper error handling
   - Response caching headers (can be added)

---

## 🧪 Testing Guide

### Manual Testing Steps

**Admin Panel Testing:**
```
1. Login Test
   - Valid credentials → Success
   - Invalid credentials → Error message
   - Session persistence → Still logged in on refresh

2. Create Employee
   - Complete form → Success
   - Check empId generated (EMP0001)
   - Check password generated
   - Check email sent/logged
   - Verify salary calculated correctly

3. Read Employees
   - View dashboard → All employees listed
   - Click "View" → See full details

4. Update Employee
   - Click "Edit" → Form pre-filled
   - Modify salary → Recalculated
   - Change status → Updated

5. Delete Employee
   - Click "Delete" → Confirmation
   - Confirm → Employee removed
```

**Employee Portal Testing:**
```
1. Login Test
   - Valid empId/password → Success + JWT token
   - Invalid credentials → Error message
   - Token stored → Check localStorage

2. Profile View
   - All details displayed
   - Salary breakdown correct
   - Status badge shown

3. Leave Application
   - Fill form with future date → Success
   - Fill with past date → Error
   - View in history → Listed with "pending"
   - Apply multiple leaves → All listed

4. Logout Test
   - Click logout → Token removed
   - Redirect to login
   - Cannot access protected routes
```

---

## 📦 File Structure

```
Q3/
├── backend/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── email.js             # Nodemailer config + send function
│   ├── middleware/
│   │   ├── adminAuth.js         # Session validation
│   │   └── employeeAuth.js      # JWT validation
│   ├── models/
│   │   ├── Employee.js          # Employee schema with hooks
│   │   └── Leave.js             # Leave schema
│   ├── routes/
│   │   ├── adminRoutes.js       # Admin CRUD routes
│   │   └── employeeRoutes.js    # Employee API routes
│   ├── views/
│   │   ├── admin/
│   │   │   ├── login.ejs        # Admin login page
│   │   │   ├── dashboard.ejs    # Employee list
│   │   │   ├── create-employee.ejs
│   │   │   ├── edit-employee.ejs
│   │   │   └── view-employee.ejs
│   │   └── layout.ejs           # Base layout
│   ├── .env                     # Environment variables
│   ├── .env.example             # Example env file
│   ├── .gitignore
│   ├── package.json
│   └── server.js                # Main server file
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js        # Navigation component
│   │   │   ├── Navbar.css
│   │   │   └── PrivateRoute.js  # Auth guard
│   │   ├── context/
│   │   │   └── AuthContext.js   # Global auth state
│   │   ├── pages/
│   │   │   ├── Login.js         # Employee login
│   │   │   ├── Login.css
│   │   │   ├── Dashboard.js     # Employee dashboard
│   │   │   ├── Dashboard.css
│   │   │   ├── Profile.js       # Employee profile
│   │   │   ├── Profile.css
│   │   │   ├── LeaveApplication.js
│   │   │   └── LeaveApplication.css
│   │   ├── services/
│   │   │   └── api.js           # Axios config + API calls
│   │   ├── App.js               # Main app with routing
│   │   ├── App.css
│   │   ├── index.js             # React entry point
│   │   └── index.css            # Global styles
│   ├── .gitignore
│   └── package.json
│
├── README.md                    # Complete documentation
├── QUICKSTART.md                # Quick start guide
├── ASSIGNMENT_INFO.md           # Assignment details
├── PROJECT_SUMMARY.md           # This file
├── INSTALL.bat                  # Installation script
└── START_PROJECT.bat            # Startup script
```

---

## 🚀 Quick Commands

### Installation
```bash
# Option 1: Using batch file (Windows)
INSTALL.bat

# Option 2: Manual installation
cd Q3/backend && npm install
cd Q3/frontend && npm install
```

### Running the Project
```bash
# Option 1: Using batch file (Windows)
START_PROJECT.bat

# Option 2: Manual start
# Terminal 1
cd Q3/backend
npm start

# Terminal 2
cd Q3/frontend
npm start
```

### Accessing the Application
- **Landing Page:** http://localhost:5000
- **Admin Panel:** http://localhost:5000/admin/login
- **Employee Portal:** http://localhost:3000

---

## 📝 Configuration Checklist

- [x] MongoDB running on localhost:27017
- [x] Backend .env file configured
- [x] Admin credentials set (admin/admin123)
- [x] Email credentials (optional for testing)
- [x] Node.js dependencies installed
- [x] Ports 5000 and 3000 available

---

## 🎓 Learning Outcomes

This project demonstrates proficiency in:

1. **Full-Stack Development**
   - Frontend (React) and Backend (Node.js) integration
   - RESTful API design and implementation
   - Database design and management

2. **Authentication & Authorization**
   - Session-based authentication
   - JWT token-based authentication
   - Middleware implementation
   - Protected routes

3. **Database Management**
   - MongoDB with Mongoose
   - Schema design
   - Validation and hooks
   - Relationships

4. **Security Best Practices**
   - Password hashing
   - Token management
   - Input validation
   - Error handling

5. **Modern Web Technologies**
   - React with Hooks and Context API
   - Express.js middleware
   - EJS templating
   - Responsive CSS design

6. **Email Integration**
   - Nodemailer configuration
   - HTML email templates
   - Error handling

---

## ✅ Assignment Completion Status

| Question | Requirement | Status |
|----------|-------------|--------|
| **Q4** | Admin login with session | ✅ Complete |
| **Q4** | CRUD operations | ✅ Complete |
| **Q4** | Auto-generate empId & password | ✅ Complete |
| **Q4** | Salary calculation | ✅ Complete |
| **Q4** | Email notification | ✅ Complete |
| **Q4** | Password encryption | ✅ Complete |
| **Q4** | Logout | ✅ Complete |
| **Q5** | Employee login with JWT | ✅ Complete |
| **Q5** | Profile display | ✅ Complete |
| **Q5** | Leave application | ✅ Complete |
| **Q5** | Leave listing | ✅ Complete |
| **Q5** | Logout | ✅ Complete |
| **Q3** | React frontend | ✅ Complete |
| **Q3** | Modern UI/UX | ✅ Complete |
| **Q3** | JAMstack architecture | ✅ Complete |

**Overall Project Status:** ✅ **100% Complete**

---

## 📞 Support & Documentation

- **Complete Setup:** See `README.md`
- **Quick Start:** See `QUICKSTART.md`
- **Assignment Details:** See `ASSIGNMENT_INFO.md`
- **This Summary:** `PROJECT_SUMMARY.md`

---

**Project Developed For:**  
B.SC-IT SEM-7 | Full Stack Development (701 FS) | Assignment 3  
**Date:** 2024
