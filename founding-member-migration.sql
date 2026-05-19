-- Create the table for founding member requests
create table public.founding_requests (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  phone text,
  status text default 'pending', -- 'pending', 'approved', 'rejected'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- (Optional) Enable RLS if you want to restrict public access, 
-- but since the form is public, we might need to allow inserts OR keep it disabled for this table.
-- The API routes use the Service Role Key, so they bypass RLS.
-- This means we don't strictly *need* policies for the API to work, 
-- but it's good practice if you access it from the client directly (which we don't).
