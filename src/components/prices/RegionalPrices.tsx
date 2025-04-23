
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface RegionalPricesProps {
  regions: Record<string, number>;
  currentPrice: number;
}

export const RegionalPrices: React.FC<RegionalPricesProps> = ({ regions, currentPrice }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {Object.entries(regions).map(([region, price]) => {
        const diff = ((price - currentPrice) / currentPrice) * 100;
        
        return (
          <Card key={region} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex flex-col">
                <span className="font-medium text-sm mb-1">{region}</span>
                <span className="text-lg font-semibold">₹{price}</span>
                <div className={`text-xs mt-1 flex items-center ${diff > 0 ? 'text-green-600' : diff < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                  {diff > 0 ? (
                    <span>+{diff.toFixed(1)}% above avg</span>
                  ) : diff < 0 ? (
                    <span>{diff.toFixed(1)}% below avg</span>
                  ) : (
                    <span>Average price</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
