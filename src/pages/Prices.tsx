
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";
import { PriceCard } from "@/components/prices/PriceCard";
import { RegionalPrices } from "@/components/prices/RegionalPrices";
import { FarmerTips } from "@/components/prices/FarmerTips";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { fetchCropPriceData } from "@/api/priceApi";

type CropPriceData = {
  current_price: number;
  previous_price: number;
  forecast_price: number;
  unit: string;
  region: string;
};

// Fallback data in case the database call fails
const FALLBACK_PRICES = {
  rice: {
    regions: {
      "West Bengal": 2210,
      "Punjab": 2280,
      "Tamil Nadu": 2190,
      "Bihar": 2150,
      "Uttar Pradesh": 2230,
      "Andhra Pradesh": 2200,
      "Karnataka": 2170,
      "Rajasthan": 2160,
      "Gujarat": 2190,
      "Madhya Pradesh": 2180
    },
    current: 2205,
    previous: 2150,
    forecast: 2280
  },
  wheat: {
    regions: {
      "West Bengal": 1810,
      "Punjab": 1840,
      "Tamil Nadu": 1790,
      "Bihar": 1800,
      "Uttar Pradesh": 1820,
      "Andhra Pradesh": 1800,
      "Karnataka": 1830,
      "Rajasthan": 1810,
      "Gujarat": 1820,
      "Madhya Pradesh": 1800
    },
    current: 1812,
    previous: 1780,
    forecast: 1870
  },
  potato: {
    regions: {
      "West Bengal": 1500,
      "Punjab": 1540,
      "Tamil Nadu": 1470,
      "Bihar": 1460,
      "Uttar Pradesh": 1510,
      "Andhra Pradesh": 1480,
      "Karnataka": 1460,
      "Rajasthan": 1450,
      "Gujarat": 1490,
      "Madhya Pradesh": 1480
    },
    current: 1504,
    previous: 1460,
    forecast: 1560
  },
  onion: {
    regions: {
      "West Bengal": 2550,
      "Punjab": 2600,
      "Tamil Nadu": 2510,
      "Bihar": 2520,
      "Uttar Pradesh": 2570,
      "Andhra Pradesh": 2530,
      "Karnataka": 2520,
      "Rajasthan": 2500,
      "Gujarat": 2560,
      "Madhya Pradesh": 2530
    },
    current: 2542,
    previous: 2380,
    forecast: 2620
  }
};

const Prices = () => {
  const [selectedCrop, setSelectedCrop] = useState("rice");

  // Call update-crop-prices edge function when component mounts
  useEffect(() => {
    const updatePrices = async () => {
      try {
        await supabase.functions.invoke('update-crop-prices');
        console.log("Price update triggered");
      } catch (error) {
        console.error("Error triggering price update:", error);
      }
    };
    
    updatePrices();
    
    // Update prices every 5 minutes
    const interval = setInterval(async () => {
      try {
        await supabase.functions.invoke('update-crop-prices');
      } catch (error) {
        console.error("Error updating crop prices:", error);
      }
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const { data: cropPriceData, isLoading, error } = useQuery({
    queryKey: ['cropPrices', selectedCrop],
    queryFn: async () => {
      try {
        return await fetchCropPriceData(selectedCrop);
      } catch (error: any) {
        console.error("Error loading crop prices:", error.message);
        toast({
          title: "Error loading prices",
          description: "Using fallback price data instead.",
          variant: "destructive"
        });
        throw error;
      }
    },
    retry: 2,
    refetchOnWindowFocus: false,
  });

  // Calculate average prices and trends
  const calculateAverages = () => {
    // If no data from API, use fallback data
    if (!cropPriceData) {
      console.log("Using fallback price data for", selectedCrop);
      const fallbackData = FALLBACK_PRICES[selectedCrop as keyof typeof FALLBACK_PRICES];
      
      return {
        currentPrice: fallbackData.current,
        previousPrice: fallbackData.previous,
        forecastPrice: fallbackData.forecast,
        priceChange: ((fallbackData.current - fallbackData.previous) / fallbackData.previous) * 100,
        trend: fallbackData.current >= fallbackData.previous ? 'up' as const : 'down' as const
      };
    }

    return {
      currentPrice: cropPriceData.currentPrice,
      previousPrice: cropPriceData.previousPrice,
      forecastPrice: cropPriceData.currentPrice * 1.03, // Simple forecast estimate
      priceChange: cropPriceData.priceChange,
      trend: cropPriceData.trend as 'up' | 'down'
    };
  };

  // Transform data for regional comparison
  const getRegionData = () => {
    if (!cropPriceData || !cropPriceData.regions) {
      console.log("Using fallback region data for", selectedCrop);
      // Use fallback data if no API data
      return FALLBACK_PRICES[selectedCrop as keyof typeof FALLBACK_PRICES].regions;
    }
    
    return cropPriceData.regions;
  };

  const { currentPrice, previousPrice, forecastPrice, priceChange, trend } = calculateAverages();
  const regions = getRegionData();

  return (
    <Layout>
      <div className="py-6 space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-agri-primary">
            Crop Price Trends
          </h1>
          <p className="text-muted-foreground">
            Current market prices and forecasts for major crops across India
          </p>
        </div>

        <Alert className="bg-agri-light border-agri-primary">
          <AlertCircle className="h-4 w-4 text-agri-primary" />
          <AlertTitle>Price Information</AlertTitle>
          <AlertDescription>
            Prices are updated daily from major agricultural markets across different states of India. Use this information to make informed decisions about when to sell your produce.
          </AlertDescription>
        </Alert>

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
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <PriceCard
                  title="Current Price"
                  price={currentPrice}
                  unit="per quintal"
                  change={priceChange}
                  trend={trend}
                />
                <PriceCard
                  title="Price Forecast"
                  price={forecastPrice}
                  unit="per quintal"
                  change={0}
                  trend="up"
                />
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Market Advisory</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      {trend === "up"
                        ? "Prices are rising. If storage is available, consider holding your produce for 1-2 weeks."
                        : "Prices are falling. If you have market-ready produce, consider selling soon."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            <h3 className="font-medium text-lg mt-6 mb-3">State-wise Price Comparison</h3>
            <RegionalPrices 
              regions={regions}
              currentPrice={currentPrice}
            />

            <FarmerTips />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Prices;
