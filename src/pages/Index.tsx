
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { PriceCard } from "@/components/prices/PriceCard";
import { RegionalPrices } from "@/components/prices/RegionalPrices";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowDown, ArrowUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

// We'll create a utility to fetch crop price data
async function fetchCropPriceData(crop: string) {
  try {
    // In a real app, this would call a weather API
    // For now, we'll simulate the API response
    console.log(`Fetching price data for ${crop}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Dummy data structure that would come from an API
    const dummyData = {
      rice: {
        currentPrice: 2205,
        previousPrice: 2150,
        trend: 'up' as const,
        priceChange: 2.56,
        regions: {
          "Delhi": 2250,
          "Mumbai": 2280,
          "Chennai": 2190,
          "Kolkata": 2210,
          "Bengaluru": 2230,
          "Hyderabad": 2200,
          "Lucknow": 2170,
          "Jaipur": 2160,
          "Ahmedabad": 2190,
          "Bhopal": 2180
        }
      },
      wheat: {
        currentPrice: 1812,
        previousPrice: 1780,
        trend: 'up' as const,
        priceChange: 1.8,
        regions: {
          "Delhi": 1850,
          "Mumbai": 1840,
          "Chennai": 1790,
          "Kolkata": 1810,
          "Bengaluru": 1820,
          "Hyderabad": 1800,
          "Lucknow": 1830,
          "Jaipur": 1810,
          "Ahmedabad": 1820,
          "Bhopal": 1800
        }
      },
      potato: {
        currentPrice: 1490,
        previousPrice: 1540,
        trend: 'down' as const,
        priceChange: -3.25,
        regions: {
          "Delhi": 1520,
          "Mumbai": 1540,
          "Chennai": 1470,
          "Kolkata": 1500,
          "Bengaluru": 1510,
          "Hyderabad": 1480,
          "Lucknow": 1460,
          "Jaipur": 1450,
          "Ahmedabad": 1490,
          "Bhopal": 1480
        }
      },
      onion: {
        currentPrice: 2542,
        previousPrice: 2380,
        trend: 'up' as const,
        priceChange: 6.81,
        regions: {
          "Delhi": 2580,
          "Mumbai": 2600,
          "Chennai": 2510,
          "Kolkata": 2550,
          "Bengaluru": 2570,
          "Hyderabad": 2530,
          "Lucknow": 2520,
          "Jaipur": 2500,
          "Ahmedabad": 2560,
          "Bhopal": 2530
        }
      }
    };
    
    if (!dummyData[crop as keyof typeof dummyData]) {
      throw new Error("Crop data not available");
    }
    
    return dummyData[crop as keyof typeof dummyData];
  } catch (error) {
    console.error("Error fetching crop price data:", error);
    throw error;
  }
}

const Index = () => {
  const [selectedCrop, setSelectedCrop] = useState("rice");
  const todayDate = new Date().toLocaleDateString('en-IN', { 
    day: 'numeric', month: 'long', year: 'numeric' 
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['cropPrices', selectedCrop],
    queryFn: () => fetchCropPriceData(selectedCrop),
    staleTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    // Simulate daily data update
    const updateInterval = setInterval(() => {
      toast({
        title: "Price Data Updated",
        description: `Latest crop price data has been refreshed as of ${new Date().toLocaleTimeString('en-IN')}`,
      });
    }, 3600000); // Update every hour

    return () => clearInterval(updateInterval);
  }, []);

  return (
    <Layout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-agri-primary">
            Agricultural Price Intelligence
          </h1>
          <p className="text-muted-foreground">
            Real-time crop prices across major markets in India, updated daily
          </p>
        </div>

        <Alert className="bg-agri-light border-agri-primary">
          <AlertCircle className="h-4 w-4 text-agri-primary" />
          <AlertTitle>Price Information</AlertTitle>
          <AlertDescription>
            Prices last updated on {todayDate}. Use this information to track market trends and make informed decisions.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div className="w-full md:w-auto">
            <Button asChild size="lg" className="bg-agri-primary hover:bg-agri-dark w-full md:w-auto">
              <Link to="/forecasting">Go to Advanced Forecasting</Link>
            </Button>
          </div>
          <Card className="w-full md:w-auto">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Our forecasting system uses advanced AI to predict crop yields and prices based on climate data, soil conditions, and historical trends.
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="rice" onValueChange={setSelectedCrop} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
            <TabsTrigger value="rice">Rice</TabsTrigger>
            <TabsTrigger value="wheat">Wheat</TabsTrigger>
            <TabsTrigger value="potato">Potato</TabsTrigger>
            <TabsTrigger value="onion">Onion</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCrop} className="mt-0">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agri-primary"></div>
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Unable to load crop price data. Please try again later.
                </AlertDescription>
              </Alert>
            ) : data ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <PriceCard
                    title="Current Average Price"
                    price={data.currentPrice}
                    unit="per quintal"
                    change={data.priceChange}
                    trend={data.trend}
                  />
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Price Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        {data.trend === "up" ? (
                          <div className="flex items-center text-green-600">
                            <ArrowUp className="mr-2 h-5 w-5" />
                            <span>Increasing trend</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600">
                            <ArrowDown className="mr-2 h-5 w-5" />
                            <span>Decreasing trend</span>
                          </div>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {data.trend === "up"
                          ? "Prices have been rising over the past week. Consider holding if storage is available."
                          : "Prices have been declining. Consider selling if you have market-ready produce."}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Market Advisory</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        {data.trend === "up" && data.priceChange > 5
                          ? "Significant price increase detected. Markets are showing strong demand."
                          : data.trend === "up"
                          ? "Moderate upward trend. Demand is stable across major markets."
                          : data.priceChange < -5
                          ? "Sharp price decline. Consider alternative markets or storage if possible."
                          : "Mild downward trend. Normal seasonal fluctuation."}
                      </p>
                      <Button 
                        className="mt-4 w-full"
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "Price Alert Set",
                            description: "You'll receive notifications when prices reach your target level.",
                          });
                        }}
                      >
                        Set Price Alert
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="font-medium text-lg mt-6 mb-3">Regional Price Comparison</h3>
                <RegionalPrices 
                  regions={data.regions}
                  currentPrice={data.currentPrice}
                />
              </>
            ) : null}
          </TabsContent>
        </Tabs>
        
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Why Use Our Forecasting Tools?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our AI-powered forecasting system helps farmers make data-driven decisions by analyzing:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Historical and predicted weather patterns</li>
                <li>Soil conditions and regional suitability for different crops</li>
                <li>Market demand and price trends</li>
                <li>Crop disease risk factors</li>
              </ul>
              <Button asChild className="mt-4 bg-agri-primary hover:bg-agri-dark">
                <Link to="/forecasting">Explore Advanced Forecasting</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
