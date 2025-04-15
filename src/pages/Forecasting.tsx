
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Cloud, CloudRain, BarChart, Thermometer, Upload, Info, HelpCircle, Check } from "lucide-react";

// Mock data for charts
const chartImage = "https://miro.medium.com/v2/resize:fit:1400/1*qAZGgWaLvaiOJxBuulIKeg.png";
const weatherImage = "https://www.visualcrossing.com/images/forecast-timeline.png";

const Forecasting = () => {
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-agri-dark mb-2">Harvest Forecasting</h1>
            <p className="text-gray-600">
              AI-powered predictions to help plan your harvest and optimize sales timing
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-agri-primary hover:bg-agri-dark">
              <Upload className="h-4 w-4 mr-2" /> Upload Crop Data
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold">Crop Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Crop Type</label>
                  <Select defaultValue="wheat">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                      <SelectItem value="sugarcane">Sugarcane</SelectItem>
                      <SelectItem value="tomato">Tomato</SelectItem>
                      <SelectItem value="potato">Potato</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Variety</label>
                  <Select defaultValue="hd2967">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Variety" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hd2967">HD 2967</SelectItem>
                      <SelectItem value="hd3086">HD 3086</SelectItem>
                      <SelectItem value="pusa">Pusa Wheat</SelectItem>
                      <SelectItem value="pbw550">PBW 550</SelectItem>
                      <SelectItem value="wh542">WH 542</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Location</label>
                  <Select defaultValue="punjab">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="punjab">Punjab</SelectItem>
                      <SelectItem value="haryana">Haryana</SelectItem>
                      <SelectItem value="up">Uttar Pradesh</SelectItem>
                      <SelectItem value="mp">Madhya Pradesh</SelectItem>
                      <SelectItem value="rajasthan">Rajasthan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Sowing Date</label>
                  <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      November 15, 2023
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Land Area</label>
                  <div className="flex items-center h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <span>5.0</span>
                    <Select defaultValue="acre">
                      <SelectTrigger className="w-[100px] ml-2 border-0 p-0 h-auto">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="acre">Acres</SelectItem>
                        <SelectItem value="hectare">Hectares</SelectItem>
                        <SelectItem value="bigha">Bigha</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Irrigation Type</label>
                  <Select defaultValue="tubewell">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Irrigation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tubewell">Tubewell</SelectItem>
                      <SelectItem value="canal">Canal</SelectItem>
                      <SelectItem value="rainfed">Rain-fed</SelectItem>
                      <SelectItem value="drip">Drip Irrigation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full bg-agri-primary hover:bg-agri-dark">
                  Update Forecast
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold">Harvest Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-agri-light rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">Optimal Harvest Window</h3>
                    <p className="text-gray-600 text-sm">Based on crop condition and weather forecast</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="bg-agri-primary text-white font-bold py-2 px-4 rounded">
                        <Calendar className="h-4 w-4 inline mr-2" />
                        April 10, 2024
                      </div>
                      <p className="text-xs mt-1 text-gray-500">Earliest</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-agri-accent text-agri-dark font-bold py-2 px-4 rounded">
                        <Calendar className="h-4 w-4 inline mr-2" />
                        April 20, 2024
                      </div>
                      <p className="text-xs mt-1 text-gray-500">Optimal</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-red-100 text-red-600 font-bold py-2 px-4 rounded">
                        <Calendar className="h-4 w-4 inline mr-2" />
                        April 30, 2024
                      </div>
                      <p className="text-xs mt-1 text-gray-500">Latest</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Expected Yield</h4>
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold text-agri-primary">48.5 q/ha</div>
                    <p className="text-sm text-green-600 flex items-center">
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                        <polyline points="16 7 22 7 22 13"></polyline>
                      </svg>
                      5.2% above average
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Quality Prediction</h4>
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold text-agri-primary">Grade A</div>
                    <p className="text-sm text-gray-600">
                      Based on current growth patterns
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Total Expected Harvest</h4>
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-2xl font-bold text-agri-primary">97 quintals</div>
                    <p className="text-sm text-gray-600">
                      For 5 acres of land
                    </p>
                  </div>
                </div>
                
                <Tabs defaultValue="yield">
                  <TabsList className="bg-agri-light">
                    <TabsTrigger value="yield" className="data-[state=active]:bg-agri-primary data-[state=active]:text-white">
                      <BarChart className="h-4 w-4 mr-2" />
                      Yield Projection
                    </TabsTrigger>
                    <TabsTrigger value="weather" className="data-[state=active]:bg-agri-primary data-[state=active]:text-white">
                      <CloudRain className="h-4 w-4 mr-2" />
                      Weather Forecast
                    </TabsTrigger>
                    <TabsTrigger value="market" className="data-[state=active]:bg-agri-primary data-[state=active]:text-white">
                      <BarChart className="h-4 w-4 mr-2" />
                      Market Timing
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="yield" className="mt-4">
                    <div className="bg-white rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Yield Projection Over Time</h4>
                        <Select defaultValue="quintals">
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quintals">Quintals</SelectItem>
                            <SelectItem value="tonnes">Tonnes</SelectItem>
                            <SelectItem value="kg">Kilograms</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <img 
                        src={chartImage} 
                        alt="Yield Projection Chart"
                        className="w-full h-auto object-contain rounded" 
                      />
                      <div className="mt-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2 mb-2">
                          <HelpCircle className="h-4 w-4 text-agri-primary" />
                          <span>Peak yield is expected between April 15-20 based on current growth rate and weather patterns.</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HelpCircle className="h-4 w-4 text-yellow-500" />
                          <span>Harvesting after April 25 may result in reduced quality due to predicted high temperatures.</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="weather" className="mt-4">
                    <div className="bg-white rounded-lg border p-4">
                      <h4 className="font-medium mb-4">14-Day Weather Forecast</h4>
                      <img 
                        src={weatherImage} 
                        alt="Weather Forecast"
                        className="w-full h-auto object-contain rounded" 
                      />
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-agri-light p-3 rounded">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">Temperature</div>
                            <Thermometer className="h-4 w-4 text-red-500" />
                          </div>
                          <p>Avg: 30°C, Max: 36°C</p>
                          <p className="text-xs mt-1 text-gray-600">Trending warmer than usual for April</p>
                        </div>
                        <div className="bg-agri-light p-3 rounded">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">Rainfall</div>
                            <CloudRain className="h-4 w-4 text-blue-500" />
                          </div>
                          <p>2 days expected (15mm)</p>
                          <p className="text-xs mt-1 text-gray-600">Lower than average for the season</p>
                        </div>
                        <div className="bg-agri-light p-3 rounded">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">Wind</div>
                            <Cloud className="h-4 w-4 text-gray-600" />
                          </div>
                          <p>5-10 km/h, NW direction</p>
                          <p className="text-xs mt-1 text-gray-600">Favorable for harvesting operations</p>
                        </div>
                      </div>
                      <div className="mt-4 p-3 border border-yellow-200 bg-yellow-50 rounded-lg flex items-start gap-2">
                        <Info className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium">Weather Alert:</span> Possibility of unseasonal rain in the third week of April. Consider advancing harvest if your crop is ready by April 15.
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="market" className="mt-4">
                    <div className="bg-white rounded-lg border p-4">
                      <h4 className="font-medium mb-4">Market Price Projection</h4>
                      <div className="bg-agri-light p-4 rounded-lg mb-4">
                        <div className="flex flex-col md:flex-row justify-between md:items-center">
                          <div>
                            <h5 className="font-semibold">Recommended Selling Window</h5>
                            <p className="text-sm text-gray-600">Based on historical trends and current market signals</p>
                          </div>
                          <div className="mt-3 md:mt-0 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-agri-primary" />
                            <span className="font-bold text-lg">April 25 - May 10, 2024</span>
                          </div>
                        </div>
                      </div>
                      <img 
                        src={chartImage} 
                        alt="Market Price Projection Chart"
                        className="w-full h-auto object-contain rounded" 
                      />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="border rounded p-3">
                          <h5 className="font-medium text-sm text-gray-600">Current Market Price</h5>
                          <p className="text-xl font-bold text-agri-primary">₹2,150/q</p>
                        </div>
                        <div className="border rounded p-3">
                          <h5 className="font-medium text-sm text-gray-600">Projected Peak Price</h5>
                          <p className="text-xl font-bold text-green-600">₹2,350/q</p>
                        </div>
                        <div className="border rounded p-3">
                          <h5 className="font-medium text-sm text-gray-600">Potential Increase</h5>
                          <p className="text-xl font-bold text-agri-accent">+9.3%</p>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-gray-600">
                        <p className="mb-2"><span className="font-medium">Market Analysis:</span> Government procurement at MSP will begin on April 15, but market prices are expected to rise above MSP by end-April due to export demand and lower production in neighboring states.</p>
                        <p><span className="font-medium">Recommendation:</span> Consider holding your harvest until late April if storage facilities are available, or opt for a staggered selling approach.</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold">Your Crop History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-agri-light p-3">
                    <h4 className="font-medium">Previous Wheat Harvests</h4>
                  </div>
                  <div className="divide-y">
                    {[
                      {year: "2023", yield: "45.2 q/ha", quality: "Grade B+", sellPrice: "₹2,050/q"},
                      {year: "2022", yield: "42.8 q/ha", quality: "Grade A", sellPrice: "₹2,125/q"},
                      {year: "2021", yield: "38.5 q/ha", quality: "Grade B", sellPrice: "₹1,975/q"},
                    ].map((crop, index) => (
                      <div key={index} className="p-3 flex justify-between items-center">
                        <div>
                          <span className="font-medium">Wheat {crop.year}</span>
                          <p className="text-sm text-gray-600">HD 2967 Variety</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <p className="text-gray-600">Yield</p>
                            <p className="font-medium">{crop.yield}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-600">Quality</p>
                            <p className="font-medium">{crop.quality}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-600">Sold At</p>
                            <p className="font-medium">{crop.sellPrice}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <BarChart className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Growth Trend Analysis</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Your wheat yields have been improving year-over-year, with a 6.5% average annual increase. This is better than the regional average of 3.8%.
                      </p>
                      <Button variant="link" className="text-agri-primary p-0 h-auto mt-1">
                        View detailed analysis
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold">Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-agri-light rounded-lg p-4">
                  <h4 className="font-medium mb-2">Harvest Timing Advice</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-agri-primary flex-shrink-0" />
                      <span>Wait until grain moisture content drops to 14-16% for optimal quality.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-agri-primary flex-shrink-0" />
                      <span>Check for clear weather forecast for 3-4 days after your planned harvest date.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-agri-primary flex-shrink-0" />
                      <span>Consider harvesting in phases if your crop is ripening unevenly.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium flex items-center">
                    <Info className="h-5 w-5 text-blue-500 mr-2" />
                    Market Insights
                  </h4>
                  <div className="mt-3 space-y-3 text-sm">
                    <p>Government procurement operations at MSP (₹2,125/q) will begin from April 15 at all major mandis.</p>
                    <p>Private flour mills are expected to offer 5-10% above MSP by end of April due to quality concerns in other growing regions.</p>
                    <p>Export demand is strong this year, potentially pushing prices higher for Grade A wheat.</p>
                  </div>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h4 className="font-medium mb-3">Post-Harvest Processing Options</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded">
                      <span>Drying & Cleaning Services</span>
                      <Button variant="link" className="text-agri-primary p-0 h-auto">View Nearby</Button>
                    </div>
                    <div className="flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded">
                      <span>Storage Facilities</span>
                      <Button variant="link" className="text-agri-primary p-0 h-auto">View Nearby</Button>
                    </div>
                    <div className="flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded">
                      <span>Quality Grading Centers</span>
                      <Button variant="link" className="text-agri-primary p-0 h-auto">View Nearby</Button>
                    </div>
                    <div className="flex items-center justify-between text-sm p-2 hover:bg-gray-50 rounded">
                      <span>Transportation Services</span>
                      <Button variant="link" className="text-agri-primary p-0 h-auto">View Nearby</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Forecasting;
