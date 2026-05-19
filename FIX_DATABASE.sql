-- 1. Create Profiles Table if not exists
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  is_approved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Enable RLS
alter table public.profiles enable row level security;

-- 3. Drop existing policies to avoid conflicts if re-running
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;

-- 4. Create Policies
create policy "Users can view own profile" 
on public.profiles for select 
using ( auth.uid() = id );

create policy "Users can insert own profile" 
on public.profiles for insert 
with check ( auth.uid() = id );

-- 5. Grant Permissions to Service Role (Fixes Admin Dashboard Error)
grant all on table public.profiles to service_role;

-- 6. Confirmation
select 'SUCCESS: Profiles table created and permissions granted.' as result;
