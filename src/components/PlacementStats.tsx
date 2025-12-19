import { Users, Building2, TrendingUp, Award, Briefcase, GraduationCap } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "450+",
    label: "Students Placed",
    color: "bg-blue-500",
  },
  {
    icon: Building2,
    value: "120+",
    label: "Companies Visited",
    color: "bg-green-500",
  },
  {
    icon: TrendingUp,
    value: "₹50 LPA",
    label: "Highest Package",
    color: "bg-purple-500",
  },
  {
    icon: Award,
    value: "₹12 LPA",
    label: "Average Package",
    color: "bg-orange-500",
  },
  {
    icon: Briefcase,
    value: "95%",
    label: "Placement Rate",
    color: "bg-red-500",
  },
  {
    icon: GraduationCap,
    value: "500+",
    label: "Total Students",
    color: "bg-teal-500",
  },
];

const topRecruiters = [
  "Google", "Microsoft", "Amazon", "Meta", "Apple", "Flipkart", 
  "Razorpay", "Swiggy", "Zomato", "Paytm", "TCS", "Infosys", 
  "Wipro", "Accenture", "Deloitte", "Goldman Sachs"
];

const PlacementStats = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Top Recruiters */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-6">Our Top Recruiters</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {topRecruiters.map((recruiter, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-card rounded-full border border-border text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-pointer"
              >
                {recruiter}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementStats;