
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp } from 'lucide-react';

interface RegionalPricesProps {
  regions: { [key: string]: number };
  currentPrice: number;
}

export const RegionalPrices: React.FC<RegionalPricesProps> = ({ regions, currentPrice }) => {
  // Ensure regions exist and is an object
  const hasRegions = regions && typeof regions === 'object' && Object.keys(regions).length > 0;
  
  if (!hasRegions) {
    return <div className="text-center py-4 text-muted-foreground">No regional price data available</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
      <Table>
        <TableHeader className="bg-agri-light/50">
          <TableRow>
            <TableHead className="font-medium">Region</TableHead>
            <TableHead className="font-medium text-right">Price (₹)</TableHead>
            <TableHead className="font-medium text-right">Difference</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(regions).map(([region, price]) => {
            const difference = price - currentPrice;
            const percentDiff = ((difference / currentPrice) * 100).toFixed(1);
            
            return (
              <TableRow key={region} className="hover:bg-agri-light/20">
                <TableCell className="font-medium">{region}</TableCell>
                <TableCell className="text-right">₹{price.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    {difference > 0 ? (
                      <>
                        <span className="text-green-600 flex items-center">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          {`+${percentDiff}%`}
                        </span>
                      </>
                    ) : difference < 0 ? (
                      <>
                        <span className="text-red-600 flex items-center">
                          <ArrowDown className="h-3 w-3 mr-1" />
                          {`${percentDiff}%`}
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-500">0%</span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

