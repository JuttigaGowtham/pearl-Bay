-- Create the bookings table
create table if not exists public.bookings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users not null,
  check_in date not null,
  check_out date not null,
  guests integer not null,
  room_type text not null,
  special_requests text
);

-- Enable Row Level Security (RLS)
alter table public.bookings enable row level security;

-- Create Policy: Users can insert their own bookings
create policy "Users can insert their own bookings"
  on public.bookings for insert
  with check (auth.uid() = user_id);

-- Create Policy: Users can view their own bookings
create policy "Users can view their own bookings"
  on public.bookings for select
  using (auth.uid() = user_id);

-- Create Policy: Users can update their own bookings (optional, but good to have)
create policy "Users can update their own bookings"
  on public.bookings for update
  using (auth.uid() = user_id);

-- Grant access to authenticated users
grant all on table public.bookings to authenticated;
grant all on table public.bookings to service_role;
