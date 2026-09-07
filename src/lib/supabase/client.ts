import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

/**
 * Supabase client for client-side / browser usage.
 * Uses public anonymous key safe for frontend operations.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
