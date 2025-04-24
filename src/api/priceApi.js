
// Crop price API using Supabase + fallback AGMARKNET scraping with backend job (not implemented here)
import { supabase } from "@/integrations/supabase/client";

export async function fetchCropPriceData(crop) {
    try {
        console.log(`Fetching price data for ${crop}`);
        
        // Try to fetch from Supabase
        const { data, error } = await supabase
            .from("crop_prices")
            .select("*")
            .eq("crop_name", crop);
            
        if (error || !data || data.length === 0) {
            console.log("Falling back to mock data");
            return getMockPriceData(crop);
        }
        
        // Transform Supabase data to the expected format
        const regions = {};
        let sumCurrentPrice = 0;
        let sumPreviousPrice = 0;
        
        data.forEach(item => {
            regions[item.region] = parseFloat(item.current_price);
            sumCurrentPrice += parseFloat(item.current_price);
            sumPreviousPrice += parseFloat(item.previous_price);
        });
        
        const currentPrice = parseFloat((sumCurrentPrice / data.length).toFixed(2));
        const previousPrice = parseFloat((sumPreviousPrice / data.length).toFixed(2));
        const priceChange = parseFloat((((currentPrice - previousPrice) / previousPrice) * 100).toFixed(2));
        
        return {
            currentPrice,
            previousPrice,
            trend: currentPrice >= previousPrice ? 'up' : 'down',
            priceChange,
            regions,
            source: "AGMARKNET/Supabase"
        };
    } catch (error) {
        console.error("Error fetching crop price data:", error);
        return getMockPriceData(crop);
    }
}

// Fallback function to get mock price data
function getMockPriceData(crop) {
    const mockData = {
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
            source: "AGMARKNET/Supabase (Mock)"
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
            source: "AGMARKNET/Supabase (Mock)"
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
            source: "AGMARKNET/Supabase (Mock)"
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
            source: "AGMARKNET/Supabase (Mock)"
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
            source: "AGMARKNET/Supabase (Mock)"
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
            source: "AGMARKNET/Supabase (Mock)"
        }
    };
    
    return mockData[crop] || mockData.rice;
}

export const priceDataSource = {
    name: "AGMARKNET/Supabase",
    description: "Indian market prices pulled from Supabase crop_prices (scraped and updated hourly in prod)",
    reference: "https://agmarknet.gov.in/"
};
