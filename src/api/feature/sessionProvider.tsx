import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://loonyekdvymyoupgasqz.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxvb255ZWtkdnlteW91cGdhc3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyMzI1NjYsImV4cCI6MjA0NDgwODU2Nn0.p6vIdr6V4SUHe7gT9JTHKmHE0tZu09T7LnjW1bl4fWU"
  );
  
export default supabase;


