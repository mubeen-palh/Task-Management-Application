import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import teamMemberRoutes from './routes/teamMember.routes.js';
import taskRoutes from './routes/task.routes.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Required middleware to parse JSON
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/team-members', teamMemberRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Server is working!');
});


app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
