import React from 'react';
import { Link } from 'react-router-dom';
import { UPLOADS_URL } from '../services/api';
import './MemberCard.css';

/**
 * MemberCard — Displays a team member's summary in card format.
 * Shows the member's image, name, and role with a link to view full details.
 */
const MemberCard = ({ member, onDelete }) => {
  const imageUrl = member.image
    ? `${UPLOADS_URL}/${member.image}`
    : null;

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to remove ${member.name}?`)) {
      onDelete(member._id);
    }
  };

  return (
    <div className="member-card" id={`member-card-${member._id}`}>
      <div className="card-image-wrapper">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={member.name}
            className="card-image"
            loading="lazy"
          />
        ) : (
          <div className="card-image-placeholder">
            <span>{member.name.charAt(0).toUpperCase()}</span>
          </div>
        )}
        <div className="card-image-overlay" />
      </div>
      <div className="card-body">
        <h3 className="card-name">{member.name}</h3>
        <span className="card-role">{member.role}</span>
        
        <div className="card-actions">
          <Link
            to={`/members/${member._id}`}
            className="card-btn"
            id={`view-details-${member._id}`}
          >
            Details
          </Link>
          <button
            onClick={handleDelete}
            className="card-btn btn-danger"
            id={`delete-member-${member._id}`}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
