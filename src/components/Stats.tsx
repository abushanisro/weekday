import { Users, Briefcase, Building2, Award } from "lucide-react";

const stats = [
  {
    icon: Briefcase,
    value: "10,000+",
    label: "Active Jobs",
    description: "New opportunities added daily",
  },
  {
    icon: Building2,
    value: "500+",
    label: "Companies",
    description: "From startups to Fortune 500",
  },
  {
    icon: Users,
    value: "50,000+",
    label: "Placements",
    description: "Successful career transitions",
  },
  {
    icon: Award,
    value: "95%",
    label: "Success Rate",
    description: "Candidates placed within 3 months",
  },
];

const Stats = () => {
  return (
    <section className="py-20 gradient-primary">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-foreground/10 mb-4">
                <stat.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="text-4xl font-bold text-primary-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-lg font-medium text-primary-foreground/90">
                {stat.label}
              </div>
              <div className="text-sm text-primary-foreground/70 mt-1">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;