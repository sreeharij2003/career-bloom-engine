
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useMutation } from "@tanstack/react-query";
import { API } from "@/services/api";

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

const CareerPathPredictor = () => {
  const [query, setQuery] = useState("");
  
  // Fetch the most recent career path
  const { data: roadmap, isLoading, refetch } = useQuery({
    queryKey: ['careerPath'],
    queryFn: async (): Promise<CareerPathResponse | null> => {
      try {
        const paths = await API.career.getUserCareerPaths();
        return paths.length > 0 ? paths[0] : null;
      } catch (error) {
        console.error("Error fetching career path:", error);
        return null;
      }
    },
  });

  // Create a career path
  const generateMutation = useMutation({
    mutationFn: async (queryText: string): Promise<CareerPathResponse> => {
      return await API.career.generateCareerPath(queryText);
    },
    onSuccess: () => {
      // Refetch to get the latest data
      refetch();
      toast.success("Career roadmap generated!");
    },
    onError: (error) => {
      toast.error("Failed to generate roadmap: " + (error as Error).message);
      console.error(error);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast.error("Please enter a career path query");
      return;
    }
    
    try {
      generateMutation.mutate(query);
    } catch (error) {
      console.error("Error generating career path:", error);
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
          disabled={generateMutation.isPending || isLoading}
        >
          {generateMutation.isPending ? "Generating..." : <Search className="mr-2" />}
          {generateMutation.isPending ? "" : "Generate"}
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
