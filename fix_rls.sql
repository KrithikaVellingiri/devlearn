-- ============================================================
-- FIX: Row Level Security is blocking all SELECT queries.
--
-- ROOT CAUSE:
-- The "courses" table has RLS enabled (Supabase default for new tables)
-- but NO policy exists granting the "anon" role SELECT access.
-- This causes: supabase.from("courses").select("*") → { data: [], error: null }
--
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================================

-- Step 1: Ensure RLS is enabled (idempotent, won't error if already on)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Step 2: Create a SELECT policy allowing both anonymous and authenticated users to read
CREATE POLICY "Allow public read access"
  ON public.courses
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Step 3: Verify it works (should return your 5 courses)
SELECT id, title, category, level FROM public.courses;
