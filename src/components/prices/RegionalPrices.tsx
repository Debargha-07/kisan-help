
import { Card, CardContent } from "@/components/ui/card";

interface RegionalPricesProps {
  regions: Record<string, number>;
  currentPrice: number;
}

export const RegionalPrices = ({ regions, currentPrice }: RegionalPricesProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-agri-light">
                <th className="text-left p-3 border-b">Region</th>
                <th className="text-right p-3 border-b">Price (₹)</th>
                <th className="text-right p-3 border-b">Difference</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(regions).map(([region, price]) => {
                const difference = price - currentPrice;
                return (
                  <tr key={region} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="p-3 text-left">{region}</td>
                    <td className="p-3 text-right">₹{price.toFixed(2)}</td>
                    <td className="p-3 text-right">
                      <span className={difference > 0 ? "text-green-600" : difference < 0 ? "text-red-600" : ""}>
                        {difference > 0 ? "+" : ""}{difference.toFixed(2)}
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
  );
};
