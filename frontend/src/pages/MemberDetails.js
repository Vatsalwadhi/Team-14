import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMemberById, UPLOADS_URL } from '../services/api';
import Loader from '../components/Loader';
import './MemberDetails.css';

/**
 * Member Details Page — Displays full profile of a single member.
 */
const MemberDetails = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await getMemberById(id);
        setMember(res.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message || 'Failed to load member details.'
        );
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="details-page" id="member-details-page">
        <div className="details-error">
          <span className="error-icon">⚠️</span>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <Link to="/members" className="back-link">← Back to Members</Link>
        </div>
      </div>
    );
  }

  const imageUrl = member.image
    ? `${UPLOADS_URL}/${member.image}`
    : null;

  return (
    <div className="details-page" id="member-details-page">
      <Link to="/members" className="back-link" id="back-link">
        ← Back to Members
      </Link>

      <div className="details-card">
        <div className="details-image-section">
          {imageUrl ? (
            <img src={imageUrl} alt={member.name} className="details-image" />
          ) : (
            <div className="details-image-placeholder">
              <span>{member.name.charAt(0).toUpperCase()}</span>
            </div>
          )}
        </div>

        <div className="details-info-section">
          <h1 className="details-name">{member.name}</h1>
          <span className="details-role-badge">{member.role}</span>

          <div className="details-fields">
            <div className="detail-row">
              <span className="detail-icon">📧</span>
              <div>
                <span className="detail-label">Email</span>
                <span className="detail-value">{member.email}</span>
              </div>
            </div>
            <div className="detail-row">
              <span className="detail-icon">📱</span>
              <div>
                <span className="detail-label">Phone</span>
                <span className="detail-value">{member.phone}</span>
              </div>
            </div>
            {member.additionalInfo && (
              <div className="detail-row">
                <span className="detail-icon">📝</span>
                <div>
                  <span className="detail-label">Additional Info</span>
                  <span className="detail-value">{member.additionalInfo}</span>
                </div>
              </div>
            )}
            <div className="detail-row">
              <span className="detail-icon">📅</span>
              <div>
                <span className="detail-label">Joined</span>
                <span className="detail-value">
                  {new Date(member.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
