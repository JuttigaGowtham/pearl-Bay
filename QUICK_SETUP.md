# Quick Setup - Fix "Supabase Not Configured" Error

## Option 1: Manual File Creation (Recommended)

1. **Create `.env.local` file** in the `nextjs_port` folder:
   - Right-click in the `nextjs_port` folder
   - Create a new file named `.env.local` (make sure it starts with a dot)
   - Or use your code editor to create it

2. **Add these lines to the file:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

3. **Get your Supabase credentials:**
   - Go to https://app.supabase.com
   - Sign in or create an account
   - Create a new project (or use existing)
   - Go to **Settings** → **API**
   - Copy the **Project URL** and **anon public key**
   - Paste them into `.env.local` replacing the placeholder values

4. **Restart your dev server:**
   - Stop the server (Ctrl+C)
   - Run `npm run dev` again

## Option 2: Using Terminal/Command Prompt

Open terminal in the `nextjs_port` folder and run:

**Windows (PowerShell):**
```powershell
@"
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
"@ | Out-File -FilePath .env.local -Encoding utf8
```

**Windows (CMD):**
```cmd
echo NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here > .env.local
echo NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here >> .env.local
```

**Mac/Linux:**
```bash
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
EOF
```

Then edit the file and replace the placeholder values with your actual Supabase credentials.

## Where to Get Supabase Credentials

1. Visit: https://app.supabase.com
2. Sign in or create account
3. Create/select a project
4. Go to **Settings** (gear icon) → **API**
5. Copy:
   - **Project URL** → paste as `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → paste as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Example .env.local file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODU2Nzg5MCwiZXhwIjoxOTU0MTQzODkwfQ.example_key_here
```

## After Setup

1. Save the `.env.local` file
2. **Restart your Next.js dev server** (important!)
3. The error should be gone and you'll see the signup form

For detailed instructions, see [GET_SUPABASE_CREDENTIALS.md](./GET_SUPABASE_CREDENTIALS.md)

