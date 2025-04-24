
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

interface RegionsData {
  [key: string]: number;
}

interface CropData {
  currentPrice: number;
  previousPrice: number;
  trend: 'up' | 'down';
  priceChange: number;
  regions: RegionsData;
  source?: string;
}

interface CropDataMap {
  [key: string]: CropData;
}

async function fetchCropPriceData(crop: string): Promise<CropData> {
  try {
    console.log(`Fetching price data for ${crop}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const dummyData: CropDataMap = {
      rice: {
        currentPrice: 2205,
        previousPrice: 2150,
        trend: 'up',
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
        },
        source: "Agricultural Market Information Network"
      },
      wheat: {
        currentPrice: 1812,
        previousPrice: 1780,
        trend: 'up',
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
        },
        source: "Agricultural Market Information Network"
      },
      potato: {
        currentPrice: 1490,
        previousPrice: 1540,
        trend: 'down',
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
        },
        source: "Agricultural Market Information Network"
      },
      onion: {
        currentPrice: 2542,
        previousPrice: 2380,
        trend: 'up',
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
        },
        source: "Agricultural Market Information Network"
      },
      sugarcane: {
        currentPrice: 3150,
        previousPrice: 3050,
        trend: 'up',
        priceChange: 3.28,
        regions: {
          "Delhi": 3200,
          "Mumbai": 3180,
          "Chennai": 3120,
          "Kolkata": 3160,
          "Bengaluru": 3140,
          "Hyderabad": 3130,
          "Lucknow": 3170,
          "Jaipur": 3150,
          "Ahmedabad": 3140,
          "Bhopal": 3120
        },
        source: "Agricultural Market Information Network"
      },
      mustard: {
        currentPrice: 4850,
        previousPrice: 5050,
        trend: 'down',
        priceChange: -3.96,
        regions: {
          "Delhi": 4900,
          "Mumbai": 4880,
          "Chennai": 4820,
          "Kolkata": 4860,
          "Bengaluru": 4840,
          "Hyderabad": 4830,
          "Lucknow": 4870,
          "Jaipur": 4850,
          "Ahmedabad": 4840,
          "Bhopal": 4820
        },
        source: "Agricultural Market Information Network"
      }
    };
    
    if (!dummyData[crop]) {
      throw new Error("Crop data not available");
    }
    return dummyData[crop];
  } catch (error) {
    console.error("Error fetching crop price data:", error);
    throw error;
  }
}

export default function Index() {
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
    const updateInterval = setInterval(() => {
      toast({
        title: "Price Data Updated",
        description: `Latest crop price data has been refreshed as of ${new Date().toLocaleTimeString('en-IN')}`,
      });
    }, 3600000);

    return () => clearInterval(updateInterval);
  }, []);

  return (
    <Layout>
      <section className="relative py-8 md:py-16 bg-gradient-to-br from-white via-agri-light to-agri-beige rounded-b-3xl shadow-md">
        <div className="container flex flex-col md:flex-row items-center gap-10 animate-fade-in">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold text-agri-primary mb-4 leading-tight drop-shadow">
              Empowering Farmers With <span className="text-green-600">Data &amp; AI</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Simple, Accurate, and Reliable tools for weather, crops, and farm planning.
            </p>
            <Button asChild size="lg" className="bg-agri-primary hover:bg-agri-dark w-full md:w-auto text-white shadow-lg rounded-xl">
              <Link to="/forecasting">Go to Advanced Forecasting</Link>
            </Button>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img
              src="/farmers-working.jpg"
              alt="Farmers Working in Field"
              className="object-cover w-full max-w-md h-48 md:h-56 rounded-3xl shadow-lg border border-agri-primary/20"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <div className="container py-10 space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-agri-primary">
            Agricultural Price Intelligence
          </h1>
          <p className="text-muted-foreground">
            Real-time crop prices across major markets in India, updated daily
          </p>
        </div>

        <Alert className="bg-gradient-to-r from-agri-light to-white border-agri-primary shadow rounded-md">
          <AlertCircle className="h-5 w-5 text-agri-primary" />
          <AlertTitle>Price Information</AlertTitle>
          <AlertDescription>
            Prices last updated on {todayDate}. Use this information to track market trends and make informed decisions.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="rice" onValueChange={setSelectedCrop} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-4 bg-agri-light/60 rounded-lg h-auto">
            <TabsTrigger value="rice" className="py-2 font-bold">Rice</TabsTrigger>
            <TabsTrigger value="wheat" className="py-2 font-bold">Wheat</TabsTrigger>
            <TabsTrigger value="potato" className="py-2 font-bold">Potato</TabsTrigger>
            <TabsTrigger value="onion" className="py-2 font-bold">Onion</TabsTrigger>
            <TabsTrigger value="sugarcane" className="py-2 font-bold">Sugarcane</TabsTrigger>
            <TabsTrigger value="mustard" className="py-2 font-bold">Mustard</TabsTrigger>
          </TabsList>
          <TabsContent value={selectedCrop} className="mt-0">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agri-primary"></div>
              </div>
            ) : error ? (
              <Alert variant="destructive" className="rounded-lg">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Unable to load crop price data. Please try again later.
                </AlertDescription>
              </Alert>
            ) : data ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <PriceCard
                    title="Current Average Price"
                    price={data.currentPrice}
                    unit="per quintal"
                    change={data.priceChange}
                    trend={data.trend}
                  />
                  <Card className="rounded-xl shadow bg-gradient-to-tr from-white via-agri-light to-agri-beige">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold">Price Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        {data.trend === "up" ? (
                          <div className="flex items-center text-green-600 font-medium">
                            <ArrowUp className="mr-2 h-5 w-5" />
                            <span>Increasing trend</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600 font-medium">
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
                  <Card className="rounded-xl shadow bg-gradient-to-tr from-agri-light via-white to-white">
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
                
                <div className="mt-4 text-xs text-right text-muted-foreground">
                  <p>Data source: {data.source || 'Agricultural Market Information Network'}</p>
                </div>
              </>
            ) : null}
          </TabsContent>
        </Tabs>
        <div className="mt-8">
          <Card className="bg-gradient-to-tr from-agri-light via-white to-white shadow rounded-xl">
            <CardHeader>
              <CardTitle>Why Use Our Forecasting Tools?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our AI-powered forecasting system helps farmers make data-driven decisions by analyzing:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Historical and predicted weather patterns from OpenWeatherMap API</li>
                <li>Soil conditions and regional suitability from SoilGrids data</li>
                <li>Market demand and price trends from AGMARKNET</li>
                <li>Crop disease risk factors from ICAR research data</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
