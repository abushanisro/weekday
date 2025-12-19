import { Building2, GraduationCap, IndianRupee, Share2, CheckCircle2, Clock, Star, Copy, Linkedin, Twitter } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

interface PlacementCardProps {
  name: string;
  company: string;
  role: string;
  package: string;
  branch: string;
  color: string;
  rotation?: string;
  position?: string;
  status?: "applied" | "shortlisted" | "selected";
}

const statusConfig = {
  applied: {
    label: "Applied",
    icon: Clock,
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  },
  shortlisted: {
    label: "Shortlisted",
    icon: Star,
    color: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  },
  selected: {
    label: "Selected",
    icon: CheckCircle2,
    color: "bg-green-500/10 text-green-600 border-green-500/30",
  },
};

const PlacementCard = ({
  name,
  company,
  role,
  package: salary,
  branch,
  color,
  status = "selected",
}: PlacementCardProps) => {
  const currentStatus = statusConfig[status];

  const handleShare = (platform: string) => {
    const shareText = `🎉 ${name} got placed at ${company} as ${role} with ${salary} package! #Placement #Success`;
    const shareUrl = window.location.href;

    if (platform === "copy") {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      toast({
        title: "Copied to clipboard!",
        description: "Share link has been copied.",
      });
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`, "_blank");
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-card rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 border border-border/50 relative overflow-hidden group cursor-pointer">
          {/* Company Color Bar */}
          <div className={`absolute top-0 left-0 right-0 h-2 ${color}`} />
          
          {/* Push Pin */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-500 shadow-md z-10" />
          
          {/* Content */}
          <div className="pt-2">
            {/* Company */}
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-foreground text-sm truncate">{company}</span>
            </div>

            {/* Student Name */}
            <h3 className="font-semibold text-foreground text-base mb-1 truncate">{name}</h3>
            
            {/* Role */}
            <p className="text-muted-foreground text-xs mb-2 truncate">{role}</p>

            {/* Details */}
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <GraduationCap className="w-3 h-3" />
                <span className="truncate">{branch}</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-accent">
                <IndianRupee className="w-3 h-3" />
                <span>{salary}</span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mt-3">
              <Badge variant="outline" className={`text-xs ${currentStatus.color}`}>
                <currentStatus.icon className="w-3 h-3 mr-1" />
                {currentStatus.label}
              </Badge>
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{name}</h3>
              <p className="text-sm text-muted-foreground font-normal">{company}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {/* Status Tracker */}
          <div className="bg-secondary/50 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-foreground mb-3">Placement Status</h4>
            <div className="flex items-center justify-between">
              {Object.entries(statusConfig).map(([key, value], index) => {
                const isActive = key === status;
                const isPassed = Object.keys(statusConfig).indexOf(status) >= index;
                const StatusIcon = value.icon;
                
                return (
                  <div key={key} className="flex flex-col items-center gap-2 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isPassed 
                        ? key === "selected" 
                          ? "bg-green-500 text-white" 
                          : key === "shortlisted"
                            ? "bg-blue-500 text-white"
                            : "bg-yellow-500 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      <StatusIcon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-medium ${isPassed ? "text-foreground" : "text-muted-foreground"}`}>
                      {value.label}
                    </span>
                    {index < 2 && (
                      <div className={`absolute h-0.5 w-12 ${isPassed && Object.keys(statusConfig).indexOf(status) > index ? "bg-primary" : "bg-muted"}`} 
                        style={{ left: `calc(${(index + 1) * 33}% - 24px)`, top: "calc(50% - 20px)" }} 
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Role</span>
              <span className="text-sm font-medium text-foreground">{role}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Branch</span>
              <span className="text-sm font-medium text-foreground">{branch}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Package</span>
              <span className="text-sm font-bold text-accent">{salary}</span>
            </div>
          </div>

          {/* Share Options */}
          <div className="pt-2">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share This Achievement
            </h4>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => handleShare("copy")}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleShare("linkedin")}
                className="bg-[#0077B5]/10 hover:bg-[#0077B5]/20 border-[#0077B5]/30"
              >
                <Linkedin className="w-4 h-4 text-[#0077B5]" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleShare("twitter")}
                className="bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border-[#1DA1F2]/30"
              >
                <Twitter className="w-4 h-4 text-[#1DA1F2]" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlacementCard;