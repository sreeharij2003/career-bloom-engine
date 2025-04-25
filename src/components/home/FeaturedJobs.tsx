
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Building, Clock } from "lucide-react";

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
  }
];

const FeaturedJobs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Jobs</h2>
            <p className="text-muted-foreground mt-2">Curated opportunities that match top talent</p>
          </div>
          <Link to="/jobs" className="text-primary-purple hover:underline mt-4 md:mt-0">
            View all jobs →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map(job => (
            <Card key={job.id} className="card-hover overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-white rounded-md overflow-hidden border p-1 flex items-center justify-center">
                    <img src={job.logo} alt={job.company} className="max-w-full max-h-full object-contain" />
                  </div>
                  <Badge variant={job.type === "Full-time" ? "default" : "outline"}>{job.type}</Badge>
                </div>
                <CardTitle className="mt-4 text-xl">
                  <Link to={`/jobs/${job.id}`} className="hover:text-primary-purple transition-colors">
                    {job.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Posted {job.posted}</span>
                  </div>
                  <p className="line-clamp-2 text-muted-foreground mt-2">{job.description}</p>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-accent text-secondary-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedJobs;
