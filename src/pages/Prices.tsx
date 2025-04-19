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

type CropPriceData = {
  current_price: number;
  previous_price: number;
  forecast_price: number;
  unit: string;
  region: string;
};

const Prices = () => {
  const [selectedCrop, setSelectedCrop] = useState("rice");

  const { data: cropPrices, isLoading } = useQuery({
    queryKey: ['cropPrices', selectedCrop],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('crop_prices')
        .select('*')
        .eq('crop_name', selectedCrop);

      if (error) throw error;
      return data as CropPriceData[];
    }
  });

  // Calculate average prices and trends
  const currentPrice = cropPrices ? 
    Number((cropPrices.reduce((sum, price) => sum + Number(price.current_price), 0) / cropPrices.length).toFixed(2)) : 
    0;
  
  const previousPrice = cropPrices ? 
    Number((cropPrices.reduce((sum, price) => sum + Number(price.previous_price), 0) / cropPrices.length).toFixed(2)) : 
    0;
  
  const forecastPrice = cropPrices ? 
    Number((cropPrices.reduce((sum, price) => sum + Number(price.forecast_price), 0) / cropPrices.length).toFixed(2)) : 
    0;

  const priceChange = previousPrice ? ((currentPrice - previousPrice) / previousPrice) * 100 : 0;
  const trend = priceChange >= 0 ? 'up' : 'down';

  // Transform data for regional comparison
  const regions = cropPrices ? 
    Object.fromEntries(
      cropPrices.map(price => [price.region, Number(price.current_price)])
    ) : {};

  useEffect(() => {
    // Update prices every 5 minutes
    const interval = setInterval(async () => {
      await supabase.functions.invoke('update-crop-prices');
    }, 300000);

    return () => clearInterval(interval);
  }, []);

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
            Prices are updated daily from major agricultural markets (mandis) across India. Use this information to make informed decisions about when to sell your produce.
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
                  subtitle="Expected price in next 7 days"
                />
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Market Advisory</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      {trend === "up"
                        ? "Prices are rising. Consider holding your produce for 1-2 weeks if storage is available."
                        : "Prices are declining. Consider selling soon if you have harvested crops ready for market."}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {cropPrices && cropPrices.length > 0 && (
              <>
                <h3 className="font-medium text-lg mt-6 mb-3">Regional Price Comparison</h3>
                <RegionalPrices 
                  regions={regions}
                  currentPrice={currentPrice}
                />
              </>
            )}

            <FarmerTips />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Prices;
