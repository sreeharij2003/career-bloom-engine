
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Bell, MessageSquare, Search, User } from "lucide-react";
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-gradient-to-r from-primary-purple to-secondary-purple flex items-center justify-center text-white font-bold mr-2">CB</div>
            <span className="text-xl font-bold">CareerBloom</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/jobs" className="text-sm font-medium hover:text-primary-purple transition-colors">Jobs</Link>
            <Link to="/companies" className="text-sm font-medium hover:text-primary-purple transition-colors">Companies</Link>
            <Link to="/network" className="text-sm font-medium hover:text-primary-purple transition-colors">Network</Link>
            <Link to="/learning" className="text-sm font-medium hover:text-primary-purple transition-colors">Learning</Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
          <Button className="btn-gradient rounded-md">
            Sign In
          </Button>
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "md:hidden absolute w-full bg-white border-b border-gray-100 transition-all duration-200 ease-in-out", 
        mobileMenuOpen ? "max-h-screen py-4" : "max-h-0 overflow-hidden"
      )}>
        <nav className="container flex flex-col gap-4">
          <Link to="/jobs" className="text-sm font-medium hover:text-primary-purple transition-colors p-2">Jobs</Link>
          <Link to="/companies" className="text-sm font-medium hover:text-primary-purple transition-colors p-2">Companies</Link>
          <Link to="/network" className="text-sm font-medium hover:text-primary-purple transition-colors p-2">Network</Link>
          <Link to="/learning" className="text-sm font-medium hover:text-primary-purple transition-colors p-2">Learning</Link>
          <div className="flex items-center gap-2 mt-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </div>
          <Button className="btn-gradient rounded-md mt-2">
            Sign In
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
