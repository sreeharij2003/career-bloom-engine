
import express from 'express';
import { analyzeResume, getSkillGaps } from '../controllers/skill-analysis.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// All routes are protected
router.use(protect);

// Skill analysis routes
router.post('/analyze', analyzeResume);
router.get('/gaps', getSkillGaps);

export default router;
