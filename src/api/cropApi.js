
// Crop data API client using Supabase database as source
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetch standardized crop data from Supabase DB.
 */
export async function fetchCropData(crop, region) {
    try {
        const { data, error } = await supabase
            .from("crop_data")
            .select("*")
            .eq("crop_name", crop)
            .eq("region", region)
            .maybeSingle();
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching crop data:", error);
        throw error;
    }
}

/**
 * Get crop recommendations from region + soil + season.
 * Sample fallback logic or powered via supabase ML or rules.
 */
export async function fetchCropRecommendations(location, soilType, season) {
    try {
        // Find crops that match soilType or are marked as recommended in this region
        let { data, error } = await supabase
            .from("crop_data")
            .select("*")
            .eq("region", location);
        if (error) throw error;
        // Filter by soilType if present
        if (soilType && data) {
            data = data.filter((row) =>
                row.varieties?.some?.((v) => (v.soilTypes || []).includes(soilType))
            );
        }
        // Demo fallback: just return all crops for region
        return data;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        throw error;
    }
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
    
    // Return challenges for the specific crop-location-season combination or defaults
    if (challenges[crop]) {
        if (challenges[crop][location] && challenges[crop][location][season]) {
            return challenges[crop][location][season];
        }
        return challenges[crop]["default"] || ["No specific challenges identified"];
    }
    
    return ["Ensure regular monitoring", "Follow recommended practices"];
}

