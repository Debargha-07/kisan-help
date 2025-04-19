
import { ChevronUp, ChevronDown, IndianRupee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PriceCardProps {
  title: string;
  price: number;
  unit: string;
  change?: number;
  trend?: 'up' | 'down';
  subtitle?: string;
}

export const PriceCard = ({ 
  title, 
  price, 
  unit, 
  change, 
  trend, 
  subtitle 
}: PriceCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <IndianRupee className="mr-2 h-4 w-4 text-agri-primary" />
          <span className="text-3xl font-bold text-agri-primary">
            {price}
          </span>
          <span className="ml-2 text-sm text-muted-foreground">
            {unit}
          </span>
        </div>
        
        {change && trend && (
          <div className="flex items-center mt-2">
            {trend === "up" ? (
              <ChevronUp className="h-4 w-4 text-green-600" />
            ) : (
              <ChevronDown className="h-4 w-4 text-red-600" />
            )}
            <span 
              className={`ml-1 ${
                trend === "up" 
                  ? "text-green-600" 
                  : "text-red-600"
              }`}
            >
              {Math.abs(change)}%
            </span>
            <span className="ml-1 text-sm text-muted-foreground">
              from last week
            </span>
          </div>
        )}
        
        {subtitle && (
          <p className="mt-2 text-sm text-muted-foreground">
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
