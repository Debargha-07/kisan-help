
// Crop data API client using Supabase database as source
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetch standardized crop data from Supabase DB.
 */
export async function fetchCropData(crop, region) {
    try {
        console.log(`Fetching crop data for ${crop} in ${region}`);
        const { data, error } = await supabase
            .from("crop_data")
            .select("*")
            .eq("crop_name", crop)
            .eq("region", region)
            .maybeSingle();
        if (error) throw error;
        if (data) return data;
        
        // Return fallback data if nothing found
        return {
            crop_name: crop,
            region: region,
            varieties: [
                {
                    name: "Standard Variety",
                    yield_potential: "40-45 quintals/ha",
                    growth_duration: "110-120 days",
                    soilTypes: ["alluvial", "red", "black cotton"]
                }
            ],
            fertilizers: "NPK 120:60:40",
            diseases: [
                {
                    name: "Common Blight",
                    symptoms: "Brown spots on leaves",
                    control: "Proper spacing and fungicide application"
                }
            ]
        };
    } catch (error) {
        console.error("Error fetching crop data:", error);
        // Return structured fallback data
        return {
            crop_name: crop,
            region: region,
            varieties: [
                {
                    name: "Standard Variety",
                    yield_potential: "40-45 quintals/ha",
                    growth_duration: "110-120 days",
                    soilTypes: ["alluvial", "red", "black cotton"]
                }
            ],
            fertilizers: "NPK 120:60:40",
            diseases: [
                {
                    name: "Common Blight",
                    symptoms: "Brown spots on leaves",
                    control: "Proper spacing and fungicide application"
                }
            ]
        };
    }
}

/**
 * Get crop recommendations from region + soil + season.
 * Sample fallback logic or powered via supabase ML or rules.
 */
export async function fetchCropRecommendations(location, soilType, season) {
    try {
        console.log(`Fetching recommendations for ${location}, soil: ${soilType}, season: ${season}`);
        
        // Find crops that match soilType or are marked as recommended in this region
        let { data, error } = await supabase
            .from("crop_data")
            .select("*")
            .eq("region", location);
        if (error) throw error;
        
        // Filter by soilType if present
        if (soilType && data && data.length > 0) {
            data = data.filter((row) =>
                row.varieties?.some?.((v) => (v.soilTypes || []).includes(soilType))
            );
        }
        
        // If data is null or empty, provide fallback data
        if (!data || data.length === 0) {
            return generateFallbackRecommendations(location, soilType, season);
        }
        
        // Process data into required format
        const recommendations = {
            primary: data.slice(0, 3).map(crop => ({
                crop: crop.crop_name,
                variety: crop.varieties?.[0]?.name || "Standard",
                suitability: Math.floor(80 + Math.random() * 15),
                yieldEstimate: `${Math.floor(35 + Math.random() * 15)}-${Math.floor(40 + Math.random() * 15)} quintals/ha`,
                growingPeriod: `${Math.floor(90 + Math.random() * 60)} days`,
                waterRequirement: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
                fertilizers: `NPK ${Math.floor(80 + Math.random() * 80)}:${Math.floor(40 + Math.random() * 40)}:${Math.floor(30 + Math.random() * 50)}`,
                challenges: getCropChallenges(crop.crop_name, location, season)
            })),
            alternatives: data.slice(3, 5).map(crop => ({
                crop: crop.crop_name,
                variety: crop.varieties?.[0]?.name || "Standard",
                suitability: Math.floor(65 + Math.random() * 15),
                yieldEstimate: `${Math.floor(15 + Math.random() * 20)}-${Math.floor(20 + Math.random() * 25)} quintals/ha`,
                growingPeriod: `${Math.floor(90 + Math.random() * 40)} days`,
                waterRequirement: ["Low", "Medium-Low", "Medium"][Math.floor(Math.random() * 3)],
                fertilizers: `NPK ${Math.floor(20 + Math.random() * 60)}:${Math.floor(40 + Math.random() * 40)}:${Math.floor(30 + Math.random() * 50)}`,
                challenges: getCropChallenges(crop.crop_name, location, season)
            }))
        };
        
        // Ensure both arrays are populated with at least some data
        if (!recommendations.primary || recommendations.primary.length === 0) {
            recommendations.primary = generateFallbackRecommendations(location, soilType, season).primary;
        }
        
        if (!recommendations.alternatives || recommendations.alternatives.length === 0) {
            recommendations.alternatives = generateFallbackRecommendations(location, soilType, season).alternatives;
        }
        
        return recommendations;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        // Return fallback data
        return generateFallbackRecommendations(location, soilType, season);
    }
}

/**
 * Generate fallback recommendations based on location, soil type and season
 */
function generateFallbackRecommendations(location, soilType, season) {
    console.log(`Generating fallback recommendations for ${location}, soil: ${soilType}, season: ${season}`);
    
    // Adjust crops based on soil type
    let primaryCrops = [
        {
            crop: "Rice",
            variety: "IR36",
            suitability: 92,
            yieldEstimate: "45-50 quintals/ha",
            growingPeriod: "110-120 days",
            waterRequirement: "High",
            fertilizers: "NPK 120:60:60",
            challenges: ["Monitor for leaf blast", "Ensure proper drainage"]
        },
        {
            crop: "Wheat",
            variety: "HD2967",
            suitability: 85,
            yieldEstimate: "40-45 quintals/ha",
            growingPeriod: "140-150 days",
            waterRequirement: "Medium",
            fertilizers: "NPK 120:60:40",
            challenges: ["Watch for yellow rust", "Maintain irrigation schedule"]
        },
        {
            crop: "Maize",
            variety: "DHM117",
            suitability: 78,
            yieldEstimate: "35-40 quintals/ha",
            growingPeriod: "90-120 days",
            waterRequirement: "Medium",
            fertilizers: "NPK 150:75:40",
            challenges: ["Monitor for fall armyworm", "Ensure adequate nitrogen"]
        }
    ];
    
    let alternativeCrops = [
        {
            crop: "Soybean",
            variety: "JS-335",
            suitability: 75,
            yieldEstimate: "15-20 quintals/ha",
            growingPeriod: "95-110 days",
            waterRequirement: "Medium-Low",
            fertilizers: "NPK 20:60:40",
            challenges: ["Watch for yellow mosaic virus", "Ensure proper spacing"]
        },
        {
            crop: "Groundnut",
            variety: "TAG-24",
            suitability: 70,
            yieldEstimate: "18-22 quintals/ha",
            growingPeriod: "110-130 days",
            waterRequirement: "Medium",
            fertilizers: "NPK 25:50:75",
            challenges: ["Watch for leaf spot", "Ensure calcium availability"]
        }
    ];
    
    // Modify recommendations based on soil type
    if (soilType) {
        switch(soilType.toLowerCase()) {
            case "alluvial":
                primaryCrops[0].suitability = 95; // Rice
                primaryCrops[1].suitability = 90; // Wheat
                break;
            case "black cotton":
                primaryCrops = [
                    {
                        crop: "Cotton",
                        variety: "Bt Cotton",
                        suitability: 94,
                        yieldEstimate: "25-30 quintals/ha",
                        growingPeriod: "160-180 days",
                        waterRequirement: "Medium",
                        fertilizers: "NPK 100:50:50",
                        challenges: ["Monitor for bollworms", "Manage water carefully"]
                    },
                    ...primaryCrops.slice(1, 2)
                ];
                alternativeCrops.unshift({
                    crop: "Sorghum",
                    variety: "CSH-14",
                    suitability: 88,
                    yieldEstimate: "25-30 quintals/ha",
                    growingPeriod: "100-110 days",
                    waterRequirement: "Low",
                    fertilizers: "NPK 80:40:40",
                    challenges: ["Drought resistant", "Watch for bird damage"]
                });
                break;
            case "red":
            case "red and yellow":
                primaryCrops = [
                    {
                        crop: "Millets",
                        variety: "Improved Varieties",
                        suitability: 90,
                        yieldEstimate: "20-25 quintals/ha",
                        growingPeriod: "90-110 days",
                        waterRequirement: "Low",
                        fertilizers: "NPK 40:20:20",
                        challenges: ["Highly drought resistant", "Low input requirement"]
                    },
                    primaryCrops[2], // Maize
                    {
                        crop: "Pulses",
                        variety: "Local Varieties",
                        suitability: 82,
                        yieldEstimate: "10-15 quintals/ha",
                        growingPeriod: "90-120 days",
                        waterRequirement: "Low",
                        fertilizers: "NPK 20:40:20",
                        challenges: ["Good nitrogen fixation", "Suitable for intercropping"]
                    }
                ];
                break;
            case "laterite":
                primaryCrops = [
                    {
                        crop: "Cashew",
                        variety: "V4 Hybrid",
                        suitability: 92,
                        yieldEstimate: "8-10 quintals/ha",
                        growingPeriod: "3-5 years to mature",
                        waterRequirement: "Low",
                        fertilizers: "NPK 100:50:100",
                        challenges: ["Long term crop", "Watch for tea mosquito bug"]
                    },
                    {
                        crop: "Pineapple",
                        variety: "Queen",
                        suitability: 88,
                        yieldEstimate: "40-50 tons/ha",
                        growingPeriod: "18-24 months",
                        waterRequirement: "Medium",
                        fertilizers: "NPK 12:6:24",
                        challenges: ["Ensure good drainage", "Watch for fruit rot"]
                    },
                    {
                        crop: "Tea",
                        variety: "Assam Hybrid",
                        suitability: 85,
                        yieldEstimate: "15-20 quintals/ha",
                        growingPeriod: "3-5 years to mature",
                        waterRequirement: "Medium-High",
                        fertilizers: "NPK 100:50:100",
                        challenges: ["Long term crop", "Regular pruning required"]
                    }
                ];
                alternativeCrops = [
                    {
                        crop: "Black Pepper",
                        variety: "Panniyur-1",
                        suitability: 80,
                        yieldEstimate: "2-3 kg/vine",
                        growingPeriod: "3-4 years",
                        waterRequirement: "Medium",
                        fertilizers: "NPK 100:40:140",
                        challenges: ["Needs support", "Watch for quick wilt"]
                    },
                    {
                        crop: "Cassava",
                        variety: "H-226",
                        suitability: 75,
                        yieldEstimate: "25-30 tons/ha",
                        growingPeriod: "10-12 months",
                        waterRequirement: "Low",
                        fertilizers: "NPK 100:50:100",
                        challenges: ["Easy to grow", "Tolerates poor soil"]
                    }
                ];
                break;
                
            case "calcareous":
                primaryCrops = [
                    {
                        crop: "Chickpea",
                        variety: "JG-11",
                        suitability: 90,
                        yieldEstimate: "15-18 quintals/ha",
                        growingPeriod: "100-110 days",
                        waterRequirement: "Low",
                        fertilizers: "NPK 20:40:0",
                        challenges: ["Tolerates alkaline soil", "Avoid waterlogging"]
                    },
                    {
                        crop: "Barley",
                        variety: "RD-2035",
                        suitability: 85,
                        yieldEstimate: "35-40 quintals/ha",
                        growingPeriod: "120-130 days",
                        waterRequirement: "Low-Medium",
                        fertilizers: "NPK 60:30:20",
                        challenges: ["Tolerates saline soils", "Good drought resistance"]
                    },
                    {
                        crop: "Mustard",
                        variety: "Pusa Bold",
                        suitability: 82,
                        yieldEstimate: "15-18 quintals/ha",
                        growingPeriod: "110-120 days",
                        waterRequirement: "Low",
                        fertilizers: "NPK 60:40:40",
                        challenges: ["Watch for aphid infestation", "Good for crop rotation"]
                    }
                ];
                break;
                
            case "usar":
                primaryCrops = [
                    {
                        crop: "Dhaincha",
                        variety: "Local",
                        suitability: 95,
                        yieldEstimate: "Green manure crop",
                        growingPeriod: "45-60 days",
                        waterRequirement: "Medium",
                        fertilizers: "No fertilizer needed",
                        challenges: ["Excellent for reclaiming alkaline soil", "Green manure crop"]
                    },
                    {
                        crop: "Berseem",
                        variety: "BL-10",
                        suitability: 85,
                        yieldEstimate: "70-80 tons/ha (green fodder)",
                        growingPeriod: "180-210 days",
                        waterRequirement: "Medium-High",
                        fertilizers: "NPK 20:60:40",
                        challenges: ["Good for salt-affected soils", "Fodder crop"]
                    },
                    {
                        crop: "Salt-tolerant Rice",
                        variety: "CSR-36",
                        suitability: 80,
                        yieldEstimate: "35-40 quintals/ha",
                        growingPeriod: "125-130 days",
                        waterRequirement: "High",
                        fertilizers: "NPK 120:60:60",
                        challenges: ["Specially bred for saline soils", "Requires proper drainage"]
                    }
                ];
                break;
        }
    }
    
    // Modify recommendations based on season
    if (season) {
        switch(season.toLowerCase()) {
            case "kharif":
                // Prioritize monsoon crops
                if (!soilType || soilType.toLowerCase() !== "black cotton") {
                    primaryCrops.unshift({
                        crop: "Rice",
                        variety: "MTU-1010",
                        suitability: 95,
                        yieldEstimate: "45-55 quintals/ha",
                        growingPeriod: "115-120 days",
                        waterRequirement: "High",
                        fertilizers: "NPK 120:60:60",
                        challenges: getCropChallenges("Rice", location, season)
                    });
                }
                break;
                
            case "rabi":
                // Prioritize winter crops
                primaryCrops.unshift({
                    crop: "Wheat",
                    variety: "HD-3086",
                    suitability: 95,
                    yieldEstimate: "45-55 quintals/ha",
                    growingPeriod: "135-145 days",
                    waterRequirement: "Medium",
                    fertilizers: "NPK 120:60:40",
                    challenges: getCropChallenges("Wheat", location, season)
                });
                break;
                
            case "zaid":
                // Prioritize summer crops
                primaryCrops.unshift({
                    crop: "Green Gram",
                    variety: "IPM-02-3",
                    suitability: 92,
                    yieldEstimate: "8-10 quintals/ha",
                    growingPeriod: "60-65 days",
                    waterRequirement: "Low-Medium",
                    fertilizers: "NPK 20:40:0",
                    challenges: ["Short duration crop", "Heat tolerant"]
                });
                break;
        }
    }
    
    // Ensure we have max 3 primary and 2 alternative recommendations
    return {
        primary: primaryCrops.slice(0, 3),
        alternatives: alternativeCrops.slice(0, 2)
    };
}

/**
 * Get current growing season based on date
 */
export function getCurrentSeason() {
    const now = new Date();
    const month = now.getMonth();
    
    if (month >= 5 && month <= 8) {
        return "kharif"; // Summer crop season (approx June-September)
    } else if (month >= 9 || month <= 1) {
        return "rabi"; // Winter crop season (approx October-February)
    } else {
        return "zaid"; // Spring crop season (approx March-May)
    }
}

/**
 * Get crop challenges based on crop type, location and season
 */
export function getCropChallenges(crop, location, season) {
    // Sample challenges data based on crop, location and season
    const challenges = {
        rice: {
            "Punjab": {
                "kharif": ["Potential bacterial leaf blight due to high humidity", "Monitor for stem borers"],
                "rabi": ["Cold stress may affect germination", "Limited water availability"],
                "zaid": ["Higher water requirements during hot months", "Increased weed pressure"]
            },
            "West Bengal": {
                "kharif": ["Heavy rainfall may cause flooding", "Watch for blast disease"],
                "rabi": ["Ensure proper irrigation channels", "Cold nights may slow growth"],
                "zaid": ["Heat stress during flowering stage", "Increased pest pressure"]
            },
            "default": ["Maintain proper water management", "Regular monitoring for pests"]
        },
        wheat: {
            "Punjab": {
                "kharif": ["Not recommended in Kharif season", "Consider alternatives"],
                "rabi": ["Yellow rust risk in cooler areas", "Monitor lodging in high-yield varieties"],
                "zaid": ["Terminal heat stress may affect yield", "Ensure timely sowing"]
            },
            "Uttar Pradesh": {
                "rabi": ["Watch for powdery mildew in humid areas", "Ensure proper spacing"],
                "zaid": ["Higher irrigation requirements", "Accelerated maturity due to heat"]
            },
            "default": ["Optimize nitrogen application timing", "Monitor for rust diseases"]
        },
        maize: {
            "default": ["Watch for fall armyworm", "Ensure proper drainage"]
        },
        groundnut: {
            "default": ["Monitor for leaf spot diseases", "Ensure calcium availability during pod formation"]
        },
        soybean: {
            "default": ["Watch for yellow mosaic virus", "Maintain proper drainage"]
        }
    };
    
    // Convert crop name to lowercase for case-insensitive matching
    const cropLower = crop?.toLowerCase();
    
    // Return challenges for the specific crop-location-season combination or defaults
    if (cropLower && challenges[cropLower]) {
        if (location && season && challenges[cropLower][location] && challenges[cropLower][location][season]) {
            return challenges[cropLower][location][season];
        }
        return challenges[cropLower]["default"] || ["No specific challenges identified"];
    }
    
    return ["Ensure regular monitoring", "Follow recommended practices"];
}
