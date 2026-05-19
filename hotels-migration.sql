-- Create the table for hotels
create table public.hotels (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  location text not null,
  description text not null,
  image_url text not null,
  slug text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Optional, but good practice. For now, public read, admin write via service role)
alter table public.hotels enable row level security;

create policy "Enable read access for all users"
on public.hotels for select
using (true);
