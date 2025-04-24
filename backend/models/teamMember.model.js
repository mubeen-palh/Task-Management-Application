import mongoose from 'mongoose';


// Team Member Model

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  dailyAvailableHours: {
    type: Number,
    required: true,
    min: 1,
    max: 16,
  }
}, {
  timestamps: true
});

export const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

// teamMembers
