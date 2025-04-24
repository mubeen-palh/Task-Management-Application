import { TeamMember } from '../models/teamMember.model.js';

// all controlling functions for teamMember are here

export const createTeamMember = async (req, res) => {
  try {
    const { name, role, dailyAvailableHours } = req.body;
    if (!name || !role || dailyAvailableHours == null) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newMember = new TeamMember({ name, role, dailyAvailableHours });
    await newMember.save();
    res.status(201).json({ success: true, data: newMember });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const getAllTeamMembers = async (req, res) => {
  const members = await TeamMember.find();
  res.json({ success: true, data: members });
};

export const getTeamMemberById = async (req, res) => {
  const member = await TeamMember.findById(req.params.id);
  if (!member) return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, data: member });
};



export const updateTeamMember = async (req, res) => {
  const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!member) return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, data: member });
};


export const deleteTeamMember = async (req, res) => {
  const result = await TeamMember.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, message: "Deleted successfully" });
};
