-- Tighten petition_signatures read access and provide a safe aggregate endpoint

-- Remove the previous blanket SELECT policy, if it exists
DROP POLICY IF EXISTS "Anyone can view signatures" ON public.petition_signatures;

-- Create a SECURITY DEFINER function that only returns the count
-- This function allows anonymous users to see the total signature count
-- without exposing any personal information (names, emails, etc.)
CREATE OR REPLACE FUNCTION public.petition_signature_count()
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT count(*) FROM public.petition_signatures;
$$;

-- Add comment to function for documentation
COMMENT ON FUNCTION public.petition_signature_count() IS 
  'Returns the total count of petition signatures. Safe for public access - does not expose personal data.';

-- Ensure anonymous clients can execute the aggregate function
GRANT EXECUTE ON FUNCTION public.petition_signature_count() TO anon;

