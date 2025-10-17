# 📚 Assignment Information

## Assignment Details

**Course:** Full Stack Development (701 FS)  
**Semester:** B.SC-IT SEM-7  
**Assignment:** Assignment 3  
**Questions Covered:** Q3, Q4, Q5 (Combined Project)

---

## 🎯 Questions & Implementation

### Question 4: Admin Panel with ERP System
**Requirement:**
> Develop login for an ADMIN panel of ERP system with session, CRUD operations for employees table (generate empid and password) with salary calculation with mongoose, express and EJS template engine. Send email to employee when inserted. Encrypt the password. Logout.

**Implementation:**
- ✅ Admin login with session-based authentication
- ✅ Express + Mongoose + EJS stack
- ✅ Complete CRUD operations:
  - Create employee with auto-generated EmpID (EMP0001, EMP0002, etc.)
  - Read/View employee details
  - Update employee information
  - Delete employee records
- ✅ Auto-generate secure passwords (8 characters with special chars)
- ✅ Salary calculation: Base Salary + Allowances - Deductions
- ✅ Email credentials to employee using Nodemailer
- ✅ Password encryption using bcryptjs (salt rounds: 10)
- ✅ Logout functionality with session destroy

**Location:** `Q3/backend/` (Admin routes + EJS views)

---

### Question 5: Employee Portal Backend
**Requirement:**
> Develop employee site (refer Q4) login with JWT, for employees with mongoose, express and frontend(html,css,javascript/jquery JAM Stack), Page1) display employee profile. Page2) Application for leave (fields date, reason, grant yes/no) Add, List - Logout.

**Implementation:**
- ✅ Employee login with JWT authentication
- ✅ Token-based authentication (24-hour expiry)
- ✅ Mongoose + Express backend
- ✅ RESTful API endpoints for:
  - Login with JWT token generation
  - Profile retrieval
  - Leave application submission
  - Leave history listing
- ✅ Page 1: Employee Profile Display
  - Personal information
  - Employment details
  - Salary breakdown (base, allowances, deductions, net)
- ✅ Page 2: Leave Application System
  - Apply for leave (date + reason)
  - List all leave applications
  - Status tracking (pending/approved/rejected)
- ✅ Logout functionality (token removal)

**Location:** `Q3/backend/routes/employeeRoutes.js` (API routes)

---

### Question 3: React Frontend for Employee Portal
**Requirement:**
> Develop frontend using react for problem 5 i mention earlier

**Implementation:**
- ✅ Modern React application with:
  - React Router for navigation
  - Context API for state management (AuthContext)
  - Axios for API communication
  - JWT token management
- ✅ Pages implemented:
  - Login page with form validation
  - Dashboard with summary cards
  - Profile page (detailed employee info)
  - Leave Application page (form + history table)
- ✅ JAMstack architecture:
  - JavaScript (React)
  - APIs (Backend REST API)
  - Markup (JSX/HTML)
- ✅ Modern CSS with:
  - Responsive design
  - Gradient backgrounds
  - Smooth animations
  - Card-based layouts
- ✅ Features:
  - Protected routes with authentication
  - Token-based authentication
  - Real-time API calls
  - Error handling
  - Loading states

**Location:** `Q3/frontend/` (Complete React application)

---

## 📂 Project Structure Summary

```
Q3/
├── backend/               # Backend (Q4 Admin + Q5 Employee API)
│   ├── config/           # Database & Email configuration
│   ├── middleware/       # Auth middleware (Session + JWT)
│   ├── models/          # Mongoose schemas (Employee, Leave)
│   ├── routes/          # Admin routes + Employee API routes
│   ├── views/           # EJS templates for admin panel
│   ├── .env             # Environment variables
│   ├── server.js        # Main server file
│   └── package.json
│
├── frontend/             # React Frontend (Q3)
│   ├── public/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # Authentication context
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── App.js       # Main App component
│   └── package.json
│
├── README.md            # Complete documentation
├── QUICKSTART.md        # Quick start guide
├── ASSIGNMENT_INFO.md   # This file
├── INSTALL.bat          # Windows installation script
└── START_PROJECT.bat    # Windows startup script
```

---

## 🔑 Key Features Implemented

### Security Features
1. **Password Encryption:** bcryptjs with 10 salt rounds
2. **JWT Authentication:** Secure token-based auth with 24h expiry
3. **Session Management:** Express-session with MongoDB store
4. **Protected Routes:** Middleware authentication on all protected endpoints
5. **CORS Configuration:** Controlled cross-origin requests

### Database Features
1. **Mongoose Models:** Proper schema validation
2. **Auto-increment Employee ID:** Sequential numbering (EMP0001, EMP0002)
3. **Pre-save Hooks:** Password hashing, salary calculation
4. **Referential Integrity:** Employee-Leave relationships

### Email Features
1. **Nodemailer Integration:** Send credentials via email
2. **HTML Email Templates:** Professional email design
3. **Error Handling:** Graceful fallback if email fails

### Frontend Features
1. **React Router:** Client-side routing
2. **Context API:** Global authentication state
3. **Axios Interceptors:** Auto-attach JWT tokens
4. **Protected Routes:** Redirect to login if not authenticated
5. **Responsive Design:** Mobile-friendly UI

---

## 🎨 UI/UX Highlights

- **Color Scheme:** Purple gradient (#667eea to #764ba2)
- **Typography:** Segoe UI for clean readability
- **Layout:** Card-based design with shadows
- **Animations:** Smooth hover effects and transitions
- **Feedback:** Loading states, success/error alerts
- **Navigation:** Intuitive navbar with user info

---

## 📊 Database Schema

### Employee Collection
```javascript
{
  empId: String (unique, auto-generated),
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  department: String (required),
  position: String (required),
  baseSalary: Number (required),
  allowances: Number,
  deductions: Number,
  salary: Number (calculated),
  joiningDate: Date,
  phone: String,
  address: String,
  status: String (active/inactive),
  timestamps: true
}
```

### Leave Collection
```javascript
{
  employeeId: ObjectId (ref: Employee),
  empId: String,
  employeeName: String,
  date: Date (required),
  reason: String (required),
  status: String (pending/approved/rejected),
  appliedDate: Date,
  timestamps: true
}
```

---

## 🔗 API Endpoints

### Admin Routes (Session-based)
- `POST /admin/login` - Admin login
- `GET /admin/dashboard` - Employee list
- `GET /admin/employees/create` - Create form
- `POST /admin/employees/create` - Create employee
- `GET /admin/employees/edit/:id` - Edit form
- `POST /admin/employees/edit/:id` - Update employee
- `POST /admin/employees/delete/:id` - Delete employee
- `GET /admin/employees/view/:id` - View details
- `GET /admin/logout` - Logout

### Employee API Routes (JWT-based)
- `POST /api/employee/login` - Employee login (returns JWT)
- `GET /api/employee/profile` - Get profile (JWT protected)
- `GET /api/employee/verify` - Verify token
- `POST /api/employee/leave/apply` - Apply for leave
- `GET /api/employee/leave/list` - Get leave history

---

## 🧪 Testing Instructions

### Manual Testing Checklist

**Admin Panel:**
1. Login with admin/admin123
2. Create 2-3 employees with different details
3. Verify auto-generated empId and password
4. Check email delivery (or console log)
5. Edit employee salary components
6. Verify salary calculation
7. View employee details
8. Delete an employee
9. Logout and verify session cleared

**Employee Portal:**
1. Login with employee credentials
2. View dashboard summary
3. Navigate to profile
4. Verify all details displayed correctly
5. Apply for leave with future date
6. Check leave history table
7. Apply multiple leaves
8. Logout and verify redirect to login

**Security Testing:**
1. Try accessing protected routes without auth
2. Verify JWT token expiration
3. Check password is hashed in database
4. Test session timeout
5. Verify CORS restrictions

---

## 📝 Assignment Submission Checklist

- ✅ Q4: Admin Panel with EJS + Session Auth
- ✅ Q4: CRUD operations for employees
- ✅ Q4: Auto-generate empId and password
- ✅ Q4: Salary calculation
- ✅ Q4: Email notification
- ✅ Q4: Password encryption
- ✅ Q4: Logout functionality
- ✅ Q5: Employee login with JWT
- ✅ Q5: Profile display page
- ✅ Q5: Leave application page
- ✅ Q5: Add and List leaves
- ✅ Q5: Logout functionality
- ✅ Q3: React frontend for Q5
- ✅ Q3: Modern UI design
- ✅ Q3: JAMstack architecture
- ✅ Complete documentation
- ✅ README with setup instructions
- ✅ Code comments
- ✅ Error handling

---

## 🎓 Technologies Demonstrated

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose ODM
- EJS Template Engine
- Session Management (express-session)
- JWT Authentication (jsonwebtoken)
- Password Hashing (bcryptjs)
- Email Service (nodemailer)
- CORS handling

**Frontend:**
- React.js (Hooks, Context API)
- React Router (Client-side routing)
- Axios (HTTP client)
- Modern CSS (Flexbox, Grid)
- Responsive Design
- Form Validation

**Database:**
- MongoDB Collections
- Schema Design
- Validation
- Hooks (pre-save)
- Relationships

**Security:**
- Authentication & Authorization
- Password Encryption
- Token-based Auth
- Session Management
- Protected Routes

---

## 📞 Contact & Support

For any questions or issues:
- Check README.md for detailed documentation
- Check QUICKSTART.md for quick setup
- Review code comments for implementation details
- Check console logs for debugging

---

**Project Status:** ✅ Complete and Ready for Submission

**Date:** 2024  
**Institution:** B.SC-IT SEM-7  
**Subject:** Full Stack Development (701 FS)
