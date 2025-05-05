
import express from 'express';
import { protect } from '../middleware/auth.middleware';
import { 
  getAllJobs,
  getFeaturedJobs,
  getJobRecommendations,
  scrapeJobs,
  mockScrapeJobs
} from '../controllers/job.controller';

const router = express.Router();

// Public routes
router.get('/', getAllJobs);
router.get('/featured', getFeaturedJobs);
router.post('/scrape', scrapeJobs); // Trigger scraping manually
router.post('/mock-scrape', mockScrapeJobs); // Add mock data for testing

// Protected routes
router.use(protect);
router.get('/recommendations', getJobRecommendations);

export default router;
