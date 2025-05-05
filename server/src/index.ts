
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/auth.routes';
import careerRoutes from './routes/career.routes';
import jobRoutes from './routes/job.routes';
import { startScrapingSchedule } from './controllers/job.controller';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/jobs', jobRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start job scraping schedule
startScrapingSchedule();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
