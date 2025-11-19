-- Comprehensive fix: Ensure INSERT policy exists for petition signatures
-- Run this in Supabase SQL Editor if form submissions are failing

-- Step 1: Ensure RLS is enabled
ALTER TABLE public.petition_signatures ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop the policy if it exists (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can sign petition" ON public.petition_signatures;

-- Step 3: Create the INSERT policy that allows anyone to sign
CREATE POLICY "Anyone can sign petition"
ON public.petition_signatures
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Step 4: Verify everything is set up correctly
DO $$
DECLARE
  policy_exists boolean;
  rls_enabled boolean;
BEGIN
  -- Check if policy exists
  SELECT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'petition_signatures' 
    AND policyname = 'Anyone can sign petition'
  ) INTO policy_exists;
  
  -- Check if RLS is enabled
  SELECT relrowsecurity FROM pg_class 
  WHERE relname = 'petition_signatures' 
  INTO rls_enabled;
  
  IF NOT policy_exists THEN
    RAISE EXCEPTION 'INSERT policy was not created successfully';
  END IF;
  
  IF NOT rls_enabled THEN
    RAISE EXCEPTION 'RLS is not enabled on petition_signatures table';
  END IF;
  
  RAISE NOTICE '✅ INSERT policy created successfully! Form submissions should work now.';
END $$;

