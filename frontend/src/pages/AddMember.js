import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMember } from '../services/api';
import './AddMember.css';

/**
 * Add Member Page — Form to create a new team member.
 * Uses controlled inputs and submits via Axios with FormData.
 */
const AddMember = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    additionalInfo: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Validation errors
  const [validationErrors, setValidationErrors] = useState({});

  /**
   * Handle text input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-level error on change
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Handle image file selection with preview
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setValidationErrors((prev) => ({
          ...prev,
          image: 'Only image files (JPG, PNG, GIF, WebP) are allowed.',
        }));
        return;
      }
      // Validate file size (5 MB)
      if (file.size > 5 * 1024 * 1024) {
        setValidationErrors((prev) => ({
          ...prev,
          image: 'Image must be under 5 MB.',
        }));
        return;
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setValidationErrors((prev) => ({ ...prev, image: '' }));
    }
  };

  /**
   * Validate the entire form before submission
   */
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = 'Name is required.';
    if (!formData.role.trim()) errors.role = 'Role is required.';

    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (!/^[\d\s+()-]{7,20}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Build FormData for multipart/form-data request
      const data = new FormData();
      data.append('name', formData.name.trim());
      data.append('role', formData.role.trim());
      data.append('email', formData.email.trim());
      data.append('phone', formData.phone.trim());
      data.append('additionalInfo', formData.additionalInfo.trim());
      if (imageFile) {
        data.append('image', imageFile);
      }

      await createMember(data);

      setSuccess('🎉 Member added successfully!');

      // Redirect to members list after a short delay
      setTimeout(() => navigate('/members'), 1500);
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to add member. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Remove selected image
   */
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="add-member-page" id="add-member-page">
      <div className="form-container">
        <div className="form-header">
          <h1 className="form-title">Add New Member</h1>
          <p className="form-description">
            Fill in the details below to add a new team member.
          </p>
        </div>

        {/* Success message */}
        {success && (
          <div className="alert alert-success" id="success-alert">
            {success}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="alert alert-error" id="error-alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="member-form" id="add-member-form">
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-input ${validationErrors.name ? 'input-error' : ''}`}
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              autoComplete="name"
            />
            {validationErrors.name && (
              <span className="field-error">{validationErrors.name}</span>
            )}
          </div>

          {/* Role */}
          <div className="form-group">
            <label htmlFor="role" className="form-label">
              Role <span className="required">*</span>
            </label>
            <input
              type="text"
              id="role"
              name="role"
              className={`form-input ${validationErrors.role ? 'input-error' : ''}`}
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              autoComplete="organization-title"
            />
            {validationErrors.role && (
              <span className="field-error">{validationErrors.role}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${validationErrors.email ? 'input-error' : ''}`}
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john@example.com"
              autoComplete="email"
            />
            {validationErrors.email && (
              <span className="field-error">{validationErrors.email}</span>
            )}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`form-input ${validationErrors.phone ? 'input-error' : ''}`}
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +1 234 567 890"
              autoComplete="tel"
            />
            {validationErrors.phone && (
              <span className="field-error">{validationErrors.phone}</span>
            )}
          </div>

          {/* Additional Info */}
          <div className="form-group form-group-full">
            <label htmlFor="additionalInfo" className="form-label">
              Additional Info
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              className="form-input form-textarea"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Brief bio or any extra details..."
              rows={3}
            />
          </div>

          {/* Image Upload */}
          <div className="form-group form-group-full">
            <label className="form-label">Profile Image</label>
            {imagePreview ? (
              <div className="image-preview-wrapper">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="image-preview"
                />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={removeImage}
                  id="remove-image-btn"
                >
                  ✕ Remove
                </button>
              </div>
            ) : (
              <label className="image-upload-area" htmlFor="image-upload">
                <span className="upload-icon">📷</span>
                <span className="upload-text">
                  Click to upload an image
                </span>
                <span className="upload-hint">
                  JPG, PNG, GIF, WebP — Max 5 MB
                </span>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleImageChange}
                  className="file-input-hidden"
                />
              </label>
            )}
            {validationErrors.image && (
              <span className="field-error">{validationErrors.image}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-group form-group-full">
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
              id="submit-btn"
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  Adding Member...
                </>
              ) : (
                <>
                  <span>➕</span>
                  Add Member
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMember;
