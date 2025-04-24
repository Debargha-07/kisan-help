
/**
 * Crop API client for getting crop recommendations and data
 */

// Get the current season based on month
export function getCurrentSeason() {
  const month = new Date().getMonth();
  // 0-1 = Winter (Jan-Feb)
  // 2-5 = Zaid/Summer (Mar-Jun)
  // 6-9 = Kharif (Jul-Oct)
  // 10-11 = Rabi (Nov-Dec)
  if (month >= 0 && month <= 1) return "winter";
  if (month >= 2 && month <= 5) return "zaid";
  if (month >= 6 && month <= 9) return "kharif";
  return "rabi";
}

// Get crop challenges based on crop, location, and season
export function getCropChallenges(crop, location, season) {
  if (!crop || typeof crop !== 'string') {
    return ["Monitor for common pests and diseases"];
  }
  
  const cropName = crop.toLowerCase();
  const challenges = {
    rice: {
      kharif: ["Risk of flooding in low-lying fields", "Monitor for rice blast disease"],
      rabi: ["Water management critical during dry season", "Cold stress in northern regions"],
      zaid: ["Higher water requirement due to heat", "Stem borer and leaf folder risk"],
      winter: ["Cold can affect growth in northern areas", "Require protected cultivation"]
    },
    wheat: {
      rabi: ["Rust diseases common in humid conditions", "Terminal heat stress in late season"],
      winter: ["Aphid infestations are common", "Frost damage in northern plains"],
      kharif: ["Not recommended in monsoon season", "High disease pressure"],
      zaid: ["Heat stress will affect yield", "Not recommended season"]
    },
    maize: {
      kharif: ["Stem borer incidence high in monsoon", "Excess rain can cause root rot"],
      rabi: ["Requires irrigation in most areas", "Frost damage risk in January"],
      zaid: ["Fall armyworm risk increases", "Heat can affect pollination"],
      winter: ["Cold stress can affect early growth", "Limited growth in severe winter"]
    },
    groundnut: {
      kharif: ["Collar rot risk in waterlogged conditions", "Leaf spot diseases common"],
      rabi: ["White grub infestation risk", "Requires supplemental irrigation"],
      zaid: ["Leaf miner incidence high", "Aflatoxin risk in drought conditions"],
      winter: ["Not suitable for winter cultivation", "Growth severely restricted by cold"]
    },
    soybean: {
      kharif: ["Yellow mosaic virus risk", "Excess moisture can cause root rot"],
      rabi: ["Pod borer incidence high", "Supplemental irrigation critical"],
      zaid: ["Heat stress affects nodulation", "Moisture stress common issue"],
      winter: ["Cold stress affects growth", "Not recommended in winter"]
    }
  };
  
  // Default challenges if crop-specific ones aren't available
  const defaultChallenges = {
    kharif: ["Monitor drainage during heavy rainfall", "Watch for increased pest pressure in monsoon"],
    rabi: ["Ensure adequate irrigation", "Protect from unexpected winter showers"],
    zaid: ["Heat stress management critical", "Higher irrigation requirement"],
    winter: ["Protect from frost in northern regions", "Limited growth during cold periods"]
  };
  
  // Get crop-specific challenges or default ones
  const cropChallenges = challenges[cropName] || defaultChallenges;
  
  // Return challenges for the specific season, or generic challenges if not found
  return cropChallenges[season] || 
         ["Monitor for pests and diseases", "Ensure appropriate water management"];
}

// Fetch crop recommendations based on location, soil type and season
export async function fetchCropRecommendations(location, soilType, season) {
  try {
    console.log(`Fetching recommendations for ${location}, soil: ${soilType}, season: ${season}`);
    
    // Generate recommendations based on inputs
    const recommendations = generateRecommendations(location, soilType, season);
    
    return recommendations;
  } catch (error) {
    console.error("Error fetching crop recommendations:", error);
    console.info("Generating fallback recommendations for", location, "soil:", soilType, "season:", season);
    
    // Fallback recommendations to prevent app from breaking
    return {
      primary: [
        {
          crop: "Rice",
          variety: "MTU7029 (Swarna)",
          suitability: 92,
          yieldEstimate: "45-50 quintals/ha",
          growingPeriod: "115-120 days",
          waterRequirement: "Moderate to High",
          fertilizers: "NPK 120:60:60"
        },
        {
          crop: "Maize",
          variety: "DHM117",
          suitability: 85,
          yieldEstimate: "35-40 quintals/ha",
          growingPeriod: "85-95 days",
          waterRequirement: "Moderate",
          fertilizers: "NPK 120:60:40"
        },
        {
          crop: "Groundnut",
          variety: "TAG-24",
          suitability: 78,
          yieldEstimate: "15-18 quintals/ha",
          growingPeriod: "110-120 days",
          waterRequirement: "Low to Moderate",
          fertilizers: "NPK 20:40:40"
        }
      ],
      alternatives: [
        {
          crop: "Mung Bean",
          variety: "IPM 02-3",
          suitability: 75,
          yieldEstimate: "8-10 quintals/ha",
          growingPeriod: "65-70 days",
          waterRequirement: "Low",
          fertilizers: "NPK 20:40:20"
        },
        {
          crop: "Sesame",
          variety: "GT-10",
          suitability: 72,
          yieldEstimate: "6-8 quintals/ha",
          growingPeriod: "80-85 days",
          waterRequirement: "Low",
          fertilizers: "NPK 30:15:15"
        },
        {
          crop: "Sunflower",
          variety: "KBSH-44",
          suitability: 68,
          yieldEstimate: "15-18 quintals/ha",
          growingPeriod: "90-95 days",
          waterRequirement: "Moderate",
          fertilizers: "NPK 60:90:60"
        }
      ]
    };
  }
}

// Generate recommendations based on location, soil type and season
function generateRecommendations(location, soilType, season) {
  // Ensure parameters are valid
  const validLocation = location || "West Bengal";
  const validSoilType = soilType || "alluvial";
  const validSeason = season || getCurrentSeason();
  
  // Define base recommendations by region and soil type
  const recommendationMap = {
    "West Bengal": {
      "alluvial": {
        kharif: {
          primary: [
            {
              crop: "Rice",
              variety: "MTU7029 (Swarna)",
              suitability: 95,
              yieldEstimate: "50-55 quintals/ha",
              growingPeriod: "115-120 days",
              waterRequirement: "High",
              fertilizers: "NPK 120:60:60"
            },
            {
              crop: "Jute",
              variety: "JRO-524",
              suitability: 88,
              yieldEstimate: "25-30 quintals/ha (fiber)",
              growingPeriod: "100-120 days",
              waterRequirement: "Moderate to High",
              fertilizers: "NPK 60:30:30"
            },
            {
              crop: "Maize",
              variety: "DHM-121",
              suitability: 82,
              yieldEstimate: "40-45 quintals/ha",
              growingPeriod: "90-100 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 120:60:40"
            }
          ],
          alternatives: [
            {
              crop: "Black Gram",
              variety: "WBU-108",
              suitability: 78,
              yieldEstimate: "10-12 quintals/ha",
              growingPeriod: "70-80 days",
              waterRequirement: "Low to Moderate",
              fertilizers: "NPK 20:40:20"
            },
            {
              crop: "Sugarcane",
              variety: "CO-0238",
              suitability: 75,
              yieldEstimate: "700-750 quintals/ha",
              growingPeriod: "300-330 days",
              waterRequirement: "High",
              fertilizers: "NPK 150:60:60"
            },
            {
              crop: "Vegetables",
              variety: "Season Mix",
              suitability: 70,
              yieldEstimate: "Varies by type",
              growingPeriod: "60-120 days",
              waterRequirement: "Moderate to High",
              fertilizers: "NPK balanced + micronutrients"
            }
          ]
        },
        rabi: {
          primary: [
            {
              crop: "Wheat",
              variety: "HD-2967",
              suitability: 90,
              yieldEstimate: "45-50 quintals/ha",
              growingPeriod: "120-135 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 120:60:40"
            },
            {
              crop: "Potato",
              variety: "Kufri Jyoti",
              suitability: 88,
              yieldEstimate: "250-300 quintals/ha",
              growingPeriod: "90-110 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 150:60:100"
            },
            {
              crop: "Mustard",
              variety: "Pusa Bold",
              suitability: 85,
              yieldEstimate: "12-15 quintals/ha",
              growingPeriod: "110-120 days",
              waterRequirement: "Low to Moderate",
              fertilizers: "NPK 60:40:40"
            }
          ],
          alternatives: [
            {
              crop: "Lentil",
              variety: "PL-8",
              suitability: 80,
              yieldEstimate: "12-14 quintals/ha",
              growingPeriod: "120-135 days",
              waterRequirement: "Low",
              fertilizers: "NPK 20:40:20"
            },
            {
              crop: "Chickpea",
              variety: "Pusa 372",
              suitability: 75,
              yieldEstimate: "15-18 quintals/ha",
              growingPeriod: "120-130 days",
              waterRequirement: "Low",
              fertilizers: "NPK 20:40:20"
            },
            {
              crop: "Sunflower",
              variety: "KBSH-44",
              suitability: 72,
              yieldEstimate: "15-18 quintals/ha",
              growingPeriod: "95-100 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 60:90:60"
            }
          ]
        },
        zaid: {
          primary: [
            {
              crop: "Green Gram",
              variety: "IPM-02-3",
              suitability: 85,
              yieldEstimate: "8-10 quintals/ha",
              growingPeriod: "60-70 days",
              waterRequirement: "Low",
              fertilizers: "NPK 20:40:20"
            },
            {
              crop: "Maize",
              variety: "Vivek-27",
              suitability: 80,
              yieldEstimate: "35-40 quintals/ha",
              growingPeriod: "80-90 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 120:60:40"
            },
            {
              crop: "Groundnut",
              variety: "TAG-24",
              suitability: 78,
              yieldEstimate: "15-18 quintals/ha",
              growingPeriod: "110-120 days",
              waterRequirement: "Low to Moderate",
              fertilizers: "NPK 20:40:40"
            }
          ],
          alternatives: [
            {
              crop: "Sesame",
              variety: "GT-10",
              suitability: 75,
              yieldEstimate: "6-8 quintals/ha",
              growingPeriod: "80-85 days",
              waterRequirement: "Low",
              fertilizers: "NPK 30:15:15"
            },
            {
              crop: "Cowpea",
              variety: "Pusa Komal",
              suitability: 72,
              yieldEstimate: "10-12 quintals/ha",
              growingPeriod: "65-75 days",
              waterRequirement: "Low",
              fertilizers: "NPK 20:40:20"
            },
            {
              crop: "Vegetables",
              variety: "Summer varieties",
              suitability: 70,
              yieldEstimate: "Varies by type",
              growingPeriod: "60-90 days",
              waterRequirement: "Moderate to High",
              fertilizers: "NPK balanced + micronutrients"
            }
          ]
        },
        winter: {
          primary: [
            {
              crop: "Wheat",
              variety: "HD-2967",
              suitability: 95,
              yieldEstimate: "45-50 quintals/ha",
              growingPeriod: "120-135 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 120:60:40"
            },
            {
              crop: "Potato",
              variety: "Kufri Jyoti",
              suitability: 90,
              yieldEstimate: "250-300 quintals/ha",
              growingPeriod: "90-110 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 150:60:100"
            },
            {
              crop: "Mustard",
              variety: "Pusa Bold",
              suitability: 85,
              yieldEstimate: "12-15 quintals/ha",
              growingPeriod: "110-120 days",
              waterRequirement: "Low to Moderate",
              fertilizers: "NPK 60:40:40"
            }
          ],
          alternatives: [
            {
              crop: "Lentil",
              variety: "PL-8",
              suitability: 80,
              yieldEstimate: "12-14 quintals/ha",
              growingPeriod: "120-135 days",
              waterRequirement: "Low",
              fertilizers: "NPK 20:40:20"
            },
            {
              crop: "Pea",
              variety: "Arkel",
              suitability: 78,
              yieldEstimate: "80-100 quintals/ha (green pods)",
              growingPeriod: "90-120 days",
              waterRequirement: "Low to Moderate",
              fertilizers: "NPK 20:50:50"
            },
            {
              crop: "Cabbage",
              variety: "Pride of India",
              suitability: 75,
              yieldEstimate: "250-300 quintals/ha",
              growingPeriod: "90-120 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 120:60:60"
            }
          ]
        }
      },
      // Add other soil types and regions similarly...
      "red": {
        // Similar structure for red soil
        kharif: {
          primary: [
            {
              crop: "Rice",
              variety: "IR36",
              suitability: 85,
              yieldEstimate: "40-45 quintals/ha",
              growingPeriod: "110-115 days",
              waterRequirement: "High",
              fertilizers: "NPK 100:50:50"
            }
          ],
          alternatives: [
            {
              crop: "Maize",
              variety: "DHM117",
              suitability: 80,
              yieldEstimate: "35-40 quintals/ha",
              growingPeriod: "85-95 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 120:60:40"
            }
          ]
        },
        rabi: {
          primary: [
            {
              crop: "Wheat",
              variety: "DBW17",
              suitability: 80,
              yieldEstimate: "40-45 quintals/ha",
              growingPeriod: "120-130 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 120:60:40"
            }
          ],
          alternatives: [
            {
              crop: "Mustard",
              variety: "Pusa Bold",
              suitability: 78,
              yieldEstimate: "10-12 quintals/ha",
              growingPeriod: "110-120 days",
              waterRequirement: "Low to Moderate",
              fertilizers: "NPK 60:40:40"
            }
          ]
        },
        zaid: {
          primary: [
            {
              crop: "Groundnut",
              variety: "TAG-24",
              suitability: 78,
              yieldEstimate: "15-18 quintals/ha",
              growingPeriod: "110-120 days",
              waterRequirement: "Low to Moderate",
              fertilizers: "NPK 20:40:40"
            }
          ],
          alternatives: [
            {
              crop: "Sesame",
              variety: "GT-10",
              suitability: 75,
              yieldEstimate: "6-8 quintals/ha",
              growingPeriod: "80-85 days",
              waterRequirement: "Low",
              fertilizers: "NPK 30:15:15"
            }
          ]
        },
        winter: {
          primary: [
            {
              crop: "Wheat",
              variety: "DBW17",
              suitability: 80,
              yieldEstimate: "40-45 quintals/ha",
              growingPeriod: "120-130 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 120:60:40"
            }
          ],
          alternatives: [
            {
              crop: "Chickpea",
              variety: "Pusa 372",
              suitability: 75,
              yieldEstimate: "15-18 quintals/ha",
              growingPeriod: "120-130 days",
              waterRequirement: "Low",
              fertilizers: "NPK 20:40:20"
            }
          ]
        }
      },
      // Add other soil types in similar structure
      "loam": {
        // Default recommendations for loam soil - basic structure
        kharif: {
          primary: [
            {
              crop: "Rice",
              variety: "BPT5204",
              suitability: 90,
              yieldEstimate: "45-50 quintals/ha",
              growingPeriod: "115-125 days",
              waterRequirement: "High",
              fertilizers: "NPK 120:60:60"
            }
          ],
          alternatives: [
            {
              crop: "Maize",
              variety: "DHM121",
              suitability: 85,
              yieldEstimate: "40-45 quintals/ha",
              growingPeriod: "90-100 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 120:60:40"
            }
          ]
        },
        rabi: { 
          primary: [
            {
              crop: "Wheat",
              variety: "HD2967",
              suitability: 92,
              yieldEstimate: "45-50 quintals/ha",
              growingPeriod: "120-135 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 120:60:40"
            }
          ],
          alternatives: [
            {
              crop: "Potato",
              variety: "Kufri Jyoti",
              suitability: 88,
              yieldEstimate: "250-300 quintals/ha",
              growingPeriod: "90-110 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 150:60:100"
            }
          ]
        },
        zaid: { 
          primary: [
            {
              crop: "Maize",
              variety: "Vivek-27",
              suitability: 85,
              yieldEstimate: "35-40 quintals/ha",
              growingPeriod: "80-90 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 120:60:40"
            }
          ],
          alternatives: [
            {
              crop: "Green Gram",
              variety: "IPM-02-3",
              suitability: 80,
              yieldEstimate: "8-10 quintals/ha",
              growingPeriod: "60-70 days",
              waterRequirement: "Low",
              fertilizers: "NPK 20:40:20"
            }
          ]
        },
        winter: { 
          primary: [
            {
              crop: "Wheat",
              variety: "HD2967",
              suitability: 92,
              yieldEstimate: "45-50 quintals/ha",
              growingPeriod: "120-135 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 120:60:40"
            }
          ],
          alternatives: [
            {
              crop: "Potato",
              variety: "Kufri Jyoti",
              suitability: 88,
              yieldEstimate: "250-300 quintals/ha",
              growingPeriod: "90-110 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 150:60:100"
            }
          ]
        }
      },
      "black": {
        // Default recommendations for black soil
        kharif: { 
          primary: [
            {
              crop: "Cotton",
              variety: "MCU-5",
              suitability: 90,
              yieldEstimate: "20-25 quintals/ha",
              growingPeriod: "150-180 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 100:50:50"
            }
          ],
          alternatives: [
            {
              crop: "Soybean",
              variety: "JS-335",
              suitability: 85,
              yieldEstimate: "15-18 quintals/ha",
              growingPeriod: "90-100 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 30:60:40"
            }
          ]
        },
        rabi: { 
          primary: [
            {
              crop: "Wheat",
              variety: "HD2967",
              suitability: 85,
              yieldEstimate: "45-50 quintals/ha",
              growingPeriod: "120-135 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 120:60:40"
            }
          ],
          alternatives: [
            {
              crop: "Chickpea",
              variety: "Pusa 372",
              suitability: 90,
              yieldEstimate: "15-18 quintals/ha",
              growingPeriod: "120-130 days",
              waterRequirement: "Low",
              fertilizers: "NPK 20:40:20"
            }
          ]
        },
        zaid: { 
          primary: [
            {
              crop: "Groundnut",
              variety: "TAG-24",
              suitability: 82,
              yieldEstimate: "15-18 quintals/ha",
              growingPeriod: "110-120 days",
              waterRequirement: "Low to Moderate",
              fertilizers: "NPK 20:40:40"
            }
          ],
          alternatives: [
            {
              crop: "Sunflower",
              variety: "KBSH-44",
              suitability: 80,
              yieldEstimate: "15-18 quintals/ha",
              growingPeriod: "95-100 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 60:90:60"
            }
          ]
        },
        winter: { 
          primary: [
            {
              crop: "Wheat",
              variety: "HD2967",
              suitability: 85,
              yieldEstimate: "45-50 quintals/ha",
              growingPeriod: "120-135 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 120:60:40"
            }
          ],
          alternatives: [
            {
              crop: "Chickpea",
              variety: "Pusa 372",
              suitability: 90,
              yieldEstimate: "15-18 quintals/ha",
              growingPeriod: "120-130 days",
              waterRequirement: "Low",
              fertilizers: "NPK 20:40:20"
            }
          ]
        }
      },
      "laterite": {
        // Default recommendations for laterite soil
        kharif: { 
          primary: [
            {
              crop: "Rice",
              variety: "MTU7029",
              suitability: 80,
              yieldEstimate: "35-40 quintals/ha",
              growingPeriod: "115-120 days",
              waterRequirement: "High",
              fertilizers: "NPK 100:50:50"
            }
          ],
          alternatives: [
            {
              crop: "Finger Millet",
              variety: "GPU-28",
              suitability: 85,
              yieldEstimate: "20-25 quintals/ha",
              growingPeriod: "110-120 days",
              waterRequirement: "Low to Moderate",
              fertilizers: "NPK 40:20:20"
            }
          ]
        },
        rabi: { 
          primary: [
            {
              crop: "Groundnut",
              variety: "TAG-24",
              suitability: 75,
              yieldEstimate: "12-15 quintals/ha",
              growingPeriod: "110-120 days",
              waterRequirement: "Low to Moderate",
              fertilizers: "NPK 20:40:40"
            }
          ],
          alternatives: [
            {
              crop: "Millets",
              variety: "CO-7",
              suitability: 80,
              yieldEstimate: "18-22 quintals/ha",
              growingPeriod: "90-100 days",
              waterRequirement: "Low",
              fertilizers: "NPK 40:20:20"
            }
          ]
        },
        zaid: { 
          primary: [
            {
              crop: "Green Gram",
              variety: "IPM-02-3",
              suitability: 78,
              yieldEstimate: "7-9 quintals/ha",
              growingPeriod: "60-70 days",
              waterRequirement: "Low",
              fertilizers: "NPK 20:40:20"
            }
          ],
          alternatives: [
            {
              crop: "Black Gram",
              variety: "WBU-108",
              suitability: 75,
              yieldEstimate: "8-10 quintals/ha",
              growingPeriod: "70-80 days",
              waterRequirement: "Low",
              fertilizers: "NPK 20:40:20"
            }
          ]
        },
        winter: { 
          primary: [
            {
              crop: "Millets",
              variety: "CO-7",
              suitability: 75,
              yieldEstimate: "18-22 quintals/ha",
              growingPeriod: "90-100 days",
              waterRequirement: "Low",
              fertilizers: "NPK 40:20:20"
            }
          ],
          alternatives: [
            {
              crop: "Pulses",
              variety: "Mixed",
              suitability: 70,
              yieldEstimate: "8-12 quintals/ha",
              growingPeriod: "90-120 days",
              waterRequirement: "Low",
              fertilizers: "NPK 20:40:20"
            }
          ]
        }
      }
    },
    // Default recommendations if specific location-soil-season combo isn't found
    "default": {
      "default": {
        "default": {
          primary: [
            {
              crop: "Rice",
              variety: "IR36",
              suitability: 85,
              yieldEstimate: "40-45 quintals/ha",
              growingPeriod: "110-115 days",
              waterRequirement: "High",
              fertilizers: "NPK 100:50:50"
            },
            {
              crop: "Wheat",
              variety: "HD2967",
              suitability: 80,
              yieldEstimate: "40-45 quintals/ha",
              growingPeriod: "120-130 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 120:60:40"
            },
            {
              crop: "Maize",
              variety: "DHM117",
              suitability: 75,
              yieldEstimate: "35-40 quintals/ha",
              growingPeriod: "85-95 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 120:60:40"
            }
          ],
          alternatives: [
            {
              crop: "Groundnut",
              variety: "TAG-24",
              suitability: 70,
              yieldEstimate: "15-18 quintals/ha",
              growingPeriod: "110-120 days",
              waterRequirement: "Low to Moderate",
              fertilizers: "NPK 20:40:40"
            },
            {
              crop: "Soybean",
              variety: "JS-335",
              suitability: 65,
              yieldEstimate: "15-18 quintals/ha",
              growingPeriod: "90-100 days",
              waterRequirement: "Moderate",
              fertilizers: "NPK 30:60:40"
            },
            {
              crop: "Mung Bean",
              variety: "IPM 02-3",
              suitability: 60,
              yieldEstimate: "8-10 quintals/ha",
              growingPeriod: "65-70 days",
              waterRequirement: "Low",
              fertilizers: "NPK 20:40:20"
            }
          ]
        }
      }
    }
  };
  
  try {
    // Try to get location-specific recommendations
    let recommendations = recommendationMap[validLocation]?.[validSoilType]?.[validSeason];
    
    // If not found, try using default soil type for the location
    if (!recommendations) {
      recommendations = recommendationMap[validLocation]?.["alluvial"]?.[validSeason];
    }
    
    // If still not found, use default recommendations
    if (!recommendations) {
      recommendations = recommendationMap["default"]["default"]["default"];
    }
    
    return recommendations;
  } catch (error) {
    console.error("Error generating recommendations:", error);
    // Return default recommendations if an error occurs
    return recommendationMap["default"]["default"]["default"];
  }
}

// Information about the data source
export const cropDataSource = {
  name: "Agricultural Research Database",
  description: "Crop recommendation and yield data",
  reference: "National Agricultural Research System",
  notes: "Recommendations adapted to local conditions with proper error handling"
};
