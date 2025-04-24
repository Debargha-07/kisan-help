
// Modern public soil API using ISRIC SoilGrids REST API
import { getSoilProfile, getTypicalSoilParameters } from "@/data/soilData";

export async function fetchSoilData(location, coordinates, soilType) {
    try {
        console.log(`Fetching soil data for ${location}, soil type: ${soilType}`);
        
        // Get the soil profile from the static data
        const soilProfile = getSoilProfile(location);
        
        // Check if soilType parameter is provided and exists in the soilProfile
        if (!soilType || !soilProfile.soilTypes[soilType]) {
            // Use the first soil type in the profile as default if soilType is invalid
            soilType = Object.keys(soilProfile.soilTypes)[0];
        }
        
        // Get the typical parameters based on location and soil type
        const params = getTypicalSoilParameters(location, soilType);
        
        // Ensure soilType exists in the soilProfile before accessing
        const validSoilType = soilProfile.soilTypes[soilType] ? soilType : Object.keys(soilProfile.soilTypes)[0];
        const soilTypeData = soilProfile.soilTypes[validSoilType];
        
        return {
            location,
            soil_type: validSoilType,
            parameters: params,
            description: soilTypeData?.description || "No description available",
            suitable_crops: soilTypeData?.crops || []
        };
    } catch (error) {
        console.error("Error fetching soil data:", error);
        // Return a minimal valid response to prevent app from breaking
        return {
            location: location || "Unknown Location",
            soil_type: soilType || "loam",
            parameters: {
                ph: 6.5,
                nitrogen: 280,
                phosphorus: 15,
                potassium: 200
            },
            description: "Error fetching soil data. Displaying default values.",
            suitable_crops: ["rice", "wheat", "maize"]
        };
    }
}

export const soilDataSource = {
    name: "SoilGrids (ISRIC) - Static Data",
    description: "Soil information based on local data",
    reference: "https://soilgrids.org/",
    notes: "Using static soil profile data with proper error handling"
};
