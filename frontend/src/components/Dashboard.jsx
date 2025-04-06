// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Assuming AuthContext is used for authentication
import axios from 'axios';
import TaskForm from './TaskForm'; // Import your TaskForm component
import TaskList from './TaskList'; // Import your TaskList component

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth(); // Check if the user is authenticated
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle any errors

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      if (isAuthenticated) {
        try {
          const response = await axios.get('/api/tasks', {
            headers: {
              Authorization: `Bearer ${user.token}`, // Assuming user.token is the JWT token
            },
          });
          setTasks(response.data); // Update tasks state with the fetched tasks
          setLoading(false); // Set loading to false after data is fetched
        } catch (err) {
          setError('Failed to load tasks');
          setLoading(false);
        }
      }
    };

    fetchTasks(); // Call the function to fetch tasks
  }, [isAuthenticated, user]); // Run effect only when isAuthenticated or user changes

  // Function to add a new task
  const addTask = (task) => {
    const newTask = { ...task, id: Date.now() }; // Add a unique id
    setTasks([...tasks, newTask]); // Update the tasks state
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId)); // Remove task with the given id
  };

  // Display loading state
  if (loading) {
    return <div>Loading tasks...</div>;
  }

  // Display error message if fetching tasks failed
  if (error) {
    return <div>{error}</div>;
  }

  // If user is not authenticated, show a login prompt
  if (!isAuthenticated) {
    return <div>Please log in to view your tasks.</div>;
  }

  return (
    <div className="dashboard">
      <h2>Welcome, {user.name}!</h2>
      {/* TaskForm allows users to add new tasks */}
      <TaskForm addTask={addTask} />
      {/* TaskList displays the list of tasks */}
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
};

export default Dashboard;
