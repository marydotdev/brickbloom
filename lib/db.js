import { createClient } from "@supabase/supabase-js";

let db = null;

if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  db = createClient(supabaseUrl, supabaseKey);
}

module.exports = db;
