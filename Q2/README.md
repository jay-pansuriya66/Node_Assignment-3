# Vite React Application - Complete Feature Showcase

A comprehensive React application built with Vite, Bootstrap, React Router, and Express API demonstrating various React concepts and features.

## 🎯 Features Implemented

### 1. **Function Components** ✅
All components are built using modern React function components with hooks.

### 2. **Conditional Rendering** ✅
- Login/Dashboard conditional display
- Status-based rendering (loading, error, success)
- Theme toggle with ternary operators
- Multiple conditional patterns demonstrated

### 3. **Lists & Nested Components** ✅
- Product listing with categories
- Nested comment system (recursive components)
- Shopping cart functionality
- Grouped data rendering

### 4. **Children & Containment** ✅
- Card component with children
- Modal component
- Tabs component
- Layout components with slots
- Panel with header/body/footer
- Multiple composition patterns

### 5. **Forms with useState & useRef** ✅
- Controlled forms using useState
- Uncontrolled forms using useRef
- Multiple input types (text, email, password, select, radio, checkbox)
- Form validation
- Focus management with useRef

### 6. **Digital Clock (useState & useEffect)** ✅
- Live clock updating every second
- 12/24 hour format toggle
- Date and time breakdown
- Timezone display
- Cleanup with useEffect

### 7. **Live Form Validation** ✅
- Real-time validation as you type
- Password strength meter
- Email format validation
- Phone number validation
- URL validation
- Visual feedback (valid/invalid states)
- Touch-based validation

### 8. **Live Data Filtering** ✅
- Real-time search filtering
- Category and brand filters
- Price range filtering
- Rating filter
- Stock availability filter
- Sorting (name, price, rating)
- Search term highlighting
- useMemo for performance

### 9. **CRUD Operations with Express API** ✅
- Complete Create, Read, Update, Delete functionality
- Frontend: React with Axios
- Backend: Express.js REST API
- In-memory database
- Error handling
- Loading states

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite 5** - Build tool and dev server
- **React Router 6** - Client-side routing
- **Bootstrap 5** - CSS framework
- **Axios** - HTTP client

### Backend
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Body-parser** - Request body parsing

## 📁 Project Structure

```
Q2/
├── backend/
│   ├── server.js           # Express API server
│   └── package.json        # Backend dependencies
├── src/
│   ├── components/
│   │   ├── Home.jsx                    # Home page
│   │   ├── ConditionalRendering.jsx    # Requirement 2
│   │   ├── ListsAndNested.jsx          # Requirement 2
│   │   ├── ChildrenContainment.jsx     # Requirement 2
│   │   ├── FormComponent.jsx           # Requirement 3
│   │   ├── DigitalClock.jsx            # Requirement 4
│   │   ├── LiveValidation.jsx          # Requirement 5
│   │   ├── LiveDataFilter.jsx          # Requirement 6
│   │   └── CrudOperations.jsx          # Requirement 7
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── package.json            # Frontend dependencies
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install Frontend Dependencies**
   ```bash
   cd "j:/B.SC-IT SEM-7/701 FS/pre/Assignment_3/Q2"
   npm install
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

### Running the Application

#### Option 1: Run Both Servers Simultaneously
```bash
npm start
```
This will start both the Vite dev server (port 5173) and Express API server (port 3001).

#### Option 2: Run Separately

**Terminal 1 - Frontend:**
```bash
npm run dev
```
Access at: http://localhost:5173

**Terminal 2 - Backend:**
```bash
npm run server
```
or
```bash
cd backend
node server.js
```
API runs at: http://localhost:3001

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |
| GET | `/api/health` | Health check |

### API Request Examples

**Create User:**
```json
POST /api/users
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "role": "User"
}
```

**Update User:**
```json
PUT /api/users/1
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "phone": "9876543210",
  "role": "Admin"
}
```

## 🎨 Components Overview

### 1. Home Component
- Welcome page with feature cards
- Navigation to all components
- Project overview

### 2. Conditional Rendering
- Login/Logout system
- Status indicators
- Theme toggle
- Multiple conditional patterns

### 3. Lists & Nested Components
- Product catalog with categories
- Nested comment system
- Shopping cart
- Dynamic lists

### 4. Children & Containment
- Reusable Card component
- Modal component
- Tabs component
- Layout patterns
- Component composition

### 5. Form Component
- Controlled forms (useState)
- Uncontrolled forms (useRef)
- Multiple input types
- Form submission handling

### 6. Digital Clock
- Real-time clock
- Format toggles
- Date/time breakdown
- useEffect cleanup

### 7. Live Validation
- Real-time field validation
- Password strength meter
- Visual feedback
- Multiple validation rules

### 8. Live Data Filter
- Multi-criteria filtering
- Search with highlighting
- Sort functionality
- Performance optimized with useMemo

### 9. CRUD Operations
- Full CRUD interface
- API integration
- Loading states
- Error handling

## 🎓 Learning Objectives

This project demonstrates:
- ✅ Function components with hooks
- ✅ State management (useState)
- ✅ Side effects (useEffect)
- ✅ Refs (useRef)
- ✅ Performance optimization (useMemo)
- ✅ Conditional rendering patterns
- ✅ List rendering and keys
- ✅ Component composition
- ✅ Props and children
- ✅ Event handling
- ✅ Form handling
- ✅ HTTP requests with Axios
- ✅ React Router navigation
- ✅ Bootstrap integration
- ✅ Express API development

## 🔧 Configuration

### Vite Config
- React plugin enabled
- Proxy configured for API requests
- Dev server on port 5173

### Express Config
- CORS enabled
- JSON body parsing
- Port 3001
- In-memory data storage

## 📝 Assignment Requirements Checklist

- ✅ **Q2.1**: Function components created and displayed
- ✅ **Q2.2**: 
  - Conditional rendering ✅
  - Lists ✅
  - Nested components ✅
  - Children/containment ✅
- ✅ **Q2.3**: Forms using useState and useRef
- ✅ **Q2.4**: Digital clock using useState and useEffect
- ✅ **Q2.5**: Live form validation
- ✅ **Q2.6**: Live data filtering
- ✅ **Q2.7**: CRUD operations with Express API

## 🎨 Styling

- Bootstrap 5 for UI components
- Custom CSS for animations
- Gradient backgrounds
- Responsive design
- Card hover effects
- Modern, professional look

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 or 3001 is in use:
- Change Vite port in `vite.config.js`
- Change Express port in `backend/server.js`

### API Connection Issues
- Ensure backend server is running
- Check proxy configuration in `vite.config.js`
- Verify CORS is enabled in backend

### Module Not Found
```bash
npm install
cd backend && npm install
```

## 🚀 Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [React Router](https://reactrouter.com)
- [Bootstrap](https://getbootstrap.com)
- [Express.js](https://expressjs.com)
- [Axios](https://axios-http.com)

## 👨‍💻 Development

This project was created as part of Assignment 3 for Full Stack Development course.

### Key Features:
- Modern React with Hooks
- Vite for fast development
- Bootstrap for styling
- React Router for navigation
- Express API backend
- Complete CRUD operations
- Multiple React patterns demonstrated

## 📄 License

MIT License - Free to use for educational purposes.

---

**Happy Coding! 🎉**
