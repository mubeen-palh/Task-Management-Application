import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/styles.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Scheduler</h2>
      <nav className="nav-links">
        <NavLink to="/" end className="nav-link">
          Dashboard
        </NavLink>
        <NavLink to="/tasks" className="nav-link">
          Tasks
        </NavLink>
        <NavLink to="/team-members" className="nav-link">
          Team Members
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
