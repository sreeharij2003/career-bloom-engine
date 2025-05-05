
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

// API URL - would come from environment variables in production
const API_URL = "http://localhost:5000/api";

interface CareerStep {
  year: number;
  title: string;
  description: string;
  skills: string[];
}

interface CareerPathResponse {
  _id: string;
  title: string;
  query: string;
  steps: CareerStep[];
  createdAt: string;
}

// This would be a proper auth token from your auth context in a real app
const getAuthToken = () => localStorage.getItem('authToken') || 'demo-token';

const CareerPathPredictor = () => {
  const [query, setQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Use this to invalidate queries when new data is created
  const queryClient = new QueryClient();

  // Fetch the most recent career path if it exists
  const { data: roadmap, isLoading } = useQuery({
    queryKey: ['careerPath'],
    queryFn: async (): Promise<CareerPathResponse | null> => {
      try {
        // In a real implementation, this would call the API to get the most recent path
        // const response = await fetch(`${API_URL}/career/paths?limit=1`, {
        //   headers: {
        //     'Authorization': `Bearer ${getAuthToken()}`
        //   }
        // });
        // const data = await response.json();
        // return data.length > 0 ? data[0] : null;
        
        // For demo, we'll return mock data similar to what we had before
        return null;
      } catch (error) {
        console.error("Error fetching career path:", error);
        return null;
      }
    },
    enabled: false, // Initially disabled, we'll manually trigger it
  });

  // Create a career path
  const generateMutation = useMutation({
    mutationFn: async (queryText: string): Promise<CareerPathResponse> => {
      // In a real implementation, this would call the API
      // const response = await fetch(`${API_URL}/career/path`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${getAuthToken()}`
      //   },
      //   body: JSON.stringify({ query: queryText })
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to generate career path');
      // }
      
      // return response.json();
      
      // For demo purposes, we'll simulate an API call with the existing mock data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return {
        _id: "mock-id-" + Date.now(),
        title: "Path to CTO in 5 Years",
        query: queryText,
        steps: [
          {
            year: 1,
            title: "Senior Developer to Team Lead",
            description: "Focus on leadership skills while maintaining technical expertise. Lead small teams on projects and mentor junior developers.",
            skills: ["Leadership", "Technical mentoring", "Project management"]
          },
          {
            year: 2,
            title: "Engineering Manager",
            description: "Oversee multiple teams and be responsible for technical direction. Start focusing on cross-departmental collaboration.",
            skills: ["People management", "Technical strategy", "Cross-team collaboration"]
          },
          {
            year: 3,
            title: "Director of Engineering",
            description: "Develop broader technical vision and manage engineering department budget and resources.",
            skills: ["Technical vision", "Resource allocation", "Budget management"]
          },
          {
            year: 4,
            title: "VP of Engineering",
            description: "Take on company-wide technical leadership and represent engineering in executive discussions.",
            skills: ["Executive communication", "Strategic planning", "Technology roadmapping"]
          },
          {
            year: 5,
            title: "Chief Technology Officer",
            description: "Lead the overall technology strategy and innovation direction for the company.",
            skills: ["Technology innovation", "Executive leadership", "Business strategy"]
          }
        ],
        createdAt: new Date().toISOString()
      };
    },
    onSuccess: () => {
      // Invalidate the query to refetch the data
      queryClient.invalidateQueries({ queryKey: ['careerPath'] });
      toast.success("Career roadmap generated!");
    },
    onError: (error) => {
      toast.error("Failed to generate roadmap: " + error.message);
      console.error(error);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast.error("Please enter a career path query");
      return;
    }
    
    setIsGenerating(true);
    
    try {
      await generateMutation.mutateAsync(query);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          placeholder="e.g., Show me steps to become a CTO in 5 years"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button 
          type="submit" 
          disabled={isGenerating || isLoading}
        >
          {isGenerating ? "Generating..." : <Search className="mr-2" />}
          {isGenerating ? "" : "Generate"}
        </Button>
      </form>

      {(roadmap || generateMutation.data) && (
        <div className="mt-6 space-y-4">
          <h3 className="text-xl font-bold">{(generateMutation.data || roadmap)?.title}</h3>
          <div className="relative pl-8">
            {(generateMutation.data || roadmap)?.steps.map((step, index) => (
              <div key={index} className="mb-8 relative">
                <div className="absolute left-0 -translate-x-[21px] w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  {step.year}
                </div>
                <div className="absolute left-0 -translate-x-[17px] top-10 h-full w-[2px] bg-border">
                  {index !== ((generateMutation.data || roadmap)?.steps.length || 0) - 1 && <div className="h-full"></div>}
                </div>
                <div className="pl-4 pb-2">
                  <h4 className="text-lg font-semibold">{step.title}</h4>
                  <p className="text-muted-foreground mt-1">{step.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {step.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerPathPredictor;
