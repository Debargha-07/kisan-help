
// Crop price API using Supabase + fallback AGMARKNET scraping with backend job (not implemented here)
import { supabase } from "@/integrations/supabase/client";

export async function fetchCropPriceData(crop) {
    try {
        const { data, error } = await supabase
            .from("crop_prices")
            .select("*")
            .eq("crop_name", crop);
        if (error || !data) throw new Error("Price data not found");
        return data;
    } catch (error) {
        console.error("Error fetching crop price data:", error);
        throw error;
    }
}

export const priceDataSource = {
    name: "AGMARKNET/Supabase",
    description: "Indian market prices pulled from Supabase crop_prices (scraped and updated hourly in prod)",
    reference: "https://agmarknet.gov.in/"
};
