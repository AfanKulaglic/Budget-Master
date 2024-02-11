
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ymnvwlschxaopmnbenlk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltbnZ3bHNjaHhhb3BtbmJlbmxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUxOTgxNzAsImV4cCI6MjAyMDc3NDE3MH0.MXnObdD7ISNQ7UMCxs8_74w4fLETP1WeBTrgsLZoplU";

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;