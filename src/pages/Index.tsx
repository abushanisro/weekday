import PlacementBoard from "@/components/PlacementBoard";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PlacementBoard />
      <Toaster />
    </div>
  );
};

export default Index;