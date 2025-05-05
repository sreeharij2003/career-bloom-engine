
import { Request, Response } from 'express';
import Job from '../models/Job.model';
import axios from 'axios';
import cheerio from 'cheerio';

// Get all jobs
export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
};

// Get featured jobs (most recent ones)
export const getFeaturedJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }).limit(4);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching featured jobs', error });
  }
};

// Get personalized job recommendations (for logged in users)
export const getJobRecommendations = async (req: Request, res: Response) => {
  try {
    // In a real implementation, this would filter based on user preferences/skills
    // For now, we'll just return the most recent jobs
    const jobs = await Job.find().sort({ createdAt: -1 }).limit(6);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job recommendations', error });
  }
};

// Scrape jobs from websites
export const scrapeJobs = async (req: Request, res: Response) => {
  try {
    const jobsScraped = await scrapeIndeedJobs();
    
    res.status(200).json({
      message: 'Jobs scraped successfully',
      count: jobsScraped.length
    });
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ message: 'Error scraping jobs', error });
  }
};

// Helper function to scrape jobs from Indeed
const scrapeIndeedJobs = async () => {
  const jobs = [];
  try {
    // Example URL for software developer jobs
    const url = 'https://www.indeed.com/jobs?q=software+developer&l=remote';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Indeed job cards selector (note: this might change as Indeed updates their site)
    $('.jobsearch-ResultsList .job_seen_beacon').each((index, element) => {
      try {
        // Extract job details
        const title = $(element).find('.jobTitle span').text().trim();
        const company = $(element).find('.companyName').text().trim();
        const location = $(element).find('.companyLocation').text().trim();
        const description = $(element).find('.job-snippet').text().trim();
        const applicationUrl = 'https://www.indeed.com' + $(element).find('a').attr('href');
        
        // Skip if we couldn't get essential info
        if (!title || !company) return;
        
        // Create job object
        const job = {
          title,
          company,
          logo: '', // Indeed doesn't easily expose logos
          location,
          type: 'Full-time', // Default as Indeed doesn't always specify
          posted: 'Recently', // We'd need to parse their relative dates
          description,
          tags: ['Software', 'Developer'], // Example tags
          applicationUrl,
          source: 'Indeed'
        };
        
        jobs.push(job);
      } catch (err) {
        console.error('Error parsing job listing:', err);
      }
    });
    
    // Save to database (skipping duplicates based on title + company)
    for (const job of jobs) {
      await Job.findOneAndUpdate(
        { title: job.title, company: job.company },
        job,
        { upsert: true, new: true }
      );
    }
    
    return jobs;
  } catch (error) {
    console.error('Error scraping Indeed:', error);
    return [];
  }
};

// Schedule job to run every 6 hours
let scrapeInterval: NodeJS.Timeout | null = null;

export const startScrapingSchedule = () => {
  if (scrapeInterval) {
    clearInterval(scrapeInterval);
  }
  
  // Run immediately on startup
  scrapeIndeedJobs().catch(err => console.error('Initial scraping failed:', err));
  
  // Then schedule to run every 6 hours
  scrapeInterval = setInterval(() => {
    scrapeIndeedJobs().catch(err => console.error('Scheduled scraping failed:', err));
  }, 6 * 60 * 60 * 1000); // 6 hours
  
  console.log('Job scraping schedule started');
};

// For testing/development - mock scrape that doesn't hit external sites
export const mockScrapeJobs = async (req: Request, res: Response) => {
  try {
    const mockJobs = [
      {
        title: "Senior React Developer",
        company: "TechCorp",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        location: "Remote, USA",
        type: "Full-time",
        posted: "2 days ago",
        description: "TechCorp is looking for a Senior React Developer to join our distributed team. You'll work on enterprise applications using modern JavaScript frameworks.",
        tags: ["React", "TypeScript", "Node.js"],
        applicationUrl: "https://example.com/jobs/123",
        salary: "$120,000 - $150,000",
        source: "CareerBloom Scraper"
      },
      // Add more mock jobs as needed
    ];
    
    for (const job of mockJobs) {
      await Job.findOneAndUpdate(
        { title: job.title, company: job.company },
        job,
        { upsert: true, new: true }
      );
    }
    
    res.status(200).json({
      message: 'Mock jobs added successfully',
      count: mockJobs.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding mock jobs', error });
  }
};
