import express from 'express';
import {
  createTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember
} from '../controllers/teamMember.controller.js';

const router = express.Router();

router.post('/', createTeamMember);
router.get('/', getAllTeamMembers);
router.get('/:id', getTeamMemberById);
router.put('/:id', updateTeamMember);
router.delete('/:id', deleteTeamMember);

export default router;
