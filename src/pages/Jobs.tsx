
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Building, Clock, Filter, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs, searchJobs } from "@/services/jobsService";
import { JobListing } from "@/types/jobs";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    jobType: [] as string[],
    experienceLevel: [] as string[],
    industry: [] as string[]
  });

  const { data: jobs = [], isLoading, error } = useQuery({
    queryKey: ['jobs', searchTerm, filters],
    queryFn: () => searchTerm ? searchJobs(searchTerm, filters) : fetchJobs(filters),
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The query will automatically refetch when searchTerm changes
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => {
      const currentValues = prev[filterType as keyof typeof prev] as string[];
      
      return {
        ...prev,
        [filterType]: currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value]
      };
    });
  };

  const handleApplyFilters = () => {
    // The query will automatically refetch when filters change
  };

  return (
    <MainLayout>
      <div className="container py-10">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Sidebar filters */}
          <div className="w-full md:w-64 shrink-0 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Location</h3>
                  <Input 
                    placeholder="Search locations" 
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Job Type</h3>
                  <div className="space-y-1">
                    {["Full-Time", "Part-Time", "Contract", "Remote"].map(type => (
                      <label key={type} className="flex items-center gap-2 text-sm">
                        <input 
                          type="checkbox" 
                          className="rounded text-primary"
                          checked={filters.jobType.includes(type)}
                          onChange={() => handleFilterChange('jobType', type)}
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Experience Level</h3>
                  <div className="space-y-1">
                    {["Entry Level", "Mid Level", "Senior Level"].map(level => (
                      <label key={level} className="flex items-center gap-2 text-sm">
                        <input 
                          type="checkbox" 
                          className="rounded text-primary"
                          checked={filters.experienceLevel.includes(level)}
                          onChange={() => handleFilterChange('experienceLevel', level)}
                        />
                        {level}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Industry</h3>
                  <div className="space-y-1">
                    {["Technology", "Healthcare", "Finance", "Education"].map(industry => (
                      <label key={industry} className="flex items-center gap-2 text-sm">
                        <input 
                          type="checkbox" 
                          className="rounded text-primary"
                          checked={filters.industry.includes(industry)}
                          onChange={() => handleFilterChange('industry', industry)}
                        />
                        {industry}
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full btn-gradient" onClick={handleApplyFilters}>Apply Filters</Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Job listings */}
          <div className="flex-1 space-y-6">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search job titles, companies, or keywords" 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
              <Button type="submit" className="btn-gradient md:w-auto w-full">Search</Button>
            </form>
            
            <h1 className="text-2xl font-bold">Browse Jobs</h1>
            
            {isLoading ? (
              <div className="text-center py-10">Loading jobs...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-500">
                Error loading jobs. Please try again later.
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-10">
                No jobs found matching your criteria. Try adjusting your search.
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job: JobListing) => (
                  <Card key={job.id} className="card-hover overflow-hidden">
                    <div className="p-6 flex gap-4">
                      <div className="hidden md:block w-16 h-16 bg-white rounded-md overflow-hidden border p-2 flex-shrink-0">
                        <img src={job.logo || "/placeholder.svg"} alt={job.company} className="w-full h-full object-contain" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row justify-between gap-2">
                          <div>
                            <h2 className="text-xl font-semibold">
                              <a 
                                href={job.applicationUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-primary-purple transition-colors"
                              >
                                {job.title}
                              </a>
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                              <Building className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">{job.company}</span>
                            </div>
                          </div>
                          <Badge variant={job.type === "Full-time" ? "default" : "outline"} className="h-fit">
                            {job.type}
                          </Badge>
                        </div>
                        
                        <p className="my-2 text-muted-foreground">{job.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {job.tags && job.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="bg-accent text-secondary-foreground">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-4 text-sm">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>Posted {job.posted}</span>
                          </div>
                          {job.salary && (
                            <div className="flex items-center">
                              <Briefcase className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{job.salary}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Pagination placeholder - would be implemented with real API */}
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="mr-2">Previous</Button>
              <Button className="btn-gradient">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Jobs;
