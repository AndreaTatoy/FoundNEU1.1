import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wxhndpvdyzxszmdycdcy.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4aG5kcHZkeXp4c3ptZHljZGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMzQ2MDksImV4cCI6MjA1NjcxMDYwOX0.9VPNTou5Rgz8ShvYo9mOUsb3N2smi_WNkGTID_WL1WA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);