import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Users, Briefcase, Building2 } from "lucide-react";

interface CompanyCardProps {
  name: string;
  logo: string;
  industry: string;
  location: string;
  employees: string;
  openJobs: number;
  tags: string[];
}

const CompanyCard = ({
  name,
  logo,
  industry,
  location,
  employees,
  openJobs,
  tags,
}: CompanyCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
          {logo ? (
            <img src={logo} alt={name} className="w-full h-full object-cover" />
          ) : (
            <Building2 className="w-8 h-8 text-muted-foreground" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm">{industry}</p>
        </div>

        <Badge className="bg-accent/10 text-accent hover:bg-accent/20 flex-shrink-0">
          {openJobs} Jobs
        </Badge>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {location}
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          {employees}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
    </Card>
  );
};

export default CompanyCard;