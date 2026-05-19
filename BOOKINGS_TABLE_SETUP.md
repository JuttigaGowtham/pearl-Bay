# Setting up the Bookings Table in Supabase

The error you are seeing (`PGRST205: Could not find the table 'public.bookings'`) happens because the `bookings` table has not been created in your Supabase database yet.

Follow these steps to fix it:

1. **Log in to Supabase**
   - Go to [https://supabase.com/dashboard](https://supabase.com/dashboard) and select your project.

2. **Open the SQL Editor**
   - Click on the **SQL Editor** icon in the left sidebar (it looks like a terminal `>_`).

3. **Run the Setup Script**
   - Click **New Query**.
   - Copy the entire content of the file `CREATE_BOOKINGS_TABLE.sql` located in your project root.
   - Paste it into the query editor.
   - Click the **Run** button (bottom right of the editor).

4. **Verify**
   - Look for a "Success" message in the results pane.
   - Go to the **Table Editor** (grid icon in sidebar) and check if the `bookings` table has appeared.

## Troubleshooting

- **Permissions Error**: If you see permission errors, ensure you are the project owner.
- **Already Exists**: The script uses `create table if not exists`, so it is safe to run multiple times, but policy creation might fail if policies already exist. If so, you can ignore those specific errors or delete the policies first.
