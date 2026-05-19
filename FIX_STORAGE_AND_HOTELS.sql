-- 1. Create Hotels Table if not exists
create table if not exists public.hotels (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  location text not null,
  description text not null,
  image_url text not null,
  slug text,
  price text,
  website_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Add columns if they missed previous steps (safely)
do $$ 
begin 
  if not exists (select 1 from information_schema.columns where table_name = 'hotels' and column_name = 'price') then
    alter table hotels add column price text;
  end if;

  if not exists (select 1 from information_schema.columns where table_name = 'hotels' and column_name = 'website_url') then
    alter table hotels add column website_url text;
  end if;
end $$;

-- 3. Enable RLS on hotels
alter table public.hotels enable row level security;

-- 4. Create Access Policies for Hotels
-- Allow everyone to read hotels
create policy "Public can view hotels" 
on public.hotels for select 
to public 
using (true);

-- Allow authenticated users (admins) to insert/update/delete hotels
-- Note: In a real app you might want a specific 'admin' role check
create policy "Admins can insert hotels" 
on public.hotels for insert 
to authenticated 
with check (true);

create policy "Admins can update hotels" 
on public.hotels for update 
to authenticated 
using (true);

create policy "Admins can delete hotels" 
on public.hotels for delete 
to authenticated 
using (true);


-- 5. Storage Setup
-- Create the bucket 'hotel-images' if it doesn't represent
insert into storage.buckets (id, name, public)
values ('hotel-images', 'hotel-images', true)
on conflict (id) do update set public = true;

-- 6. Storage Policies
-- Allow public access to view images
create policy "Public Access"
on storage.objects for select
to public
using ( bucket_id = 'hotel-images' );

-- Allow authenticated users to upload images
create policy "Auth Insert"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'hotel-images' );
