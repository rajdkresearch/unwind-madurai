import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          user_id: string;
          user_name: string;
          user_email: string;
          hall_id: string;
          hall_name: string;
          date: string;
          slot_type: string;
          slot_time: string;
          guest_count: number;
          special_requests: string | null;
          total_amount: number;
          status: string;
          order_items: string | null;
          order_total: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bookings']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['bookings']['Insert']>;
      };
    };
  };
};
