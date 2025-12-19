import { Button } from "@/components/ui/button";
import CompanyCard from "./CompanyCard";
import { ArrowRight } from "lucide-react";

const companies = [
  {
    name: "Google",
    logo: "https://www.google.com/favicon.ico",
    industry: "Technology",
    location: "Bangalore, India",
    employees: "10,000+ employees",
    openJobs: 42,
    tags: ["AI/ML", "Cloud", "Software Engineering"],
  },
  {
    name: "Microsoft",
    logo: "https://www.microsoft.com/favicon.ico",
    industry: "Technology",
    location: "Hyderabad, India",
    employees: "10,000+ employees",
    openJobs: 38,
    tags: ["Azure", "Office 365", "Gaming"],
  },
  {
    name: "Amazon",
    logo: "https://www.amazon.com/favicon.ico",
    industry: "E-commerce & Cloud",
    location: "Multiple Locations",
    employees: "10,000+ employees",
    openJobs: 65,
    tags: ["AWS", "Retail Tech", "Logistics"],
  },
  {
    name: "Flipkart",
    logo: "https://www.flipkart.com/favicon.ico",
    industry: "E-commerce",
    location: "Bangalore, India",
    employees: "5,000+ employees",
    openJobs: 24,
    tags: ["E-commerce", "Supply Chain", "Fintech"],
  },
  {
    name: "Razorpay",
    logo: "",
    industry: "Fintech",
    location: "Bangalore, India",
    employees: "1,000+ employees",
    openJobs: 18,
    tags: ["Payments", "Banking", "API"],
  },
  {
    name: "Swiggy",
    logo: "",
    industry: "Food Tech",
    location: "Bangalore, India",
    employees: "5,000+ employees",
    openJobs: 15,
    tags: ["Delivery", "Logistics", "Consumer Tech"],
  },
];

const TopCompanies = () => {
  return (
    <section id="companies" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Top Companies Hiring</h2>
            <p className="text-muted-foreground mt-2">
              Explore opportunities at leading organizations
            </p>
          </div>
          <Button variant="outline" className="group">
            View All Companies
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CompanyCard {...company} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCompanies;