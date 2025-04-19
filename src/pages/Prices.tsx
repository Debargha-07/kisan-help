
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

type CropPriceData = {
  current_price: number;
  previous_price: number;
  forecast_price: number;
  unit: string;
  region: string;
};

const Prices = () => {
  const [selectedCrop, setSelectedCrop] = useState("rice");

  const { data: cropPrices, isLoading, error } = useQuery({
    queryKey: ['cropPrices', selectedCrop],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('crop_prices')
          .select('*')
          .eq('crop_name', selectedCrop);

        if (error) throw error;
        
        // If no data is returned, update prices and try again
        if (!data || data.length === 0) {
          await supabase.functions.invoke('update-crop-prices');
          
          // Try fetching again after update
          const retryResponse = await supabase
            .from('crop_prices')
            .select('*')
            .eq('crop_name', selectedCrop);
            
          if (retryResponse.error) throw retryResponse.error;
          return retryResponse.data || [];
        }
        
        return data;
      } catch (error: any) {
        toast({
          title: "ফসলের দাম লোড করতে ত্রুটি",
          description: error.message,
          variant: "destructive"
        });
        return [];
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Calculate average prices and trends
  const calculateAverages = () => {
    if (!cropPrices || cropPrices.length === 0) {
      return {
        currentPrice: 0,
        previousPrice: 0,
        forecastPrice: 0,
        priceChange: 0,
        trend: 'up' as 'up' | 'down'
      };
    }

    const currentPrice = Number((cropPrices.reduce((sum, price) => 
      sum + Number(price.current_price), 0) / cropPrices.length).toFixed(2));
    
    const previousPrice = Number((cropPrices.reduce((sum, price) => 
      sum + Number(price.previous_price), 0) / cropPrices.length).toFixed(2));
    
    const forecastPrice = Number((cropPrices.reduce((sum, price) => 
      sum + Number(price.forecast_price), 0) / cropPrices.length).toFixed(2));

    const priceChange = previousPrice ? 
      Number((((currentPrice - previousPrice) / previousPrice) * 100).toFixed(2)) : 0;
    
    const trend = priceChange >= 0 ? 'up' : 'down';

    return { currentPrice, previousPrice, forecastPrice, priceChange, trend };
  };

  // Transform data for regional comparison
  const getRegionData = () => {
    if (!cropPrices || cropPrices.length === 0) {
      return {};
    }
    
    return Object.fromEntries(
      cropPrices.map(price => [price.region, Number(price.current_price)])
    );
  };

  const { currentPrice, previousPrice, forecastPrice, priceChange, trend } = calculateAverages();
  const regions = getRegionData();

  useEffect(() => {
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

  return (
    <Layout>
      <div className="py-6 space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-agri-primary">
            ফসলের দাম প্রবণতা
          </h1>
          <p className="text-muted-foreground">
            পশ্চিমবঙ্গ জুড়ে প্রধান ফসলের বর্তমান বাজার দাম এবং পূর্বাভাস
          </p>
        </div>

        <Alert className="bg-agri-light border-agri-primary">
          <AlertCircle className="h-4 w-4 text-agri-primary" />
          <AlertTitle>মূল্য তথ্য</AlertTitle>
          <AlertDescription>
            পশ্চিমবঙ্গের প্রধান কৃষি বাজার (মন্ডি) থেকে প্রতিদিন দাম আপডেট করা হয়। আপনার উৎপাদন কখন বিক্রি করবেন সে সম্পর্কে সুচিন্তিত সিদ্ধান্ত নিতে এই তথ্য ব্যবহার করুন।
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="rice" onValueChange={setSelectedCrop} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
            <TabsTrigger value="rice">চাল</TabsTrigger>
            <TabsTrigger value="wheat">গম</TabsTrigger>
            <TabsTrigger value="potato">আলু</TabsTrigger>
            <TabsTrigger value="onion">পেঁয়াজ</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCrop} className="mt-0">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agri-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <PriceCard
                  title="বর্তমান দাম"
                  price={currentPrice}
                  unit="প্রতি কুইন্টাল"
                  change={priceChange}
                  trend={trend}
                />
                <PriceCard
                  title="দাম পূর্বাভাস"
                  price={forecastPrice}
                  unit="প্রতি কুইন্টাল"
                  subtitle="আগামী ৭ দিনে সম্ভাব্য দাম"
                />
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">বাজার পরামর্শ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      {trend === "up"
                        ? "দাম বাড়ছে। সংরক্ষণ উপলব্ধ থাকলে ১-২ সপ্তাহের জন্য আপনার উৎপাদন ধরে রাখার কথা বিবেচনা করুন।"
                        : "দাম কমছে। আপনার যদি বাজারের জন্য প্রস্তুত ফসল থাকে তবে শীঘ্রই বিক্রি করার কথা বিবেচনা করুন।"}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {cropPrices && cropPrices.length > 0 && (
              <>
                <h3 className="font-medium text-lg mt-6 mb-3">আঞ্চলিক দাম তুলনা</h3>
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
