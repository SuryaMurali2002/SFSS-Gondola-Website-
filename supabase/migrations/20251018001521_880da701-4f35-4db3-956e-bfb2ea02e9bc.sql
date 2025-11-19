-- Create petition_signatures table
CREATE TABLE public.petition_signatures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  student_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.petition_signatures ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view signatures count (read-only)
CREATE POLICY "Anyone can view signatures"
ON public.petition_signatures
FOR SELECT
USING (true);

-- Allow anyone to insert their own signature
CREATE POLICY "Anyone can sign petition"
ON public.petition_signatures
FOR INSERT
WITH CHECK (true);

-- Create index on email for faster lookups
CREATE INDEX idx_petition_signatures_email ON public.petition_signatures(email);

-- Create index on created_at for sorting
CREATE INDEX idx_petition_signatures_created_at ON public.petition_signatures(created_at DESC);