
// Base API URL - would come from environment variables in production
const API_URL = "http://localhost:5000/api";

// Get auth token from local storage
const getAuthToken = () => localStorage.getItem('authToken');

// Generic fetch function with authorization
const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
  
  // Handle 401 Unauthorized by redirecting to login
  if (response.status === 401) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    // In a real app, you'd redirect to login here
    // window.location.href = '/login';
    throw new Error('Authentication required');
  }
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }
  
  return data;
};

// Auth API calls
export const authAPI = {
  register: async (userData: { name: string; email: string; password: string }) => {
    return fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  login: async (credentials: { email: string; password: string }) => {
    return fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  
  getProfile: async () => {
    return fetchWithAuth('/auth/profile');
  },
  
  updateProfile: async (profileData: any) => {
    return fetchWithAuth('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

// Career API calls
export const careerAPI = {
  generateCareerPath: async (query: string) => {
    return fetchWithAuth('/career/path', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
  },
  
  getUserCareerPaths: async () => {
    return fetchWithAuth('/career/paths');
  },
  
  getCareerPathById: async (id: string) => {
    return fetchWithAuth(`/career/path/${id}`);
  },
};

// Jobs API calls
export const jobsAPI = {
  getAllJobs: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, String(value));
      }
    });
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return fetchWithAuth(`/jobs${queryString}`);
  },
  
  getFeaturedJobs: async () => {
    return fetchWithAuth('/jobs/featured');
  },
  
  getJobRecommendations: async () => {
    return fetchWithAuth('/jobs/recommendations');
  },
};

// Export all APIs as a single object
export const API = {
  auth: authAPI,
  career: careerAPI,
  jobs: jobsAPI,
};
