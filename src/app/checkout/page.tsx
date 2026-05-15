'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, ShoppingCart, CalendarDays, Users, Clock, Minus, Plus, Trash2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '@/components/providers/CartProvider';
import { useBooking } from '@/components/providers/BookingProvider';
import { useAuth } from '@/components/providers/AuthProvider';
import { timeSlots } from '@/lib/data/halls';
import { formatCurrency, formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { cart, cartTotal, cartCount, updateQuantity, removeFromCart, clearCart } = useCart();
  const { selectedHall, selectedDate, selectedSlot, guestCount, specialRequests, resetBooking } = useBooking();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [error, setError] = useState('');

  const slotInfo = timeSlots.find(s => s.id === selectedSlot);
  const hallTotal = selectedHall?.price_per_slot || 0;
  const grandTotal = hallTotal + cartTotal;

  const hasBookingDetails = selectedHall && selectedDate && selectedSlot;
  const isReady = hasBookingDetails && user;

  const handleConfirmBooking = async () => {
    if (!isReady) {
      setError('Please complete your booking details first.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const bookingData = {
        user_id: user.id,
        user_name: user.name,
        user_email: user.email,
        hall_id: selectedHall!.id,
        hall_name: selectedHall!.name,
        date: selectedDate,
        slot_type: selectedSlot,
        slot_time: slotInfo?.time || '',
        guest_count: guestCount,
        special_requests: specialRequests || null,
        total_amount: grandTotal,
        status: 'confirmed',
        order_items: cart.length > 0 ? JSON.stringify(cart) : null,
        order_total: cartTotal,
      };

      // Always save to localStorage (instant, works offline)
      let savedId = `BK${Date.now()}`;
      const stored = JSON.parse(localStorage.getItem('unwind_bookings') || '[]');
      stored.unshift({ ...bookingData, id: savedId, created_at: new Date().toISOString() });
      localStorage.setItem('unwind_bookings', JSON.stringify(stored));

      // Also save to Supabase if configured
      if (isSupabaseConfigured) {
        try {
          const { data, error: sbError } = await supabase.from('bookings').insert([bookingData]).select().single();
          if (!sbError && data) savedId = data.id;
        } catch { /* localStorage already saved */ }
      }

      setBookingId(savedId);
      setSuccess(true);
      clearCart();
      resetBooking();
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-24 h-24 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center mx-auto mb-6">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }}>
              <Check size={40} className="text-gold" />
            </motion.div>
          </div>
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">Booking Confirmed!</h2>
          <p className="text-[#6B6460] mb-2">Your space is reserved.</p>
          <div className="font-mono text-gold text-sm bg-gold/10 border border-gold/20 rounded-lg px-4 py-2 inline-block mb-8">
            {bookingId.slice(0, 8).toUpperCase()}
          </div>
          <div className="glass-card p-5 mb-8 text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#9C948E]">Confirmation ID</span>
              <span className="text-[#1A1A1A] font-mono text-xs">{bookingId.slice(0, 16)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#9C948E]">Email sent to</span>
              <span className="text-[#1A1A1A]">{user?.email}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => router.push('/my-bookings')}
              className="flex-1 py-3 bg-gold text-white font-bold rounded-xl hover:bg-gold/90 transition-all">
              View My Bookings
            </button>
            <button onClick={() => router.push('/')}
              className="px-4 py-3 border border-[#EDE8DF] text-[#6B6460] rounded-xl hover:bg-gray-50 transition-all text-sm">
              Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-16 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="mb-8">
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[#6B6460] hover:text-[#1A1A1A] text-sm mb-4 transition-colors">
          <ArrowLeft size={14} /> Back
        </button>
        <h1 className="text-4xl font-bold text-[#1A1A1A]">Checkout</h1>
        <p className="text-[#6B6460] mt-1">Review your booking and confirm</p>
      </div>

      {!hasBookingDetails && (
        <div className="glass-card p-5 mb-6 flex items-center gap-3 border-amber-200 bg-amber-50">
          <AlertCircle size={18} className="text-amber-500 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-[#1A1A1A]">No booking selected</p>
            <p className="text-xs text-[#6B6460] mt-0.5">
              {!selectedHall ? 'Pick a hall. ' : ''}
              {!selectedDate || !selectedSlot ? 'Choose a date and time slot.' : ''}
            </p>
          </div>
          <button onClick={() => router.push('/book')}
            className="ml-auto shrink-0 px-3 py-1.5 bg-amber-100 border border-amber-200 text-amber-700 text-xs rounded-lg hover:bg-amber-200 transition-all">
            Book a Space
          </button>
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left: Order details */}
        <div className="lg:col-span-3 space-y-5">
          {/* Booking Summary */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <CalendarDays size={16} className="text-gold" />
              <h3 className="font-bold text-[#1A1A1A]">Booking Details</h3>
            </div>
            {selectedHall ? (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#9C948E]">Space</span>
                  <span className="text-[#1A1A1A] font-medium">{selectedHall.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9C948E]">Date</span>
                  <span className="text-[#1A1A1A] font-medium">{selectedDate ? formatDate(selectedDate) : '—'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9C948E]">Slot</span>
                  <span className="text-[#1A1A1A] font-medium">{slotInfo ? `${slotInfo.label} · ${slotInfo.time}` : '—'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#9C948E]">Guests</span>
                  <span className="text-[#1A1A1A] font-medium"><Users size={12} className="inline mr-1" />{guestCount} persons</span>
                </div>
                {specialRequests && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9C948E]">Requests</span>
                    <span className="text-[#6B6460] text-right max-w-[60%] text-xs">{specialRequests}</span>
                  </div>
                )}
                <div className="border-t border-[#EDE8DF] pt-3 flex justify-between">
                  <span className="text-[#6B6460] text-sm">Hall charge</span>
                  <span className="text-gold font-bold">{formatCurrency(hallTotal)}</span>
                </div>
              </div>
            ) : (
              <p className="text-[#9C948E] text-sm">No booking selected. <button onClick={() => router.push('/book')} className="text-gold">Book a space →</button></p>
            )}
          </div>

          {/* Cart Items */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <ShoppingCart size={16} className="text-gold" />
              <h3 className="font-bold text-[#1A1A1A]">Food Order {cartCount > 0 && <span className="text-[#9C948E] font-normal text-sm">({cartCount} items)</span>}</h3>
            </div>
            {cart.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-[#9C948E] text-sm mb-3">No food ordered</p>
                <button onClick={() => router.push('/menu')}
                  className="text-gold text-sm hover:underline">Browse menus →</button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <div className={cn('w-3 h-3 rounded border-2 flex items-center justify-center', item.is_veg ? 'border-green-500' : 'border-red-500')}>
                          <div className={cn('w-1.5 h-1.5 rounded-full', item.is_veg ? 'bg-green-500' : 'bg-red-500')} />
                        </div>
                        <p className="text-sm font-medium text-[#1A1A1A] truncate">{item.name}</p>
                      </div>
                      <p className="text-xs text-[#9C948E]">{formatCurrency(item.price)} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-gray-50 border border-[#EDE8DF] flex items-center justify-center text-[#1A1A1A] hover:bg-gray-100">
                        <Minus size={11} />
                      </button>
                      <span className="text-[#1A1A1A] font-bold text-sm w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-gray-50 border border-[#EDE8DF] flex items-center justify-center text-[#1A1A1A] hover:bg-gray-100">
                        <Plus size={11} />
                      </button>
                    </div>
                    <div className="w-16 text-right">
                      <p className="text-sm font-semibold text-[#1A1A1A]">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <div className="border-t border-[#EDE8DF] pt-3 flex justify-between">
                  <span className="text-[#6B6460] text-sm">Food total</span>
                  <span className="text-[#1A1A1A] font-bold">{formatCurrency(cartTotal)}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Payment Summary */}
        <div className="lg:col-span-2">
          <div className="sticky top-28 glass-card p-6">
            <h3 className="font-bold text-[#1A1A1A] mb-5">Payment Summary</h3>
            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-[#6B6460]">Hall booking</span>
                <span className="text-[#1A1A1A]">{formatCurrency(hallTotal)}</span>
              </div>
              {cartTotal > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6460]">Food order ({cartCount} items)</span>
                  <span className="text-[#1A1A1A]">{formatCurrency(cartTotal)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-[#6B6460]">Service charge</span>
                <span className="text-green-600 text-xs">Included</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B6460]">GST (18%)</span>
                <span className="text-[#9C948E] text-xs">Included in price</span>
              </div>
            </div>

            <div className="border-t border-[#EDE8DF] pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#1A1A1A]">Grand Total</span>
                <span className="text-2xl font-bold text-gold">{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs flex items-center gap-2">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            {!user ? (
              <div className="space-y-3">
                <div className="p-4 bg-gold/5 border border-gold/20 rounded-xl text-center">
                  <p className="text-sm font-semibold text-[#1A1A1A] mb-1">Almost there!</p>
                  <p className="text-xs text-[#6B6460] mb-3">Sign in to confirm your booking. Takes just a second.</p>
                  <button
                    onClick={() => router.push('/login?redirect=/checkout')}
                    className="w-full py-3 bg-gold text-white font-bold rounded-xl hover:bg-gold/90 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path fill="white" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="white" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="white" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="white" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign In with Google to Confirm
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleConfirmBooking}
                disabled={loading || !hasBookingDetails}
                className="w-full py-4 bg-gold text-white font-bold rounded-xl hover:bg-gold/90 transition-all disabled:opacity-40 flex items-center justify-center gap-2 text-sm"
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> Processing...</> : `Confirm Booking · ${formatCurrency(grandTotal)}`}
              </button>
            )}

            <p className="text-center text-[#9C948E] text-xs mt-4">
              Pay at the venue · Secure & Safe
            </p>

            <div className="mt-5 p-3 bg-gold/5 border border-gold/15 rounded-xl">
              <p className="text-xs text-[#6B6460] leading-relaxed">
                <span className="text-gold font-semibold">Cancellation policy:</span> Free cancellation up to 24 hours before your booking. After that, 50% of the hall charge applies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
