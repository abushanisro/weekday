import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Briefcase, ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Job Matching</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Find Your Dream Job
            <span className="block text-gradient">With Smart Matching</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Connect with top companies hiring fresh talent. Your next career opportunity is just a search away.
          </p>

          {/* Search Box */}
          <div className="glass rounded-2xl p-3 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Job title, keywords, or company"
                  className="pl-10 h-12 bg-background border-none"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="City, state, or remote"
                  className="pl-10 h-12 bg-background border-none"
                />
              </div>
              <Button size="lg" className="h-12 px-8 gradient-primary">
                <Search className="w-5 h-5 mr-2" />
                Search Jobs
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Briefcase className="w-5 h-5 text-primary" />
              <span><strong className="text-foreground">10,000+</strong> Active Jobs</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span><strong className="text-foreground">500+</strong> Companies</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span><strong className="text-foreground">50,000+</strong> Placements</span>
            </div>
          </div>

          {/* Popular Searches */}
          <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <span className="text-sm text-muted-foreground mr-3">Popular:</span>
            {['Software Engineer', 'Product Manager', 'Data Analyst', 'UI/UX Designer'].map((term) => (
              <Button
                key={term}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
              >
                {term}
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;