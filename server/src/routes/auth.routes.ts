
import express from 'express';
import { register, login, updateProfile, getProfile } from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.put('/profile', protect, updateProfile);
router.get('/profile', protect, getProfile);

export default router;
