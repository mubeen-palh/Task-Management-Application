import React, { useEffect, useState } from 'react';
import moment from 'moment';
import CalendarView from '../components/CalendarView';
import Separator from '../components/Separator';

const API_BASE = 'http://localhost:5000/api';


// This is Dashboard Page 

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [overallocated, setOverallocated] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [taskRes, memberRes] = await Promise.all([
        fetch(`${API_BASE}/tasks`),
        fetch(`${API_BASE}/team-members`),
      ]);

      const taskData = await taskRes.json();
      const memberData = await memberRes.json();

      if (taskData.data) setTasks(taskData.data);
      if (memberData.data) {
        setTeamMembers(memberData.data);
        calculateOverallocations(taskData.data, memberData.data);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  // This is calculating the overallocation of each member using:
//   The logic is entirely handled on the frontend (DashboardPage.jsx).

// It fetches all tasks and all team members.

// For each team member, it sums up the estimatedHours of their assigned tasks grouped by day.

// If the total exceeds 8 hours per day, that member is marked as overallocated.


  const calculateOverallocations = (tasks, members) => {
    const result = [];

    for (const member of members) {
      const workByDate = {};

      for (const task of tasks) {
        const assignedIds = task.assignedTo.map(tm => tm._id);
        if (!assignedIds.includes(member._id)) continue;

        const perMemberHours = task.estimatedHours / task.assignedTo.length;
        const dateKey = moment(task.dueDate).format('YYYY-MM-DD');

        if (!workByDate[dateKey]) workByDate[dateKey] = 0;
        workByDate[dateKey] += perMemberHours;
      }

      const overallocatedDates = Object.entries(workByDate)
        .filter(([_, hours]) => hours > member.dailyAvailableHours)
        .map(([date, hours]) => ({
          date,
          hours,
          availableHours: member.dailyAvailableHours
        }));

      if (overallocatedDates.length > 0) {
        result.push({
          name: member.name,
          role: member.role,
          overallocatedDates
        });
      }
    }

    setOverallocated(result);
  };

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Dashboard</h1>
      <CalendarView tasks={tasks} />
      <Separator />
      <h2 className="section-title">Overallocated Team Members</h2>
      {overallocated.length === 0 ? (
        <p className="success-msg">✅ No one is overallocated.</p>
      ) : (
        <div className="overallocated-container">
          {overallocated.map((member, idx) => (
            <div key={idx} className="member-card">
              <h3>{member.name} <span className="member-role">({member.role})</span></h3>
              <ul>
                {member.overallocatedDates.map((d, i) => (
                  <li key={i}>
                    <strong>{d.date}</strong> — {d.hours}h assigned (available: {d.availableHours}h)
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
