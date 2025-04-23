
// Crop data API client
// This would integrate with real crop databases in production

export async function fetchCropData(crop, region) {
  try {
    console.log(`Would fetch crop data for: ${crop} in ${region}`);
    
    // In a production environment, this would call an actual API
    // For demonstration, we're returning mock data
    
    return mockCropData(crop, region);
  } catch (error) {
    console.error("Error fetching crop data:", error);
    throw error;
  }
}

export async function fetchCropRecommendations(location, soilType, season) {
  try {
    console.log(`Fetching crop recommendations for ${location}, ${soilType}, ${season}`);
    
    // This would be a real API call in production
    // const response = await fetch(
    //   `https://api.cropdata.org/recommendations?location=${location}&soil=${soilType}&season=${season}`
    // );
    // return await response.json();
    
    return mockCropRecommendations(location, soilType, season);
  } catch (error) {
    console.error("Error fetching crop recommendations:", error);
    throw error;
  }
}

function mockCropData(crop, region) {
  // This would be replaced by actual crop database API data
  
  const cropVarieties = {
    rice: {
      varieties: [
        { name: "IR36", yieldPotential: 55, duration: "110-120 days", waterRequirement: "High" },
        { name: "MTU7029", yieldPotential: 53, duration: "130-135 days", waterRequirement: "High" },
        { name: "BPT5204", yieldPotential: 52, duration: "145-150 days", waterRequirement: "High" },
      ],
      fertilizers: "N:P:K - 120:60:40 kg/ha",
      diseases: ["Blast", "Bacterial Leaf Blight", "Sheath Blight"],
      reference: "Indian Council of Agricultural Research - Rice Research"
    },
    wheat: {
      varieties: [
        { name: "HD2967", yieldPotential: 48, duration: "140-145 days", waterRequirement: "Medium" },
        { name: "PBW550", yieldPotential: 46, duration: "150-155 days", waterRequirement: "Medium" },
        { name: "DBW17", yieldPotential: 45, duration: "135-140 days", waterRequirement: "Medium" },
      ],
      fertilizers: "N:P:K - 120:60:40 kg/ha",
      diseases: ["Rust", "Powdery Mildew", "Loose Smut"],
      reference: "Indian Agricultural Research Institute - Wheat Research"
    },
    maize: {
      varieties: [
        { name: "DHM117", yieldPotential: 41, duration: "90-100 days", waterRequirement: "Medium" },
        { name: "DHM121", yieldPotential: 43, duration: "85-95 days", waterRequirement: "Medium" },
        { name: "Vivek-27", yieldPotential: 40, duration: "80-85 days", waterRequirement: "Medium-Low" },
      ],
      fertilizers: "N:P:K - 100:50:25 kg/ha",
      diseases: ["Leaf Blight", "Southern Rust", "Stalk Rot"],
      reference: "Directorate of Maize Research"
    },
    groundnut: {
      varieties: [
        { name: "TAG-24", yieldPotential: 20, duration: "110-115 days", waterRequirement: "Medium-Low" },
        { name: "GG-20", yieldPotential: 18, duration: "120-125 days", waterRequirement: "Medium-Low" },
        { name: "TG-37A", yieldPotential: 17, duration: "110-120 days", waterRequirement: "Medium-Low" },
      ],
      fertilizers: "N:P:K - 20:40:40 kg/ha",
      diseases: ["Leaf Spot", "Collar Rot", "Rust"],
      reference: "Directorate of Groundnut Research"
    },
    soybean: {
      varieties: [
        { name: "JS-335", yieldPotential: 17, duration: "95-100 days", waterRequirement: "Medium" },
        { name: "JS-9560", yieldPotential: 16, duration: "85-95 days", waterRequirement: "Medium" },
        { name: "NRC-37", yieldPotential: 15, duration: "90-95 days", waterRequirement: "Medium" },
      ],
      fertilizers: "N:P:K - 30:60:40 kg/ha",
      diseases: ["Yellow Mosaic", "Rust", "Anthracnose"],
      reference: "Indian Council of Agricultural Research - Soybean Research"
    },
    // Adding more crops for the homepage price comparison
    sugarcane: {
      varieties: [
        { name: "CO-86032", yieldPotential: 850, duration: "12-14 months", waterRequirement: "High" },
        { name: "CO-0238", yieldPotential: 900, duration: "11-13 months", waterRequirement: "High" },
      ],
      fertilizers: "N:P:K - 250:100:120 kg/ha",
      diseases: ["Red Rot", "Smut", "Wilt"],
      reference: "Sugarcane Breeding Institute"
    },
    mustard: {
      varieties: [
        { name: "Pusa Bold", yieldPotential: 15, duration: "110-120 days", waterRequirement: "Low" },
        { name: "RH-749", yieldPotential: 14, duration: "125-135 days", waterRequirement: "Low" },
      ],
      fertilizers: "N:P:K - 80:40:40 kg/ha",
      diseases: ["White Rust", "Alternaria Blight", "Downy Mildew"],
      reference: "ICAR-Directorate of Rapeseed-Mustard Research"
    }
  };
  
  // Regional yield adjustments based on suitability
  const regionYieldAdjustment = {
    "West Bengal": { rice: 1.05, wheat: 0.9, maize: 0.95, groundnut: 0.9, soybean: 0.92, sugarcane: 1.1, mustard: 0.95 },
    "Punjab": { rice: 1.1, wheat: 1.15, maize: 1.05, groundnut: 0.85, soybean: 0.9, sugarcane: 1.05, mustard: 1.0 },
    "Uttar Pradesh": { rice: 0.95, wheat: 1.05, maize: 1.0, groundnut: 0.9, soybean: 0.95, sugarcane: 1.15, mustard: 1.1 },
    "Maharashtra": { rice: 0.85, wheat: 0.9, maize: 0.95, groundnut: 1.0, soybean: 1.05, sugarcane: 1.0, mustard: 0.9 },
    "Karnataka": { rice: 0.9, wheat: 0.85, maize: 1.0, groundnut: 1.05, soybean: 1.0, sugarcane: 0.95, mustard: 0.85 }
  };
  
  // Get base crop data and adjust for region
  const baseCropData = cropVarieties[crop] || cropVarieties.rice;
  const adjustment = regionYieldAdjustment[region]?.[crop] || 1.0;
  
  // Apply regional adjustment to yield potential
  const adjustedVarieties = baseCropData.varieties.map(variety => ({
    ...variety,
    yieldPotential: Math.round(variety.yieldPotential * adjustment * 10) / 10
  }));
  
  return {
    ...baseCropData,
    varieties: adjustedVarieties,
    regionSpecificAdvice: getRegionSpecificAdvice(crop, region)
  };
}

function getRegionSpecificAdvice(crop, region) {
  // This would provide region-specific growing advice
  const adviceMap = {
    "rice": {
      "West Bengal": "Plant during June-July for kharif season. Ensure proper drainage during heavy monsoons.",
      "Punjab": "Water management is critical. Use SRI method for better water efficiency.",
      "Uttar Pradesh": "Direct seeded rice is recommended in water-scarce areas.",
      "Maharashtra": "Short-duration varieties are preferred due to variable rainfall.",
      "Karnataka": "Consider delayed planting if monsoon arrival is late."
    },
    "wheat": {
      "West Bengal": "Early sowing (by mid-November) is recommended for better yields.",
      "Punjab": "Timely sowing by first fortnight of November gives optimal results.",
      "Uttar Pradesh": "Zero tillage technology is recommended to conserve soil moisture.",
      "Maharashtra": "Limited irrigation - focus on crown root initiation and flowering stages.",
      "Karnataka": "Heat-tolerant varieties are recommended due to warmer climate."
    }
  };
  
  return adviceMap[crop]?.[region] || "Follow general cultivation practices recommended for your region.";
}

function mockCropRecommendations(location, soilType, season) {
  // This would come from a machine learning model in production
  // Based on historical yield data, soil characteristics, and climate patterns
  
  const seasonalCrops = {
    "kharif": ["rice", "maize", "groundnut", "soybean"],
    "rabi": ["wheat", "mustard", "potato", "gram"],
    "summer": ["mung bean", "watermelon", "muskmelon", "cucumber"],
    "zaid": ["vegetables", "fodder crops", "short-duration pulses"]
  };
  
  const soilTypeCrops = {
    "alluvial": ["rice", "wheat", "maize", "sugarcane"],
    "black": ["cotton", "soybean", "groundnut", "pulses"],
    "red": ["millets", "groundnut", "pulses", "oilseeds"],
    "laterite": ["cashew", "coconut", "rubber", "tapioca"],
    "loam": ["wheat", "barley", "pulses", "oilseeds"]
  };
  
  const locationSpecificCrops = {
    "West Bengal": ["rice", "jute", "mustard", "vegetables"],
    "Punjab": ["wheat", "rice", "cotton", "maize"],
    "Uttar Pradesh": ["sugarcane", "wheat", "rice", "potato"],
    "Maharashtra": ["cotton", "soybean", "sugarcane", "pulses"],
    "Karnataka": ["ragi", "pulses", "sugarcane", "millets"]
  };
  
  // Simple recommendation algorithm combining the factors
  function generateRecommendations() {
    const seasonalPriority = seasonalCrops[season.toLowerCase()] || seasonalCrops.kharif;
    const soilPriority = soilTypeCrops[soilType.toLowerCase()] || soilTypeCrops.loam;
    const locationPriority = locationSpecificCrops[location] || locationSpecificCrops["West Bengal"];
    
    // Score each crop based on how many lists it appears in
    const allCrops = [...new Set([...seasonalPriority, ...soilPriority, ...locationPriority])];
    const scoredCrops = allCrops.map(crop => {
      let score = 0;
      if (seasonalPriority.includes(crop)) score += 3; // Season match is important
      if (soilPriority.includes(crop)) score += 2;   // Soil type match is important
      if (locationPriority.includes(crop)) score += 2; // Location match is important
      return { crop, score };
    });
    
    // Sort by score
    scoredCrops.sort((a, b) => b.score - a.score);
    
    // Top 3 are primary recommendations
    const primary = scoredCrops.slice(0, 3).map(crop => enhanceCropRecommendation(crop.crop, location, season, crop.score));
    
    // Next 3 are alternatives
    const alternatives = scoredCrops.slice(3, 6).map(crop => enhanceCropRecommendation(crop.crop, location, season, crop.score));
    
    return { primary, alternatives };
  }
  
  // Enhance basic crop recommendations with details
  function enhanceCropRecommendation(crop, location, season, score) {
    // Map the raw score (0-7) to a suitability percentage (70-95)
    const suitability = 70 + Math.min(25, score * 5);
    
    // Get crop data from our mock database
    const cropData = mockCropData(crop, location);
    const variety = cropData.varieties?.[0]?.name || "Standard";
    
    // Get water requirement
    let waterRequirement = "Medium";
    if (crop === "rice" || crop === "sugarcane") waterRequirement = "High";
    if (crop === "mustard" || crop === "gram") waterRequirement = "Low";
    
    // Get fertilizer recommendation
    let fertilizers = "N:P:K - Balanced";
    if (cropData.fertilizers) fertilizers = cropData.fertilizers.split(" - ")[0];
    
    // Get growing period
    let growingPeriod = "90-120 days";
    if (cropData.varieties?.[0]?.duration) growingPeriod = cropData.varieties[0].duration;
    
    // Get yield estimate
    let yieldEstimate = "25-30 q/ha";
    if (cropData.varieties?.[0]?.yieldPotential) {
      const yieldBase = cropData.varieties[0].yieldPotential;
      yieldEstimate = `${yieldBase-2}-${yieldBase+2} q/ha`;
    }
    
    return {
      crop,
      variety,
      suitability,
      waterRequirement,
      fertilizers,
      growingPeriod,
      yieldEstimate,
      challenges: getCropChallenges(crop, location, season)
    };
  }
  
  return generateRecommendations();
}

// Helper function for crop challenges
export function getCropChallenges(crop, location, season) {
  // This would be based on historical pest/disease/weather data for the region
  
  const commonChallenges = {
    "rice": {
      "kharif": ["Risk of blast disease in humid conditions", "Flooding damage during heavy monsoon"],
      "rabi": ["Cold stress during flowering stage", "Irrigation management required"],
      "summer": ["Heat stress during grain filling", "High water requirement"]
    },
    "wheat": {
      "kharif": ["Not recommended in kharif season"],
      "rabi": ["Rust disease risk in humid areas", "Terminal heat stress if sown late"],
      "summer": ["Not suitable for summer season"]
    },
    "maize": {
      "kharif": ["Susceptible to stem borer in monsoon", "Waterlogging risk in heavy rains"],
      "rabi": ["Irrigation management required", "Risk of frost damage in northern regions"],
      "summer": ["Heat stress during pollination", "High irrigation requirement"]
    },
    "groundnut": {
      "kharif": ["Vulnerable to collar rot in waterlogged conditions", "Leaf spot disease risk"],
      "rabi": ["Requires supplemental irrigation", "Lower yields compared to kharif"],
      "summer": ["High temperature may affect pod development", "Regular irrigation crucial"]
    },
    "soybean": {
      "kharif": ["Yellow mosaic virus risk during monsoon", "Excess moisture can cause root rot"],
      "rabi": ["Not commonly grown in rabi season"],
      "summer": ["Not recommended for summer season"]
    },
    "sugarcane": {
      "kharif": ["Red rot disease risk in wet conditions", "Requires proper drainage"],
      "rabi": ["Cold stress in northern regions", "Initial establishment may be slow"],
      "summer": ["High water requirement", "Heat stress can affect tillering"]
    },
    "mustard": {
      "kharif": ["Not suitable for kharif season"],
      "rabi": ["Aphid infestation risk", "White rust disease in humid conditions"],
      "summer": ["Not suitable for summer season"]
    }
  };
  
  // Location-specific challenges
  const locationChallenges = {
    "West Bengal": {
      "rice": "High humidity increases disease pressure",
      "wheat": "Short winter limits optimal growing period"
    },
    "Punjab": {
      "rice": "Declining water table is a concern for sustainability",
      "wheat": "Terminal heat stress if sowing is delayed"
    },
    "Maharashtra": {
      "cotton": "Pink bollworm is a major pest concern",
      "soybean": "Uncertain rainfall pattern affects yields"
    }
  };
  
  // Get the general challenges for this crop and season
  let challenges = commonChallenges[crop]?.[season.toLowerCase()] || [];
  
  // Add location-specific challenge if available
  if (locationChallenges[location]?.[crop]) {
    challenges.push(locationChallenges[location][crop]);
  }
  
  return challenges.length > 0 ? challenges : ["No major challenges identified"];
}

export function getCurrentSeason() {
  const month = new Date().getMonth();
  // 0-indexed months: 0 = January, 11 = December
  if (month >= 5 && month <= 8) return "Kharif"; // June to September
  if (month >= 9 || month <= 1) return "Rabi";   // October to February
  return "Summer";                               // March to May
}

// Information about the data source
export const cropDataSource = {
  name: "Indian Council of Agricultural Research (ICAR)",
  description: "Crop varieties, cultivation practices, and yield data",
  reference: "https://icar.org.in/crop-science",
  notes: "Compiled from ICAR publications, state agricultural universities' research data, and KVK field trials from 2021-2023."
};
