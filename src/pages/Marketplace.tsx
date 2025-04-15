
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Filter, Grid3x3, ListFilter, Map, ChevronDown, Check } from "lucide-react";

// Sample marketplace data
const produceListings = [
  {
    id: 1,
    name: "Premium Wheat",
    farmer: "Raj Kumar",
    location: "Ludhiana, Punjab",
    quantity: "5000 kg",
    quality: "Grade A",
    price: "₹2,200 per quintal",
    image: "https://source.unsplash.com/random/300x200/?wheat",
    distance: "15 km",
    harvest_date: "10 days ago",
  },
  {
    id: 2,
    name: "Organic Rice",
    farmer: "Anita Sharma",
    location: "Burdwan, West Bengal",
    quantity: "3000 kg",
    quality: "Organic Certified",
    price: "₹3,500 per quintal",
    image: "https://source.unsplash.com/random/300x200/?rice",
    distance: "25 km",
    harvest_date: "5 days ago",
  },
  {
    id: 3,
    name: "Fresh Tomatoes",
    farmer: "Sanjay Patil",
    location: "Nashik, Maharashtra",
    quantity: "800 kg",
    quality: "Fresh Grade B+",
    price: "₹25 per kg",
    image: "https://source.unsplash.com/random/300x200/?tomatoes",
    distance: "8 km",
    harvest_date: "2 days ago",
  },
  {
    id: 4,
    name: "Sugarcane",
    farmer: "Venkat Reddy",
    location: "Mandya, Karnataka",
    quantity: "10000 kg",
    quality: "Grade A",
    price: "₹280 per quintal",
    image: "https://source.unsplash.com/random/300x200/?sugarcane",
    distance: "32 km",
    harvest_date: "15 days ago",
  },
  {
    id: 5,
    name: "Cotton",
    farmer: "Harpreet Singh",
    location: "Bathinda, Punjab",
    quantity: "2000 kg",
    quality: "Long Staple",
    price: "₹6,200 per quintal",
    image: "https://source.unsplash.com/random/300x200/?cotton",
    distance: "45 km",
    harvest_date: "20 days ago",
  },
  {
    id: 6,
    name: "Soybean",
    farmer: "Meena Kumari",
    location: "Indore, Madhya Pradesh",
    quantity: "4500 kg",
    quality: "Grade B",
    price: "₹3,800 per quintal",
    image: "https://source.unsplash.com/random/300x200/?soybean",
    distance: "18 km",
    harvest_date: "8 days ago",
  },
];

const processorRequirements = [
  {
    id: 1,
    title: "Rice for Food Products",
    company: "GoodFood Processing Pvt Ltd",
    location: "Kolkata, West Bengal",
    crop: "Rice",
    quantity_needed: "50000 kg",
    quality_req: "Grade A or Organic",
    offered_price: "₹3,700 per quintal",
    logo: "https://source.unsplash.com/random/100x100/?logo",
    deadline: "5 days",
  },
  {
    id: 2,
    title: "Tomatoes for Ketchup Production",
    company: "Tasty Sauces Ltd",
    location: "Pune, Maharashtra",
    crop: "Tomatoes",
    quantity_needed: "20000 kg",
    quality_req: "Fresh Grade B or higher",
    offered_price: "₹28 per kg",
    logo: "https://source.unsplash.com/random/100x100/?logo",
    deadline: "3 days",
  },
  {
    id: 3,
    title: "Wheat for Flour Mill",
    company: "Traditional Flour Mills",
    location: "Amritsar, Punjab",
    crop: "Wheat",
    quantity_needed: "100000 kg",
    quality_req: "Premium Grade",
    offered_price: "₹2,350 per quintal",
    logo: "https://source.unsplash.com/random/100x100/?logo",
    deadline: "10 days",
  },
  {
    id: 4,
    title: "Sugarcane for Jaggery Production",
    company: "Sweet Natural Foods",
    location: "Coimbatore, Tamil Nadu",
    crop: "Sugarcane",
    quantity_needed: "30000 kg",
    quality_req: "High Sugar Content",
    offered_price: "₹315 per quintal",
    logo: "https://source.unsplash.com/random/100x100/?logo",
    deadline: "7 days",
  },
];

const Marketplace = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([1000]);

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-agri-dark mb-2">Agricultural Marketplace</h1>
            <p className="text-gray-600">
              Connect directly with farmers and processors to buy and sell agricultural produce
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-agri-primary hover:bg-agri-dark">
              + Add New Listing
            </Button>
          </div>
        </div>

        <Tabs defaultValue="produce" className="w-full">
          <TabsList className="mb-8 bg-agri-light">
            <TabsTrigger value="produce" className="data-[state=active]:bg-agri-primary data-[state=active]:text-white">
              Available Produce
            </TabsTrigger>
            <TabsTrigger value="requirements" className="data-[state=active]:bg-agri-primary data-[state=active]:text-white">
              Processor Requirements
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-64 space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold flex items-center mb-4">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Search</label>
                      <Input placeholder="Search produce..." />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Crop Type</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="All Crops" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Crops</SelectItem>
                          <SelectItem value="wheat">Wheat</SelectItem>
                          <SelectItem value="rice">Rice</SelectItem>
                          <SelectItem value="vegetables">Vegetables</SelectItem>
                          <SelectItem value="fruits">Fruits</SelectItem>
                          <SelectItem value="cotton">Cotton</SelectItem>
                          <SelectItem value="sugarcane">Sugarcane</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Quality Grade</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="All Grades" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Grades</SelectItem>
                          <SelectItem value="a">Grade A</SelectItem>
                          <SelectItem value="b">Grade B</SelectItem>
                          <SelectItem value="c">Grade C</SelectItem>
                          <SelectItem value="organic">Organic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Price Range (₹/quintal): {priceRange[0]}
                      </label>
                      <Slider
                        defaultValue={[1000]}
                        max={10000}
                        step={100}
                        onValueChange={setPriceRange}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Location</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="All Locations" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          <SelectItem value="punjab">Punjab</SelectItem>
                          <SelectItem value="maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="karnataka">Karnataka</SelectItem>
                          <SelectItem value="westbengal">West Bengal</SelectItem>
                          <SelectItem value="madhyapradesh">Madhya Pradesh</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Harvest Date</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Any Time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Time</SelectItem>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">Past Week</SelectItem>
                          <SelectItem value="month">Past Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button variant="outline" className="w-full border-agri-primary text-agri-primary">
                      Reset Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex-1">
              <TabsContent value="produce" className="mt-0">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-600">{produceListings.length} listings found</p>
                  
                  <div className="flex items-center gap-2">
                    <Select defaultValue="recent">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Most Recent</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="distance">Distance</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="flex border rounded-md overflow-hidden">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={view === "grid" ? "bg-agri-light" : ""}
                        onClick={() => setView("grid")}
                      >
                        <Grid3x3 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={view === "list" ? "bg-agri-light" : ""}
                        onClick={() => setView("list")}
                      >
                        <ListFilter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {view === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {produceListings.map((listing) => (
                      <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-video relative overflow-hidden">
                          <img 
                            src={listing.image} 
                            alt={listing.name}
                            className="w-full h-full object-cover transition-transform hover:scale-105" 
                          />
                          <div className="absolute top-2 right-2 bg-agri-accent text-agri-dark text-sm font-medium py-1 px-2 rounded">
                            {listing.harvest_date}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{listing.name}</h3>
                            <div className="text-agri-primary font-bold">{listing.price}</div>
                          </div>
                          <p className="text-gray-500 text-sm mb-2">{listing.farmer} • {listing.location}</p>
                          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                            <div>
                              <span className="text-gray-500">Quantity:</span> {listing.quantity}
                            </div>
                            <div>
                              <span className="text-gray-500">Quality:</span> {listing.quality}
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <Map className="h-4 w-4 mr-1" />
                              {listing.distance}
                            </div>
                            <Button variant="default" size="sm" className="bg-agri-primary hover:bg-agri-dark">
                              Contact Farmer
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {produceListings.map((listing) => (
                      <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-48 h-48">
                              <img 
                                src={listing.image} 
                                alt={listing.name}
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <div className="flex-1 p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-lg">{listing.name}</h3>
                                  <p className="text-gray-500 text-sm">{listing.farmer} • {listing.location}</p>
                                </div>
                                <div className="text-agri-primary font-bold">{listing.price}</div>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm my-4">
                                <div>
                                  <span className="text-gray-500 block">Quantity</span> 
                                  {listing.quantity}
                                </div>
                                <div>
                                  <span className="text-gray-500 block">Quality</span> 
                                  {listing.quality}
                                </div>
                                <div>
                                  <span className="text-gray-500 block">Distance</span> 
                                  {listing.distance}
                                </div>
                                <div>
                                  <span className="text-gray-500 block">Harvested</span> 
                                  {listing.harvest_date}
                                </div>
                              </div>
                              <div className="flex justify-end">
                                <Button variant="default" size="sm" className="bg-agri-primary hover:bg-agri-dark">
                                  Contact Farmer
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="requirements" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {processorRequirements.map((req) => (
                    <Card key={req.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                            <img 
                              src={req.logo} 
                              alt={req.company}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-semibold text-lg">{req.title}</h3>
                              <div className="text-red-500 text-sm font-medium">
                                {req.deadline} left
                              </div>
                            </div>
                            <p className="text-gray-500 text-sm">{req.company} • {req.location}</p>
                          </div>
                        </div>
                        
                        <div className="bg-agri-light mt-4 p-3 rounded-lg space-y-2">
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-gray-500 block">Crop</span> 
                              {req.crop}
                            </div>
                            <div>
                              <span className="text-gray-500 block">Quantity Needed</span> 
                              {req.quantity_needed}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500 block text-sm">Quality Requirements</span> 
                            <p className="text-sm">{req.quality_req}</p>
                          </div>
                          <div className="pt-2">
                            <span className="text-gray-500 block text-sm">Offered Price</span> 
                            <p className="text-agri-primary font-bold">{req.offered_price}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-4">
                          <Button variant="default" size="sm" className="bg-agri-primary hover:bg-agri-dark">
                            Submit Proposal
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Marketplace;
