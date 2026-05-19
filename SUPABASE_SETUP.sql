-- Enable the UUID extension
create extension if not exists "uuid-ossp";

-- Create the Profiles table (publicly available for reading own profile)
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  is_approved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Turn on Row Level Security
alter table public.profiles enable row level security;

-- POLICY: Users can see their own profile
create policy "Users can view own profile" 
on public.profiles for select 
using ( auth.uid() = id );

-- POLICY: Users can insert their own profile (for the initial creation script)
create policy "Users can insert own profile" 
on public.profiles for insert 
with check ( auth.uid() = id );

-- POLICY: Service Role (Admin) has full access
-- Note: Service role bypasses RLS, but explicit policies don't hurt.
-- (Supabase default is to deny all unless policy exists, or role bypasses)

-- Allow Service Role to do everything (implicitly handled by Supabase Service Key usually, 
-- but ensuring 'postgres' or 'service_role' has access is key if you use tailored clients)
grant all on table public.profiles to service_role;
