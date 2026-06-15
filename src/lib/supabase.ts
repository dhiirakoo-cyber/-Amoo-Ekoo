import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://hesjpceomicbhwbvqgdx.supabase.co';
export const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhlc2pwY2VvbWljYmh3YnZxaGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNTYwOTksImV4cCI6MjA5NTczMjA5OX0.hX3JVSe_WLmfVJjvR9qqx2zT0NmL6wc1vT-0hUJLDy0';

export const isSupabaseConfigured = true;

// Explicitly binding exactly to the window's native fetch to avoid proxy or environment issues
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    fetch: (...args) => fetch(...args),
  },
});

