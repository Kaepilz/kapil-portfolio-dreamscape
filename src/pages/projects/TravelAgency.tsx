
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const destinations = [
  {
    title: "Bali Paradise",
    location: "Indonesia",
    price: "$1,299",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=870",
    duration: "7 days"
  },
  {
    title: "Swiss Alps",
    location: "Switzerland",
    price: "$2,499",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=870",
    duration: "8 days"
  },
  {
    title: "Santorini Escape",
    location: "Greece",
    price: "$1,899",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=870",
    duration: "6 days"
  }
];

const TravelAgency = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-kapil-blue-dark to-kapil-blue-medium p-6">
      <div className="container mx-auto max-w-6xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gradient">Discover Your Next Adventure</h1>
          <p className="text-xl text-muted-foreground">Unforgettable travel experiences await</p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination, index) => (
              <Card key={index} className="overflow-hidden bg-kapil-blue-medium/50 border-kapil-blue-light/20 hover:border-kapil-red transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{destination.title}</h3>
                  <p className="text-kapil-red mb-2">{destination.location}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">{destination.price}</span>
                    <span className="text-muted-foreground">{destination.duration}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TravelAgency;

