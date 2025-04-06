// src/components/TaskItem.jsx
import React from 'react';

const TaskItem = ({ task, deleteTask }) => {
  return (
    <li className="task-item">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
};

export default TaskItem;
