
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Building, Clock, Filter, Search } from "lucide-react";
import { Link } from "react-router-dom";

// Sample job data
const jobs = [
  {
    id: 1,
    title: "Senior UX Designer",
    company: "Adobe",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.png/800px-Adobe_Corporate_Logo.png",
    location: "San Francisco, CA",
    type: "Full-time",
    posted: "2 days ago",
    description: "Design user experiences for creative cloud products. Work with cross-functional teams to deliver exceptional designs.",
    tags: ["UX/UI", "Creative Cloud", "Adobe XD"]
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
    tags: ["JavaScript", "Ruby", "React"]
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
    tags: ["Python", "Machine Learning", "SQL"]
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
    tags: ["Product Strategy", "Agile", "SaaS"]
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
    tags: ["Digital Marketing", "Analytics", "Content Creation"]
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
    tags: ["AWS", "Kubernetes", "CI/CD"]
  }
];

const Jobs = () => {
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
                  <Input placeholder="Search locations" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Job Type</h3>
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-primary" />
                      Full-Time
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-primary" />
                      Part-Time
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-primary" />
                      Contract
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-primary" />
                      Remote
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Experience Level</h3>
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-primary" />
                      Entry Level
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-primary" />
                      Mid Level
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-primary" />
                      Senior Level
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Industry</h3>
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-primary" />
                      Technology
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-primary" />
                      Healthcare
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-primary" />
                      Finance
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded text-primary" />
                      Education
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full btn-gradient">Apply Filters</Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Job listings */}
          <div className="flex-1 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search job titles, companies, or keywords" className="pl-10" />
              </div>
              <Button className="btn-gradient md:w-auto w-full">Search</Button>
            </div>
            
            <h1 className="text-2xl font-bold">Browse Jobs</h1>
            
            <div className="space-y-4">
              {jobs.map(job => (
                <Card key={job.id} className="card-hover overflow-hidden">
                  <div className="p-6 flex gap-4">
                    <div className="hidden md:block w-16 h-16 bg-white rounded-md overflow-hidden border p-2 flex-shrink-0">
                      <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row justify-between gap-2">
                        <div>
                          <h2 className="text-xl font-semibold">
                            <Link to={`/jobs/${job.id}`} className="hover:text-primary-purple transition-colors">
                              {job.title}
                            </Link>
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
                        {job.tags.map((tag, index) => (
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
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
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
