
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
