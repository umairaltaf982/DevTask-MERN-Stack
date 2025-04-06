const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConnect = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();

// Initialize app
const app = express();

// Database connection
dbConnect();

// Middleware
app.use(cors());
app.use(express.json());  // Body parser middleware

// Routes
app.use('/api/users', userRoutes);  // User routes
app.use('/api/tasks', taskRoutes);  // Task routes

// Port & Server Start
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
