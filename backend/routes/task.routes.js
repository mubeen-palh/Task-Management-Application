import express from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getOverallocatedMembers
} from '../controllers/task.controller.js';

const router = express.Router();



router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/check/overallocated', getOverallocatedMembers); // optional utility

export default router;
