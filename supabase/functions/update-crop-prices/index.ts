
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      'https://wjlonkphtcrkleerrgtj.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqbG9ua3BodGNya2xlZXJyZ3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MzM2OTQsImV4cCI6MjA2MDMwOTY5NH0.XYLReiUnhSbnXT5G9FN6cTmKCvqO_3R6tqvLkp_riSA'
    );

    // For demo purposes, we'll simulate real data with some random variations
    const crops = ['rice', 'wheat', 'potato', 'onion'];
    const regions = ['West Bengal', 'Uttar Pradesh', 'Punjab', 'Maharashtra', 'Karnataka'];
    const baselinePrices = { rice: 2200, wheat: 2100, potato: 1200, onion: 1800 };

    for (const crop of crops) {
      for (const region of regions) {
        const variation = Math.random() * 200 - 100; // Random variation between -100 and +100
        const currentPrice = baselinePrices[crop] + variation;
        const previousPrice = currentPrice - (Math.random() * 100 - 50);
        const forecastPrice = currentPrice + (Math.random() * 150 - 75);

        await supabaseClient
          .from('crop_prices')
          .upsert({
            crop_name: crop,
            region: region,
            current_price: currentPrice.toFixed(2),
            previous_price: previousPrice.toFixed(2),
            forecast_price: forecastPrice.toFixed(2),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'crop_name,region'
          });
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating crop prices:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
