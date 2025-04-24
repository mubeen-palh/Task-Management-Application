import React, { useEffect, useState } from 'react';
import TeamMemberCard from '../components/TeamMemberCard';
import '../styles/styles.css';

const API_BASE = 'http://localhost:5000/api/team-members';


// This is Team Member Page

const TeamMembersPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    dailyAvailableHours: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setTeamMembers(data.data || []);
    } catch (err) {
      console.error('Error fetching team members:', err);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.dailyAvailableHours) {
      errors.dailyAvailableHours = 'Daily hours required';
    } else if (
      isNaN(formData.dailyAvailableHours) ||
      formData.dailyAvailableHours < 1 ||
      formData.dailyAvailableHours > 16
    ) {
      errors.dailyAvailableHours = 'Hours must be between 1 and 16';
    }
    return errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const payload = {
      name: formData.name.trim(),
      role: formData.role.trim(),
      dailyAvailableHours: parseInt(formData.dailyAvailableHours),
    };

    try {
      if (editingId) {
        await fetch(`${API_BASE}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(API_BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      await fetchTeamMembers();
      resetForm();
    } catch (err) {
      console.error('Error saving team member:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
        await fetchTeamMembers();
      } catch (err) {
        console.error('Error deleting team member:', err);
      }
    }
  };

  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      role: member.role,
      dailyAvailableHours: member.dailyAvailableHours,
    });
    setEditingId(member._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: '', role: '', dailyAvailableHours: '' });
    setFormErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  const filteredMembers = teamMembers.filter((member) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      member.name.toLowerCase().includes(lowerSearch) ||
      member.role.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <div className="page-container">
      <h1 className="page-title">Team Members</h1>

      <input
        type="text"
        placeholder="Search by name or role..."
        className="search-input large-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="team-members-container">
        {!showForm && (
          <div className="add-card" onClick={() => setShowForm(true)}>
            <span className="plus-icon">+</span>
            <p>Add Team Member</p>
          </div>
        )}

        {showForm && (
          <form onSubmit={handleFormSubmit} className="team-form-card">
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
              {formErrors.name && <span className="error">{formErrors.name}</span>}
            </div>

            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleFormChange}
              />
            </div>

            <div className="form-group">
              <label>Daily Available Hours *</label>
              <input
                type="number"
                name="dailyAvailableHours"
                value={formData.dailyAvailableHours}
                onChange={handleFormChange}
              />
              {formErrors.dailyAvailableHours && (
                <span className="error">{formErrors.dailyAvailableHours}</span>
              )}
            </div>

            <div className="form-buttons">
              <button type="submit" className="submit-btn">
                {editingId ? 'Update Member' : 'Add Member'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <TeamMemberCard
              key={member._id}
              member={member}
              onDelete={() => handleDelete(member._id)}
              onEdit={() => handleEdit(member)}
            />
          ))
        ) : (
          <p>No matching team members found.</p>
        )}
      </div>
    </div>
  );
};

export default TeamMembersPage;
