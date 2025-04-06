// src/components/TaskForm.jsx
import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle && taskDescription) {
      addTask({ title: taskTitle, description: taskDescription });
      setTaskTitle('');
      setTaskDescription('');
    }
  };

  return (
    <div className="task-form">
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
