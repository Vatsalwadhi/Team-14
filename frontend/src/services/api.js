import axios from 'axios';

/**
 * Axios instance configured with the backend API base URL.
 * All API calls should go through this instance.
 */
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Base URL for serving uploaded images
export const UPLOADS_URL =
  process.env.REACT_APP_UPLOADS_URL || 'http://localhost:5000/uploads';

/**
 * Create a new member.
 * @param {FormData} formData - Form data containing member fields and image file.
 * @returns {Promise} Axios response
 */
export const createMember = (formData) => {
  return API.post('/members', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

/**
 * Get all team members.
 * @returns {Promise} Axios response
 */
export const getAllMembers = () => {
  return API.get('/members');
};

/**
 * Get a single member by ID.
 * @param {string} id - Member ID
 * @returns {Promise} Axios response
 */
export const getMemberById = (id) => {
  return API.get(`/members/${id}`);
};

/**
 * Remove a member by ID.
 * @param {string} id - Member ID
 * @returns {Promise} Axios response
 */
export const deleteMember = (id) => {
  return API.delete(`/members/${id}`);
};

export default API;
