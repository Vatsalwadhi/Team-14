import React, { useState, useEffect } from 'react';
import { getAllMembers, deleteMember } from '../services/api';
import MemberCard from '../components/MemberCard';
import Loader from '../components/Loader';
import './ViewMembers.css';

/**
 * View Members Page — Displays all team members in a card grid.
 */
const ViewMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await getAllMembers();
        setMembers(res.data.data);
      } catch (err) {
        setError('Failed to load members. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMember(id);
      // Update local state to remove the member
      setMembers(members.filter((m) => m._id !== id));
    } catch (err) {
      alert('Failed to remove member. Please try again.');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="view-members-page" id="view-members-page">
      <div className="page-header">
        <h1 className="page-title">Team Members</h1>
        <p className="page-subtitle">
          {members.length} member{members.length !== 1 ? 's' : ''} in the team
        </p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {!error && members.length === 0 && (
        <div className="empty-state" id="empty-state">
          <span className="empty-icon">📭</span>
          <h2>No Members Yet</h2>
          <p>Start by adding your first team member!</p>
        </div>
      )}

      <div className="members-grid">
        {members.map((member) => (
          <MemberCard 
            key={member._id} 
            member={member} 
            onDelete={handleDelete} 
          />
        ))}
      </div>
    </div>
  );
};

export default ViewMembers;
