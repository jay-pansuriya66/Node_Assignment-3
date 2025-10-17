# ERP System - Employee Management Portal

A comprehensive Employee Resource Planning (ERP) system with Admin Panel and Employee Portal built with the MERN stack (MongoDB, Express, React, Node.js).

## 🎯 Features

### Admin Panel (Q4 - Session-based Authentication with EJS)
- **Session-based Authentication**: Secure login system using express-session
- **Employee CRUD Operations**:
  - Create new employees with auto-generated Employee ID and password
  - Read/View employee details
  - Update employee information
  - Delete employee records
- **Salary Calculation**: Automatic calculation (Base Salary + Allowances - Deductions)
- **Password Encryption**: Bcrypt-based password hashing
- **Email Notifications**: Send credentials to employees via email on registration
- **Beautiful EJS Templates**: Modern, responsive UI with gradient design

### Employee Portal (Q5 - JWT Authentication with React Frontend - Q3)
- **JWT-based Authentication**: Secure token-based authentication
- **Profile Management**: View detailed employee profile
- **Leave Application System**:
  - Apply for leave with date and reason
  - View leave history
  - Track leave status (Pending/Approved/Rejected)
- **Modern React UI**: Beautiful, responsive interface with gradient design
- **Real-time Updates**: Live data synchronization with backend

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **EJS** - Template engine for admin panel
- **express-session** - Session management for admin
- **JWT** - Token-based authentication for employees
- **bcryptjs** - Password encryption
- **Nodemailer** - Email service
- **CORS** - Cross-origin resource sharing

### Frontend (Employee Portal)
- **React** - JavaScript library for UI
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Modern CSS** - Custom styling with gradient design

## 📁 Project Structure

```
Q3/
├── backend/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── email.js             # Email configuration
│   ├── middleware/
│   │   ├── adminAuth.js         # Admin session authentication
│   │   └── employeeAuth.js      # JWT authentication
│   ├── models/
│   │   ├── Employee.js          # Employee schema
│   │   └── Leave.js             # Leave application schema
│   ├── routes/
│   │   ├── adminRoutes.js       # Admin panel routes
│   │   └── employeeRoutes.js    # Employee API routes
│   ├── views/
│   │   ├── admin/               # EJS templates
│   │   │   ├── login.ejs
│   │   │   ├── dashboard.ejs
│   │   │   ├── create-employee.ejs
│   │   │   ├── edit-employee.ejs
│   │   │   └── view-employee.ejs
│   │   └── layout.ejs
│   ├── .env                     # Environment variables
│   ├── .env.example             # Example environment file
│   ├── package.json
│   └── server.js                # Entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Navbar.css
    │   │   └── PrivateRoute.js
    │   ├── context/
    │   │   └── AuthContext.js   # Authentication state management
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Login.css
    │   │   ├── Dashboard.js
    │   │   ├── Dashboard.css
    │   │   ├── Profile.js
    │   │   ├── Profile.css
    │   │   ├── LeaveApplication.js
    │   │   └── LeaveApplication.css
    │   ├── services/
    │   │   └── api.js           # API service with Axios
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd Q3/backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/erp_system
SESSION_SECRET=your_session_secret_key
JWT_SECRET=your_jwt_secret_key

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Start the backend server:
```bash
npm start
# or for development with nodemon
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd Q3/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📧 Email Configuration (Important!)

To enable email functionality:

1. **For Gmail:**
   - Enable 2-Factor Authentication
   - Generate an App Password: https://myaccount.google.com/apppasswords
   - Use the app password in `.env` file

2. **For other email providers:**
   - Update `EMAIL_HOST` and `EMAIL_PORT` accordingly
   - Use appropriate credentials

**Note:** If email is not configured, employee creation will still work, but credentials won't be sent via email. They will be displayed in the backend console.

## 🔐 Default Credentials

### Admin Panel
- **URL:** `http://localhost:5000/admin/login`
- **Username:** `admin`
- **Password:** `admin123`

### Employee Portal
- **URL:** `http://localhost:3000/login`
- **Credentials:** Created by admin (empId + password sent via email)

## 🎮 Usage

### Admin Workflow

1. **Login to Admin Panel:**
   - Go to `http://localhost:5000/admin/login`
   - Use default credentials (admin/admin123)

2. **Create Employee:**
   - Click "Add New Employee"
   - Fill in employee details
   - System auto-generates Employee ID and password
   - Credentials sent to employee's email

3. **Manage Employees:**
   - View all employees in dashboard
   - Edit employee information
   - Update salary components (base, allowances, deductions)
   - Delete employees
   - View detailed employee profile

4. **Logout:**
   - Click "Logout" in navbar

### Employee Workflow

1. **Login:**
   - Go to `http://localhost:3000/login`
   - Enter Employee ID and password (received via email)

2. **View Profile:**
   - Navigate to "Profile" to see personal and salary information

3. **Apply for Leave:**
   - Go to "Leave Application"
   - Click "Apply for Leave"
   - Select date and enter reason
   - Submit application

4. **View Leave History:**
   - See all leave applications with status
   - Track pending, approved, or rejected leaves

5. **Logout:**
   - Click "Logout" in navbar

## 🔒 Security Features

- **Password Encryption:** Bcrypt with salt rounds
- **JWT Authentication:** Secure token-based auth for employees
- **Session Management:** Secure session storage with MongoDB
- **HTTP-only Cookies:** Protection against XSS attacks
- **CORS Configuration:** Controlled cross-origin requests
- **Token Expiration:** JWT tokens expire after 24 hours
- **Protected Routes:** Middleware authentication on all protected routes

## 🌟 Key Features Explained

### Salary Calculation
- **Formula:** Net Salary = Base Salary + Allowances - Deductions
- Automatically calculated on save
- Real-time updates in admin panel and employee profile

### Employee ID Generation
- Auto-generated format: `EMP0001`, `EMP0002`, etc.
- Sequential numbering
- Unique for each employee

### Leave Management
- Date-based leave applications
- Status tracking (Pending by default)
- Admin can approve/reject (via API - can be extended)
- History maintained for each employee

## 🔄 API Endpoints

### Admin Routes (Session-based)
- `GET /admin/login` - Login page
- `POST /admin/login` - Login handler
- `GET /admin/dashboard` - Dashboard with employee list
- `GET /admin/employees/create` - Create employee form
- `POST /admin/employees/create` - Create employee handler
- `GET /admin/employees/edit/:id` - Edit employee form
- `POST /admin/employees/edit/:id` - Update employee handler
- `POST /admin/employees/delete/:id` - Delete employee
- `GET /admin/employees/view/:id` - View employee details
- `GET /admin/logout` - Logout handler

### Employee API Routes (JWT-based)
- `POST /api/employee/login` - Employee login
- `GET /api/employee/profile` - Get employee profile
- `GET /api/employee/verify` - Verify JWT token
- `POST /api/employee/leave/apply` - Apply for leave
- `GET /api/employee/leave/list` - Get all leaves

## 🎨 UI/UX Features

- **Gradient Background:** Beautiful purple gradient theme
- **Responsive Design:** Works on desktop, tablet, and mobile
- **Modern Cards:** Clean card-based layout
- **Smooth Animations:** Hover effects and transitions
- **Status Badges:** Color-coded status indicators
- **Form Validation:** Client and server-side validation
- **Error Handling:** User-friendly error messages
- **Loading States:** Visual feedback during operations

## 🐛 Troubleshooting

### Backend Issues

1. **MongoDB Connection Error:**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env file
   - Verify network connectivity

2. **Email Not Sending:**
   - Check email credentials in .env
   - Verify app password (for Gmail)
   - Check console for error messages

3. **Session Issues:**
   - Clear browser cookies
   - Restart backend server
   - Check SESSION_SECRET in .env

### Frontend Issues

1. **Cannot Connect to Backend:**
   - Ensure backend is running on port 5000
   - Check proxy setting in package.json
   - Verify CORS configuration

2. **Token Expired:**
   - Login again
   - Token valid for 24 hours

3. **Build Errors:**
   - Delete node_modules and package-lock.json
   - Run `npm install` again
   - Clear npm cache: `npm cache clean --force`

## 📝 Assignment Requirements Fulfilled

### Question 4 (Admin Panel)
✅ Login for ADMIN panel  
✅ Session-based authentication  
✅ CRUD operations for employees  
✅ Auto-generate Employee ID and password  
✅ Salary calculation with mongoose  
✅ Express and EJS template engine  
✅ Send email to employee when inserted  
✅ Password encryption (bcrypt)  
✅ Logout functionality  

### Question 5 (Employee Backend)
✅ Employee login with JWT  
✅ Mongoose and Express backend  
✅ Profile display (Page 1)  
✅ Leave application system (Page 2)  
✅ Add and List leave applications  
✅ Logout functionality  

### Question 3 (React Frontend)
✅ React-based frontend for Question 5  
✅ Modern UI with HTML/CSS/JavaScript  
✅ JAMstack architecture  
✅ Profile page  
✅ Leave application page with Add/List  
✅ JWT authentication integration  

## 🚀 Future Enhancements

- Admin dashboard for leave approval/rejection
- Employee password change functionality
- File upload for documents
- Attendance tracking
- Payroll management
- Performance reviews
- Department-wise filtering
- Advanced search and filters
- Export to PDF/Excel
- Real-time notifications
- Multi-language support

## 📄 License

This project is created for educational purposes as part of Full Stack Development assignment.

## 👨‍💻 Author

Created as Assignment 3 for B.SC-IT SEM-7, Full Stack Development Course.

## 🙏 Acknowledgments

- Express.js documentation
- React documentation
- MongoDB documentation
- Nodemailer documentation
- bcryptjs library
- JWT library

---

**Note:** Make sure to change default credentials and secrets in production environment!
