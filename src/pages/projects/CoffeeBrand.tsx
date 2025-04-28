
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const products = [
  {
    name: "Signature Blend",
    description: "A perfect balance of flavor and aroma",
    price: "$18.99",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=870"
  },
  {
    name: "Ethiopian Yirgacheffe",
    description: "Light roasted, floral and citrus notes",
    price: "$21.99",
    image: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=870"
  },
  {
    name: "Colombian Supremo",
    description: "Medium roast with caramel sweetness",
    price: "$19.99",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=870"
  }
];

const CoffeeBrand = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-kapil-blue-dark to-kapil-blue-medium p-6">
      <div className="container mx-auto max-w-6xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gradient">Artisan Coffee Co.</h1>
          <p className="text-xl text-muted-foreground">Crafted with passion, served with pride</p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <Card key={index} className="overflow-hidden bg-kapil-blue-medium/50 border-kapil-blue-light/20 hover:border-kapil-red transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <p className="text-kapil-red font-semibold">{product.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CoffeeBrand;

