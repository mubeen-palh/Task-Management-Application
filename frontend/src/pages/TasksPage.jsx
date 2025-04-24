import React, { useEffect, useState } from 'react';
import '../styles/styles.css';
import TaskCard from '../components/TaskCard';

const API_BASE = 'http://localhost:5000/api/tasks';

// This is Tasks Page


const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    estimatedHours: '',
    priority: 'Medium',
    dueDate: '',
    status: 'Pending',
    assignedTo: [],
  });

  useEffect(() => {
    fetchTasks();
    fetchTeamMembers();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setTasks(data.data || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/team-members');
      const data = await res.json();
      setTeamMembers(data.data || []);
    } catch (err) {
      console.error('Error fetching team members:', err);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateTask = async e => {
    e.preventDefault();

    const payload = {
      ...newTask,
      estimatedHours: Number(newTask.estimatedHours),
    };

    const method = editTaskId ? 'PUT' : 'POST';
    const endpoint = editTaskId ? `${API_BASE}/${editTaskId}` : API_BASE;

    try {
      await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      await fetchTasks();
      resetForm();
    } catch (err) {
      console.error('Error saving task:', err);
    }
  };

  const handleEditTask = task => {
    setNewTask({
      title: task.title,
      description: task.description,
      estimatedHours: task.estimatedHours,
      priority: task.priority,
      dueDate: task.dueDate.split('T')[0],
      status: task.status,
      assignedTo: task.assignedTo.map(member => member._id),
    });
    setEditTaskId(task._id);
    setShowForm(true);
  };

  const handleDeleteTask = async id => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
        await fetchTasks();
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    }
  };

  const resetForm = () => {
    setNewTask({
      title: '',
      description: '',
      estimatedHours: '',
      priority: 'Medium',
      dueDate: '',
      status: 'Pending',
      assignedTo: [],
    });
    setEditTaskId(null);
    setShowForm(false);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page">
      <h2 className="page-title">Tasks</h2>

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input large-search"
      />

      <div className="tasks-container">
        {!showForm && (
          <div className="add-card" onClick={() => setShowForm(true)}>
            <span className="plus-icon">+</span>
            <p>Add Task</p>
          </div>
        )}

        {showForm && (
          <form className="form-card" onSubmit={handleAddOrUpdateTask}>
            <h3>{editTaskId ? 'Edit Task' : 'Add New Task'}</h3>

            <input
              name="title"
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newTask.description}
              onChange={handleInputChange}
              required
            />
            <input
              name="estimatedHours"
              type="number"
              min="1"
              placeholder="Estimated Hours"
              value={newTask.estimatedHours}
              onChange={handleInputChange}
              required
            />
            <select name="priority" value={newTask.priority} onChange={handleInputChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input
              name="dueDate"
              type="date"
              value={newTask.dueDate}
              onChange={handleInputChange}
              required
            />
            <select name="status" value={newTask.status} onChange={handleInputChange}>
              <option value="Pending">Pending</option>
              <option value="In-progress">In-progress</option>
              <option value="Completed">Completed</option>
            </select>

            <label>Add Team Member:</label>
            <div className="team-select-row">
              <select
                id="team-member-selector"
                defaultValue=""
                onChange={(e) => {
                  const selectedId = e.target.value;
                  if (
                    selectedId &&
                    !newTask.assignedTo.includes(selectedId)
                  ) {
                    setNewTask((prev) => ({
                      ...prev,
                      assignedTo: [...prev.assignedTo, selectedId],
                    }));
                  }
                  e.target.value = ""; // reset dropdown
                }}
              >
                <option value="" disabled>
                  Select team member
                </option>
                {teamMembers.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            {newTask.assignedTo.length > 0 && (
              <div className="assigned-list">
                <p>Assigned To:</p>
                <ul>
                  {newTask.assignedTo.map((id) => {
                    const member = teamMembers.find((m) => m._id === id);
                    return (
                      <li key={id}>
                        {member?.name || id}
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => {
                            setNewTask((prev) => ({
                              ...prev,
                              assignedTo: prev.assignedTo.filter((x) => x !== id),
                            }));
                          }}
                        >
                          ✖️
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="form-buttons">
              <button type="submit" className="submit-btn">
                {editTaskId ? 'Update' : 'Submit'}
              </button>
              <button type="button" className="cancel-btn" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        )}


        {filteredTasks.map(task => (
          <TaskCard
            key={task._id}
            task={{
              ...task,
              assignedTo: task.assignedTo.map(member => member.name),
            }}
            onEdit={() => handleEditTask(task)}
            onDelete={() => handleDeleteTask(task._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
