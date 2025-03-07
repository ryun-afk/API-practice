# 📚 Learning Management System (LMS)

An LMS platform built with Node.js, Express, and PostgreSQL, supporting dynamic user dashboards, course management, and user authentication with sessions.

## 🚀 Features

- User Authentication (Login, Registration, Sessions)
- Role-Based Access Control (Admin, Instructor, Student)
- Course Management (CRUD for courses, lessons, and progress tracking)
- Dynamic EJS Pages for Dashboard and Course Content
- RESTful API for handling user and course data
- Error Handling and Middleware for secure routing

## 🛠️ Project Structure
/lms-project
├── /config                     # Configuration files
│   └── dbConfig.js             # Database connection setup
├── /controllers                # Business logic
│   ├── authController.js       # Handles login, logout, session management
│   ├── courseController.js     # Manages course content and progress
│   └── userController.js       # Handles user data and profiles
├── /db                         # SQL queries or ORM models
│   └── queries.js              # SQL queries for users, courses, enrollments
├── /middlewares                # Custom middleware functions
│   ├── authMiddleware.js       # Protect routes, check roles
│   └── errorHandler.js         # Handle errors globally
├── /public                     # Static assets
│   ├── css                     # Stylesheets
│   ├── js                      # Client-side JavaScript
│   └── images                  # Image assets
├── /routes                     # Route definitions
│   └── routes.js               # Serve EJS pages
├── /views                      # EJS templates for dynamic pages
│   ├── dashboard.ejs           # User dashboard
│   ├── course.ejs              # Course details and content
│   ├── login.ejs               # Login page
│   └── register.ejs            # Registration page
├── .env                        # Environment variables (DB credentials, secrets)
├── .gitignore                  # Git ignore file
├── package.json                # NPM dependencies
├── server.js                   # Main server file
└── README.md                   # Project documentation
