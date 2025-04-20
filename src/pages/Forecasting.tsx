
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { CalendarIcon, ChevronDown, CloudSun, Droplets, Thermometer, Wind, AlertCircle, Info } from "lucide-react";
import { format } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";

// Sample forecast data
const weatherForecast = [
  { day: "Mon", temperature: 32, humidity: 65, rainfall: 0, description: "Sunny", icon: "sun" },
  { day: "Tue", temperature: 33, humidity: 70, rainfall: 0, description: "Partly Cloudy", icon: "cloud-sun" },
  { day: "Wed", temperature: 31, humidity: 75, rainfall: 5, description: "Light Rain", icon: "cloud-rain" },
  { day: "Thu", temperature: 29, humidity: 80, rainfall: 15, description: "Thunderstorms", icon: "cloud-lightning" },
  { day: "Fri", temperature: 30, humidity: 72, rainfall: 2, description: "Light Rain", icon: "cloud-drizzle" },
  { day: "Sat", temperature: 31, humidity: 68, rainfall: 0, description: "Mostly Sunny", icon: "sun" },
  { day: "Sun", temperature: 33, humidity: 62, rainfall: 0, description: "Sunny", icon: "sun" },
];

// Sample crop yield data for charts
const cropYieldData = [
  { month: "Jan", rice: 42, wheat: 35, potatoes: 0, jute: 0 },
  { month: "Feb", rice: 45, wheat: 38, potatoes: 0, jute: 0 },
  { month: "Mar", rice: 0, wheat: 40, potatoes: 25, jute: 0 },
  { month: "Apr", rice: 0, wheat: 0, potatoes: 32, jute: 10 },
  { month: "May", rice: 0, wheat: 0, potatoes: 38, jute: 25 },
  { month: "Jun", rice: 0, wheat: 0, potatoes: 30, jute: 40 },
  { month: "Jul", rice: 20, wheat: 0, potatoes: 0, jute: 45 },
  { month: "Aug", rice: 35, wheat: 0, potatoes: 0, jute: 42 },
  { month: "Sep", rice: 50, wheat: 0, potatoes: 0, jute: 30 },
  { month: "Oct", rice: 65, wheat: 0, potatoes: 0, jute: 0 },
  { month: "Nov", rice: 55, wheat: 15, potatoes: 0, jute: 0 },
  { month: "Dec", rice: 48, wheat: 25, potatoes: 0, jute: 0 },
];

// Sample market forecast data
const marketForecastData = [
  { month: "Jan", price: 2200, demand: 65 },
  { month: "Feb", price: 2220, demand: 68 },
  { month: "Mar", price: 2250, demand: 70 },
  { month: "Apr", price: 2350, demand: 75 },
  { month: "May", price: 2400, demand: 80 },
  { month: "Jun", price: 2380, demand: 75 },
  { month: "Jul", price: 2320, demand: 70 },
  { month: "Aug", price: 2270, demand: 65 },
  { month: "Sep", price: 2190, demand: 60 },
  { month: "Oct", price: 2150, demand: 62 },
  { month: "Nov", price: 2180, demand: 68 },
  { month: "Dec", price: 2210, demand: 72 },
];

// Disease risk levels
const diseaseRisk = {
  rice: {
    "Bacterial Leaf Blight": "Medium",
    "Rice Blast": "Low",
    "Sheath Blight": "High",
  },
  wheat: {
    "Rust": "Low",
    "Powdery Mildew": "Medium",
    "Loose Smut": "Low",
  },
  potato: {
    "Late Blight": "High",
    "Early Blight": "Medium",
    "Black Scurf": "Low",
  },
  jute: {
    "Stem Rot": "Medium",
    "Anthracnose": "Low",
    "Root Rot": "Medium",
  }
};

const Forecasting = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedCrop, setSelectedCrop] = useState("rice");
  const [isCalculating, setIsCalculating] = useState(false);
  const [showLoadingForecast, setShowLoadingForecast] = useState(false);

  const updateForecast = () => {
    setShowLoadingForecast(true);
    setTimeout(() => {
      setShowLoadingForecast(false);
      toast({
        title: "Forecast Updated",
        description: "Harvest forecast has been updated with the latest data",
      });
    }, 2000);
  };

  const calculateYield = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      toast({
        title: "Yield Calculation Complete",
        description: `Based on current conditions, expected yield for ${selectedCrop} is 42-45 quintals per hectare.`,
      });
    }, 2000);
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col space-y-2 mb-6">
          <h1 className="text-3xl font-bold text-agri-primary">
            Harvest Forecasting
          </h1>
          <p className="text-muted-foreground">
            Predict yields, analyze weather impact, and plan your harvest with AI-powered forecasting
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="col-span-2">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Weather Forecast</CardTitle>
                <Button onClick={updateForecast} variant="outline" size="sm" className="text-xs">
                  {showLoadingForecast ? 
                    <span className="flex items-center"><span className="animate-spin mr-2">⟳</span> Updating...</span> : 
                    "Update Forecast"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-4">
                {weatherForecast.map((day, index) => (
                  <div key={index} className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
                    <span className="font-medium text-sm">{day.day}</span>
                    <div className="my-2">
                      {day.icon === "sun" && <CloudSun className="h-8 w-8 text-yellow-500" />}
                      {day.icon === "cloud-sun" && <CloudSun className="h-8 w-8 text-gray-500" />}
                      {day.icon === "cloud-rain" && <Droplets className="h-8 w-8 text-blue-500" />}
                      {day.icon === "cloud-lightning" && <AlertCircle className="h-8 w-8 text-red-500" />}
                      {day.icon === "cloud-drizzle" && <Droplets className="h-8 w-8 text-blue-400" />}
                    </div>
                    <div className="flex items-center text-sm">
                      <Thermometer className="h-3 w-3 mr-1 text-red-500" />
                      <span>{day.temperature}°C</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Droplets className="h-3 w-3 mr-1 text-blue-500" />
                      <span>{day.humidity}%</span>
                    </div>
                    {day.rainfall > 0 && (
                      <span className="text-xs text-blue-600 mt-1">{day.rainfall}mm</span>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Weather data from West Bengal Meteorological Department. Last updated: {format(new Date(), "PPP")}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Yield Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Crop Type</label>
                <Select defaultValue="rice" onValueChange={setSelectedCrop}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="potato">Potato</SelectItem>
                    <SelectItem value="jute">Jute</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Planting Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Area</label>
                <Select defaultValue="1">
                  <SelectTrigger>
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">0.5 hectare</SelectItem>
                    <SelectItem value="1">1 hectare</SelectItem>
                    <SelectItem value="2">2 hectares</SelectItem>
                    <SelectItem value="5">5 hectares</SelectItem>
                    <SelectItem value="10">10 hectares</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Soil Type</label>
                <Select defaultValue="loam">
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clay">Clay</SelectItem>
                    <SelectItem value="silt">Silt</SelectItem>
                    <SelectItem value="loam">Loam</SelectItem>
                    <SelectItem value="sandy">Sandy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-agri-primary hover:bg-agri-dark" onClick={calculateYield}>
                {isCalculating ? 
                  <span className="flex items-center"><span className="animate-spin mr-2">⟳</span> Calculating...</span> : 
                  "Calculate Expected Yield"}
              </Button>

              <div className="text-xs text-muted-foreground">
                Calculations include climate data, soil conditions, and historical yields.
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="yield" className="space-y-4">
          <TabsList>
            <TabsTrigger value="yield">Crop Yield Forecast</TabsTrigger>
            <TabsTrigger value="disease">Disease Risk</TabsTrigger>
            <TabsTrigger value="market">Market Forecast</TabsTrigger>
          </TabsList>
          
          <TabsContent value="yield" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Annual Crop Yield Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={cropYieldData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis label={{ value: 'Quintals per Hectare', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="rice" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="wheat" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                      <Area type="monotone" dataKey="potatoes" stackId="3" stroke="#ffc658" fill="#ffc658" />
                      <Area type="monotone" dataKey="jute" stackId="4" stroke="#ff8042" fill="#ff8042" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Seasonal Insights</AlertTitle>
                    <AlertDescription>
                      Rice yields peak in September-October. For wheat, December-February is the optimal harvest period. Plan your planting and harvesting accordingly.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Optimal Planting Windows</h4>
                      <ul className="space-y-1 text-sm">
                        <li><span className="font-semibold">Rice:</span> June-July for aman, December-January for boro</li>
                        <li><span className="font-semibold">Wheat:</span> November-December</li>
                        <li><span className="font-semibold">Potato:</span> October-November</li>
                        <li><span className="font-semibold">Jute:</span> March-April</li>
                      </ul>
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Expected Yields (Good Conditions)</h4>
                      <ul className="space-y-1 text-sm">
                        <li><span className="font-semibold">Rice:</span> 45-60 quintals/hectare</li>
                        <li><span className="font-semibold">Wheat:</span> 35-45 quintals/hectare</li>
                        <li><span className="font-semibold">Potato:</span> 200-250 quintals/hectare</li>
                        <li><span className="font-semibold">Jute:</span> 25-32 quintals/hectare</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="disease" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(diseaseRisk).map(([crop, diseases]) => (
                <Card key={crop}>
                  <CardHeader className="pb-2">
                    <CardTitle className="capitalize">{crop} Disease Risk</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Disease</th>
                          <th className="text-right py-2">Risk Level</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(diseases).map(([disease, risk]) => (
                          <tr key={disease} className="border-b last:border-0">
                            <td className="py-2">{disease}</td>
                            <td className="py-2 text-right">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                risk === "High" 
                                  ? "bg-red-100 text-red-800" 
                                  : risk === "Medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}>
                                {risk}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>Disease risk assessment based on current weather conditions and historical disease patterns in West Bengal.</p>
                    </div>
                    
                    <Button 
                      className="mt-4 w-full"
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "Prevention Tips",
                          description: `Prevention recommendations for ${crop} diseases have been sent to your email.`,
                        });
                      }}
                    >
                      Get Prevention Recommendations
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertCircle className="h-4 w-4 text-yellow-800" />
              <AlertTitle>Increased Disease Risk Alert</AlertTitle>
              <AlertDescription>
                Recent humidity levels have increased the risk of fungal diseases. Consider preventive spraying for susceptible crops.
              </AlertDescription>
            </Alert>
          </TabsContent>
          
          <TabsContent value="market" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Market Price Forecasting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={marketForecastData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="price" name="Price (₹ per quintal)" fill="#8884d8" />
                      <Bar yAxisId="right" dataKey="demand" name="Demand Index" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Price Trends Analysis</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current Price:</span>
                        <span className="font-medium">₹2,200 per quintal</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>30-Day Forecast:</span>
                        <span className="font-medium text-green-600">₹2,350 per quintal (+6.8%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>90-Day Forecast:</span>
                        <span className="font-medium text-red-600">₹2,180 per quintal (-0.9%)</span>
                      </div>
                    </div>
                    
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Market Advisory</AlertTitle>
                      <AlertDescription>
                        Price expected to peak in April-May. Consider storing crops if storage is available and affordable.
                      </AlertDescription>
                    </Alert>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Regional Price Variations</h3>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Market</th>
                          <th className="text-right py-2">Current Price</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr className="border-b">
                          <td className="py-2">Kolkata Wholesale Market</td>
                          <td className="py-2 text-right">₹2,250 per quintal</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Siliguri Agricultural Market</td>
                          <td className="py-2 text-right">₹2,180 per quintal</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Burdwan Mandi</td>
                          <td className="py-2 text-right">₹2,220 per quintal</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Howrah Farmers Market</td>
                          <td className="py-2 text-right">₹2,200 per quintal</td>
                        </tr>
                        <tr>
                          <td className="py-2">Durgapur Trading Center</td>
                          <td className="py-2 text-right">₹2,190 per quintal</td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <Button 
                      className="mt-4 w-full"
                      onClick={() => {
                        toast({
                          title: "Price Alert Set",
                          description: "You'll receive notifications when prices reach your target level.",
                        });
                      }}
                    >
                      Set Price Alert
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Forecasting;
