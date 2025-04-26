
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const FitnessApp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-kapil-blue-dark via-[#2d1b2d] to-kapil-blue-dark">
      <div className="container mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </Link>

        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-gradient">Fitness App Interface</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="col-span-1 lg:col-span-2 p-6 bg-kapil-blue-medium/50">
              <h2 className="text-xl font-semibold mb-4">App Interface Preview</h2>
              <div className="aspect-video rounded-lg overflow-hidden border border-kapil-blue-light/20">
                <img 
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
                  alt="Fitness App Interface"
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            <Card className="col-span-1 p-6 bg-kapil-blue-medium/50">
              <h2 className="text-xl font-semibold mb-4">About This Project</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  A modern fitness tracking application interface designed to help users
                  monitor workouts and track their fitness progress. Features an intuitive
                  UI/UX focused on user engagement.
                </p>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-foreground">Key Features:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Workout tracking</li>
                    <li>Progress visualization</li>
                    <li>Nutrition planning</li>
                    <li>Social sharing</li>
                    <li>Personalized goals</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessApp;
