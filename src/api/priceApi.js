
// Price data API client
// This would connect to agricultural market data APIs in production

export async function fetchCropPriceData(crop) {
  try {
    console.log(`Fetching price data for ${crop}`);
    
    // In a production app, this would call a real API
    // const response = await fetch(
    //   `https://api.agmarknet.gov.in/prices?crop=${crop}&format=json`
    // );
    // return await response.json();
    
    // For demo purposes, return mock data
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockPriceData(crop);
  } catch (error) {
    console.error("Error fetching crop price data:", error);
    throw error;
  }
}

function mockPriceData(crop) {
  // This simulates real market price data
  // In production, this would come from a real market data API
  
  const priceData = {
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
      source: "AGMARKNET data for April 2025"
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
      source: "AGMARKNET data for April 2025"
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
      source: "AGMARKNET data for April 2025"
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
      source: "AGMARKNET data for April 2025"
    },
    // Adding new crops for more variety
    sugarcane: {
      currentPrice: 3250,
      previousPrice: 3120,
      trend: 'up',
      priceChange: 4.17,
      regions: {
        "Delhi": 3200,
        "Mumbai": 3300,
        "Chennai": 3240,
        "Kolkata": 3220,
        "Bengaluru": 3260,
        "Hyderabad": 3230,
        "Lucknow": 3280,
        "Jaipur": 3190,
        "Ahmedabad": 3210,
        "Bhopal": 3170
      },
      source: "AGMARKNET data for April 2025"
    },
    mustard: {
      currentPrice: 4780,
      previousPrice: 4890,
      trend: 'down',
      priceChange: -2.25,
      regions: {
        "Delhi": 4800,
        "Mumbai": 4760,
        "Chennai": 4750,
        "Kolkata": 4790,
        "Bengaluru": 4770,
        "Hyderabad": 4760,
        "Lucknow": 4810,
        "Jaipur": 4830,
        "Ahmedabad": 4780,
        "Bhopal": 4800
      },
      source: "AGMARKNET data for April 2025"
    }
  };
  
  if (!priceData[crop]) {
    throw new Error("Crop data not available");
  }
  
  return priceData[crop];
}

// Information about the data source
export const priceDataSource = {
  name: "Agricultural Marketing Information Network (AGMARKNET)",
  description: "Agricultural commodity prices across major markets in India",
  reference: "https://agmarknet.gov.in/",
  notes: "Currently using representative data based on AGMARKNET price trends from 2023-2025"
};
