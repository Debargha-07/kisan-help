
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { ChevronUp, ChevronDown, AlertCircle, IndianRupee } from "lucide-react";

// Mock data for price trends
const cropPriceData = {
  rice: {
    current: 2200,
    previous: 2100,
    change: 4.76,
    forecast: 2250,
    unit: "per quintal",
    trend: "up",
    regions: {
      "West Bengal": 2250,
      "Uttar Pradesh": 2180,
      Punjab: 2220,
      Maharashtra: 2150,
      Karnataka: 2190
    }
  },
  wheat: {
    current: 2100,
    previous: 2150,
    change: -2.33,
    forecast: 2050,
    unit: "per quintal",
    trend: "down",
    regions: {
      "West Bengal": 2050,
      "Uttar Pradesh": 2120,
      Punjab: 2180,
      Maharashtra: 2080,
      "Madhya Pradesh": 2100
    }
  },
  potato: {
    current: 1200,
    previous: 1100,
    change: 9.09,
    forecast: 1250,
    unit: "per quintal",
    trend: "up",
    regions: {
      "West Bengal": 1250,
      "Uttar Pradesh": 1180,
      Punjab: 1220,
      Bihar: 1150,
      Assam: 1190
    }
  },
  onion: {
    current: 1800,
    previous: 2000,
    change: -10.0,
    forecast: 1750,
    unit: "per quintal",
    trend: "down",
    regions: {
      "West Bengal": 1750,
      Maharashtra: 1900,
      Karnataka: 1820,
      Gujarat: 1780,
      "Madhya Pradesh": 1760
    }
  }
};

const Prices = () => {
  const [selectedCrop, setSelectedCrop] = useState("rice");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const cropData = cropPriceData[selectedCrop as keyof typeof cropPriceData];

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

          {Object.keys(cropPriceData).map((crop) => (
            <TabsContent key={crop} value={crop} className="mt-0">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agri-primary"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Current Price</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <IndianRupee className="mr-2 h-4 w-4 text-agri-primary" />
                        <span className="text-3xl font-bold text-agri-primary">
                          {cropPriceData[crop as keyof typeof cropPriceData].current}
                        </span>
                        <span className="ml-2 text-sm text-muted-foreground">
                          {cropPriceData[crop as keyof typeof cropPriceData].unit}
                        </span>
                      </div>
                      
                      <div className="flex items-center mt-2">
                        {cropPriceData[crop as keyof typeof cropPriceData].trend === "up" ? (
                          <ChevronUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-red-600" />
                        )}
                        <span 
                          className={`ml-1 ${
                            cropPriceData[crop as keyof typeof cropPriceData].trend === "up" 
                              ? "text-green-600" 
                              : "text-red-600"
                          }`}
                        >
                          {Math.abs(cropPriceData[crop as keyof typeof cropPriceData].change)}%
                        </span>
                        <span className="ml-1 text-sm text-muted-foreground">
                          from last week
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Price Forecast</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <IndianRupee className="mr-2 h-4 w-4 text-agri-primary" />
                        <span className="text-3xl font-bold text-agri-primary">
                          {cropPriceData[crop as keyof typeof cropPriceData].forecast}
                        </span>
                        <span className="ml-2 text-sm text-muted-foreground">
                          {cropPriceData[crop as keyof typeof cropPriceData].unit}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Expected price in next 7 days
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-1">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Market Advisory</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        {cropPriceData[crop as keyof typeof cropPriceData].trend === "up"
                          ? "Prices are rising. Consider holding your produce for 1-2 weeks if storage is available."
                          : "Prices are declining. Consider selling soon if you have harvested crops ready for market."}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              <h3 className="font-medium text-lg mt-6 mb-3">Regional Price Comparison</h3>
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-agri-light">
                          <th className="text-left p-3 border-b">State</th>
                          <th className="text-right p-3 border-b">Price (₹)</th>
                          <th className="text-right p-3 border-b">Difference</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(cropPriceData[crop as keyof typeof cropPriceData].regions).map(([region, price]) => {
                          const difference = price - cropPriceData[crop as keyof typeof cropPriceData].current;
                          return (
                            <tr key={region} className="border-b last:border-0 hover:bg-muted/50">
                              <td className="p-3 text-left">{region}</td>
                              <td className="p-3 text-right">₹{price}</td>
                              <td className="p-3 text-right">
                                <span className={difference > 0 ? "text-green-600" : difference < 0 ? "text-red-600" : ""}>
                                  {difference > 0 ? "+" : ""}{difference}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 p-4 bg-agri-light rounded-lg">
                <h3 className="font-medium mb-2">Farmer Tips</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Compare prices across different mandis before selling</li>
                  <li>Check weather forecasts as they can affect market prices</li>
                  <li>Consider bulk selling through Farmer Producer Organizations (FPOs)</li>
                  <li>Explore government procurement schemes for minimum support price</li>
                </ul>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Prices;
