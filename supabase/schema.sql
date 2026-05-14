-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Bookings table (stores all booking data)
create table if not exists bookings (
  id uuid primary key default uuid_generate_v4(),
  user_id text not null,
  user_name text not null,
  user_email text not null,
  hall_id text not null,
  hall_name text not null,
  date date not null,
  slot_type text not null check (slot_type in ('lunch', 'evening', 'dinner')),
  slot_time text not null,
  guest_count integer not null check (guest_count > 0),
  special_requests text,
  total_amount numeric(10,2) not null,
  status text not null default 'confirmed' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  order_items jsonb,
  order_total numeric(10,2) default 0,
  created_at timestamptz default now()
);

-- Index for fast user lookups
create index if not exists bookings_user_id_idx on bookings(user_id);
create index if not exists bookings_date_idx on bookings(date);
create index if not exists bookings_hall_slot_idx on bookings(hall_id, date, slot_type);

-- Enable Row Level Security
alter table bookings enable row level security;

-- Policy: users can only see their own bookings
create policy "Users can view own bookings"
  on bookings for select
  using (auth.uid()::text = user_id);

-- Policy: users can insert their own bookings
create policy "Users can insert own bookings"
  on bookings for insert
  with check (auth.uid()::text = user_id);

-- Policy: users can update their own bookings (for cancellation)
create policy "Users can update own bookings"
  on bookings for update
  using (auth.uid()::text = user_id);

-- View for availability check (public read — no auth needed to check availability)
create or replace view hall_availability as
  select hall_id, date, slot_type, count(*) as bookings_count
  from bookings
  where status != 'cancelled'
  group by hall_id, date, slot_type;
