
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const EcommercePlatform = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-kapil-blue-dark to-kapil-blue-medium">
      <div className="container mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </Link>

        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-gradient">E-Commerce Platform</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                A modern e-commerce platform built with React and Next.js, featuring a full shopping cart functionality
                and Stripe payment integration. This project demonstrates advanced state management and API integration.
              </p>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Key Features:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Product catalog with search and filtering</li>
                  <li>Shopping cart with real-time updates</li>
                  <li>Secure payment processing with Stripe</li>
                  <li>Responsive design for all devices</li>
                  <li>User authentication and order history</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden border border-kapil-blue-light/20">
                <img 
                  src="https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=864" 
                  alt="E-commerce Platform Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden border border-kapil-blue-light/20">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=870"
                    alt="Dashboard View"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden border border-kapil-blue-light/20">
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=870"
                    alt="Mobile View"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommercePlatform;
