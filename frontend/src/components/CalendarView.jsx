// CalendarView.jsx
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

// Helper function to determine color
function getColorForTask(task) {
  const dueInDays = moment(task.dueDate).diff(moment(), 'days');
  if (task.state === 'Pending') {
    if (task.priority === 'High' && dueInDays <= 2) return '#dc3545'; // red
    if (task.priority === 'Medium' && dueInDays > 2) return '#ffc107'; // yellow
    if (task.priority === 'Low' && dueInDays > 2) return '#ffc107'; // yellow
  }
  return '#28a745'; // green (default)
}

// Converting tasks to calendar events
function mapTasksToEvents(tasks) {
  return tasks.map(task => {
    const color = getColorForTask(task);
    return {
      title: task.title,
      start: new Date(task.dueDate),
      end: new Date(task.dueDate),
      allDay: true,
      resource: { task },
      style: {
        backgroundColor: color,
        borderRadius: '8px',
        opacity: 0.9,
        color: 'white',
        border: 'none',
        display: 'block',
        padding: '4px'
      }
    };
  });
}

const CalendarView = ({ tasks }) => {
  const events = mapTasksToEvents(tasks);

  return (
    <div style={{ height: '500px', marginBottom: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>📅 Task Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        popup
        eventPropGetter={(event) => ({
          style: event.style
        })}
      />
    </div>
  );
};

export default CalendarView;
