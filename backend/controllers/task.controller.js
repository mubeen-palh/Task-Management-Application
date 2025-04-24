import { Task } from '../models/task.model.js';
import { TeamMember } from '../models/teamMember.model.js';


// Creating Task
export const createTask = async (req, res) => {
  try {
    const { title, description, estimatedHours, priority, status, dueDate, assignedTo } = req.body;
    if (!title) return res.status(400).json({ success: false, message: "Title is required" });

    const task = new Task({ title, description, estimatedHours, priority, status, dueDate, assignedTo });
    await task.save();
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Getting all Tasks

export const getAllTasks = async (req, res) => {
  const tasks = await Task.find().populate("assignedTo", "name role");
  res.json({ success: true, data: tasks });
};


// Get Task by ID

export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id).populate("assignedTo", "name");
  if (!task) return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, data: task });
};


// Updating the Task

export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!task) return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, data: task });
};



// Deleting the Task
export const deleteTask = async (req, res) => {
  const result = await Task.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, message: "Deleted successfully" });
};


// Overallocation was first tried to implemented by backend (But due to some error it was not w)

export const getOverallocatedMembers = async (req, res) => {
  const members = await TeamMember.find();
  const tasks = await Task.find();

  const workloadMap = {};

  tasks.forEach(task => {
    task.assignedTo.forEach(memberId => {
      if (!workloadMap[memberId]) workloadMap[memberId] = 0;
      workloadMap[memberId] += task.estimatedHours || 0;
    });
  });

  const overallocated = members.filter(member => {
    return workloadMap[member._id] > member.dailyAvailableHours;
  });

  res.json({ success: true, data: overallocated });
};

