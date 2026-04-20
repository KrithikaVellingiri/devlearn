-- ============================================================
-- ENROLLMENT SYSTEM SETUP
--
-- Creates the enrollments table and open RLS policies.
-- Run this in: Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================================

-- Step 1: Create the enrollments table
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email TEXT NOT NULL,
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    -- Prevent duplicate enrollments
    UNIQUE (user_email, course_id)
);

-- Step 2: Enable Row Level Security
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Step 3: Open SELECT policy (temporary — tighten when Supabase Auth is wired up)
CREATE POLICY "Allow all select on enrollments"
  ON public.enrollments
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Step 4: Open INSERT policy (temporary — tighten when Supabase Auth is wired up)
CREATE POLICY "Allow all insert on enrollments"
  ON public.enrollments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Step 5: Verify (should return 0 rows initially)
SELECT * FROM public.enrollments LIMIT 5;
