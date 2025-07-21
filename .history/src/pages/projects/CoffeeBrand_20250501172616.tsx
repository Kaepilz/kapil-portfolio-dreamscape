
import { Button } from "@/components/ui/button";
import { ArrowLeft, Coffee, ShoppingCart, Leaf, Clock, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

// Coffee products data
const COFFEE_PRODUCTS = [
  {
    id: 1,
    name: "Signature Blend",
    category: "Whole Bean",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=1470",
    description: "A balanced, medium roast with notes of chocolate, caramel, and toasted nuts. Perfect for everyday drinking.",
    origin: "Colombia, Ethiopia, Brazil",
    roastLevel: "Medium",
    intensity: 7,
  },
  {
    id: 2,
    name: "Single Origin Ethiopia",
    category: "Whole Bean",
    price: 21.99,
    image: "https://images.unsplash.com/photo-1521302080334-4bebac2763a6?q=80&w=1470",
    description: "Bright and fruity with floral notes and a wine-like acidity. Sourced from the Yirgacheffe region.",
    origin: "Ethiopia",
    roastLevel: "Light",
    intensity: 6,
  },
  {
    id: 3,
    name: "Dark Roast Espresso",
    category: "Ground",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1514066558159-fc8c737ef259?q=80&w=1470",
    description: "Bold, intense, and rich with chocolate notes and a smooth finish. Ideal for espresso machines.",
    origin: "Colombia, Brazil, Indonesia",
    roastLevel: "Dark",
    intensity: 9,
  },
  {
    id: 4,
    name: "Cold Brew Pack",
    category: "Coarse Ground",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1470",
    description: "Specially crafted for smooth, sweet cold brew with reduced acidity and a refreshing finish.",
    origin: "Guatemala, Colombia",
    roastLevel: "Medium-Dark",
    intensity: 8,
  }
];

// Brewing equipment data
const EQUIPMENT = [
  {
    id: 1,
    name: "Ceramic Pour Over",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1544776527-68e63addedf1?q=80&w=1470",
  },
  {
    id: 2,
    name: "Stainless Steel French Press",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1521302273756-9af7875abeb5?q=80&w=1470",
  },
  {
    id: 3,
    name: "Electric Burr Grinder",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1516224498413-84020dbaae8d?q=80&w=1470",
  }
];

const CoffeeBrand = () => {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([]);
  
  const addToCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { id: productId, quantity: 1 }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: "Coffee has been added to your cart",
    });
  };
  
  const toggleProductDetails = (productId: number) => {
    setSelectedProduct(selectedProduct === productId ? null : productId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2c1810] to-kapil-blue-dark">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1442975631115-c4f7b05b8a2c?q=80&w=1470" 
            alt="Coffee beans and brewing" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2c1810]/70 to-[#2c1810]"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link to="/">
              <Button variant="outline" className="mb-2">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>
            
            <div className="relative">
              <Button variant="outline" className="rounded-full px-3">
                <ShoppingCart className="h-4 w-4" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-kapil-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </div>
          </div>
          
          <div className="mt-24 md:mt-32 max-w-2xl">
            <Badge className="mb-4 bg-[#8B4513] text-white">Premium Coffee</Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Artisanal Coffee for Discerning Tastes</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Small-batch roasted coffee beans sourced from the world's finest growing regions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#8B4513] hover:bg-[#6F3A0F]">
                Shop Coffee
              </Button>
              <Button variant="outline">
                Learn Our Story
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {/* Featured Section */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Craft Coffee Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            We source exceptional coffee beans and roast them to perfection, highlighting their unique characteristics.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 bg-[#2c1810]/50 rounded-lg">
              <Coffee className="h-12 w-12 text-[#8B4513] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Single Origin</h3>
              <p className="text-muted-foreground text-center">
                Carefully selected beans from the world's premier coffee-growing regions.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-[#2c1810]/50 rounded-lg">
              <Leaf className="h-12 w-12 text-[#8B4513] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sustainably Sourced</h3>
              <p className="text-muted-foreground text-center">
                Direct trade relationships that support farmers and environmental practices.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-[#2c1810]/50 rounded-lg">
              <Clock className="h-12 w-12 text-[#8B4513] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Freshly Roasted</h3>
              <p className="text-muted-foreground text-center">
                Small-batch roasting to ensure peak flavor and freshness with every cup.
              </p>
            </div>
          </div>
        </div>
        
        {/* Shop Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Shop Our Collection</h2>
          </div>
          
          <Tabs defaultValue="coffee">
            <TabsList className="mb-8">
              <TabsTrigger value="coffee">Coffee</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="merchandise">Merchandise</TabsTrigger>
            </TabsList>
            
            <TabsContent value="coffee" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {COFFEE_PRODUCTS.map(coffee => (
                  <Card 
                    key={coffee.id} 
                    className={`bg-[#2c1810]/50 border-[#5c3a28]/50 overflow-hidden group hover:border-[#8B4513] transition-all duration-300 ${selectedProduct === coffee.id ? 'ring-2 ring-[#8B4513]' : ''}`}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={coffee.image} 
                        alt={coffee.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-1">
                        <span className="text-xs text-muted-foreground">{coffee.category}</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{coffee.name}</h3>
                      <p className="text-2xl font-bold text-[#8B4513]">${coffee.price}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 gap-2">
                      <Button 
                        className="w-full bg-[#8B4513] hover:bg-[#6F3A0F]"
                        onClick={() => addToCart(coffee.id)}
                      >
                        Add to Cart
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => toggleProductDetails(coffee.id)}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                    
                    {selectedProduct === coffee.id && (
                      <div className="p-4 border-t border-[#5c3a28]/50">
                        <p className="text-sm mb-4">{coffee.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Origin</span>
                            <span>{coffee.origin}</span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Roast Level</span>
                            <span>{coffee.roastLevel}</span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Intensity</span>
                            <div className="flex items-center">
                              {Array(10).fill(0).map((_, i) => (
                                <div 
                                  key={i} 
                                  className={`w-2 h-2 rounded-full mx-0.5 ${i < coffee.intensity ? 'bg-[#8B4513]' : 'bg-[#5c3a28]/30'}`}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="equipment">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {EQUIPMENT.map(item => (
                  <Card key={item.id} className="bg-[#2c1810]/50 border-[#5c3a28]/50 overflow-hidden group">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-2xl font-bold text-[#8B4513]">${item.price}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full bg-[#8B4513] hover:bg-[#6F3A0F]">
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="merchandise">
              <div className="flex flex-col items-center justify-center py-12 px-4 bg-[#2c1810]/50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Coming Soon</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Our merchandise collection is currently in development. Check back soon for t-shirts, mugs, and more!
                </p>
                <Button variant="outline">
                  Get Notified
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Brand Story */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Brand Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2015, our coffee brand began with a simple mission: to connect people with exceptional coffee experiences while supporting sustainable farming practices.
              </p>
              <p className="text-muted-foreground mb-6">
                We travel the world to source the finest beans, develop relationships with farmers, and create roast profiles that highlight each coffee's unique characteristics.
              </p>
              <Button className="bg-[#8B4513] hover:bg-[#6F3A0F]">
                Learn More
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1470"
                alt="Coffee shop interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Coffee Guide */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Brewing Guide</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Perfect your home brewing with our comprehensive guides and tips from our expert baristas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Pour Over",
                image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1470",
                time: "3-4 minutes",
                difficulty: "Medium"
              },
              {
                title: "French Press",
                image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1374",
                time: "4-5 minutes",
                difficulty: "Easy"
              },
              {
                title: "Espresso",
                image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1470",
                time: "25-30 seconds",
                difficulty: "Advanced"
              }
            ].map((method, i) => (
              <Card key={i} className="bg-[#2c1810]/50 border-[#5c3a28]/50 overflow-hidden group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={method.image} 
                    alt={method.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Brew time: {method.time}</span>
                    <span>Difficulty: {method.difficulty}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" className="w-full">
                    View Guide
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeBrand;
