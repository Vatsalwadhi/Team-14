const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  createMember,
  getAllMembers,
  getMemberById,
  deleteMember,
} = require('../controllers/memberController');

const router = express.Router();

// ----- Multer Configuration -----

// Storage engine: save files to /uploads with unique names
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    // Generate a unique filename: timestamp-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

// File filter: only allow image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, jpg, png, gif, webp) are allowed.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
});

// ----- Routes -----

// POST /api/members — Create a new member (with optional image upload)
router.post('/', upload.single('image'), createMember);

// GET /api/members — Get all members
router.get('/', getAllMembers);

// GET /api/members/:id — Get single member by ID
router.get('/:id', getMemberById);

// DELETE /api/members/:id — Remove a member
router.delete('/:id', deleteMember);

module.exports = router;
