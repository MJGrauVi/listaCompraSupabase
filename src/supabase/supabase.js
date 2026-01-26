import { createClient } from "@supabase/supabase-js";

//Codigo para la práctica de clase para Juan Carlos.

/* const supabaseConexion = createClient("https://ktuyvthfmlgageeouneg.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0dXl2dGhmbWxnYWdlZW91bmVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3ODczMzAsImV4cCI6MjA4NDM2MzMzMH0.zlFO0iAH1eC7OFh-CetmJMTspWXh5r5n6fN324f55RQ" ,
    
); */

const supabaseConexion = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY,
);
export { supabaseConexion };
