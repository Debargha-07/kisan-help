
// Modern public soil API using ISRIC SoilGrids REST API
const SOIL_API = "https://rest.soilgrids.org/query";

export async function fetchSoilData(location, coordinates) {
    try {
        let url;
        if (coordinates) {
            url = `${SOIL_API}?lon=${coordinates.lng}&lat=${coordinates.lat}`;
        }
        // Fallback if only location: use some default coords for main regions (India)
        else {
            const coords = {
                "West Bengal": { lng: 88.3639, lat: 22.5726 },
                "Punjab": { lng: 75.8573, lat: 30.9009 },
                "Uttar Pradesh": { lng: 80.9462, lat: 26.8467 },
                "Maharashtra": { lng: 75.7139, lat: 19.7515 },
                "Karnataka": { lng: 76.919973, lat: 15.3173 }
            };
            url = `${SOIL_API}?lon=${coords[location]?.lng || 88.3639}&lat=${coords[location]?.lat || 22.5726}`;
        }
        const res = await fetch(url);
        if (!res.ok) throw new Error("Soil API fetch failed");
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching soil data:", error);
        throw error;
    }
}

export const soilDataSource = {
    name: "SoilGrids (ISRIC)",
    description: "Global gridded soil information",
    reference: "https://soilgrids.org/",
    notes: "Switched to live ISRIC SoilGrids fetch"
};
