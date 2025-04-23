
// JS version (was typescript)
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://wjlonkphtcrkleerrgtj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqbG9ua3BodGNya2xlZXJyZ3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MzM2OTQsImV4cCI6MjA2MDMwOTY5NH0.XYLReiUnhSbnXT5G9FN6cTmKCvqO_3R6tqvLkp_riSA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

