import { createClient } from "@supabase/supabase-js";

/**
 * Browser-safe Supabase client for use in "use client" components.
 *
 * Uses the same NEXT_PUBLIC_ environment variables as the server client.
 * Kept separate for clarity — server components should use `@/lib/supabase`.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey);
