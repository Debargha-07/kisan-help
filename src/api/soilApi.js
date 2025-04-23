
// Soil data API client
// This would integrate with a real soil data API in production

export async function fetchSoilData(location, coordinates) {
  try {
    console.log(`Would fetch soil data for: ${location}`);
    
    // In a production environment, this would be an actual API call
    // For demonstration, we're returning mock data
    
    // Example of what a real API call might look like:
    // const response = await fetch(
    //   `https://api.soilgrids.org/query?lon=${coordinates.lng}&lat=${coordinates.lat}`,
    //   { headers: { "Content-Type": "application/json" } }
    // );
    // return await response.json();
    
    return mockSoilData(location);
  } catch (error) {
    console.error("Error fetching soil data:", error);
    throw error;
  }
}

function mockSoilData(location) {
  // This creates mock data based on general soil profiles of these regions
  // In production, this would come from an actual soil database API
  
  const soilProfiles = {
    "West Bengal": {
      predominantType: "alluvial",
      ph: 6.2,
      nitrogen: 340,
      phosphorus: 18,
      potassium: 210,
      organicMatter: 1.2,
      texture: "Silty loam",
      reference: "Indian Agricultural Research Institute regional soil data"
    },
    "Punjab": {
      predominantType: "alluvial",
      ph: 7.8,
      nitrogen: 380,
      phosphorus: 22,
      potassium: 250,
      organicMatter: 0.8,
      texture: "Sandy loam",
      reference: "Punjab Agricultural University soil survey data"
    },
    "Uttar Pradesh": {
      predominantType: "alluvial",
      ph: 7.5,
      nitrogen: 320,
      phosphorus: 16,
      potassium: 230,
      organicMatter: 0.7,
      texture: "Loam",
      reference: "UP State Agricultural Department soil analysis records"
    },
    "Maharashtra": {
      predominantType: "black",
      ph: 7.2,
      nitrogen: 290,
      phosphorus: 14,
      potassium: 210,
      organicMatter: 0.9,
      texture: "Clay loam",
      reference: "Maharashtra Agricultural University soil database"
    },
    "Karnataka": {
      predominantType: "red",
      ph: 6.5,
      nitrogen: 270,
      phosphorus: 12,
      potassium: 190,
      organicMatter: 0.8,
      texture: "Sandy clay loam",
      reference: "Karnataka State Natural Resource Data Repository"
    }
  };
  
  // Return data for the requested location, or a default if not found
  return soilProfiles[location] || soilProfiles["West Bengal"];
}

// Information about the data source
export const soilDataSource = {
  name: "SoilGrids and Regional Agricultural Universities",
  description: "Soil composition, nutrients, and characteristics data",
  reference: "https://soilgrids.org/ and Indian Agricultural Research Institute",
  notes: "Currently using reference data compiled from agricultural universities. In production, this would connect to SoilGrids API or similar service."
};
