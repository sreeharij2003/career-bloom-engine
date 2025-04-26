
import { JobListing, JobFilters } from "@/types/jobs";

// Mock data - this would be replaced with actual API calls to your backend
const mockJobs: JobListing[] = [
  {
    id: 1,
    title: "Senior UX Designer",
    company: "Adobe",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.png/800px-Adobe_Corporate_Logo.png",
    location: "San Francisco, CA",
    type: "Full-time",
    posted: "2 days ago",
    description: "Design user experiences for creative cloud products. Work with cross-functional teams to deliver exceptional designs.",
    tags: ["UX/UI", "Creative Cloud", "Adobe XD"],
    applicationUrl: "https://careers.adobe.com",
    salary: "$120,000 - $150,000",
    source: "LinkedIn"
  },
  {
    id: 2,
    title: "Full-Stack Developer",
    company: "Stripe",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png",
    location: "Remote",
    type: "Full-time",
    posted: "1 day ago",
    description: "Build and maintain payment systems. Work with modern JavaScript frameworks and Ruby on Rails.",
    tags: ["JavaScript", "Ruby", "React"],
    applicationUrl: "https://stripe.com/jobs",
    salary: "$130,000 - $160,000",
    source: "Indeed"
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "Spotify",
    logo: "https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png",
    location: "Stockholm, Sweden",
    type: "Full-time",
    posted: "3 days ago",
    description: "Analyze user behavior and music trends. Improve recommendation algorithms and user experience.",
    tags: ["Python", "Machine Learning", "SQL"],
    applicationUrl: "https://www.spotifyjobs.com/",
    source: "Glassdoor"
  },
  {
    id: 4,
    title: "Product Manager",
    company: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
    location: "Redmond, WA",
    type: "Full-time",
    posted: "5 days ago",
    description: "Lead product development for Microsoft Teams. Work with engineers and designers to build innovative solutions.",
    tags: ["Product Strategy", "Agile", "SaaS"],
    applicationUrl: "https://careers.microsoft.com",
    salary: "$140,000 - $180,000",
    source: "LinkedIn"
  },
  {
    id: 5,
    title: "Marketing Specialist",
    company: "Airbnb",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1200px-Airbnb_Logo_B%C3%A9lo.svg.png",
    location: "San Francisco, CA",
    type: "Full-time",
    posted: "1 week ago",
    description: "Develop and implement marketing campaigns for Airbnb. Analyze marketing data and optimize strategies.",
    tags: ["Digital Marketing", "Analytics", "Content Creation"],
    applicationUrl: "https://careers.airbnb.com",
    salary: "$90,000 - $120,000",
    source: "Indeed"
  },
  {
    id: 6,
    title: "DevOps Engineer",
    company: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png",
    location: "Los Gatos, CA",
    type: "Full-time",
    posted: "4 days ago",
    description: "Build and maintain infrastructure for Netflix. Implement CI/CD pipelines and ensure system reliability.",
    tags: ["AWS", "Kubernetes", "CI/CD"],
    applicationUrl: "https://jobs.netflix.com",
    salary: "$150,000 - $190,000",
    source: "Glassdoor"
  }
];

// In a real implementation, these functions would call your backend API
export const fetchJobs = async (filters?: JobFilters): Promise<JobListing[]> => {
  console.log("Fetching jobs with filters:", filters);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // This filtering would happen on the backend in a real implementation
  return filterJobs(mockJobs, filters);
};

export const searchJobs = async (searchTerm: string, filters?: JobFilters): Promise<JobListing[]> => {
  console.log(`Searching for "${searchTerm}" with filters:`, filters);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Filter the mock jobs based on the search term
  const searchResults = mockJobs.filter(job => {
    const searchLower = searchTerm.toLowerCase();
    return (
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower) ||
      job.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });
  
  // Apply additional filters
  return filterJobs(searchResults, filters);
};

// Helper function to apply filters
const filterJobs = (jobs: JobListing[], filters?: JobFilters): JobListing[] => {
  if (!filters) return jobs;
  
  return jobs.filter(job => {
    // Filter by location if provided
    if (filters.location && 
        !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    // Filter by job type if any are selected
    if (filters.jobType && filters.jobType.length > 0) {
      const normalizedType = job.type.toLowerCase();
      const matchesType = filters.jobType.some(type => 
        normalizedType.includes(type.toLowerCase())
      );
      if (!matchesType) return false;
    }
    
    // Filter by industry if any are selected (using tags as proxy for industry)
    if (filters.industry && filters.industry.length > 0 && job.tags) {
      const matchesIndustry = filters.industry.some(industry =>
        job.tags!.some(tag => tag.toLowerCase().includes(industry.toLowerCase()))
      );
      if (!matchesIndustry) return false;
    }
    
    // Filtering by experience level would require that field in the data
    
    return true;
  });
};

// For a real implementation, we'd need a function to refresh the job data from the backend
export const refreshJobData = async (): Promise<void> => {
  console.log("Triggering backend job data refresh");
  // This would call an endpoint that initiates web scraping on the backend
  await fetch('/api/jobs/refresh', { method: 'POST' });
};
