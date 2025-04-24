
import { format, addMonths } from "date-fns";

type WeatherDay = {
  day: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  icon: string;
  description: string;
};

type LongTermForecastPoint = {
  month: string;
  avgTemp: number;
  rainfall: number;
};

// Generate forecast data for a specific region
const generateRegionalLongTermForecast = (region: string): LongTermForecastPoint[] => {
  // Base data for default region (West Bengal)
  const baseData = [
    { monthIndex: 0, avgTemp: 25, rainfall: 20 },
    { monthIndex: 1, avgTemp: 28, rainfall: 40 },
    { monthIndex: 2, avgTemp: 32, rainfall: 75 },
    { monthIndex: 3, avgTemp: 34, rainfall: 145 },
    { monthIndex: 4, avgTemp: 33, rainfall: 290 },
    { monthIndex: 5, avgTemp: 31, rainfall: 320 },
    { monthIndex: 6, avgTemp: 29, rainfall: 340 },
    { monthIndex: 7, avgTemp: 29, rainfall: 310 },
    { monthIndex: 8, avgTemp: 30, rainfall: 170 },
    { monthIndex: 9, avgTemp: 28, rainfall: 100 },
    { monthIndex: 10, avgTemp: 25, rainfall: 20 },
    { monthIndex: 11, avgTemp: 22, rainfall: 10 }
  ];
  
  // Regional variations
  const regionalFactors: Record<string, { tempOffset: number, rainfallMultiplier: number }> = {
    "West Bengal": { tempOffset: 0, rainfallMultiplier: 1 },
    "Punjab": { tempOffset: -2, rainfallMultiplier: 0.5 },
    "Maharashtra": { tempOffset: 1, rainfallMultiplier: 0.7 },
    "Karnataka": { tempOffset: 2, rainfallMultiplier: 0.8 },
    "Uttar Pradesh": { tempOffset: -1, rainfallMultiplier: 0.6 }
  };
  
  // Apply regional factors
  const factor = regionalFactors[region] || { tempOffset: 0, rainfallMultiplier: 1 };
  
  // Generate the data with month names
  const startDate = new Date();
  return baseData.map(point => {
    const date = addMonths(startDate, point.monthIndex);
    return {
      month: format(date, "MMM"),
      avgTemp: point.avgTemp + factor.tempOffset,
      rainfall: Math.round(point.rainfall * factor.rainfallMultiplier)
    };
  });
};

// Export the function to generate weather forecast data
export const getWeatherForecast = (region: string): WeatherDay[] => {
  console.log("Would fetch weather data for:", region);
  
  // Default weather patterns for different regions
  const patterns: Record<string, any> = {
    "West Bengal": {
      temp: { base: 30, variation: 4 },
      humidity: { base: 75, variation: 10 },
      rainfall: { base: 8, variation: 12 },
      conditions: ["sunny", "cloudy", "rainy", "drizzle", "sunny", "sunny", "cloudy"]
    },
    "Punjab": {
      temp: { base: 28, variation: 5 },
      humidity: { base: 60, variation: 15 },
      rainfall: { base: 3, variation: 8 },
      conditions: ["sunny", "sunny", "sunny", "cloudy", "cloudy", "drizzle", "sunny"]
    },
    "Maharashtra": {
      temp: { base: 32, variation: 3 },
      humidity: { base: 65, variation: 10 },
      rainfall: { base: 5, variation: 10 },
      conditions: ["sunny", "sunny", "cloudy", "cloudy", "rainy", "sunny", "sunny"]
    },
    "Karnataka": {
      temp: { base: 31, variation: 2 },
      humidity: { base: 70, variation: 8 },
      rainfall: { base: 6, variation: 15 },
      conditions: ["sunny", "cloudy", "sunny", "rainy", "sunny", "sunny", "drizzle"]
    },
    "Uttar Pradesh": {
      temp: { base: 29, variation: 6 },
      humidity: { base: 55, variation: 20 },
      rainfall: { base: 4, variation: 12 },
      conditions: ["sunny", "sunny", "dusty", "cloudy", "sunny", "rainy", "sunny"]
    }
  };
  
  // Use the region's pattern or default to West Bengal
  const pattern = patterns[region] || patterns["West Bengal"];
  
  // Generate the next 7 days
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date().getDay();
  
  return Array(7).fill(0).map((_, index) => {
    const dayIndex = (today + index) % 7;
    const condition = pattern.conditions[index];
    
    // Random variations based on the pattern
    const tempVariation = (Math.random() - 0.5) * pattern.temp.variation;
    const humidityVariation = (Math.random() - 0.5) * pattern.humidity.variation;
    const willRain = condition === "rainy" || condition === "drizzle";
    
    const temperature = Math.round(pattern.temp.base + tempVariation);
    const humidity = Math.round(pattern.humidity.base + humidityVariation);
    const rainfall = willRain ? Math.round((Math.random() * pattern.rainfall.variation) + pattern.rainfall.base) : 0;
    
    // Map conditions to icons and descriptions
    let icon, description;
    switch(condition) {
      case "sunny":
        icon = "sun";
        description = "Clear sky";
        break;
      case "cloudy":
        icon = "cloud-sun";
        description = "Partly cloudy";
        break;
      case "rainy":
        icon = "cloud-rain";
        description = "Rain expected";
        break;
      case "drizzle":
        icon = "cloud-drizzle";
        description = "Light showers";
        break;
      case "dusty":
        icon = "cloud";
        description = "Dusty conditions";
        break;
      default:
        icon = "sun";
        description = "Generally clear";
    }
    
    return {
      day: days[dayIndex],
      temperature,
      humidity,
      rainfall,
      icon,
      description
    };
  });
};

// Export seasonal descriptions for different regions
export const getSeasonalDescription = (region: string): string => {
  const descriptions: Record<string, string> = {
    "West Bengal": "Expect monsoon with heavy rainfall from June to September. Winter will be mild with temperatures rarely dropping below 15°C.",
    "Punjab": "Hot summers with temperatures reaching 45°C. Winter can be cold with occasional frost. Monsoon rainfall is moderate.",
    "Maharashtra": "Coastal regions have high humidity year-round. Inland areas experience hot summers and mild winters with moderate rainfall.",
    "Karnataka": "The plateau region enjoys a moderate climate year-round. Coastal areas experience heavy rainfall during monsoon.",
    "Uttar Pradesh": "Extreme seasons with very hot summers and cold winters. Monsoon brings moderate rainfall from July to September."
  };
  
  return descriptions[region] || descriptions["West Bengal"];
};

// Create region-based long-term forecasts
export const longTermForecast = (region = "West Bengal") => {
  return generateRegionalLongTermForecast(region);
};
