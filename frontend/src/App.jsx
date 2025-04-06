// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import { useAuth } from './context/AuthContext'; // Import useAuth

function App() {
  const { isAuthenticated } = useAuth(); // Now this will work because AuthContext is provided

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Login />}
        />
        <Route
          path="/tasks"
          element={isAuthenticated ? <TaskList /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
