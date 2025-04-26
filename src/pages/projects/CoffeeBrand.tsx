
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CoffeeBrand = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2c1810] to-kapil-blue-dark">
      <div className="container mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </Link>

        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-gradient">Coffee Brand Identity</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Complete brand identity design for a premium coffee company, including logo,
                packaging design, and web presence. A cohesive visual identity that captures
                the essence of artisanal coffee.
              </p>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Deliverables:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Brand logo and guidelines</li>
                  <li>Packaging design</li>
                  <li>Marketing materials</li>
                  <li>Website design</li>
                  <li>Social media templates</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden border border-kapil-blue-light/20">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                  alt="Coffee Brand Preview"
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

export default CoffeeBrand;
