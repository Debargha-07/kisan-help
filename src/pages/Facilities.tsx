
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Factory, 
  Star, 
  Phone, 
  Clock, 
  ChevronRight, 
  Truck, 
  Warehouse, 
  Filter,
  Search 
} from "lucide-react";

// Sample processing facilities data
const processingFacilities = [
  {
    id: 1,
    name: "Northern Agro Processors",
    type: "Flour Mill",
    location: "Ludhiana, Punjab",
    distance: "12 km",
    rating: 4.5,
    capacity: "2000 MT/day",
    status: "Available",
    contact: "+91 98765-43210",
    crops: ["Wheat", "Barley"],
    services: ["Cleaning", "Milling", "Packaging"],
    image: "https://source.unsplash.com/random/300x200/?factory",
  },
  {
    id: 2,
    name: "Green Valley Food Processing",
    type: "Multi-purpose Processing",
    location: "Jalandhar, Punjab",
    distance: "28 km",
    rating: 4.2,
    capacity: "1500 MT/day",
    status: "High Demand",
    contact: "+91 98123-45678",
    crops: ["Tomato", "Potato", "Onion"],
    services: ["Cleaning", "Sorting", "Packaging", "Cold Storage"],
    image: "https://source.unsplash.com/random/300x200/?food+factory",
  },
  {
    id: 3,
    name: "Punjab Rice Mills",
    type: "Rice Mill",
    location: "Amritsar, Punjab",
    distance: "45 km",
    rating: 4.8,
    capacity: "3000 MT/day",
    status: "Available",
    contact: "+91 99876-54321",
    crops: ["Rice", "Paddy"],
    services: ["Drying", "Hulling", "Polishing", "Grading", "Packaging"],
    image: "https://source.unsplash.com/random/300x200/?rice+mill",
  },
  {
    id: 4,
    name: "Sugarcane Processing Center",
    type: "Sugar Mill",
    location: "Phagwara, Punjab",
    distance: "35 km",
    rating: 4.0,
    capacity: "5000 MT/day",
    status: "Limited",
    contact: "+91 98555-12345",
    crops: ["Sugarcane"],
    services: ["Crushing", "Processing", "Refining"],
    image: "https://source.unsplash.com/random/300x200/?sugar+mill",
  },
  {
    id: 5,
    name: "Modern Cotton Ginning Mill",
    type: "Cotton Gin",
    location: "Bathinda, Punjab",
    distance: "72 km",
    rating: 3.9,
    capacity: "1200 MT/day",
    status: "Available",
    contact: "+91 97123-98765",
    crops: ["Cotton"],
    services: ["Ginning", "Baling", "Grading"],
    image: "https://source.unsplash.com/random/300x200/?cotton+mill",
  },
  {
    id: 6,
    name: "Vegetable Processing Unit",
    type: "Vegetable Processing",
    location: "Patiala, Punjab",
    distance: "52 km",
    rating: 4.3,
    capacity: "800 MT/day",
    status: "Available",
    contact: "+91 95678-12345",
    crops: ["Potato", "Tomato", "Carrot", "Peas"],
    services: ["Washing", "Grading", "Packaging", "Freezing"],
    image: "https://source.unsplash.com/random/300x200/?vegetable+processing",
  },
];

// Sample storage facilities data
const storageFacilities = [
  {
    id: 1,
    name: "Punjab State Warehouse",
    type: "Government Warehouse",
    location: "Ludhiana, Punjab",
    distance: "10 km",
    rating: 4.1,
    capacity: "10000 MT",
    available: "4500 MT",
    cost: "₹40 per quintal/month",
    features: ["Temperature Controlled", "Pest Management", "24/7 Security"],
    image: "https://source.unsplash.com/random/300x200/?warehouse",
  },
  {
    id: 2,
    name: "FCI Storage Facility",
    type: "Government Silo",
    location: "Khanna, Punjab",
    distance: "25 km",
    rating: 4.6,
    capacity: "25000 MT",
    available: "8000 MT",
    cost: "₹35 per quintal/month",
    features: ["Modern Silos", "Moisture Control", "Automated Management"],
    image: "https://source.unsplash.com/random/300x200/?grain+silo",
  },
  {
    id: 3,
    name: "Cold Chain Solutions",
    type: "Cold Storage",
    location: "Jalandhar, Punjab",
    distance: "30 km",
    rating: 4.4,
    capacity: "5000 MT",
    available: "1200 MT",
    cost: "₹75 per quintal/month",
    features: ["Temperature Range: -10°C to 10°C", "Humidity Control", "24/7 Power Backup"],
    image: "https://source.unsplash.com/random/300x200/?cold+storage",
  },
  {
    id: 4,
    name: "Agri Logistics Hub",
    type: "Private Warehouse",
    location: "Amritsar, Punjab",
    distance: "48 km",
    rating: 4.2,
    capacity: "8000 MT",
    available: "3500 MT",
    cost: "₹45 per quintal/month",
    features: ["Pallet Storage", "Loading/Unloading Equipment", "Fire Protection"],
    image: "https://source.unsplash.com/random/300x200/?logistics+warehouse",
  },
];

const Facilities = () => {
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-agri-dark mb-2">Processing Facilities</h1>
            <p className="text-gray-600">
              Find and connect with nearby processing and storage facilities for your agricultural produce
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline" className="border-agri-primary text-agri-primary">
              List Your Facility
            </Button>
            <Button className="bg-agri-primary hover:bg-agri-dark">
              Book a Facility
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="processing" className="w-full">
          <TabsList className="mb-8 bg-agri-light">
            <TabsTrigger value="processing" className="data-[state=active]:bg-agri-primary data-[state=active]:text-white">
              <Factory className="h-4 w-4 mr-2" />
              Processing Facilities
            </TabsTrigger>
            <TabsTrigger value="storage" className="data-[state=active]:bg-agri-primary data-[state=active]:text-white">
              <Warehouse className="h-4 w-4 mr-2" />
              Storage Solutions
            </TabsTrigger>
            <TabsTrigger value="transport" className="data-[state=active]:bg-agri-primary data-[state=active]:text-white">
              <Truck className="h-4 w-4 mr-2" />
              Transportation
            </TabsTrigger>
          </TabsList>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold flex items-center mb-4">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search facilities..." className="pl-8" />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Location</label>
                      <Select defaultValue="ludhiana">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ludhiana">Ludhiana</SelectItem>
                          <SelectItem value="amritsar">Amritsar</SelectItem>
                          <SelectItem value="jalandhar">Jalandhar</SelectItem>
                          <SelectItem value="patiala">Patiala</SelectItem>
                          <SelectItem value="bathinda">Bathinda</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <TabsContent value="processing" className="mt-0 space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Facility Type</label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="flour">Flour Mill</SelectItem>
                            <SelectItem value="rice">Rice Mill</SelectItem>
                            <SelectItem value="sugar">Sugar Mill</SelectItem>
                            <SelectItem value="cotton">Cotton Gin</SelectItem>
                            <SelectItem value="vegetable">Vegetable Processing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Crop Type</label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Crop" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Crops</SelectItem>
                            <SelectItem value="wheat">Wheat</SelectItem>
                            <SelectItem value="rice">Rice</SelectItem>
                            <SelectItem value="sugarcane">Sugarcane</SelectItem>
                            <SelectItem value="cotton">Cotton</SelectItem>
                            <SelectItem value="vegetables">Vegetables</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Services</label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Services</SelectItem>
                            <SelectItem value="cleaning">Cleaning</SelectItem>
                            <SelectItem value="grading">Grading</SelectItem>
                            <SelectItem value="packaging">Packaging</SelectItem>
                            <SelectItem value="storage">Storage</SelectItem>
                            <SelectItem value="transport">Transportation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Availability</label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Any Availability</SelectItem>
                            <SelectItem value="available">Available Now</SelectItem>
                            <SelectItem value="limited">Limited Capacity</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="storage" className="mt-0 space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Storage Type</label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="warehouse">Warehouse</SelectItem>
                            <SelectItem value="coldStorage">Cold Storage</SelectItem>
                            <SelectItem value="silo">Silo</SelectItem>
                            <SelectItem value="godown">Godown</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Features</label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Feature" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Features</SelectItem>
                            <SelectItem value="tempControl">Temperature Control</SelectItem>
                            <SelectItem value="security">24/7 Security</SelectItem>
                            <SelectItem value="pestControl">Pest Management</SelectItem>
                            <SelectItem value="loading">Loading Equipment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Ownership</label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Ownership" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="govt">Government</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                            <SelectItem value="cooperative">Cooperative</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Availability</label>
                        <Select defaultValue="any">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any Availability</SelectItem>
                            <SelectItem value="high">High Availability</SelectItem>
                            <SelectItem value="medium">Medium Availability</SelectItem>
                            <SelectItem value="low">Low Availability</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="transport" className="mt-0 space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Vehicle Type</label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="small">Small Truck</SelectItem>
                            <SelectItem value="medium">Medium Truck</SelectItem>
                            <SelectItem value="large">Large Truck</SelectItem>
                            <SelectItem value="refrigerated">Refrigerated</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Capacity</label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Capacity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Any Capacity</SelectItem>
                            <SelectItem value="small">1-3 Tonnes</SelectItem>
                            <SelectItem value="medium">3-9 Tonnes</SelectItem>
                            <SelectItem value="large">10+ Tonnes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Features</label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Feature" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Features</SelectItem>
                            <SelectItem value="gps">GPS Tracking</SelectItem>
                            <SelectItem value="refrigeration">Refrigeration</SelectItem>
                            <SelectItem value="insulation">Insulated</SelectItem>
                            <SelectItem value="loading">Loading Equipment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Availability</label>
                        <Select defaultValue="all">
                          <SelectTrigger>
                            <SelectValue placeholder="Select Availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Any Time</SelectItem>
                            <SelectItem value="today">Available Today</SelectItem>
                            <SelectItem value="tomorrow">Available Tomorrow</SelectItem>
                            <SelectItem value="thisWeek">This Week</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TabsContent>
                    
                    <div className="pt-2">
                      <label className="text-sm font-medium mb-1 block">Distance</label>
                      <Select defaultValue="50">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Distance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">Within 10 km</SelectItem>
                          <SelectItem value="25">Within 25 km</SelectItem>
                          <SelectItem value="50">Within 50 km</SelectItem>
                          <SelectItem value="100">Within 100 km</SelectItem>
                          <SelectItem value="any">Any Distance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-2 space-y-2">
                      <Button variant="outline" className="w-full border-agri-primary text-agri-primary">
                        Reset Filters
                      </Button>
                      <Button className="w-full bg-agri-primary hover:bg-agri-dark">
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              <TabsContent value="processing" className="mt-0">
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-gray-600">{processingFacilities.length} facilities found</p>
                  <Select defaultValue="distance">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distance">Distance</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="capacity">Capacity</SelectItem>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  {processingFacilities.map((facility) => (
                    <Card key={facility.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 h-48 md:h-auto">
                            <img 
                              src={facility.image} 
                              alt={facility.name}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex flex-col md:flex-row justify-between">
                              <div>
                                <div className="flex items-start gap-2">
                                  <h3 className="font-semibold text-lg">{facility.name}</h3>
                                  <Badge className={
                                    facility.status === "Available" 
                                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                                      : facility.status === "Limited"
                                      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                                      : "bg-red-100 text-red-700 hover:bg-red-100"
                                  }>
                                    {facility.status}
                                  </Badge>
                                </div>
                                <p className="text-gray-500 text-sm flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {facility.location} ({facility.distance})
                                </p>
                              </div>
                              <div className="flex items-center mt-2 md:mt-0">
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                  <span className="ml-1 font-medium">{facility.rating}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                              <div>
                                <span className="text-gray-500 text-sm block">Facility Type</span>
                                <span className="font-medium">{facility.type}</span>
                              </div>
                              <div>
                                <span className="text-gray-500 text-sm block">Processing Capacity</span>
                                <span className="font-medium">{facility.capacity}</span>
                              </div>
                              <div>
                                <span className="text-gray-500 text-sm block">Contact</span>
                                <span className="font-medium flex items-center">
                                  <Phone className="h-3 w-3 mr-1" />
                                  {facility.contact}
                                </span>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div>
                                <span className="text-gray-500 text-sm">Crops Processed:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {facility.crops.map((crop, index) => (
                                    <Badge key={index} variant="outline" className="bg-agri-light">
                                      {crop}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-500 text-sm">Services:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {facility.services.map((service, index) => (
                                    <Badge key={index} variant="outline" className="bg-blue-50">
                                      {service}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex justify-end mt-4">
                              <Button variant="outline" className="mr-2 border-agri-primary text-agri-primary">
                                Facility Details
                              </Button>
                              <Button className="bg-agri-primary hover:bg-agri-dark">
                                Book Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="storage" className="mt-0">
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-gray-600">{storageFacilities.length} facilities found</p>
                  <Select defaultValue="distance">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distance">Distance</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="capacity">Capacity</SelectItem>
                      <SelectItem value="cost">Cost: Low to High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  {storageFacilities.map((facility) => (
                    <Card key={facility.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 h-48 md:h-auto">
                            <img 
                              src={facility.image} 
                              alt={facility.name}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex flex-col md:flex-row justify-between">
                              <div>
                                <h3 className="font-semibold text-lg">{facility.name}</h3>
                                <p className="text-gray-500 text-sm flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {facility.location} ({facility.distance})
                                </p>
                              </div>
                              <div className="flex items-center mt-2 md:mt-0">
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                  <span className="ml-1 font-medium">{facility.rating}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
                              <div>
                                <span className="text-gray-500 text-sm block">Storage Type</span>
                                <span className="font-medium">{facility.type}</span>
                              </div>
                              <div>
                                <span className="text-gray-500 text-sm block">Total Capacity</span>
                                <span className="font-medium">{facility.capacity}</span>
                              </div>
                              <div>
                                <span className="text-gray-500 text-sm block">Available Space</span>
                                <span className="font-medium">{facility.available}</span>
                              </div>
                              <div>
                                <span className="text-gray-500 text-sm block">Storage Cost</span>
                                <span className="font-medium text-agri-primary">{facility.cost}</span>
                              </div>
                            </div>
                            
                            <div>
                              <span className="text-gray-500 text-sm">Features:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {facility.features.map((feature, index) => (
                                  <Badge key={index} variant="outline" className="bg-agri-light">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex justify-end mt-4">
                              <Button variant="outline" className="mr-2 border-agri-primary text-agri-primary">
                                Facility Details
                              </Button>
                              <Button className="bg-agri-primary hover:bg-agri-dark">
                                Book Storage
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="transport" className="mt-0">
                <div className="flex flex-col items-center justify-center p-12 text-center bg-agri-light rounded-lg">
                  <Truck className="h-16 w-16 text-agri-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Transportation Services Coming Soon</h3>
                  <p className="text-gray-600 max-w-lg mb-6">
                    We're working on connecting farmers with reliable transportation 
                    providers to help move your produce from farm to processing facilities 
                    and markets.
                  </p>
                  <Button className="bg-agri-primary hover:bg-agri-dark">
                    Get Notified When Available
                  </Button>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Facilities;
