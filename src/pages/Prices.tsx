
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, LineChart, TrendingUp, TrendingDown, Calendar, Landmark, Clock, MapPin, Info, HelpCircle, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample price trend chart images
const weeklyChartImage = "https://miro.medium.com/v2/resize:fit:1400/1*qAZGgWaLvaiOJxBuulIKeg.png";
const yearlyChartImage = "https://miro.medium.com/v2/resize:fit:1400/1*qAZGgWaLvaiOJxBuulIKeg.png";

// Sample crop price data
const cropPrices = [
  {
    crop: "Wheat",
    current_price: "₹2,250/q",
    change: "+₹50",
    change_percent: "+2.3%",
    trend: "up",
    min_price: "₹2,150/q",
    max_price: "₹2,300/q",
    updated_at: "Today, 10:30 AM",
    location: "Ludhiana Mandi",
    forecast: "Steady",
    msp: "₹2,125/q",
  },
  {
    crop: "Rice (Paddy)",
    current_price: "₹2,100/q",
    change: "+₹75",
    change_percent: "+3.7%",
    trend: "up",
    min_price: "₹1,950/q",
    max_price: "₹2,150/q",
    updated_at: "Today, 10:15 AM",
    location: "Karnal Mandi",
    forecast: "Rising",
    msp: "₹2,060/q",
  },
  {
    crop: "Tomato",
    current_price: "₹1,800/q",
    change: "-₹300",
    change_percent: "-14.3%",
    trend: "down",
    min_price: "₹1,600/q",
    max_price: "₹2,500/q",
    updated_at: "Today, 09:45 AM",
    location: "Nashik Mandi",
    forecast: "Falling",
    msp: "N/A",
  },
  {
    crop: "Potato",
    current_price: "₹1,400/q",
    change: "+₹120",
    change_percent: "+9.4%",
    trend: "up",
    min_price: "₹1,200/q",
    max_price: "₹1,550/q",
    updated_at: "Today, 11:00 AM",
    location: "Agra Mandi",
    forecast: "Rising",
    msp: "N/A",
  },
  {
    crop: "Sugarcane",
    current_price: "₹380/q",
    change: "₹0",
    change_percent: "0%",
    trend: "neutral",
    min_price: "₹350/q",
    max_price: "₹380/q",
    updated_at: "Yesterday, 04:30 PM",
    location: "Muzaffarnagar Mandi",
    forecast: "Steady",
    msp: "₹315/q",
  },
  {
    crop: "Cotton",
    current_price: "₹6,300/q",
    change: "-₹150",
    change_percent: "-2.3%",
    trend: "down",
    min_price: "₹6,100/q",
    max_price: "₹6,800/q",
    updated_at: "Today, 10:00 AM",
    location: "Guntur Mandi",
    forecast: "Steady",
    msp: "₹6,020/q",
  },
];

// Sample historical price data
const historicalData = [
  { month: "April 2023", price: "₹2,050/q", change: "-" },
  { month: "May 2023", price: "₹2,150/q", change: "+₹100" },
  { month: "June 2023", price: "₹2,100/q", change: "-₹50" },
  { month: "July 2023", price: "₹2,080/q", change: "-₹20" },
  { month: "August 2023", price: "₹2,120/q", change: "+₹40" },
  { month: "September 2023", price: "₹2,180/q", change: "+₹60" },
  { month: "October 2023", price: "₹2,200/q", change: "+₹20" },
  { month: "November 2023", price: "₹2,150/q", change: "-₹50" },
  { month: "December 2023", price: "₹2,130/q", change: "-₹20" },
  { month: "January 2024", price: "₹2,180/q", change: "+₹50" },
  { month: "February 2024", price: "₹2,220/q", change: "+₹40" },
  { month: "March 2024", price: "₹2,200/q", change: "-₹20" },
  { month: "April 2024", price: "₹2,250/q", change: "+₹50" },
];

// Sample mandi price comparison
const mandiComparison = [
  { location: "Ludhiana Mandi, Punjab", price: "₹2,250/q", distance: "12 km" },
  { location: "Khanna Mandi, Punjab", price: "₹2,230/q", distance: "35 km" },
  { location: "Jalandhar Mandi, Punjab", price: "₹2,210/q", distance: "65 km" },
  { location: "Amritsar Mandi, Punjab", price: "₹2,200/q", distance: "98 km" },
  { location: "Chandigarh Mandi", price: "₹2,270/q", distance: "120 km" },
];

const Prices = () => {
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-agri-dark mb-2">Price Trends</h1>
            <p className="text-gray-600">
              Track current and historical crop prices to make informed selling decisions
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline" className="border-agri-primary text-agri-primary">
              <Calendar className="mr-2 h-4 w-4" /> Set Price Alert
            </Button>
            <Button className="bg-agri-primary hover:bg-agri-dark">
              <TrendingUp className="mr-2 h-4 w-4" /> Market Analysis
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold">Price Trends</CardTitle>
                  <div className="flex gap-2">
                    <Select defaultValue="wheat">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Crop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="rice">Rice (Paddy)</SelectItem>
                        <SelectItem value="cotton">Cotton</SelectItem>
                        <SelectItem value="sugarcane">Sugarcane</SelectItem>
                        <SelectItem value="potato">Potato</SelectItem>
                        <SelectItem value="tomato">Tomato</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="punjab">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="punjab">Punjab</SelectItem>
                        <SelectItem value="haryana">Haryana</SelectItem>
                        <SelectItem value="up">Uttar Pradesh</SelectItem>
                        <SelectItem value="mp">Madhya Pradesh</SelectItem>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-1">
                <Tabs defaultValue="weekly">
                  <TabsList className="bg-agri-light">
                    <TabsTrigger value="weekly" className="data-[state=active]:bg-agri-primary data-[state=active]:text-white">
                      Weekly
                    </TabsTrigger>
                    <TabsTrigger value="monthly" className="data-[state=active]:bg-agri-primary data-[state=active]:text-white">
                      Monthly
                    </TabsTrigger>
                    <TabsTrigger value="yearly" className="data-[state=active]:bg-agri-primary data-[state=active]:text-white">
                      Yearly
                    </TabsTrigger>
                    <TabsTrigger value="5year" className="data-[state=active]:bg-agri-primary data-[state=active]:text-white">
                      5 Year
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="mt-4">
                    <TabsContent value="weekly" className="mt-0">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">Weekly Price Trend - Wheat</h3>
                          <Select defaultValue="price">
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="View" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="price">Price</SelectItem>
                              <SelectItem value="volume">Volume</SelectItem>
                              <SelectItem value="both">Both</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <img 
                          src={weeklyChartImage} 
                          alt="Weekly Price Trend"
                          className="w-full h-64 object-contain rounded" 
                        />
                        <div className="flex flex-wrap gap-4 mt-4 text-sm">
                          <div className="border bg-white rounded-lg p-2 flex-grow">
                            <span className="text-gray-600">Average</span>
                            <div className="font-bold">₹2,210/q</div>
                          </div>
                          <div className="border bg-white rounded-lg p-2 flex-grow">
                            <span className="text-gray-600">Highest</span>
                            <div className="font-bold text-green-600">₹2,270/q</div>
                          </div>
                          <div className="border bg-white rounded-lg p-2 flex-grow">
                            <span className="text-gray-600">Lowest</span>
                            <div className="font-bold text-red-600">₹2,180/q</div>
                          </div>
                          <div className="border bg-white rounded-lg p-2 flex-grow">
                            <span className="text-gray-600">Weekly Change</span>
                            <div className="font-bold text-green-600">+2.1%</div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="monthly" className="mt-0">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">Monthly Price Trend - Wheat</h3>
                          <Select defaultValue="price">
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="View" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="price">Price</SelectItem>
                              <SelectItem value="volume">Volume</SelectItem>
                              <SelectItem value="both">Both</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <img 
                          src={weeklyChartImage} 
                          alt="Monthly Price Trend"
                          className="w-full h-64 object-contain rounded" 
                        />
                        <div className="flex flex-wrap gap-4 mt-4 text-sm">
                          <div className="border bg-white rounded-lg p-2 flex-grow">
                            <span className="text-gray-600">Average</span>
                            <div className="font-bold">₹2,190/q</div>
                          </div>
                          <div className="border bg-white rounded-lg p-2 flex-grow">
                            <span className="text-gray-600">Highest</span>
                            <div className="font-bold text-green-600">₹2,270/q</div>
                          </div>
                          <div className="border bg-white rounded-lg p-2 flex-grow">
                            <span className="text-gray-600">Lowest</span>
                            <div className="font-bold text-red-600">₹2,150/q</div>
                          </div>
                          <div className="border bg-white rounded-lg p-2 flex-grow">
                            <span className="text-gray-600">Monthly Change</span>
                            <div className="font-bold text-green-600">+3.5%</div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="yearly" className="mt-0">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">Yearly Price Trend - Wheat</h3>
                          <Select defaultValue="price">
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="View" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="price">Price</SelectItem>
                              <SelectItem value="volume">Volume</SelectItem>
                              <SelectItem value="both">Both</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <img 
                          src={yearlyChartImage} 
                          alt="Yearly Price Trend"
                          className="w-full h-64 object-contain rounded" 
                        />
                        <div className="flex flex-wrap gap-4 mt-4 text-sm">
                          <div className="border bg-white rounded-lg p-2 flex-grow">
                            <span className="text-gray-600">Average</span>
                            <div className="font-bold">₹2,145/q</div>
                          </div>
                          <div className="border bg-white rounded-lg p-2 flex-grow">
                            <span className="text-gray-600">Highest</span>
                            <div className="font-bold text-green-600">₹2,270/q</div>
                          </div>
                          <div className="border bg-white rounded-lg p-2 flex-grow">
                            <span className="text-gray-600">Lowest</span>
                            <div className="font-bold text-red-600">₹2,050/q</div>
                          </div>
                          <div className="border bg-white rounded-lg p-2 flex-grow">
                            <span className="text-gray-600">Yearly Change</span>
                            <div className="font-bold text-green-600">+9.8%</div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="5year" className="mt-0">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">5 Year Price Trend - Wheat</h3>
                          <Select defaultValue="price">
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="View" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="price">Price</SelectItem>
                              <SelectItem value="volume">Volume</SelectItem>
                              <SelectItem value="both">Both</SelectItem>
                              <SelectItem value="inflation">Inflation Adjusted</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <img 
                          src={yearlyChartImage} 
                          alt="5 Year Price Trend"
                          className="w-full h-64 object-contain rounded" 
                        />
                        <div className="flex flex-wrap gap-4 mt-4 text-sm">
                          <div className="border bg-white rounded-lg p-2 flex-grow">
                            <span className="text-gray-600">Average</span>
                            <div className="font-bold">₹1,980/q</div>
                          </div>
                          <div className="border bg-white rounded-lg p-2 flex-grow">
                            <span className="text-gray-600">Highest</span>
                            <div className="font-bold text-green-600">₹2,270/q</div>
                          </div>
                          <div className="border bg-white rounded-lg p-2 flex-grow">
                            <span className="text-gray-600">Lowest</span>
                            <div className="font-bold text-red-600">₹1,750/q</div>
                          </div>
                          <div className="border bg-white rounded-lg p-2 flex-grow">
                            <span className="text-gray-600">5 Year Change</span>
                            <div className="font-bold text-green-600">+28.6%</div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                  
                  <div className="mt-6 bg-white rounded-lg border p-4">
                    <h3 className="font-medium mb-3">Price Analysis</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Wheat prices in Punjab have been trending upward over the past week, influenced by decreased supply and 
                      increased export demand. Government procurement at MSP has started, creating a price floor in the market.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-lg p-3">
                        <h4 className="font-medium mb-2 flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                          Factors Driving Prices Up
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• Lower than expected production in neighboring states</li>
                          <li>• Higher export demand from Middle East</li>
                          <li>• Reduced carry-over stock from previous season</li>
                        </ul>
                      </div>
                      <div className="bg-red-50 rounded-lg p-3">
                        <h4 className="font-medium mb-2 flex items-center">
                          <TrendingDown className="h-4 w-4 mr-2 text-red-600" />
                          Factors That Could Drive Prices Down
                        </h4>
                        <ul className="text-sm space-y-1">
                          <li>• Government import policies</li>
                          <li>• Large-scale government procurement</li>
                          <li>• International market fluctuations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold">Current Prices</CardTitle>
              </CardHeader>
              <CardContent className="pt-1">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-gray-500">Updated Today</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {cropPrices.map((crop, index) => (
                      <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{crop.crop}</h3>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {crop.updated_at}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">{crop.current_price}</div>
                            <div className={
                              crop.trend === "up" 
                                ? "text-green-600 text-sm font-medium" 
                                : crop.trend === "down"
                                ? "text-red-600 text-sm font-medium"
                                : "text-gray-600 text-sm font-medium"
                            }>
                              {crop.trend === "up" && "▲ "}
                              {crop.trend === "down" && "▼ "}
                              {crop.change} ({crop.change_percent})
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="text-gray-500 block">Range</span>
                            <span>{crop.min_price} - {crop.max_price}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block">MSP</span>
                            <span>{crop.msp}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block">Forecast</span>
                            <Badge className={
                              crop.forecast === "Rising" 
                                ? "bg-green-100 text-green-700 text-xs hover:bg-green-100"
                                : crop.forecast === "Falling"
                                ? "bg-red-100 text-red-700 text-xs hover:bg-red-100"
                                : "bg-blue-100 text-blue-700 text-xs hover:bg-blue-100"
                            }>
                              {crop.forecast}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full border-agri-primary text-agri-primary">
                    View All Crop Prices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold">Historical Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">Wheat - Last 12 Months</div>
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      <ArrowUpDown className="h-3.5 w-3.5" />
                      <span className="text-xs">Sort</span>
                    </Button>
                  </div>
                  
                  <div className="space-y-1 max-h-96 overflow-y-auto pr-2">
                    {historicalData.map((item, index) => (
                      <div 
                        key={index} 
                        className={`flex justify-between items-center p-2 rounded ${index === historicalData.length - 1 ? 'bg-agri-light font-medium' : 'hover:bg-gray-50'}`}
                      >
                        <span>{item.month}</span>
                        <div className="text-right">
                          <div>{item.price}</div>
                          {item.change !== "-" && (
                            <div className={
                              item.change.startsWith("+") 
                                ? "text-green-600 text-xs" 
                                : "text-red-600 text-xs"
                            }>
                              {item.change}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full border-agri-primary text-agri-primary">
                    Download Historical Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold">Mandi Comparison</CardTitle>
              </CardHeader>
              <CardContent className="pt-1">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Select defaultValue="wheat">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Crop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="rice">Rice (Paddy)</SelectItem>
                        <SelectItem value="cotton">Cotton</SelectItem>
                        <SelectItem value="sugarcane">Sugarcane</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {mandiComparison.map((mandi, index) => (
                      <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{mandi.location}</h3>
                            <p className="text-sm text-gray-500">
                              <MapPin className="h-3 w-3 inline mr-1" />
                              {mandi.distance}
                            </p>
                          </div>
                          <div className="text-lg font-bold">{mandi.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3 flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      Prices may vary between mandis due to quality differences, transportation costs, and local demand-supply dynamics.
                    </div>
                  </div>
                  
                  <Button className="w-full bg-agri-primary hover:bg-agri-dark">
                    View Detailed Mandi Rates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-semibold">Government Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-agri-primary flex items-center justify-center text-white">
                        <Landmark className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">MSP Procurement</h3>
                        <p className="text-sm text-gray-600">Government guaranteed minimum support prices</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Wheat MSP (2023-24):</span>
                        <span className="font-medium">₹2,125/q</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rice (Paddy) MSP:</span>
                        <span className="font-medium">₹2,060/q</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Procurement Period:</span>
                        <span className="font-medium">Apr 1 - Jun 30</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Procurement Centers:</span>
                        <span className="font-medium">358 Active</span>
                      </div>
                    </div>
                    
                    <Button variant="link" className="px-0 h-auto mt-2 text-agri-primary">
                      View All MSP Rates
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                      <h4 className="font-medium flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2 text-agri-primary" />
                        e-NAM Registration
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Electronic National Agriculture Market platform for better price discovery
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                      <h4 className="font-medium flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2 text-agri-primary" />
                        Price Deficiency Payment
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Compensation if market prices fall below MSP
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                      <h4 className="font-medium flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2 text-agri-primary" />
                        Market Intervention Scheme
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Support for crops without MSP during price crashes
                      </p>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full border-agri-primary text-agri-primary">
                    Explore Government Programs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Prices;
