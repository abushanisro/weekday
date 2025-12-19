import { Button } from "@/components/ui/button";
import JobCard from "./JobCard";
import { ArrowRight } from "lucide-react";

const jobs = [
  {
    title: "Senior Software Engineer",
    company: "Google",
    location: "Bangalore, India",
    salary: "₹25-40 LPA",
    type: "Full-time",
    tags: ["React", "Node.js", "TypeScript", "AWS"],
    logo: "https://www.google.com/favicon.ico",
    posted: "2 days ago",
    featured: true,
  },
  {
    title: "Product Manager",
    company: "Microsoft",
    location: "Hyderabad, India",
    salary: "₹30-50 LPA",
    type: "Full-time",
    tags: ["Product Strategy", "Agile", "Analytics"],
    logo: "https://www.microsoft.com/favicon.ico",
    posted: "1 week ago",
    featured: true,
  },
  {
    title: "Data Analyst",
    company: "Amazon",
    location: "Remote",
    salary: "₹15-25 LPA",
    type: "Full-time",
    tags: ["Python", "SQL", "Tableau", "Machine Learning"],
    logo: "https://www.amazon.com/favicon.ico",
    posted: "3 days ago",
  },
  {
    title: "UI/UX Designer",
    company: "Flipkart",
    location: "Bangalore, India",
    salary: "₹18-30 LPA",
    type: "Full-time",
    tags: ["Figma", "User Research", "Prototyping"],
    logo: "https://www.flipkart.com/favicon.ico",
    posted: "5 days ago",
  },
  {
    title: "DevOps Engineer",
    company: "Razorpay",
    location: "Bangalore, India",
    salary: "₹20-35 LPA",
    type: "Full-time",
    tags: ["Kubernetes", "Docker", "CI/CD", "Terraform"],
    logo: "",
    posted: "1 day ago",
    featured: true,
  },
  {
    title: "Full Stack Developer",
    company: "Swiggy",
    location: "Remote",
    salary: "₹12-22 LPA",
    type: "Contract",
    tags: ["React", "Python", "PostgreSQL", "Redis"],
    logo: "",
    posted: "4 days ago",
  },
];

const FeaturedJobs = () => {
  return (
    <section id="jobs" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Jobs</h2>
            <p className="text-muted-foreground mt-2">
              Hand-picked opportunities from top companies
            </p>
          </div>
          <Button variant="outline" className="group">
            View All Jobs
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid gap-4">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <JobCard {...job} />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button size="lg" className="gradient-primary">
            Browse All 10,000+ Jobs
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;