# Supabase Setup Guide

## 1. Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Sign in or create a new account
3. Create a new project (or select an existing one)
4. Once your project is ready, go to **Settings** → **API**
5. You'll find:
   - **Project URL** - Copy this value
   - **anon/public key** - Copy the `anon` `public` key (not the `service_role` key)

## 2. Environment Variables

A `.env.local` file has been created in the root directory (`nextjs_port/`). 

**Open the `.env.local` file and replace the placeholder values:**

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Example:**
```
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODU2Nzg5MCwiZXhwIjoxOTU0MTQzODkwfQ.example_key_here
```

**Important:** After updating `.env.local`, restart your Next.js dev server for the changes to take effect.

## 2. Create the Bookings Table

In your Supabase dashboard, go to SQL Editor and run the following SQL to create the bookings table:

```sql
-- Create bookings table (IMPORTANT: Use public.bookings)
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL CHECK (guests > 0),
  room_type VARCHAR(50) NOT NULL,
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to insert their own bookings
CREATE POLICY "Users can insert their own bookings"
  ON public.bookings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to view their own bookings
CREATE POLICY "Users can view their own bookings"
  ON public.bookings
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy to allow users to update their own bookings
CREATE POLICY "Users can update their own bookings"
  ON public.bookings
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own bookings
CREATE POLICY "Users can delete their own bookings"
  ON public.bookings
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);
```

**⚠️ IMPORTANT:** Copy the entire SQL script from the file `CREATE_BOOKINGS_TABLE.sql` in this project and paste it into Supabase SQL Editor. The script includes the `public.` schema prefix which is required.

## 3. Authentication Setup

Make sure Authentication is enabled in your Supabase project:
1. Go to Authentication > Settings in your Supabase dashboard
2. Enable Email authentication
3. Configure email templates if needed

## 4. Flow Overview

1. User clicks "Book Now" button → Redirects to `/signup`
2. User signs up → Redirects to `/signin`
3. User signs in → Redirects to `/book-now`
4. User fills booking form → Data is saved to Supabase `bookings` table

## Notes

- The booking form includes: check-in date, check-out date, number of guests, room type, and special requests
- All bookings are stored securely with Row Level Security (RLS) enabled
- Users can only access their own bookings

