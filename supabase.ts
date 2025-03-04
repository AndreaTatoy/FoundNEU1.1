import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lakokzfchyufayjxtmnn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxha29remZjaHl1ZmF5anh0bW5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwODg2MjcsImV4cCI6MjA1NjY2NDYyN30.CT5UahYtg_3QdLek5cIkBe3dXaM7Y9jugVgdYdGW2xo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);