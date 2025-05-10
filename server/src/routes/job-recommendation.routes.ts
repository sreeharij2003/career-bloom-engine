
import express from 'express';
import { getJobRecommendations, getJobMatchScore } from '../controllers/job-recommendation.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// All routes are protected
router.use(protect);

// Job recommendation routes
router.get('/recommendations', getJobRecommendations);
router.post('/match-score', getJobMatchScore);

export default router;
