
import express from 'express';
import { getUserProfile, updateUserProfile, uploadUserResume } from '../controllers/user-profile.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// All routes are protected
router.use(protect);

// User profile routes
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.post('/resume/upload', uploadUserResume);

export default router;
