import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Linkedin, Twitter, Instagram, Mail, Phone, MapPin, GraduationCap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-foreground">PlaceBoard</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Connecting talented students with top companies. Your career starts here.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Placements 2024</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Companies</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Statistics</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Training Programs</a></li>
            </ul>
          </div>

          {/* For Companies */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">For Companies</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Recruit From Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Schedule Visit</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Internship Program</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact TPO</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Training & Placement Cell, Campus</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="text-sm">placements@college.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 PlaceBoard - Training & Placement Cell
          </p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Linkedin className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Twitter className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Instagram className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;