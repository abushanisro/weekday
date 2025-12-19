import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, DollarSign, Bookmark, Building2 } from "lucide-react";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  tags: string[];
  logo: string;
  posted: string;
  featured?: boolean;
}

const JobCard = ({
  title,
  company,
  location,
  salary,
  type,
  tags,
  logo,
  posted,
  featured = false,
}: JobCardProps) => {
  return (
    <Card className={`p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${featured ? 'border-primary/30 bg-primary/5' : ''}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Company Logo */}
        <div className="flex-shrink-0">
          <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center overflow-hidden">
            {logo ? (
              <img src={logo} alt={company} className="w-full h-full object-cover" />
            ) : (
              <Building2 className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Job Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {featured && (
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Featured</Badge>
                )}
                <Badge variant="secondary">{type}</Badge>
              </div>
              <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
                {title}
              </h3>
              <p className="text-muted-foreground">{company}</p>
            </div>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <Bookmark className="w-5 h-5" />
            </Button>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {location}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {salary}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {posted}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;