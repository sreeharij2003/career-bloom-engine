
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MessageSquare, Briefcase, User, Star, Upload, FileText } from "lucide-react";
import { toast } from "sonner";
import { fetchJobs } from "@/services/jobsService";
import { JobListing } from "@/types/jobs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ConnectionRecommender = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [connections, setConnections] = useState<Array<{
    id: string;
    name: string;
    title: string;
    company: string;
    skills: string[];
    relevanceScore: number;
    location: string;
    photo?: string;
  }> | null>(null);
  const [recommendedJobs, setRecommendedJobs] = useState<JobListing[] | null>(null);
  const [activeTab, setActiveTab] = useState<"people" | "jobs">("people");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast.error("Please enter a connection search query");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // This would be replaced with an actual LLM API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data - would be generated by LLM
      setConnections([
        {
          id: "1",
          name: "Sarah Mueller",
          title: "Blockchain Lead Developer",
          company: "GreenChain Solutions",
          skills: ["Blockchain", "Solidity", "Climate Tech", "Carbon Credits"],
          relevanceScore: 96,
          location: "Berlin",
          photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop"
        },
        {
          id: "2",
          name: "Thomas Weber",
          title: "CTO",
          company: "ClimateBlock",
          skills: ["Blockchain Architecture", "Green Tech", "Sustainability"],
          relevanceScore: 92,
          location: "Berlin",
          photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
        },
        {
          id: "3",
          name: "Anya Petrova",
          title: "Product Manager",
          company: "EcoToken",
          skills: ["Blockchain Products", "Sustainability", "Carbon Markets"],
          relevanceScore: 88,
          location: "Berlin",
          photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop"
        },
        {
          id: "4",
          name: "Lucas Schmidt",
          title: "Senior Blockchain Developer",
          company: "Climate Chain Coalition",
          skills: ["Smart Contracts", "DeFi", "Environmental Impact"],
          relevanceScore: 85,
          location: "Berlin",
          photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop"
        }
      ]);
      
      toast.success("Connection recommendations found!");
    } catch (error) {
      toast.error("Failed to find connections. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setResumeFile(file);
    setIsLoading(true);
    
    try {
      toast.info(`Analyzing resume: ${file.name}`);
      
      // This would be replaced with actual resume parsing and job matching logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Use the jobsService to get mock jobs data
      const allJobs = await fetchJobs();
      
      // Filter/sort jobs based on assumed resume content (in a real app this would use NLP/ML)
      const matchedJobs = allJobs
        .slice(0, 5)
        .map(job => ({
          ...job,
          relevanceScore: Math.floor(Math.random() * 30) + 70 // 70-99% match for demo
        }))
        .sort((a: any, b: any) => b.relevanceScore - a.relevanceScore);
      
      setRecommendedJobs(matchedJobs);
      setActiveTab("jobs");
      toast.success("Job recommendations based on your resume found!");
    } catch (error) {
      toast.error("Failed to analyze resume. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "people" | "jobs")} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="people" className="mt-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              placeholder="e.g., Connect with blockchain developers in Berlin working on climate tech"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Searching..." : <Search className="mr-2" />}
              {isLoading ? "" : "Search"}
            </Button>
          </form>

          {connections && (
            <div className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {connections.map((connection) => (
                  <div 
                    key={connection.id} 
                    className="border rounded-lg p-4 flex flex-col justify-between"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        {connection.photo ? (
                          <div className="w-16 h-16 rounded-full overflow-hidden">
                            <img 
                              src={connection.photo} 
                              alt={connection.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                            <User size={24} className="text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          {connection.name}
                          <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Star size={12} />
                            {connection.relevanceScore}%
                          </span>
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Briefcase size={14} />
                          {connection.title} at {connection.company}
                        </p>
                        <p className="text-sm text-muted-foreground">{connection.location}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {connection.skills.map((skill, i) => (
                          <span 
                            key={i}
                            className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t flex justify-end">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <MessageSquare size={16} />
                        Connect
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="jobs" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Resume-Based Job Recommendations</CardTitle>
              <CardDescription>
                Upload your resume to find job opportunities that match your skills and experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-2 border-dashed rounded-lg p-6 text-center bg-muted/50 hover:bg-muted/80 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleResumeUpload}
                  />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm font-medium">
                      {resumeFile ? "Replace resume" : "Drag & drop or click to upload your resume"}
                    </p>
                    <p className="text-xs text-muted-foreground">PDF or Word Document (max 5MB)</p>
                  </div>
                </div>
                
                {resumeFile && (
                  <div className="flex items-center gap-2 p-2 bg-primary/10 rounded">
                    <FileText size={18} className="text-primary" />
                    <span className="font-medium">{resumeFile.name}</span>
                  </div>
                )}
                
                {recommendedJobs && recommendedJobs.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Job Recommendations Based on Your Resume</h3>
                    {recommendedJobs.map((job) => (
                      <div key={job.id} className="border rounded-lg p-4">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-semibold">{job.title}</h4>
                            <p className="text-sm">{job.company} • {job.location}</p>
                          </div>
                          <div className="bg-primary/10 text-primary text-xs px-2 h-fit py-0.5 rounded-full flex items-center gap-1">
                            <Star size={12} />
                            {(job as any).relevanceScore}% match
                          </div>
                        </div>
                        <p className="text-sm mt-2 line-clamp-2">{job.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {job.tags?.map((tag, i) => (
                            <span 
                              key={i}
                              className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t flex justify-between">
                          <span className="text-sm text-muted-foreground">Posted {job.posted}</span>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-1"
                            onClick={() => window.open(job.applicationUrl, '_blank')}
                          >
                            <Briefcase size={16} />
                            Apply
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : resumeFile && isLoading ? (
                  <div className="text-center py-8">
                    <p>Analyzing your resume and finding matching jobs...</p>
                  </div>
                ) : resumeFile ? (
                  <div className="text-center py-8">
                    <p>No job recommendations found. Try uploading a different resume.</p>
                  </div>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConnectionRecommender;
