# React Components - CDN Approach

This project demonstrates creating React components using the CDN approach (without npm build tools) served by a Node.js HTTP server.

## 📋 Components

### 1. **UserCard Component**
A beautiful user profile card that displays:
- User avatar (emoji)
- Name and email
- Statistics (followers, following, posts)
- Hover effects and modern styling

### 2. **TodoList Component**
An interactive todo list application featuring:
- Add new tasks
- Mark tasks as complete (click on task text)
- Delete tasks
- Real-time task completion counter
- Keyboard support (Enter to add task)

## 🛠️ Technologies Used

- **React 18** (via CDN)
- **ReactDOM 18** (via CDN)
- **Babel Standalone** (for JSX transformation)
- **Node.js** (HTTP server with built-in modules)
- **HTML5 & CSS3**

## 📦 Project Structure

```
Assignment_3/
├── index.html        # Main HTML file with React CDN links
├── components.js     # React components (UserCard & TodoList)
├── server.js         # Node.js HTTP server
├── package.json      # Project configuration
└── README.md         # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)

### Installation & Running

1. **Navigate to the project directory:**
   ```bash
   cd "j:/B.SC-IT SEM-7/701 FS/pre/Assignment_3"
   ```

2. **Start the server:**
   ```bash
   npm start
   ```
   Or:
   ```bash
   node server.js
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## 💡 How It Works

### CDN Approach
Instead of using npm packages and a build process, this project:
1. Loads React and ReactDOM directly from CDN (unpkg.com)
2. Uses Babel Standalone to transform JSX in the browser
3. Serves static files using a simple Node.js HTTP server

### Node.js Server
The `server.js` file creates a basic HTTP server that:
- Serves static files (HTML, JS, CSS)
- Handles MIME types for different file extensions
- Provides helpful console logging
- Runs on port 3000 (configurable)

## 🎨 Features

- ✅ No build process required
- ✅ Modern React 18 with Hooks
- ✅ Beautiful, responsive UI
- ✅ Interactive components with state management
- ✅ Professional styling with CSS
- ✅ Simple Node.js server (no external dependencies)

## 📝 Component Details

### UserCard Props
```javascript
{
  name: string,      // User's full name
  email: string,     // User's email address
  avatar: string,    // Emoji or image
  followers: number, // Number of followers
  following: number, // Number of following
  posts: number      // Number of posts
}
```

### TodoList Features
- State management using `useState` hook
- Add, toggle, and delete operations
- Keyboard event handling
- Computed values (completion statistics)

## 🔧 Customization

### Changing the Port
Edit `server.js` and modify the `PORT` constant:
```javascript
const PORT = 3000; // Change to your desired port
```

### Adding More Components
Add new components in `components.js` and include them in the `App` component.

## 📚 Learning Objectives

This project demonstrates:
1. Using React without npm/webpack (CDN approach)
2. Creating functional components with hooks
3. Component props and state management
4. Event handling in React
5. Creating a basic Node.js HTTP server
6. Serving static files with Node.js

## 🌐 Browser Compatibility

Works on all modern browsers that support:
- ES6+
- React 18
- CSS3

## 📄 License

MIT License - Feel free to use this project for learning purposes.

## 🤝 Contributing

This is an educational project. Feel free to fork and experiment!

---

**Happy Coding! 🎉**
