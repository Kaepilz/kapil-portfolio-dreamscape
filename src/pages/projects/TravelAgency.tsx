
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, MapPin, Calendar, UserPlus, ArrowRight, Star, MapPinned } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const FEATURED_DESTINATIONS = [
  {
    id: 1,
    name: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1935",
    description: "Experience the breathtaking views of this iconic Greek island with its white-washed buildings and blue domes.",
    price: 1299,
    rating: 4.8,
    duration: "7 days",
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=1470",
    description: "Explore ancient temples, beautiful gardens, and traditional tea houses in Japan's cultural capital.",
    price: 1499,
    rating: 4.7,
    duration: "9 days",
  },
  {
    id: 3,
    name: "Machu Picchu, Peru",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1470",
    description: "Discover the ancient Incan citadel set against a backdrop of stunning mountain scenery.",
    price: 1699,
    rating: 4.9,
    duration: "10 days",
  }
];

const POPULAR_EXPERIENCES = [
  {
    id: 1,
    name: "Hot Air Balloon Safari",
    location: "Serengeti, Tanzania",
    image: "https://images.unsplash.com/photo-1453872302360-eed3c5f8ff66?q=80&w=1470",
    price: 299,
    rating: 4.9,
  },
  {
    id: 2,
    name: "Northern Lights Tour",
    location: "Tromsø, Norway",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1470",
    price: 249,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Scuba Diving Adventure",
    location: "Great Barrier Reef, Australia",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1470",
    price: 199,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Cooking Class",
    location: "Florence, Italy",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1470",
    price: 89,
    rating: 4.6,
  }
];

const TravelAgency = () => {
  const [searchDestination, setSearchDestination] = useState("");
  const [selectedTab, setSelectedTab] = useState("flights");
  const [adults, setAdults] = useState(2);
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search initiated",
      description: `Searching for trips to ${searchDestination || "anywhere"}`,
    });
  };
  
  const handleBookNow = (destinationId: number) => {
    const destination = FEATURED_DESTINATIONS.find(d => d.id === destinationId);
    toast({
      title: "Booking initiated",
      description: `You're booking a trip to ${destination?.name}`,
    });
  };
  
  const toggleDestinationDetails = (id: number) => {
    setSelectedDestination(selectedDestination === id ? null : id);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1e36] to-kapil-blue-dark">
      <div className="relative h-[500px] overflow-hidden">
        {/* Hero Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1682687982049-b3d433368cd1?q=80&w=1471" 
            alt="Beautiful beach destination" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-kapil-blue-dark/70 to-kapil-blue-dark"></div>
        </div>
        
        {/* Navigation */}
        <div className="relative container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link to="/">
              <Button variant="outline" className="mb-2 bg-background/20 backdrop-blur-sm hover:bg-background/30 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>
          </div>
          
          {/* Hero Content */}
          <div className="mt-16 md:mt-24 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Discover Your Dream Destinations
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              Explore the world's most beautiful places with exclusive deals and personalized travel experiences.
            </motion.p>
            
            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="max-w-4xl mx-auto bg-background/20 backdrop-blur-md border-kapil-blue-light/20">
                <CardContent className="p-6">
                  <Tabs defaultValue="flights" value={selectedTab} onValueChange={setSelectedTab}>
                    <TabsList className="grid grid-cols-4 mb-6">
                      <TabsTrigger value="flights">Flights</TabsTrigger>
                      <TabsTrigger value="hotels">Hotels</TabsTrigger>
                      <TabsTrigger value="packages">Packages</TabsTrigger>
                      <TabsTrigger value="activities">Activities</TabsTrigger>
                    </TabsList>
                    <TabsContent value="flights">
                      <form onSubmit={handleSearch} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="From where?"
                              className="pl-10"
                            />
                          </div>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Where to?"
                              className="pl-10"
                              value={searchDestination}
                              onChange={(e) => setSearchDestination(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Departure date"
                              className="pl-10"
                            />
                          </div>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Return date"
                              className="pl-10"
                            />
                          </div>
                          <div className="relative">
                            <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              readOnly
                              value={`${adults} Adults`}
                              className="pl-10 cursor-pointer"
                              onClick={() => setAdults(prev => prev < 9 ? prev + 1 : 1)}
                            />
                          </div>
                        </div>
                        
                        <Button type="submit" className="w-full bg-kapil-red hover:bg-kapil-red/90">
                          Search Flights
                          <Search className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="hotels">
                      <form onSubmit={handleSearch} className="space-y-4">
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Where are you going?"
                            className="pl-10"
                            value={searchDestination}
                            onChange={(e) => setSearchDestination(e.target.value)}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Check-in date"
                              className="pl-10"
                            />
                          </div>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Check-out date"
                              className="pl-10"
                            />
                          </div>
                          <div className="relative">
                            <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              readOnly
                              value={`${adults} Adults`}
                              className="pl-10 cursor-pointer"
                              onClick={() => setAdults(prev => prev < 9 ? prev + 1 : 1)}
                            />
                          </div>
                        </div>
                        
                        <Button type="submit" className="w-full bg-kapil-red hover:bg-kapil-red/90">
                          Search Hotels
                          <Search className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="packages" className="space-y-4">
                      <div className="text-center p-6">
                        <h3 className="text-lg font-medium mb-4">All-inclusive Vacation Packages</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                          Flights + Hotels + Activities bundled together for the best deals
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="bg-kapil-blue-medium/30 rounded-lg p-4 text-left">
                            <h4 className="font-medium mb-2">Family Getaways</h4>
                            <p className="text-xs text-muted-foreground mb-2">Perfect for families with kids of all ages</p>
                            <p className="text-sm font-medium">From $899 per person</p>
                          </div>
                          <div className="bg-kapil-blue-medium/30 rounded-lg p-4 text-left">
                            <h4 className="font-medium mb-2">Romantic Escapes</h4>
                            <p className="text-xs text-muted-foreground mb-2">Luxurious stays for couples</p>
                            <p className="text-sm font-medium">From $1199 per person</p>
                          </div>
                          <div className="bg-kapil-blue-medium/30 rounded-lg p-4 text-left">
                            <h4 className="font-medium mb-2">Adventure Tours</h4>
                            <p className="text-xs text-muted-foreground mb-2">For thrill-seekers and explorers</p>
                            <p className="text-sm font-medium">From $1499 per person</p>
                          </div>
                        </div>
                        <Button type="button" className="bg-kapil-red hover:bg-kapil-red/90">
                          Browse Packages
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="activities" className="space-y-4">
                      <div className="text-center p-6">
                        <h3 className="text-lg font-medium mb-4">Explore Local Experiences</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                          Discover tours, attractions, and unique local activities
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          {POPULAR_EXPERIENCES.slice(0, 4).map((experience, index) => (
                            <div key={experience.id} className="rounded-lg overflow-hidden bg-kapil-blue-medium/30 group">
                              <div className="h-24 overflow-hidden">
                                <img 
                                  src={experience.image} 
                                  alt={experience.name} 
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div className="p-3 text-left">
                                <p className="text-xs font-medium line-clamp-1">{experience.name}</p>
                                <p className="text-xs text-muted-foreground">${experience.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <Button type="button" className="bg-kapil-red hover:bg-kapil-red/90">
                          Find Activities
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Featured Destinations */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Featured Destinations</h2>
              <p className="text-muted-foreground">Handpicked places to explore this season</p>
            </div>
            <Button variant="outline" className="group">
              View all <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_DESTINATIONS.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`bg-kapil-blue-medium/50 overflow-hidden group hover:border-kapil-red transition-all duration-300 ${selectedDestination === destination.id ? 'ring-2 ring-kapil-red' : ''}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                    />
                    <div className="absolute top-2 right-2 bg-background/80 rounded-full py-1 px-2 text-xs font-medium">
                      ${destination.price} <span className="text-muted-foreground">/ person</span>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{destination.name}</CardTitle>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-sm">{destination.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPinned className="h-4 w-4 mr-1" />
                      {destination.duration} tour package
                    </div>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {destination.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button 
                      className="flex-1 bg-kapil-red hover:bg-kapil-red/90 hover:scale-[1.02] transition-transform"
                      onClick={() => handleBookNow(destination.id)}
                    >
                      Book Now
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 hover:bg-kapil-blue-light/20 transition-colors"
                      onClick={() => toggleDestinationDetails(destination.id)}
                    >
                      {selectedDestination === destination.id ? "Less Details" : "More Details"}
                    </Button>
                  </CardFooter>
                  
                  {selectedDestination === destination.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4 border-t border-kapil-blue-light/20 bg-kapil-blue-dark/60"
                    >
                      <h4 className="font-medium mb-2">Package Includes:</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li className="flex items-center">
                          <div className="w-1 h-1 rounded-full bg-kapil-red mr-2"></div>
                          Round-trip flights
                        </li>
                        <li className="flex items-center">
                          <div className="w-1 h-1 rounded-full bg-kapil-red mr-2"></div>
                          {destination.duration} accommodation
                        </li>
                        <li className="flex items-center">
                          <div className="w-1 h-1 rounded-full bg-kapil-red mr-2"></div>
                          Daily breakfast
                        </li>
                        <li className="flex items-center">
                          <div className="w-1 h-1 rounded-full bg-kapil-red mr-2"></div>
                          Guided tours
                        </li>
                        <li className="flex items-center">
                          <div className="w-1 h-1 rounded-full bg-kapil-red mr-2"></div>
                          Airport transfers
                        </li>
                      </ul>
                      <Button className="w-full mt-4 bg-kapil-red hover:bg-kapil-red/90">
                        View Full Itinerary
                      </Button>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Popular Experiences */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Popular Experiences</h2>
            <p className="text-muted-foreground">Unforgettable activities hand-picked by our travel experts</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_EXPERIENCES.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-kapil-blue-medium/50 overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square overflow-hidden relative">
                    <img 
                      src={experience.image} 
                      alt={experience.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-kapil-blue-dark to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <Button className="w-full bg-kapil-red hover:bg-kapil-red/90 hover:scale-[1.02] transition-transform">
                        Book Experience
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg">{experience.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      {experience.location}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">${experience.price}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-sm">{experience.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Newsletter */}
        <motion.div 
          className="bg-kapil-blue-medium/50 rounded-xl p-6 md:p-8 lg:p-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Travel Inspiration</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Subscribe to our newsletter and get exclusive deals, travel tips, and more!
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input placeholder="Enter your email" className="sm:flex-grow" />
            <Button className="bg-kapil-red hover:bg-kapil-red/90 hover:scale-[1.02] transition-transform">
              Subscribe
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TravelAgency;
