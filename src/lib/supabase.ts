import { createClient } from '@supabase/supabase-js';

const envUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hesjpceomicbhwbvqhdx.supabase.co';
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhlc2pwY2VvbWljYmh3YnZxaGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNTYwOTksImV4cCI6MjA5NTczMjA5OX0.hX3JVSe_WLmfVJjvR9qqx2zT0NmL6wc1vT-0hUJLDy0';

export const isSupabaseConfigured = true;

export const supabaseUrl = envUrl;
export const supabaseAnonKey = envKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  }
});

