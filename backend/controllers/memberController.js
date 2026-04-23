const fs = require('fs');
const path = require('path');
const Member = require('../models/Member');

/**
 * @desc    Create a new team member
 * @route   POST /api/members
 * @access  Public
 */
const createMember = async (req, res) => {
  try {
    const { name, role, email, phone, additionalInfo } = req.body;

    // Validate required fields
    if (!name || !role || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, role, email, and phone.',
      });
    }

    // Build member data
    const memberData = {
      name,
      role,
      email,
      phone,
      additionalInfo: additionalInfo || '',
      image: req.file ? req.file.filename : '',
    };

    const member = await Member.create(memberData);

    res.status(201).json({
      success: true,
      message: 'Member created successfully!',
      data: member,
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    console.error('Error creating member:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not create member.',
    });
  }
};

/**
 * @desc    Get all team members
 * @route   GET /api/members
 * @access  Public
 */
const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not fetch members.',
    });
  }
};

/**
 * @desc    Get a single member by ID
 * @route   GET /api/members/:id
 * @access  Public
 */
const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    // Handle invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid member ID.',
      });
    }

    console.error('Error fetching member:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not fetch member.',
    });
  }
};

/**
 * @desc    Delete a team member
 * @route   DELETE /api/members/:id
 * @access  Public
 */
const deleteMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found.',
      });
    }

    // Delete associated image from /uploads if it exists
    if (member.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', member.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Member.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Member removed successfully!',
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid member ID.',
      });
    }

    console.error('Error deleting member:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Could not delete member.',
    });
  }
};

module.exports = {
  createMember,
  getAllMembers,
  getMemberById,
  deleteMember,
};
