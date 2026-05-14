export type SlotType = 'lunch' | 'evening' | 'dinner';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

export interface Hall {
  id: string;
  name: string;
  description: string;
  capacity: number;
  amenities: string[];
  price_per_slot: number;
  images: string[];
  area_sqft: number;
  floor: string;
}

export interface TimeSlot {
  id: SlotType;
  label: string;
  time: string;
  icon: string;
  description: string;
}

export interface Booking {
  id: string;
  user_id: string;
  hall_id: string;
  hall_name: string;
  date: string;
  slot_type: SlotType;
  slot_time: string;
  guest_count: number;
  special_requests?: string;
  total_amount: number;
  status: BookingStatus;
  created_at: string;
  order?: Order;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine_type: string;
  image: string;
  rating: number;
  prep_time: string;
  is_veg: boolean;
  popular_tag?: string;
  location: string;
}

export interface MenuItem {
  id: string;
  restaurant_id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  is_veg: boolean;
  is_bestseller?: boolean;
  spice_level?: 'mild' | 'medium' | 'hot';
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  booking_id: string;
  items: CartItem[];
  total_amount: number;
  status: OrderStatus;
  created_at: string;
}
