import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ddmcmznznacjyqpvrygl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkbWNtem56bmFjanlxcHZyeWdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MDc3MzgsImV4cCI6MjA1NzE4MzczOH0.muTYF9cSkaleTAfCPAxYH3h9qNS9duyevLd4FFF2W1c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
