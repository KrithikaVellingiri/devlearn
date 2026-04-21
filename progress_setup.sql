-- 1. Create table `course_progress`
CREATE TABLE IF NOT EXISTS public.course_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  course_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  -- Ensure users cannot mark the same lesson twice
  UNIQUE(user_email, course_id, lesson_id)
);

-- 2. Open RLS
ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" 
ON public.course_progress 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert access" 
ON public.course_progress 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update access" 
ON public.course_progress 
FOR UPDATE 
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow public delete access" 
ON public.course_progress 
FOR DELETE 
USING (true);
