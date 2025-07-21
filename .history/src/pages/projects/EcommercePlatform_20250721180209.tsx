
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, Search, ShoppingCart, Filter, Star, StarHalf, 
  Plus, Minus, Heart, Eye, User, LogIn, ChevronDown
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { FloatingShapes } from "@/components/FloatingShapes";

// Product type definition
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  image: string;
  description: string;
  tags: string[];
  colors?: string[];
  sizes?: string[];
}

// Cart item type
interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

// Sample product data
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Modern Denim Jacket",
    price: 89.99,
    originalPrice: 119.99,
    category: "Clothing",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1026&auto=format&fit=crop",
    description: "Premium quality denim jacket with modern design and comfortable fit. Perfect for casual outings.",
    tags: ["Jacket", "Denim", "Casual", "Trending"],
    colors: ["Blue", "Black", "Gray"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "Wireless Bluetooth Headphones",
    price: 129.99,
    originalPrice: 159.99,
    category: "Electronics",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1170&auto=format&fit=crop",
    description: "High-quality wireless headphones with noise cancellation and 30+ hours of battery life.",
    tags: ["Headphones", "Bluetooth", "Audio", "Wireless"]
  },
  {
    id: 3,
    name: "Minimalist Watch",
    price: 79.99,
    category: "Accessories",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=989&auto=format&fit=crop",
    description: "Elegant minimalist watch with a leather strap and Japanese quartz movement.",
    tags: ["Watch", "Leather", "Accessories", "Minimalist"]
  },
  {
    id: 4,
    name: "Organic Cotton T-shirt",
    price: 24.99,
    originalPrice: 34.99,
    category: "Clothing",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1064&auto=format&fit=crop",
    description: "Soft and breathable organic cotton t-shirt, perfect for everyday wear.",
    tags: ["T-shirt", "Organic", "Cotton", "Basics"],
    colors: ["White", "Black", "Gray", "Navy", "Red"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    id: 5,
    name: "Smart Fitness Tracker",
    price: 49.99,
    category: "Electronics",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?q=80&w=1176&auto=format&fit=crop",
    description: "Track your steps, heart rate, sleep quality, and more with this advanced fitness tracker.",
    tags: ["Fitness", "Smart", "Wearable", "Health"]
  },
  {
    id: 6,
    name: "Leather Wallet",
    price: 39.99,
    category: "Accessories",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=987&auto=format&fit=crop",
    description: "Genuine leather wallet with multiple card slots and a coin pocket.",
    tags: ["Wallet", "Leather", "Accessories"]
  },
  {
    id: 7,
    name: "Ceramic Coffee Mug",
    price: 19.99,
    category: "Home",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1170&auto=format&fit=crop",
    description: "Hand-crafted ceramic coffee mug, perfect for your morning brew.",
    tags: ["Mug", "Ceramic", "Coffee", "Home"],
    colors: ["White", "Black", "Blue", "Red"]
  },
  {
    id: 8,
    name: "Indoor Plant",
    price: 29.99,
    category: "Home",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1172&auto=format&fit=crop",
    description: "Beautiful indoor plant in a ceramic pot. Adds life and freshness to any room.",
    tags: ["Plant", "Indoor", "Home", "Décor"]
  }
];

const EcommercePlatform = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [productModalOpen, setProductModalOpen] = useState(false);

  // Calculate total cart items
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Filter products based on search and category
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case "priceAsc":
        return a.price - b.price;
      case "priceDesc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0; // featured - keep original order
    }
  });

  // Get unique categories
  const categories = ["All", ...new Set(PRODUCTS.map(product => product.category))];

  // Add item to cart
  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.id === product.id && 
        item.selectedColor === color && 
        item.selectedSize === size
      );
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id && 
          item.selectedColor === color && 
          item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { 
          ...product, 
          quantity, 
          selectedColor: color, 
          selectedSize: size 
        }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart.`,
      duration: 2000,
    });
  };

  // Update item quantity in cart
  const updateCartItemQuantity = (itemId: number, color: string | undefined, size: string | undefined, newQuantity: number) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => 
          !(item.id === itemId && item.selectedColor === color && item.selectedSize === size)
        );
      }
      
      return prevCart.map(item => 
        item.id === itemId && item.selectedColor === color && item.selectedSize === size
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId: number, color?: string, size?: string) => {
    setCart(prevCart => 
      prevCart.filter(item => 
        !(item.id === itemId && item.selectedColor === color && item.selectedSize === size)
      )
    );
  };

  // Display star rating
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf size={14} className="fill-yellow-400 text-yellow-400" />}
        <span className="ml-1 text-sm text-muted-foreground">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Open product modal
  const openProductModal = (product: Product) => {
    setCurrentProduct(product);
    setProductModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kapil-blue-dark via-kapil-blue-medium to-kapil-blue-dark relative overflow-hidden">
      <FloatingShapes />
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <Link to="/#projects">
            <Button variant="outline" className="mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold text-gradient">E-Commerce Platform</h1>
        </div>

        {/* Main Content */}
        <div className="mb-8">
          {/* Navigation */}
          <div className="bg-kapil-blue-medium/50 border border-kapil-blue-light/20 rounded-lg p-4 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Logo and Navigation */}
              <div className="flex items-center">
                <div className="font-bold text-xl mr-6">StyleShop</div>
                <nav className="hidden md:flex space-x-4">
                  <Button variant="ghost" className="text-sm">New Arrivals</Button>
                  <Button variant="ghost" className="text-sm">Best Sellers</Button>
                  <Button variant="ghost" className="text-sm">Sale</Button>
                  <Button variant="ghost" className="text-sm">Collections</Button>
                </nav>
              </div>

              {/* User Actions */}
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <User size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Heart size={20} />
                </Button>
                
                {/* Cart Button */}
                <Sheet open={cartOpen} onOpenChange={setCartOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <ShoppingCart size={20} />
                      {cartItemsCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-kapil-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {cartItemsCount}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-md">
                    <SheetHeader>
                      <SheetTitle>Your Cart ({cartItemsCount} items)</SheetTitle>
                    </SheetHeader>
                    
                    {cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
                        <ShoppingCart size={64} className="text-gray-400 mb-4" />
                        <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
                        <p className="text-muted-foreground text-center mb-6">
                          Looks like you haven't added any products to your cart yet.
                        </p>
                        <Button onClick={() => setCartOpen(false)}>Continue Shopping</Button>
                      </div>
                    ) : (
                      <div className="flex flex-col h-[calc(100vh-200px)]">
                        <div className="flex-grow overflow-auto py-4">
                          {cart.map((item, index) => (
                            <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}-${index}`} 
                              className="flex items-center py-4 border-b border-kapil-blue-light/20 last:border-0">
                              <div className="h-16 w-16 rounded bg-kapil-blue-light/10 mr-4 overflow-hidden">
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <h4 className="font-medium text-sm">{item.name}</h4>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                                  {item.selectedColor && item.selectedSize && <span> · </span>}
                                  {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                  <div className="flex items-center border border-kapil-blue-light/30 rounded-md">
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-6 w-6 p-0"
                                      onClick={() => updateCartItemQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                                    >
                                      <Minus size={14} />
                                    </Button>
                                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-6 w-6 p-0"
                                      onClick={() => updateCartItemQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                                    >
                                      <Plus size={14} />
                                    </Button>
                                  </div>
                                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 ml-2"
                                onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                              >
                                <span className="sr-only">Remove</span>
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                                  <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                              </Button>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t border-kapil-blue-light/20 pt-4">
                          <div className="flex justify-between mb-2">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="font-medium">${cartTotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between mb-4">
                            <span className="text-muted-foreground">Shipping</span>
                            <span className="font-medium">Calculated at checkout</span>
                          </div>
                          <Button className="w-full mb-2">Proceed to Checkout</Button>
                          <Button variant="outline" className="w-full" onClick={() => setCartOpen(false)}>
                            Continue Shopping
                          </Button>
                        </div>
                      </div>
                    )}
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
          
          {/* Hero Banner */}
          <div className="bg-kapil-blue-medium/30 border border-kapil-blue-light/20 rounded-lg p-8 mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-kapil-blue-dark via-transparent to-transparent"></div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl md:text-4xl font-bold mb-2">Spring Collection 2025</h2>
              <p className="text-muted-foreground mb-6">Discover our new lineup of trendsetting styles for the new season.</p>
              <Button>Shop Now</Button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
            <div className="flex-grow max-w-md relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3">
              {/* Category Filter */}
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <Select 
                  value={selectedCategory} 
                  onValueChange={(value) => setSelectedCategory(value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Sort Options */}
              <Select 
                value={sortBy} 
                onValueChange={(value) => setSortBy(value)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                  <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="bg-kapil-blue-medium/30 border border-kapil-blue-light/20 overflow-hidden hover:border-kapil-blue-light/40 transition-all duration-300">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  
                  {/* Quick actions */}
                  <div className="absolute bottom-2 right-2 flex gap-2">
                    <Button 
                      onClick={() => openProductModal(product)}
                      size="icon" 
                      variant="secondary" 
                      className="h-9 w-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm"
                    >
                      <Eye size={16} />
                    </Button>
                    <Button 
                      onClick={() => addToCart(product)} 
                      size="icon" 
                      variant="secondary"
                      className="h-9 w-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm"
                    >
                      <ShoppingCart size={16} />
                    </Button>
                  </div>
                  
                  {/* Sale badge */}
                  {product.originalPrice && (
                    <Badge className="absolute top-2 left-2 bg-kapil-red">
                      Sale
                    </Badge>
                  )}
                </div>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-sm text-muted-foreground">{product.category}</div>
                    {renderRating(product.rating)}
                  </div>
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-muted-foreground line-through ml-2 text-sm">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    onClick={() => addToCart(product)}
                    variant="outline" 
                    className="w-full hover:bg-kapil-blue-light/20"
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* No results */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>

        {/* Product Detail Modal */}
        <Sheet open={productModalOpen} onOpenChange={setProductModalOpen}>
          <SheetContent className="w-full sm:max-w-3xl overflow-y-auto">
            {currentProduct && (
              <div className="h-full flex flex-col">
                <SheetHeader>
                  <SheetTitle>{currentProduct.name}</SheetTitle>
                </SheetHeader>
                
                <div className="flex-grow py-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Image */}
                    <div className="aspect-square bg-kapil-blue-dark/30 rounded-lg overflow-hidden">
                      <img 
                        src={currentProduct.image} 
                        alt={currentProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm text-muted-foreground">{currentProduct.category}</div>
                        {renderRating(currentProduct.rating)}
                      </div>
                      
                      <h2 className="text-2xl font-bold mb-2">{currentProduct.name}</h2>
                      
                      <div className="flex items-center mb-4">
                        <span className="text-2xl font-bold">${currentProduct.price.toFixed(2)}</span>
                        {currentProduct.originalPrice && (
                          <span className="text-muted-foreground line-through ml-3 text-base">
                            ${currentProduct.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-muted-foreground mb-6">
                        {currentProduct.description}
                      </p>
                      
                      {/* Color options */}
                      {currentProduct.colors && (
                        <div className="mb-4">
                          <h3 className="font-medium mb-2">Color</h3>
                          <div className="flex flex-wrap gap-2">
                            {currentProduct.colors.map((color) => (
                              <Button 
                                key={color}
                                variant="outline" 
                                className="rounded-md px-3 py-1 h-auto"
                              >
                                {color}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Size options */}
                      {currentProduct.sizes && (
                        <div className="mb-6">
                          <h3 className="font-medium mb-2">Size</h3>
                          <div className="flex flex-wrap gap-2">
                            {currentProduct.sizes.map((size) => (
                              <Button 
                                key={size}
                                variant="outline" 
                                className="rounded-md px-3 py-1 h-auto min-w-[40px]"
                              >
                                {size}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        onClick={() => {
                          addToCart(currentProduct);
                          setProductModalOpen(false);
                        }}
                        className="w-full mb-3"
                      >
                        Add to Cart
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="w-full"
                      >
                        Add to Wishlist
                      </Button>
                      
                      {/* Product details accordion */}
                      <div className="mt-6 border-t border-kapil-blue-light/20 pt-4">
                        <Button variant="ghost" className="w-full justify-between group">
                          <span>Product Details</span>
                          <ChevronDown size={16} className="group-data-[state=open]:rotate-180 transition-transform" />
                        </Button>
                        <div className="py-2 text-sm text-muted-foreground">
                          <p className="mb-2">{currentProduct.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {currentProduct.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="bg-kapil-blue-dark/30">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default EcommercePlatform;
