'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CalendarDays, Users, Clock, Check, X, AlertCircle, Loader2, ShoppingCart, RefreshCw, Plus } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import { formatCurrency, formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface BookingRecord {
  id: string;
  user_id: string;
  hall_name: string;
  hall_id: string;
  date: string;
  slot_type: string;
  slot_time: string;
  guest_count: number;
  special_requests?: string;
  total_amount: number;
  order_total: number;
  status: string;
  created_at: string;
  order_items?: string;
}

const statusConfig = {
  confirmed: { label: 'Confirmed', color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20', icon: Check },
  pending: { label: 'Pending', color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20', icon: Clock },
  cancelled: { label: 'Cancelled', color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20', icon: X },
  completed: { label: 'Completed', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20', icon: Check },
};

const slotIcons: Record<string, string> = { lunch: '☀️', evening: '🌅', dinner: '🌙' };
const hallIcons: Record<string, string> = { 'royal-hall': '🏛', 'garden-suite': '🌿', 'crystal-room': '💎', 'heritage-lounge': '🏺' };

function BookingCard({ booking, onCancel }: { booking: BookingRecord; onCancel: (id: string) => void }) {
  const status = statusConfig[booking.status as keyof typeof statusConfig] || statusConfig.pending;
  const StatusIcon = status.icon;
  const isPast = new Date(booking.date) < new Date();
  const orderItems = booking.order_items ? JSON.parse(booking.order_items) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 hover:border-gold/30 transition-all"
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-2xl">
            {hallIcons[booking.hall_id] || '🏛'}
          </div>
          <div>
            <h3 className="font-bold text-white">{booking.hall_name}</h3>
            <div className="text-xs text-white/40 font-mono mt-0.5">{booking.id.slice(0, 8).toUpperCase()}</div>
          </div>
        </div>
        <div className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold', status.bg, status.color)}>
          <StatusIcon size={10} />
          {status.label}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        <div className="bg-white/5 rounded-xl p-3">
          <div className="text-white/40 text-xs mb-1 flex items-center gap-1"><CalendarDays size={10} />Date</div>
          <div className="font-semibold text-white text-sm">{new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
        </div>
        <div className="bg-white/5 rounded-xl p-3">
          <div className="text-white/40 text-xs mb-1 flex items-center gap-1"><Clock size={10} />Slot</div>
          <div className="font-semibold text-white text-sm">{slotIcons[booking.slot_type]} {booking.slot_type.charAt(0).toUpperCase() + booking.slot_type.slice(1)}</div>
          <div className="text-white/30 text-xs">{booking.slot_time}</div>
        </div>
        <div className="bg-white/5 rounded-xl p-3">
          <div className="text-white/40 text-xs mb-1 flex items-center gap-1"><Users size={10} />Guests</div>
          <div className="font-semibold text-white text-sm">{booking.guest_count} persons</div>
        </div>
      </div>

      {/* Food order summary */}
      {orderItems.length > 0 && (
        <div className="border-t border-white/5 pt-4 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-white/40 mb-2">
            <ShoppingCart size={10} />Food Order ({orderItems.length} items)
          </div>
          <div className="flex flex-wrap gap-1.5">
            {orderItems.slice(0, 3).map((item: any) => (
              <span key={item.id} className="px-2 py-0.5 bg-white/5 border border-white/5 text-white/50 text-xs rounded-full">
                {item.name} ×{item.quantity}
              </span>
            ))}
            {orderItems.length > 3 && <span className="text-white/30 text-xs">+{orderItems.length - 3} more</span>}
          </div>
        </div>
      )}

      {booking.special_requests && (
        <div className="border-t border-white/5 pt-3 mb-4">
          <p className="text-xs text-white/30"><span className="text-white/40">Request: </span>{booking.special_requests}</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-white/30">Total Paid</div>
          <div className="text-lg font-bold text-gold">{formatCurrency(booking.total_amount)}</div>
        </div>
        {booking.status === 'confirmed' && !isPast && (
          <button
            onClick={() => onCancel(booking.id)}
            className="flex items-center gap-1.5 px-3 py-2 border border-red-500/20 text-red-400 text-xs rounded-xl hover:bg-red-500/5 transition-all"
          >
            <X size={12} /> Cancel Booking
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function MyBookingsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const loadBookings = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch {
      // Fallback: load from localStorage
      const stored = JSON.parse(localStorage.getItem('unwind_bookings') || '[]');
      const userBookings = stored.filter((b: BookingRecord) => b.user_id === user.id || !b.user_id);
      setBookings(userBookings);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (!user) { router.push('/login?redirect=/my-bookings'); return; }
      loadBookings();
    }
  }, [user, authLoading]);

  const cancelBooking = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', id);
    } catch {
      // Fallback: update localStorage
      const stored = JSON.parse(localStorage.getItem('unwind_bookings') || '[]');
      const updated = stored.map((b: BookingRecord) => b.id === id ? { ...b, status: 'cancelled' } : b);
      localStorage.setItem('unwind_bookings', JSON.stringify(updated));
    }
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
  };

  const now = new Date().toISOString().split('T')[0];
  const filtered = bookings.filter(b => {
    if (filter === 'upcoming') return b.date >= now && b.status !== 'cancelled';
    if (filter === 'past') return b.date < now || b.status === 'cancelled';
    return true;
  });

  if (authLoading || (!user && loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-2">Account</div>
          <h1 className="text-4xl font-bold">My Bookings</h1>
          {user && <p className="text-white/40 mt-1 text-sm">Signed in as {user.name}</p>}
        </div>
        <div className="flex gap-2 mt-2">
          <button onClick={loadBookings} className="p-2 border border-white/10 rounded-xl text-white/40 hover:text-white hover:border-white/20 transition-all">
            <RefreshCw size={16} />
          </button>
          <Link href="/book" className="flex items-center gap-1.5 px-4 py-2 bg-gold text-black font-bold text-sm rounded-xl hover:bg-gold/90 transition-all">
            <Plus size={14} /> New Booking
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8">
        {(['all', 'upcoming', 'past'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn('px-4 py-2 rounded-full text-xs font-semibold transition-all capitalize',
              filter === f ? 'bg-gold text-black' : 'bg-white/5 border border-white/10 text-white/50 hover:border-gold/30')}>
            {f}
            {f === 'all' && bookings.length > 0 && <span className="ml-1.5 px-1.5 py-0.5 bg-black/20 rounded-full text-[9px]">{bookings.length}</span>}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-20">
          <Loader2 size={32} className="animate-spin text-gold mx-auto mb-3" />
          <p className="text-white/40 text-sm">Loading your bookings...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">{filter === 'upcoming' ? '📅' : '🏛'}</div>
          <h3 className="text-xl font-bold text-white mb-2">
            {filter === 'upcoming' ? 'No upcoming bookings' : filter === 'past' ? 'No past bookings' : 'No bookings yet'}
          </h3>
          <p className="text-white/40 text-sm mb-8">Reserve your first exclusive space at Unwind Madurai</p>
          <Link href="/book"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black font-bold rounded-xl hover:bg-gold/90 transition-all">
            Book a Space
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {filtered.map(booking => (
            <BookingCard key={booking.id} booking={booking} onCancel={cancelBooking} />
          ))}
        </div>
      )}
    </div>
  );
}
