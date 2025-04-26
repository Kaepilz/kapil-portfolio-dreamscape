
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Heart, Search, Filter, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

// Sample product data
const PRODUCTS = [
  {
    id: 1,
    name: "Modern Desk Lamp",
    price: 49.99,
    category: "Home Decor",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1974",
    isFeatured: true,
    isNew: true,
    description: "A sleek, adjustable desk lamp with multiple brightness settings and wireless charging base."
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 129.99,
    category: "Electronics",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1978",
    isFeatured: true,
    isNew: false,
    description: "Premium wireless earbuds with active noise cancellation and 24-hour battery life."
  },
  {
    id: 3,
    name: "Leather Wallet",
    price: 34.99,
    category: "Accessories",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1974",
    isFeatured: false,
    isNew: false,
    description: "Handcrafted genuine leather wallet with RFID blocking technology and multiple card slots."
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 199.99,
    category: "Electronics",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964",
    isFeatured: true,
    isNew: true,
    description: "Advanced smartwatch with health monitoring, GPS, and customizable watch faces."
  },
  {
    id: 5,
    name: "Coffee Maker",
    price: 79.99,
    category: "Kitchen",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1606791405792-1004f1718d0c?q=80&w=1974",
    isFeatured: false,
    isNew: false,
    description: "Programmable coffee maker with thermal carafe and multiple brewing options."
  },
  {
    id: 6,
    name: "Hiking Backpack",
    price: 89.99,
    category: "Outdoors",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1496409546594-bb872b9b0520?q=80&w=1930",
    isFeatured: false,
    isNew: true,
    description: "Durable, water-resistant hiking backpack with multiple compartments and padded straps."
  },
  {
    id: 7,
    name: "Yoga Mat",
    price: 29.99,
    category: "Fitness",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?q=80&w=1974",
    isFeatured: false,
    isNew: false,
    description: "Eco-friendly, non-slip yoga mat with alignment markings and carrying strap."
  },
  {
    id: 8,
    name: "Wireless Charger",
    price: 24.99,
    category: "Electronics",
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1622989488402-f4df0f515e85?q=80&w=1972",
    isFeatured: false,
    isNew: false,
    description: "Fast wireless charging pad compatible with all Qi-enabled devices."
  }
];

// Sample categories
const CATEGORIES = ["All", "Electronics", "Home Decor", "Kitchen", "Accessories", "Outdoors", "Fitness"];

const EcommercePlatform = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  
  // Filter products by category and search term
  const filteredProducts = PRODUCTS.filter(product => 
    (activeCategory === "All" || product.category === activeCategory) && 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate cart count
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
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
      description: "Product has been added to your cart",
    });
  };
  
  const toggleProductDetails = (productId: number) => {
    setSelectedProduct(selectedProduct === productId ? null : productId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-kapil-blue-dark to-kapil-blue-medium">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="outline" className="mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Button variant="outline" className="rounded-full px-3">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Button variant="outline" className="rounded-full px-3">
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-kapil-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gradient mb-4">E-Commerce Store</h1>
          <p className="text-muted-foreground max-w-2xl">
            Browse our curated collection of high-quality products, from electronics to home decor.
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
            <ArrowDown className="h-3 w-3" />
          </Button>
        </div>
        
        {/* Categories */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max p-1">
            {CATEGORIES.map(category => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={activeCategory === category ? "bg-kapil-red" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Featured Products */}
        {activeCategory === "All" && searchTerm === "" && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Featured Products</h2>
              <Button variant="link">View all</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRODUCTS.filter(p => p.isFeatured).map(product => (
                <Card key={product.id} className="bg-kapil-blue-medium/50 overflow-hidden group transition-all duration-300 hover:border-kapil-red">
                  <div className="aspect-square overflow-hidden relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    {product.isNew && (
                      <Badge className="absolute top-2 left-2 bg-kapil-red">New</Badge>
                    )}
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80"
                      onClick={() => {}}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-lg">{product.name}</h3>
                        <p className="text-muted-foreground text-sm">{product.category}</p>
                      </div>
                      <p className="font-semibold">${product.price}</p>
                    </div>
                    <div className="flex items-center text-yellow-500 mt-1">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                      <span className="ml-1 text-muted-foreground text-xs">({product.rating})</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 gap-2">
                    <Button 
                      className="w-full bg-kapil-red hover:bg-kapil-red/90"
                      onClick={() => addToCart(product.id)}
                    >
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => toggleProductDetails(product.id)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* All Products */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {activeCategory === "All" ? "All Products" : activeCategory}
            <span className="text-sm text-muted-foreground ml-2">
              ({filteredProducts.length} products)
            </span>
          </h2>
          
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center bg-kapil-blue-medium/30 rounded-lg">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <Card 
                  key={product.id} 
                  className={`bg-kapil-blue-medium/50 overflow-hidden group transition-all duration-300 hover:border-kapil-red ${selectedProduct === product.id ? 'ring-2 ring-kapil-red' : ''}`}
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    {product.isNew && (
                      <Badge className="absolute top-2 left-2 bg-kapil-red">New</Badge>
                    )}
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80"
                      onClick={() => {}}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-muted-foreground text-xs">{product.category}</p>
                      </div>
                      <p className="font-semibold">${product.price}</p>
                    </div>
                    <div className="flex items-center text-yellow-500 mt-1 text-sm">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                      <span className="ml-1 text-muted-foreground text-xs">({product.rating})</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button 
                      className="w-full bg-kapil-red hover:bg-kapil-red/90"
                      onClick={() => addToCart(product.id)}
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                  
                  {selectedProduct === product.id && (
                    <div className="p-4 bg-kapil-blue-dark/60 border-t border-kapil-blue-light/20">
                      <p className="text-sm mb-3">{product.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center">
                          <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                          In Stock
                        </div>
                        <div className="flex items-center">
                          <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                          Free Shipping
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EcommercePlatform;
