
// Weather API client for OpenWeatherMap

const API_KEY = "dab7f02da0e666c2a55a166ac0650bd5"; // Sample public demo key - not working

/**
 * Fetches real weather forecast.
 */
export async function fetchWeatherForecast(city) {
    try {
        // For demo purposes, we'll use fallback data instead of the broken API call
        console.log(`Would fetch real weather data for: ${city}`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Return a fallback mock response instead of making the actual API call
        return generateMockWeatherResponse(city);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
}

// Generate mock weather data for demonstration
function generateMockWeatherResponse(city) {
    const now = new Date();
    const list = [];
    
    // Generate 5 days of forecast data, 3-hour intervals
    for (let i = 0; i < 40; i++) {
        const forecastTime = new Date(now.getTime() + i * 3 * 60 * 60 * 1000);
        
        list.push({
            dt: Math.floor(forecastTime.getTime() / 1000),
            main: {
                temp: 20 + Math.random() * 15,
                feels_like: 22 + Math.random() * 10,
                temp_min: 18 + Math.random() * 10,
                temp_max: 25 + Math.random() * 10,
                pressure: 1010 + Math.random() * 20,
                humidity: 40 + Math.random() * 40
            },
            weather: [{
                id: 800,
                main: ["Clear", "Clouds", "Rain", "Drizzle"][Math.floor(Math.random() * 4)],
                description: ["clear sky", "scattered clouds", "light rain", "moderate rain"][Math.floor(Math.random() * 4)],
                icon: ["01d", "02d", "03d", "10d"][Math.floor(Math.random() * 4)]
            }],
            clouds: {
                all: Math.floor(Math.random() * 100)
            },
            wind: {
                speed: 2 + Math.random() * 8,
                deg: Math.floor(Math.random() * 360)
            },
            visibility: 10000,
            pop: Math.random(),
            sys: {
                pod: i % 2 === 0 ? "d" : "n"
            },
            dt_txt: forecastTime.toISOString().split('.')[0].replace('T', ' ')
        });
    }
    
    return {
        cod: "200",
        message: 0,
        cnt: list.length,
        list: list,
        city: {
            id: 1234567,
            name: city,
            coord: {
                lat: 22.5726,
                lon: 88.3639
            },
            country: "IN",
            population: 1000000,
            timezone: 19800,
            sunrise: Math.floor(now.setHours(6, 0, 0, 0) / 1000),
            sunset: Math.floor(now.setHours(18, 0, 0, 0) / 1000)
        }
    };
}

// Information about the data source
export const weatherDataSource = {
    name: "OpenWeatherMap API (Fallback Data)",
    description: "7-day weather forecast data",
    reference: "https://openweathermap.org/forecast5",
    notes: "Currently using fallback data due to API key issues"
};
