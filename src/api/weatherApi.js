
// Weather API client for OpenWeatherMap

const API_KEY = "dab7f02da0e666c2a55a166ac0650bd5"; // Sample public demo key

/**
 * Fetches real weather forecast.
 */
export async function fetchWeatherForecast(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
            city
        )}&units=metric&appid=${API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch weather");
        const json = await res.json();
        return json;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
}

// Information about the data source
export const weatherDataSource = {
    name: "OpenWeatherMap API",
    description: "7-day weather forecast data",
    reference: "https://openweathermap.org/forecast5",
    notes: "Production now fetches live forecast via API"
};
