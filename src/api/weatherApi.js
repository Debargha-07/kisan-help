
// Weather API client for OpenWeatherMap

const API_KEY = "DEMO_KEY"; // Replace with your actual API key when in production

export async function fetchWeatherForecast(city) {
  try {
    // In a real implementation, this would call the OpenWeather API
    // For demo purposes, we're returning mock data that matches the API format
    console.log(`Would fetch weather data for: ${city}`);
    
    // Demo response - in production, replace with actual API call:
    // const response = await fetch(
    //   `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
    // );
    // return await response.json();
    
    // Mock data formatted similar to OpenWeather API response
    return mockWeatherForecast(city);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

// Mock data that mimics the structure of the OpenWeather API response
function mockWeatherForecast(location) {
  // This function creates mock data that resembles the OpenWeather API response
  // In a production app, this would be replaced with actual API calls
  
  const baseTemp = location === "Punjab" ? 38 : 
                  location === "Uttar Pradesh" ? 36 : 
                  location === "Maharashtra" ? 32 : 
                  location === "Karnataka" ? 30 : 33;
  
  const baseHumidity = location === "Punjab" ? 45 : 
                      location === "Uttar Pradesh" ? 52 : 
                      location === "Maharashtra" ? 70 : 
                      location === "Karnataka" ? 62 : 68;
  
  // Generate a list of forecasts for the next 7 days
  const forecasts = Array.from({ length: 7 }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    
    // Add some variation based on the day
    const tempVariation = Math.random() * 4 - 2; // -2 to +2 degrees
    const humidityVariation = Math.random() * 10 - 5; // -5 to +5 percent
    
    // For the first 3 days, use more accurate forecasts
    const accuracy = index < 3 ? 0.7 : 0.5;
    
    const temp = baseTemp + tempVariation * accuracy;
    const humidity = Math.min(100, Math.max(30, baseHumidity + humidityVariation * accuracy));
    
    // Rain probability increases with humidity
    const rainProb = Math.max(0, (humidity - 60) / 100 * 2);
    const rainfall = rainProb > 0.3 ? Math.round(rainProb * 20) : 0;
    
    const weatherTypes = ["Clear", "Clouds", "Rain", "Drizzle", "Thunderstorm"];
    let weatherType;
    
    if (rainfall > 10) {
      weatherType = "Thunderstorm";
    } else if (rainfall > 5) {
      weatherType = "Rain";
    } else if (rainfall > 0) {
      weatherType = "Drizzle";
    } else if (humidity > 70) {
      weatherType = "Clouds";
    } else {
      weatherType = "Clear";
    }
    
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    return {
      dt_txt: date.toISOString(),
      main: {
        temp: temp,
        humidity: humidity
      },
      weather: [{
        main: weatherType,
        description: getWeatherDescription(weatherType),
        icon: getWeatherIcon(weatherType)
      }],
      rain: rainfall > 0 ? { "3h": rainfall } : undefined,
      dayName: dayName,
      display: {
        temperature: Math.round(temp),
        humidity: Math.round(humidity),
        rainfall: rainfall,
        description: getWeatherDescription(weatherType),
        icon: getWeatherIcon(weatherType)
      }
    };
  });
  
  return {
    city: {
      name: location,
      country: "IN"
    },
    list: forecasts,
    cod: "200"
  };
}

function getWeatherDescription(type) {
  switch (type) {
    case "Clear": return "Sunny";
    case "Clouds": return "Partly Cloudy";
    case "Rain": return "Rainy";
    case "Drizzle": return "Light Showers";
    case "Thunderstorm": return "Thunderstorms";
    default: return "Unknown";
  }
}

function getWeatherIcon(type) {
  switch (type) {
    case "Clear": return "sun";
    case "Clouds": return "cloud-sun";
    case "Rain": return "cloud-rain";
    case "Drizzle": return "cloud-drizzle";
    case "Thunderstorm": return "cloud-lightning";
    default: return "help-circle";
  }
}

// Information about the data source
export const weatherDataSource = {
  name: "OpenWeatherMap API",
  description: "7-day weather forecast data",
  reference: "https://openweathermap.org/forecast5",
  notes: "Currently using demo/mock data that mimics the API response format"
};
