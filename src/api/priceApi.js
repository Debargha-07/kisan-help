
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
            console.log("Falling back to mock data for", crop);
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

// Fallback function to get mock price data with state-wise comparison
function getMockPriceData(crop) {
    // State-wise price data for various crops
    const mockData = {
        rice: {
            currentPrice: 2205,
            previousPrice: 2150,
            trend: 'up',
            priceChange: 2.56,
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
            source: "AGMARKNET/Supabase (Mock)"
        },
        wheat: {
            currentPrice: 1812,
            previousPrice: 1780,
            trend: 'up',
            priceChange: 1.8,
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
            source: "AGMARKNET/Supabase (Mock)"
        },
        potato: {
            currentPrice: 1490,
            previousPrice: 1540,
            trend: 'down',
            priceChange: -3.25,
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
            source: "AGMARKNET/Supabase (Mock)"
        },
        onion: {
            currentPrice: 2542,
            previousPrice: 2380,
            trend: 'up',
            priceChange: 6.81,
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
            source: "AGMARKNET/Supabase (Mock)"
        },
        sugarcane: {
            currentPrice: 3150,
            previousPrice: 3050,
            trend: 'up',
            priceChange: 3.28,
            regions: {
                "West Bengal": 3160,
                "Punjab": 3180,
                "Tamil Nadu": 3120,
                "Bihar": 3140,
                "Uttar Pradesh": 3140,
                "Andhra Pradesh": 3130,
                "Karnataka": 3170,
                "Rajasthan": 3150,
                "Gujarat": 3140,
                "Madhya Pradesh": 3120
            },
            source: "AGMARKNET/Supabase (Mock)"
        },
        mustard: {
            currentPrice: 4850,
            previousPrice: 5050,
            trend: 'down',
            priceChange: -3.96,
            regions: {
                "West Bengal": 4860,
                "Punjab": 4880,
                "Tamil Nadu": 4820,
                "Bihar": 4830,
                "Uttar Pradesh": 4840,
                "Andhra Pradesh": 4830,
                "Karnataka": 4870,
                "Rajasthan": 4850,
                "Gujarat": 4840,
                "Madhya Pradesh": 4820
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
