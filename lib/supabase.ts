import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create a function to get supabase client
// This allows the app to load even if env vars are missing
function createSupabaseClient(): SupabaseClient | null {
  let url = supabaseUrl?.trim()
  const key = supabaseAnonKey?.trim()

  if (!url || !key) {
    console.warn('Missing Supabase environment variables. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file')
    return null
  }

  // Robust URL handling
  if (!url.startsWith('http')) {
    if (url.includes('.supabase.co')) {
      url = `https://${url}`;
    } else {
      console.error('Invalid NEXT_PUBLIC_SUPABASE_URL: Must start with https://');
      return null;
    }
  }

  // Basic validation to prevent "Failed to fetch" due to protocol mismatch
  if (!url.startsWith('https://')) {
    console.warn('Warning: Supabase URL should ideally use https://');
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      // Handle token refresh errors gracefully
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    },
  })
}

// Export the client (will be null if env vars are missing)
export const supabase = createSupabaseClient()

// Helper function to check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return supabase !== null
}

