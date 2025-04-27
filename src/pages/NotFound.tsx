
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-kapil-blue-dark to-kapil-blue-medium p-4">
      <div className="max-w-md w-full text-center bg-kapil-blue-medium/50 p-8 rounded-lg border border-kapil-blue-light/20 shadow-lg">
        <div className="w-24 h-24 bg-kapil-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-12 h-12 text-kapil-red" />
        </div>
        
        <h1 className="text-4xl font-bold mb-2 text-gradient">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild
            className="bg-kapil-red hover:bg-kapil-red/90 flex items-center gap-2"
          >
            <Link to="/">
              <Home className="h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          
          <Button 
            asChild
            variant="outline" 
            className="flex items-center gap-2"
          >
            <Link to="javascript:history.back()">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
