# How to Get Your Supabase Credentials

## Step-by-Step Guide

### Step 1: Create a Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign in"
3. Sign up with GitHub, Google, or email

### Step 2: Create a New Project
1. Click "New Project" in your dashboard
2. Fill in:
   - **Name**: Your project name (e.g., "Casa Angelina")
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose the closest region
3. Click "Create new project"
4. Wait 2-3 minutes for the project to be set up

### Step 3: Get Your API Credentials
1. In your project dashboard, click **Settings** (gear icon in the left sidebar)
2. Click **API** in the settings menu
3. You'll see two important values:

   **Project URL:**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```
   Copy this entire URL

   **anon public key:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODU2Nzg5MCwiZXhwIjoxOTU0MTQzODkwfQ.xxxxxxxxxxxxx
   ```
   Copy the `anon` `public` key (it's a long string starting with `eyJ...`)

### Step 4: Add Credentials to .env.local
1. Open the `.env.local` file in your project root (`nextjs_port/.env.local`)
2. Replace the placeholder values:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. Save the file

### Step 5: Restart Your Dev Server
1. Stop your Next.js dev server (Ctrl+C)
2. Start it again:
   ```bash
   npm run dev
   ```

### Step 6: Verify It Works
1. Go to your signup page
2. The "Supabase Not Configured" message should be gone
3. You should see the signup form

## Troubleshooting

**Still seeing "Supabase Not Configured"?**
- Make sure `.env.local` is in the `nextjs_port/` folder (not in the parent directory)
- Check that the variable names are exactly:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Make sure there are no extra spaces or quotes around the values
- Restart your dev server after making changes

**Can't find the API settings?**
- Make sure you're in the correct project
- The Settings icon is usually at the bottom of the left sidebar
- Look for "API" in the settings menu

**Need help?**
- Visit [Supabase Documentation](https://supabase.com/docs)
- Check the [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) file for database setup

