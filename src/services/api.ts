
// API base URL - replace with your actual backend URL in production
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-api.com/api'
  : 'http://localhost:5000/api';

// API Service object
export const API = {
  career: {
    generateCareerPath: async (query: string) => {
      const response = await fetch(`${API_BASE_URL}/career/path`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate career path');
      }
      
      return response.json();
    },
    getUserCareerPaths: async () => {
      const response = await fetch(`${API_BASE_URL}/career/paths`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch career paths');
      }
      
      return response.json();
    }
  },
  jobs: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/jobs`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      
      return response.json();
    },
    getFeatured: async () => {
      const response = await fetch(`${API_BASE_URL}/jobs/featured`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch featured jobs');
      }
      
      return response.json();
    },
    triggerScrape: async () => {
      const response = await fetch(`${API_BASE_URL}/jobs/scrape`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to trigger job scrape');
      }
      
      return response.json();
    }
  }
};
