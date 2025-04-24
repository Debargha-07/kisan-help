
// Modern public soil API using ISRIC SoilGrids REST API
import { getSoilProfile, getTypicalSoilParameters } from "@/data/soilData";

export async function fetchSoilData(location, coordinates, soilType) {
    try {
        console.log(`Fetching soil data for ${location}, soil type: ${soilType}`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Use the soil profile from the static data
        const soilProfile = getSoilProfile(location);
        
        // Get the typical parameters based on location and soil type
        const params = getTypicalSoilParameters(location, soilType);
        
        return {
            location,
            soil_type: soilType || Object.keys(soilProfile.soilTypes)[0],
            parameters: params,
            description: soilType ? 
                soilProfile.soilTypes[soilType]?.description || 
                soilProfile.soilTypes[Object.keys(soilProfile.soilTypes)[0]].description : 
                soilProfile.soilTypes[Object.keys(soilProfile.soilTypes)[0]].description,
            suitable_crops: soilType ? 
                soilProfile.soilTypes[soilType]?.crops || 
                soilProfile.soilTypes[Object.keys(soilProfile.soilTypes)[0]].crops : 
                soilProfile.soilTypes[Object.keys(soilProfile.soilTypes)[0]].crops
        };
    } catch (error) {
        console.error("Error fetching soil data:", error);
        throw error;
    }
}

export const soilDataSource = {
    name: "SoilGrids (ISRIC) - Static Data",
    description: "Soil information based on local data",
    reference: "https://soilgrids.org/",
    notes: "Using static soil profile data due to API connectivity issues"
};
