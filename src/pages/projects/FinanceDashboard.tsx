
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const FinanceDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-kapil-blue-dark via-kapil-blue-medium to-kapil-blue-dark">
      <div className="container mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </Link>

        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-gradient">Finance Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="col-span-1 lg:col-span-2 p-6 bg-kapil-blue-medium/50">
              <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
              <div className="aspect-video rounded-lg overflow-hidden border border-kapil-blue-light/20">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=870"
                  alt="Finance Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            <Card className="col-span-1 p-6 bg-kapil-blue-medium/50">
              <h2 className="text-xl font-semibold mb-4">About This Project</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  A comprehensive finance dashboard that provides real-time data visualization
                  and analytics. Built with TypeScript and React, featuring interactive charts
                  and detailed financial reporting.
                </p>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-foreground">Key Features:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Real-time data visualization</li>
                    <li>Interactive financial charts</li>
                    <li>Advanced filtering options</li>
                    <li>Expense tracking</li>
                    <li>Budget management</li>
                  </ul>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-medium text-foreground mb-2">Technologies Used:</h3>
                  <div className="flex flex-wrap gap-2">
                    {["TypeScript", "React", "Chart.js", "Firebase"].map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-kapil-blue-dark rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
