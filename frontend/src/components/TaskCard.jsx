import React from 'react';
import '../styles/styles.css';

// Separate Task Card for each Task

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task-card">
      <h3 className="task-title">{task.title}</h3>
      <button className="edit-btn" onClick={() => onEdit(task)} title="Edit">✏️</button>
      <button className="delete-btn" onClick={() => onDelete(task.id)} title="Delete">🗑️</button>
      <p><strong>Description:</strong> <span>{task.description}</span></p>
      <p><strong>Estimated Hours:</strong> <span>{task.estimatedHours}</span></p>
      <p><strong>Priority:</strong> <span>{task.priority}</span></p>
      <p><strong>Due Date:</strong> <span>{
       new Date(task.dueDate).toLocaleDateString()
       }</span></p>
      <p><strong>State:</strong> <span>{task.state}</span></p>
      <p><strong>Assigned To:</strong> <span>{task.assignedTo.join(', ')}</span></p>
    </div>
  );
};

export default TaskCard;
