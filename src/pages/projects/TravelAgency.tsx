
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const TravelAgency = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-kapil-blue-dark to-kapil-blue-medium">
      <div className="container mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </Link>

        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-gradient">Travel Agency Website</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                A modern travel agency website with booking functionality and destination showcase.
                Features an intuitive user interface and seamless booking experience.
              </p>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Key Features:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Destination search and filtering</li>
                  <li>Online booking system</li>
                  <li>Travel package customization</li>
                  <li>User reviews and ratings</li>
                  <li>Interactive travel maps</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden border border-kapil-blue-light/20">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                  alt="Travel Agency Website Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelAgency;
