
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

interface PriceCardProps {
  title: string;
  price: number;
  unit: string;
  change: number;
  trend: 'up' | 'down';
}

export const PriceCard: React.FC<PriceCardProps> = ({ title, price, unit, change, trend }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">₹{price.toLocaleString()}</span>
            <span className="ml-1 text-muted-foreground text-sm">{unit}</span>
          </div>
          <div className="flex items-center mt-2">
            {trend === "up" ? (
              <div className="flex items-center text-green-600">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>+{change}%</span>
              </div>
            ) : (
              <div className="flex items-center text-red-600">
                <ArrowDown className="h-4 w-4 mr-1" />
                <span>{change}%</span>
              </div>
            )}
            <span className="ml-2 text-xs text-muted-foreground">
              from previous week
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
