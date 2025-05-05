
import express from 'express';
import { 
  generateCareerPath,
  getUserCareerPaths,
  getCareerPathById
} from '../controllers/career.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// All routes are protected
router.use(protect);

router.post('/path', generateCareerPath);
router.get('/paths', getUserCareerPaths);
router.get('/path/:id', getCareerPathById);

export default router;
