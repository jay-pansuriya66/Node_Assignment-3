# 🚀 Quick Start Guide

## Quick Setup (5 Minutes)

### Step 1: Install Dependencies

**Backend:**
```bash
cd Q3/backend
npm install
```

**Frontend:**
```bash
cd Q3/frontend
npm install
```

### Step 2: Configure Environment

Edit `backend/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/erp_system
SESSION_SECRET=erp_session_secret_2024
JWT_SECRET=erp_jwt_secret_2024

# Email (Optional - for testing, leave as is)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Admin Login
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Step 3: Start MongoDB

```bash
# Windows
mongod

# Or if you have MongoDB as a service
net start MongoDB
```

### Step 4: Run the Application

**Terminal 1 - Backend:**
```bash
cd Q3/backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd Q3/frontend
npm start
```

### Step 5: Access the Application

- **Main Landing Page:** http://localhost:5000
- **Admin Panel:** http://localhost:5000/admin/login
  - Username: `admin`
  - Password: `admin123`
- **Employee Portal:** http://localhost:3000

## 📋 Quick Test Workflow

### 1. Admin Creates Employee

1. Login to admin panel: http://localhost:5000/admin/login
2. Click "Add New Employee"
3. Fill in details:
   - Name: John Doe
   - Email: john@example.com
   - Department: IT
   - Position: Developer
   - Base Salary: 50000
   - Allowances: 5000
   - Deductions: 2000
4. Click "Create Employee"
5. Note the Employee ID (e.g., EMP0001) and password from console or email

### 2. Employee Login

1. Go to: http://localhost:3000
2. Login with:
   - Employee ID: EMP0001
   - Password: (from email or console)
3. View profile and salary details
4. Apply for leave

### 3. Test Leave Application

1. Click "Leave Application"
2. Click "Apply for Leave"
3. Select a future date
4. Enter reason
5. Submit
6. View in leave history

## 🔧 Common Issues & Quick Fixes

### MongoDB Not Running
```bash
# Windows
net start MongoDB

# Or start manually
mongod
```

### Port Already in Use
```bash
# Kill process on port 5000
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# Or change port in backend/.env
PORT=5001
```

### Email Not Working
**Solution:** Email is optional for testing. Credentials will be shown in backend console:
```
Email sent successfully to john@example.com
Employee ID: EMP0001
Password: Abc12345
```

### React Not Starting
```bash
cd Q3/frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

## 📊 Sample Test Data

Use these for testing:

**Employee 1:**
- Name: Alice Johnson
- Email: alice@company.com
- Department: HR
- Position: HR Manager
- Base Salary: 60000
- Allowances: 8000
- Deductions: 3000

**Employee 2:**
- Name: Bob Smith
- Email: bob@company.com
- Department: Finance
- Position: Accountant
- Base Salary: 55000
- Allowances: 6000
- Deductions: 2500

## 🎯 Testing Checklist

**Admin Panel:**
- [ ] Login with admin credentials
- [ ] Create new employee
- [ ] View employee list
- [ ] Edit employee details
- [ ] View employee profile
- [ ] Delete employee
- [ ] Logout

**Employee Portal:**
- [ ] Login with employee credentials
- [ ] View dashboard
- [ ] View profile
- [ ] Apply for leave
- [ ] View leave history
- [ ] Logout

## 📸 Expected Screenshots

1. **Admin Login** - Purple gradient background with login form
2. **Admin Dashboard** - Employee list with CRUD buttons
3. **Create Employee** - Form with salary calculation
4. **Employee Login** - Modern login page
5. **Employee Dashboard** - Cards showing profile summary
6. **Profile Page** - Detailed information with salary breakdown
7. **Leave Application** - Form and history table

## 🎨 UI Features to Notice

- Purple gradient background (#667eea to #764ba2)
- Smooth hover animations
- Color-coded status badges
- Responsive design
- Clean card-based layout
- Modern typography

## 💡 Pro Tips

1. **For Demo:** Create 3-4 employees first to showcase the list view
2. **Testing Email:** Use a Gmail account with app password enabled
3. **Password:** Auto-generated passwords are shown in console
4. **Salary:** Formula is Base + Allowances - Deductions
5. **Leave Status:** Defaults to "pending" (admin approval can be added later)

## 🆘 Need Help?

Check the main README.md for:
- Complete documentation
- API endpoints
- Troubleshooting guide
- Architecture details
- Security features

---

**Ready to go!** 🚀 Start both servers and access http://localhost:5000
