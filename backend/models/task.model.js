import mongoose from 'mongoose';


// Task Model

const taskSchema = new mongoose.Schema(
{

  title: {
    type: String,
    required: true,
  },
  description: String,

  estimatedHours: {
    type: Number,
    required: true,
    min: 1,
  },

  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },

  dueDate: {
    type: Date,
    required: true,
  },

  state: {
    type: String,
    enum: ['Pending', 'In-progress', 'Completed'],
    default: 'Pending',
  },

  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TeamMember'
  }]
}, {
  timestamps: true
});

export const Task = mongoose.model('Task', taskSchema);
