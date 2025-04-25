
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-secondary overflow-hidden shadow-xl">
          <div className="px-8 py-16 md:p-16 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                Ready to Bloom in Your Career?
              </h2>
              <p className="text-white/80 mb-6 text-lg">
                Create your profile today and discover opportunities that match your unique skills and aspirations. Your dream job is just a few clicks away.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-primary hover:bg-white/90" size="lg" asChild>
                  <Link to="/profile/create">Get Started</Link>
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white/10" size="lg" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <img 
                src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80" 
                alt="Career success" 
                className="rounded-xl shadow-lg max-w-[90%] transform rotate-3"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection;
