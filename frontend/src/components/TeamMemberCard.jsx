import React from 'react';
import '../styles/styles.css';


// Separate Task Member Card for each Team Member

const TeamMemberCard = ({ member, onDelete, onEdit }) => {
  return (
    <div className="team-member-card">
      <div className="card-header">
        <h2 className="team-member-name">{member.name}</h2>
        <div className="action-icons">
          <button className="edit-btn" onClick={onEdit} title="Edit">✏️</button>
          <button className="delete-btn" onClick={onDelete} title="Delete">🗑️</button>
        </div>
      </div>
      {member.role && <p className="team-member-role">Role: {member.role}</p>}
      <p className="team-member-hours">
        Available Hours: {member.dailyAvailableHours} hrs/day
      </p>
    </div>
  );
};

export default TeamMemberCard;
