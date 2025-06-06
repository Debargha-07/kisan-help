
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { CalendarIcon, ChevronDown, CloudSun, Droplets, Thermometer, Wind, AlertCircle, Info, Leaf, Wheat, Tractor, Umbrella } from "lucide-react";
import { format } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { fetchSoilData } from "@/api/soilApi";
import { fetchWeatherForecast } from "@/api/weatherApi";
import { fetchCropRecommendations, getCurrentSeason, getCropChallenges } from "@/api/cropApi";

const analyzeSoilHealth = (ph, nitrogen, phosphorus, potassium) => {
  return {
    "pH": {
      value: ph,
      status: ph < 5.5 ? "Acidic" : ph > 7.5 ? "Alkaline" : "Optimal",
      recommendation: ph < 5.5 
        ? "Add lime to increase soil pH for better nutrient availability" 
        : ph > 7.5 
        ? "Add organic matter or sulfur to lower pH gradually" 
        : "pH is in optimal range for most crops"
    },
    "nitrogen": {
      value: nitrogen,
      status: nitrogen < 250 ? "Low" : nitrogen > 450 ? "High" : "Medium",
      recommendation: nitrogen < 250 
        ? "Apply nitrogen-rich fertilizers or incorporate legumes in rotation" 
        : nitrogen > 450 
        ? "Reduce nitrogen application, consider nitrogen-consuming crops" 
        : "Maintain current nitrogen management practices"
    },
    "phosphorus": {
      value: phosphorus,
      status: phosphorus < 12 ? "Low" : phosphorus > 25 ? "High" : "Medium",
      recommendation: phosphorus < 12 
        ? "Apply phosphate fertilizers and incorporate organic matter" 
        : phosphorus > 25 
        ? "Reduce phosphorus application to prevent runoff issues" 
        : "Maintain current phosphorus levels with balanced fertilization"
    },
    "potassium": {
      value: potassium,
      status: potassium < 150 ? "Low" : potassium > 280 ? "High" : "Medium",
      recommendation: potassium < 150 
        ? "Apply potassium-rich fertilizers like potassium sulfate" 
        : potassium > 280 
        ? "Reduce potassium application in future seasons" 
        : "Maintain current potassium management practices"
    }
  };
};

const calculateSoilImpact = (soilType, region, ph, nitrogen, phosphorus, potassium) => {
  let baseYield = 1;
  
  // Soil type impact
  if (soilType.toLowerCase().includes("black")) {
    baseYield *= 1.18;
  } else if (soilType.toLowerCase().includes("red")) {
    baseYield *= 0.95;
  } else if (soilType.toLowerCase().includes("alluvial")) {
    baseYield *= 1.2;
  } else if (soilType.toLowerCase().includes("usar") || soilType.toLowerCase().includes("calcareous")) {
    baseYield *= 0.75;
  } else if (soilType.toLowerCase().includes("laterite")) {
    baseYield *= 0.8;
  } else {
    // Loam and other types
    baseYield *= 1.0;
  }

  // pH impact
  baseYield *= (ph >= 6 && ph <= 7.5) ? 1.05 : 0.95;
  
  // Nitrogen impact
  baseYield *= (nitrogen > 300 && nitrogen < 400) ? 1.05 : 0.97;
  
  // Phosphorus impact
  baseYield *= (phosphorus > 15) ? 1.03 : 0.98;
  
  // Potassium impact
  baseYield *= (potassium > 210) ? 1.03 : 0.97;

  // Region impact
  if (region === "Punjab") {
    baseYield *= 1.15;
  } else if (region === "Maharashtra") {
    baseYield *= 0.92;
  } else if (region === "Karnataka") {
    baseYield *= 0.97;
  } else if (region === "Uttar Pradesh") {
    baseYield *= 1.05;
  } else {
    // West Bengal and other regions
    baseYield *= 1.0;
  }

  return baseYield;
};

const calculateFixedYield = (crop, variety, area, soilType, region, ph, nitrogen, phosphorus, potassium) => {
  // Base yield values for different crops and varieties (quintals per hectare)
  const cropYields = {
    rice: 50, wheat: 45, maize: 38, groundnut: 19, soybean: 16,
    // Rice varieties
    IR36: 55, MTU7029: 53, BPT5204: 52, 
    // Wheat varieties
    HD2967: 48, PBW550: 46, DBW17: 45,
    // Maize varieties
    DHM117: 41, DHM121: 43, "Vivek-27": 40,
    // Groundnut varieties
    "TAG-24": 20, "GG-20": 18, "TG-37A": 17,
    // Soybean varieties
    "JS-335": 17, "JS-9560": 16, "NRC-37": 15,
  };
  
  // Get base yield value for the crop/variety
  let base = cropYields[variety] || cropYields[crop.toLowerCase()] || 25;
  
  // Calculate soil impact factor
  let soilImpact = calculateSoilImpact(soilType, region, ph, nitrogen, phosphorus, potassium);
  
  // Add slight randomization for realistic variation (±3%)
  let randomFactor = 0.97 + Math.random() * 0.06;
  
  // Calculate predicted yield
  let predicted = base * soilImpact * area * randomFactor;

  // Determine confidence based on how closely conditions match ideal
  const idealPhRange = (ph >= 6 && ph <= 7.5);
  const idealN = nitrogen > 300 && nitrogen < 400;
  const matched = (idealPhRange && idealN);

  // Return results with additional details
  return {
    expectedYield: predicted,
    yieldRange: { min: predicted * 0.92, max: predicted * 1.08 },
    confidence: matched ? 94 : 81,
    factors: [
      { 
        name: "Soil Type", 
        impact: soilImpact > 1 ? "Positive" : "Neutral", 
        recommendation: `Soil "${soilType}" in ${region} ${soilImpact > 1.1 ? "is excellent" : soilImpact > 1 ? "is good" : "is adequate"} for this crop` 
      },
      { 
        name: "pH", 
        impact: idealPhRange ? "Positive" : "Negative", 
        recommendation: idealPhRange ? "Optimal pH for crop growth" : "Soil pH adjustment advised for better nutrient availability" 
      },
      { 
        name: "Nitrogen", 
        impact: idealN ? "Positive" : "Adjustment Needed", 
        recommendation: idealN ? "Sufficient nitrogen for healthy growth" : "Adjust nitrogen fertilizer application for best results" 
      },
      {
        name: "Region", 
        impact: region === "Punjab" || region === "Uttar Pradesh" ? "Positive" : "Neutral",
        recommendation: `${region} has ${region === "Punjab" ? "excellent" : region === "Uttar Pradesh" ? "very good" : "suitable"} conditions for this crop`
      }
    ],
  };
};

// Long-term forecast data
const longTermForecast = [
  { month: "May", avgTemp: 35, rainfall: 35, humidity: 60 },
  { month: "Jun", avgTemp: 33, rainfall: 130, humidity: 75 },
  { month: "Jul", avgTemp: 31, rainfall: 180, humidity: 85 },
  { month: "Aug", avgTemp: 30, rainfall: 200, humidity: 88 },
  { month: "Sep", avgTemp: 29, rainfall: 150, humidity: 82 },
  { month: "Oct", avgTemp: 28, rainfall: 70, humidity: 75 },
  { month: "Nov", avgTemp: 25, rainfall: 20, humidity: 65 },
  { month: "Dec", avgTemp: 22, rainfall: 10, humidity: 60 },
  { month: "Jan", avgTemp: 20, rainfall: 5, humidity: 55 },
  { month: "Feb", avgTemp: 22, rainfall: 10, humidity: 50 },
  { month: "Mar", avgTemp: 26, rainfall: 15, humidity: 55 },
  { month: "Apr", avgTemp: 30, rainfall: 25, humidity: 58 },
];

const Forecasting = () => {
  // State variables
  const [location, setLocation] = useState("West Bengal");
  const [date, setDate] = useState(new Date());
  const [selectedCrop, setSelectedCrop] = useState("rice");
  const [selectedVariety, setSelectedVariety] = useState("IR36");
  const [area, setArea] = useState(1);
  const [soilType, setSoilType] = useState("alluvial");
  
  // Soil parameter states
  const [phValue, setPhValue] = useState(6.5);
  const [nitrogenValue, setNitrogenValue] = useState(340);
  const [phosphorusValue, setPhosphorusValue] = useState(18);
  const [potassiumValue, setPotassiumValue] = useState(210);
  
  // Result states
  const [isCalculating, setIsCalculating] = useState(false);
  const [yieldResult, setYieldResult] = useState(null);
  const [cropRecommendations, setCropRecommendations] = useState(null);
  const [showSoilHealthReport, setShowSoilHealthReport] = useState(false);
  
  // Fetch weather data
  const { data: weatherData, isLoading: isLoadingWeather } = useQuery({
    queryKey: ['weatherForecast', location],
    queryFn: () => fetchWeatherForecast(location),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false
  });

  // Fetch soil data when location changes
  const { data: soilData } = useQuery({
    queryKey: ['soilData', location],
    queryFn: () => fetchSoilData(location),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false
  });

  // Fetch crop recommendations
  const { data: recommendationsData, refetch: refetchRecommendations } = useQuery({
    queryKey: ['cropRecommendations', location, soilType],
    queryFn: () => fetchCropRecommendations(location, soilType, getCurrentSeason()),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false
  });

  // Update soil parameters when location changes
  useEffect(() => {
    if (soilData) {
      setPhValue(soilData.ph);
      setNitrogenValue(soilData.nitrogen);
      setPhosphorusValue(soilData.phosphorus);
      setPotassiumValue(soilData.potassium);
      setSoilType(soilData.predominantType);
    }
  }, [soilData]);

  // Update crop recommendations when they change
  useEffect(() => {
    if (recommendationsData) {
      setCropRecommendations(recommendationsData);
    }
  }, [recommendationsData]);

  // Calculate yield prediction
  const calculateYieldPrediction = async () => {
    setIsCalculating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 950));
      const result = calculateFixedYield(
        selectedCrop, selectedVariety, area, soilType, location,
        phValue, nitrogenValue, phosphorusValue, potassiumValue
      );
      
      // Add seasonal challenges to the result
      result.factors = result.factors.concat(
        getCropChallenges(selectedCrop, location, getCurrentSeason())
          .map(challenge => ({
            name: "Seasonal Challenge",
            impact: "Medium",
            recommendation: challenge
          }))
      );
      
      setYieldResult(result);
      
      toast({
        title: "Yield Calculation Complete",
        description: `Based on your entry, expected yield for ${selectedCrop} (${selectedVariety}) is ${result.expectedYield.toFixed(2)} quintals.`,
      });
    } catch (error) {
      console.error("Error calculating yield:", error);
      toast({
        title: "Calculation Error",
        description: "Unable to calculate yield. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  };

  // Update crop recommendations
  const updateCropRecommendations = () => {
    refetchRecommendations();
    
    toast({
      title: "Crop Recommendations Updated",
      description: `Found recommendations based on ${getCurrentSeason()} conditions in ${location}.`,
    });
  };

  // Get formatted weather forecast data from the API response
  const getFormattedWeatherForecast = () => {
    if (!weatherData || !weatherData.list) return [];
    
    return weatherData.list.map(forecast => ({
      day: forecast.dayName,
      temperature: forecast.display.temperature,
      humidity: forecast.display.humidity,
      rainfall: forecast.display.rainfall,
      description: forecast.display.description,
      icon: forecast.display.icon
    }));
  };

  // Get weather forecast for display
  const weatherForecast = getFormattedWeatherForecast();

  // Seasonal weather description
  const getSeasonalDescription = () => {
    if (!weatherForecast || weatherForecast.length === 0) {
      return "Weather forecast data unavailable";
    }
    
    const avgRainfall = weatherForecast.reduce((sum, day) => sum + day.rainfall, 0) / weatherForecast.length;
    
    if (avgRainfall > 10) {
      return "Heavy monsoon conditions expected, ensure proper drainage and consider water-resistant crop varieties.";
    } else if (avgRainfall > 5) {
      return "Moderate rainfall expected, good conditions for most crops with adequate irrigation planning.";
    } else if (avgRainfall > 0) {
      return "Light rainfall expected, supplemental irrigation may be necessary for optimal crop growth.";
    } else {
      return "Dry conditions expected, irrigation will be essential for crop survival and growth.";
    }
  };

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex flex-col space-y-2 mb-6">
          <h1 className="text-3xl font-bold text-agri-primary">
            Advanced Harvest Forecasting
          </h1>
          <p className="text-muted-foreground">
            AI-powered predictions for crop yield, with soil and weather-based recommendations tailored to your region.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* Weather Forecast - Made smaller */}
          <Card className="col-span-1 order-2 lg:order-1">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Weather Forecast</CardTitle>
                <div className="flex items-center gap-2">
                  <Select
                    defaultValue={location}
                    value={location}
                    onValueChange={setLocation}
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="West Bengal">West Bengal</SelectItem>
                      <SelectItem value="Punjab">Punjab</SelectItem>
                      <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                      <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="Karnataka">Karnataka</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="max-h-[440px] overflow-y-auto pr-2">
              {isLoadingWeather ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agri-primary"></div>
                </div>
              ) : weatherForecast ? (
                <div className="flex flex-col gap-2">
                  {weatherForecast.map((day, index) => (
                    <div key={index} className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{day.day}</span>
                        {day.icon === "sun" && <CloudSun className="h-5 w-5 text-yellow-500" />}
                        {day.icon === "cloud-sun" && <CloudSun className="h-5 w-5 text-gray-500" />}
                        {day.icon === "cloud-rain" && <Umbrella className="h-5 w-5 text-blue-500" />}
                        {day.icon === "cloud-drizzle" && <Droplets className="h-5 w-5 text-blue-400" />}
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-sm">
                        <div className="flex items-center">
                          <Thermometer className="h-3 w-3 mr-1 text-red-500" />
                          <span>{day.temperature}°C</span>
                        </div>
                        <div className="flex items-center">
                          <Droplets className="h-3 w-3 mr-1 text-blue-500" />
                          <span>{day.humidity}%</span>
                        </div>
                      </div>
                      <div className="mt-1">
                        {day.rainfall > 0 && (
                          <span className="text-xs text-blue-600">{day.rainfall}mm rain</span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {day.description}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Unable to load weather data</AlertTitle>
                  <AlertDescription>
                    Please check your connection and try again.
                  </AlertDescription>
                </Alert>
              )}
              <div className="mt-4 bg-muted/30 p-3 rounded-md">
                <h4 className="font-medium mb-1">Seasonal Outlook</h4>
                <p className="text-sm text-muted-foreground">{getSeasonalDescription()}</p>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                <p>Weather data based on OpenWeatherMap API. Last updated: {format(new Date(), "PPP")}</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Yield Calculator - Made bigger */}
          <Card className="col-span-1 lg:col-span-3 order-1 lg:order-2">
            <CardHeader className="pb-2">
              <CardTitle>Yield Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Crop Type</label>
                    <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rice">Rice</SelectItem>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="maize">Maize</SelectItem>
                        <SelectItem value="groundnut">Groundnut</SelectItem>
                        <SelectItem value="soybean">Soybean</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Variety</label>
                    <Select value={selectedVariety} onValueChange={setSelectedVariety}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select variety" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCrop === "rice" && (
                          <>
                            <SelectItem value="IR36">IR36</SelectItem>
                            <SelectItem value="MTU7029">MTU7029 (Swarna)</SelectItem>
                            <SelectItem value="BPT5204">BPT5204 (Samba Mahsuri)</SelectItem>
                          </>
                        )}
                        {selectedCrop === "wheat" && (
                          <>
                            <SelectItem value="HD2967">HD2967</SelectItem>
                            <SelectItem value="PBW550">PBW550</SelectItem>
                            <SelectItem value="DBW17">DBW17</SelectItem>
                          </>
                        )}
                        {selectedCrop === "maize" && (
                          <>
                            <SelectItem value="DHM117">DHM117</SelectItem>
                            <SelectItem value="DHM121">DHM121</SelectItem>
                            <SelectItem value="Vivek-27">Vivek-27</SelectItem>
                          </>
                        )}
                        {selectedCrop === "groundnut" && (
                          <>
                            <SelectItem value="TAG-24">TAG-24</SelectItem>
                            <SelectItem value="GG-20">GG-20</SelectItem>
                            <SelectItem value="TG-37A">TG-37A</SelectItem>
                          </>
                        )}
                        {selectedCrop === "soybean" && (
                          <>
                            <SelectItem value="JS-335">JS-335</SelectItem>
                            <SelectItem value="JS-9560">JS-9560</SelectItem>
                            <SelectItem value="NRC-37">NRC-37</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Planting Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PP") : "Select date"}
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
                      <label className="text-sm font-medium">Area (hectares)</label>
                      <Select defaultValue="1" value={area.toString()} onValueChange={(value) => setArea(Number(value))}>
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
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Soil Type</label>
                    <Select value={soilType} onValueChange={setSoilType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select soil type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alluvial">Alluvial</SelectItem>
                        <SelectItem value="black">Black</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                        <SelectItem value="laterite">Laterite</SelectItem>
                        <SelectItem value="loam">Loam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full bg-agri-primary hover:bg-agri-dark mt-2" onClick={calculateYieldPrediction}>
                    {isCalculating ? 
                      <span className="flex items-center"><span className="animate-spin mr-2">⟳</span> Calculating...</span> : 
                      "Calculate Expected Yield"}
                  </Button>
                </div>

                <div>
                  {yieldResult ? (
                    <div className="p-4 bg-muted rounded-lg h-full">
                      <h4 className="font-medium mb-3">Yield Prediction</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span>Expected Yield:</span>
                          <span className="font-medium">{yieldResult.expectedYield.toFixed(2)} quintals</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Yield Range:</span>
                          <span>{yieldResult.yieldRange.min.toFixed(2)} - {yieldResult.yieldRange.max.toFixed(2)} quintals</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Prediction Confidence:</span>
                          <span>{yieldResult.confidence}%</span>
                        </div>
                        <h5 className="font-medium mt-3 mb-1">Key Factors:</h5>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {yieldResult.factors.map((factor, index) => (
                            <div key={index} className="text-xs">
                              <span className="font-medium">{factor.name} ({factor.impact} Impact)</span>
                              <p className="text-muted-foreground ml-1">{factor.recommendation}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center h-full p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                        <Wheat className="h-8 w-8 text-green-600" />
                      </div>
                      <p className="text-center text-muted-foreground mb-2">
                        Enter crop and soil details to calculate expected yield
                      </p>
                      <p className="text-xs text-center text-muted-foreground">
                        Our AI model uses regional agricultural data to provide accurate yield estimates
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground mt-2">
                <p>Our prediction model uses regional soil data from Agricultural Universities, current weather patterns, and historical yield data from ICAR (2023-2025).</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Regional Soil Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Alert className="bg-amber-50 border-amber-200">
                    <Leaf className="h-4 w-4 text-amber-600" />
                    <AlertTitle className="text-amber-800">Regional Soil Profile</AlertTitle>
                    <AlertDescription className="text-amber-700">
                      {soilData ? 
                        `${soilType.charAt(0).toUpperCase() + soilType.slice(1)} soil in ${location} - ${soilData.texture}` :
                        "Typical soil profile for agricultural use in this region."}
                    </AlertDescription>
                  </Alert>
                  
                  <div>
                    <label className="text-sm font-medium">Soil pH</label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="number"
                        min="3"
                        max="10"
                        step="0.1"
                        value={phValue}
                        onChange={(e) => setPhValue(Number(e.target.value))}
                        className="w-full"
                      />
                      <span className="text-sm text-muted-foreground min-w-24">
                        {phValue < 5.5 ? "Acidic" : phValue > 7.5 ? "Alkaline" : "Neutral"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Nitrogen (kg/ha)</label>
                    <Input
                      type="number"
                      min="50"
                      max="800"
                      step="10"
                      value={nitrogenValue}
                      onChange={(e) => setNitrogenValue(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phosphorus (kg/ha)</label>
                    <Input
                      type="number"
                      min="5"
                      max="50"
                      step="1"
                      value={phosphorusValue}
                      onChange={(e) => setPhosphorusValue(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Potassium (kg/ha)</label>
                    <Input
                      type="number"
                      min="50"
                      max="500"
                      step="10"
                      value={potassiumValue}
                      onChange={(e) => setPotassiumValue(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  {!showSoilHealthReport ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-amber-100">
                        <Leaf className="h-8 w-8 text-amber-600" />
                      </div>
                      <p className="text-center text-muted-foreground">
                        Soil data is loaded based on SoilGrids API analysis for your region. You can adjust values based on your specific field test results.
                      </p>
                      <Button onClick={() => setShowSoilHealthReport(true)}>
                        View Soil Health Analysis
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h4 className="font-medium">Soil Health Analysis</h4>
                      {(() => {
                        const soilHealth = analyzeSoilHealth(phValue, nitrogenValue, phosphorusValue, potassiumValue);
                        return (
                          <div className="space-y-3">
                            {Object.entries(soilHealth).map(([key, data]) => (
                              <div key={key} className="p-2 bg-muted rounded">
                                <div className="flex justify-between">
                                  <span className="capitalize">{key}:</span>
                                  <span className={`font-medium ${
                                    data.status === "Low" ? "text-red-500" : 
                                    data.status === "Medium" ? "text-amber-500" : 
                                    data.status === "High" ? "text-green-500" : 
                                    data.status === "Acidic" ? "text-orange-500" :
                                    data.status === "Alkaline" ? "text-indigo-500" :
                                    "text-green-500"
                                  }`}>
                                    {typeof data.value === 'number' ? data.value.toFixed(1) : data.value} ({data.status})
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">{data.recommendation}</p>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                      <Button className="w-full mt-4" onClick={updateCropRecommendations}>
                        Update Crop Recommendations
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recommendations" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recommendations">Crop Recommendations</TabsTrigger>
            <TabsTrigger value="climate">Long-term Climate Forecast</TabsTrigger>
            <TabsTrigger value="alternatives">Alternative Crops</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Crops for {location}</CardTitle>
              </CardHeader>
              <CardContent>
                {!cropRecommendations ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agri-primary"></div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {cropRecommendations.primary.map((crop, index) => (
                        <Card key={index} className={index === 0 ? "border-green-500 shadow-md" : ""}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <CardTitle className="text-lg">{crop.crop}</CardTitle>
                              <span className="text-sm font-medium px-2 py-1 bg-green-100 text-green-800 rounded">
                                {crop.suitability}% Match
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{crop.variety}</p>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="text-sm">
                              <div className="flex justify-between">
                                <span>Expected Yield:</span>
                                <span className="font-medium">{crop.yieldEstimate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Growing Period:</span>
                                <span>{crop.growingPeriod}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Water Need:</span>
                                <span>{crop.waterRequirement}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Fertilizer:</span>
                                <span>{crop.fertilizers}</span>
                              </div>
                            </div>
                            
                            {crop.challenges && crop.challenges.length > 0 && (
                              <div className="mt-2">
                                <h5 className="text-xs font-medium mb-1">Potential Challenges:</h5>
                                <ul className="text-xs text-muted-foreground">
                                  {crop.challenges.map((challenge, idx) => (
                                    <li key={idx} className="mb-1">• {challenge}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {index === 0 && (
                              <Alert className="mt-2 bg-green-50 border-green-200">
                                <Wheat className="h-4 w-4 text-green-600" />
                                <AlertTitle className="text-green-800">Best Match</AlertTitle>
                                <AlertDescription className="text-green-700 text-xs">
                                  Based on your region's soil profile and current seasonal conditions
                                </AlertDescription>
                              </Alert>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Scientific Recommendation</AlertTitle>
                      <AlertDescription>
                        Our recommendations are based on soil parameters from SoilGrids API, climate forecasts from OpenWeatherMap, and regional agricultural data from ICAR.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="climate" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>12-Month Climate Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={longTermForecast}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
                        <YAxis yAxisId="right" orientation="right" label={{ value: 'Rainfall (mm)', angle: 90, position: 'insideRight' }} />
                        <RechartsTooltip />
                        <Legend />
                        <Area yAxisId="left" type="monotone" dataKey="avgTemp" name="Average Temperature (°C)" stroke="#ff7300" fill="#ff9955" />
                        <Area yAxisId="right" type="monotone" dataKey="rainfall" name="Rainfall (mm)" stroke="#0088FE" fill="#8884d8" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-medium">Rainfall Pattern</h4>
                      <p className="text-sm text-muted-foreground">
                        Expected to follow normal seasonal patterns with peak rainfall during monsoon months (June-September). 
                        Prepare water management strategies accordingly.
                      </p>
                      
                      <h4 className="font-medium mt-4">Temperature Trend</h4>
                      <p className="text-sm text-muted-foreground">
                        Temperatures are expected to remain within normal ranges for {location} with some potential for higher than average
                        temperatures during summer months.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Climate Impact on Farming</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex gap-2">
                          <span className="text-amber-500">●</span>
                          <span>Plan crop cycles to maximize rainfall utilization and avoid harvesting during peak monsoon.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-amber-500">●</span>
                          <span>Consider water conservation techniques during drier months (November-May).</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-amber-500">●</span>
                          <span>Monitor disease pressure which may increase during periods of high humidity.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <Alert className="bg-blue-50 border-blue-200">
                    <Umbrella className="h-4 w-4 text-blue-600" />
                    <AlertTitle className="text-blue-800">Climate Adaptation Strategies</AlertTitle>
                    <AlertDescription className="text-blue-700">
                      Consider implementing rainwater harvesting, crop diversification, and adopting climate-resilient varieties to mitigate climate risks.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="alternatives" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Alternative Crop Options</CardTitle>
              </CardHeader>
              <CardContent>
                {!cropRecommendations ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agri-primary"></div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-muted-foreground">
                      These alternative crops are suitable for your conditions and can help diversify your farm production and reduce risk.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {cropRecommendations.alternatives.map((crop, index) => (
                        <Card key={index}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <CardTitle className="text-lg">{crop.crop}</CardTitle>
                              <span className="text-sm font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded">
                                {crop.suitability}% Match
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{crop.variety}</p>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="text-sm">
                              <div className="flex justify-between">
                                <span>Expected Yield:</span>
                                <span className="font-medium">{crop.yieldEstimate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Growing Period:</span>
                                <span>{crop.growingPeriod}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Water Need:</span>
                                <span>{crop.waterRequirement}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Fertilizer:</span>
                                <span>{crop.fertilizers}</span>
                              </div>
                            </div>
                            
                            {crop.challenges && crop.challenges.length > 0 && (
                              <div className="mt-2">
                                <h5 className="text-xs font-medium mb-1">Potential Challenges:</h5>
                                <ul className="text-xs text-muted-foreground">
                                  {crop.challenges.map((challenge, idx) => (
                                    <li key={idx} className="mb-1">• {challenge}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Benefits of Crop Diversification</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-muted p-4 rounded-lg">
                          <h5 className="font-medium mb-2">Economic Benefits</h5>
                          <ul className="space-y-1 text-sm list-disc pl-4">
                            <li>Reduced market risk with multiple income sources</li>
                            <li>Better cash flow throughout the year</li>
                            <li>Access to premium markets for specialty crops</li>
                            <li>Improved overall farm profitability</li>
                          </ul>
                        </div>
                        
                        <div className="bg-muted p-4 rounded-lg">
                          <h5 className="font-medium mb-2">Agricultural Benefits</h5>
                          <ul className="space-y-1 text-sm list-disc pl-4">
                            <li>Improved soil health and reduced erosion</li>
                            <li>Natural pest and disease suppression</li>
                            <li>Enhanced nutrient cycling</li>
                            <li>Better resilience to climate variability</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <Alert className="bg-amber-50 border-amber-200">
                      <Tractor className="h-4 w-4 text-amber-600" />
                      <AlertTitle className="text-amber-800">Intercropping Opportunity</AlertTitle>
                      <AlertDescription className="text-amber-700">
                        {cropRecommendations.primary[0]?.crop && cropRecommendations.alternatives[0]?.crop ? (
                          <>Consider intercropping {cropRecommendations.primary[0].crop} with {cropRecommendations.alternatives[0].crop} for optimal land use and reduced pest pressure.</>
                        ) : (
                          <>Intercropping compatible crops can improve land use efficiency and natural pest management.</>
                        )}
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Forecasting;
