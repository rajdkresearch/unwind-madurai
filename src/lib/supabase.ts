import { createClient } from '@supabase/supabase-js';

// Trim whitespace — .env.local values sometimes have leading spaces
const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

const isConfigured = supabaseUrl.startsWith('https://') && supabaseAnonKey.length > 20;

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key-for-build');

export const isSupabaseConfigured = isConfigured;
