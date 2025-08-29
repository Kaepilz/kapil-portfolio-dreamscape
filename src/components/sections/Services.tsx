
import { Code, Layout, Palette, Smartphone, Lightbulb, Zap } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const ServiceCard = ({ 
  title, 
  description, 
  icon: Icon 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType;
}) => {
  return (
    <Card className="bg-kapil-blue-medium border-kapil-blue-light/20 hover:border-kapil-red transition-colors group">
      <CardHeader className="pb-2">
        <div className="w-14 h-14 bg-kapil-blue-dark rounded-lg p-3 mb-4 text-kapil-red group-hover:bg-kapil-red group-hover:text-white transition-colors">
          <Icon className="w-full h-full" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description: "Custom website development with modern technologies, ensuring fast, responsive, and user-friendly experiences.",
      icon: Code,
    },
    {
      title: "UI/UX Design",
      description: "Creative and intuitive user interface designs that enhance user experience and increase engagement.",
      icon: Layout,
    },
    {
      title: "Brand Identity",
      description: "Cohesive brand identity development including logos, color schemes, and design systems for digital platforms.",
      icon: Palette,
    },
    {
      title: "Responsive Design",
      description: "Mobile-first approach ensuring your website looks and functions perfectly on all devices and screen sizes.",
      icon: Smartphone,
    },
    {
      title: "Creative Solutions",
      description: "Innovative solutions to complex problems, bringing fresh ideas and creative approaches to your projects.",
      icon: Lightbulb,
    },
    {
      title: "Performance Optimization",
      description: "Speed and performance enhancements to ensure your website loads quickly and runs smoothly for all users.",
      icon: Zap,
    },
  ];

  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto">
        <h2 className="section-title">My Services</h2>
        <p className="text-muted-foreground max-w-2xl mb-12">
          I offer a wide range of services to help businesses and individuals establish 
          a strong online presence and create exceptional digital experiences.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={service.title} 
              className="animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
