'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ChevronRight, Info, Check, Loader2, CalendarDays, Clock, ArrowRight, Lock } from 'lucide-react';
import { halls, timeSlots } from '@/lib/data/halls';
import { useBooking } from '@/components/providers/BookingProvider';
import { useAuth } from '@/components/providers/AuthProvider';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Hall, SlotType } from '@/types';

function minDate() {
  const d = new Date(); d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

/** Returns hall IDs already booked for the given date + slot (from localStorage) */
function getBookedHallIds(date: string, slot: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const bookings = JSON.parse(localStorage.getItem('unwind_bookings') || '[]');
    return bookings
      .filter((b: { date: string; slot_type: string; status: string; hall_id: string }) =>
        b.date === date && b.slot_type === slot && b.status !== 'cancelled')
      .map((b: { hall_id: string }) => b.hall_id);
  } catch { return []; }
}

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const {
    selectedHall, selectedDate, selectedSlot, guestCount, specialRequests,
    setSelectedHall, setSelectedDate, setSelectedSlot, setGuestCount, setSpecialRequests,
  } = useBooking();

  // New step order: 1 = Date & Slot, 2 = Choose Space, 3 = Guest Details
  const [step, setStep] = useState(1);
  const [bookedHallIds, setBookedHallIds] = useState<string[]>([]);

  const preSelectedHallId = searchParams.get('hall');

  // Pre-highlight hall from URL (but still start at step 1)
  useEffect(() => {
    if (preSelectedHallId) {
      const hall = halls.find(h => h.id === preSelectedHallId);
      if (hall) setSelectedHall(hall);
    }
  }, [preSelectedHallId, setSelectedHall]);

  // Refresh availability whenever date/slot changes
  useEffect(() => {
    if (selectedDate && selectedSlot) {
      setBookedHallIds(getBookedHallIds(selectedDate, selectedSlot));
    }
  }, [selectedDate, selectedSlot]);

  const canProceedToStep2 = !!selectedDate && !!selectedSlot;

  const handleSelectHall = (hall: Hall) => {
    setSelectedHall(hall);
    // Auto-advance to guest details
    setStep(3);
  };

  const handleProceedToMenu = () => {
    if (!selectedHall || !selectedDate || !selectedSlot) return;
    router.push('/menu');
  };

  const slotTime = timeSlots.find(s => s.id === selectedSlot)?.time || '';
  const stepLabels = ['Date & Slot', 'Choose Space', 'Guest Details'];

  return (
    <div className="min-h-screen bg-white pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="mb-10">
        <div className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Book a Space</div>
        <h1 className="text-4xl font-bold text-[#1A1A1A]">Reserve Your Experience</h1>
        <p className="text-[#6B6460] mt-2">Pick your date and time — we'll show what's available</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-10">
        {stepLabels.map((label, i) => {
          const s = i + 1;
          return (
            <div key={label} className="flex items-center gap-2">
              <button
                onClick={() => s < step && setStep(s)}
                className={cn('flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all',
                  step === s ? 'bg-gold text-white' :
                  step > s ? 'bg-gold/15 text-gold cursor-pointer hover:bg-gold/25' :
                  'bg-gray-100 text-gray-400 cursor-default')}
              >
                {step > s ? <Check size={12} /> : <span>{s}</span>}
                <span className="hidden sm:inline">{label}</span>
              </button>
              {i < 2 && <ChevronRight size={14} className="text-gray-300" />}
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">

            {/* ── Step 1: Date & Time Slot ── */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <div className="glass-card p-6 mb-6">
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
                    <CalendarDays size={15} className="text-gold" /> Select Date
                  </label>
                  <input
                    type="date"
                    min={minDate()}
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="premium-input text-sm"
                  />
                </div>

                <div className="glass-card p-6 mb-6">
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
                    <Clock size={15} className="text-gold" /> Select Time Slot
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {timeSlots.map(slot => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot.id as SlotType)}
                        className={cn('p-4 rounded-xl border text-center transition-all',
                          selectedSlot === slot.id
                            ? 'border-gold bg-gold/5 shadow-sm shadow-gold/10'
                            : 'border-[#EDE8DF] bg-white hover:border-gold/40')}
                      >
                        <div className="text-2xl mb-2">{slot.icon}</div>
                        <div className={cn('font-bold text-sm', selectedSlot === slot.id ? 'text-gold' : 'text-[#1A1A1A]')}>
                          {slot.label}
                        </div>
                        <div className="text-[#9C948E] text-xs mt-1">{slot.time}</div>
                        <div className="text-[#9C948E] text-[10px] mt-0.5 line-clamp-1">{slot.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!canProceedToStep2}
                  className="w-full py-3.5 bg-gold text-white font-bold rounded-xl disabled:opacity-40 hover:bg-gold/90 transition-all flex items-center justify-center gap-2"
                >
                  Find Available Spaces <ArrowRight size={16} />
                </button>
              </motion.div>
            )}

            {/* ── Step 2: Choose Hall (with availability) ── */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A]">Available spaces for</p>
                    <p className="text-gold font-bold">
                      {selectedDate ? new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long' }) : ''} · {timeSlots.find(s => s.id === selectedSlot)?.label}
                    </p>
                  </div>
                  <button onClick={() => setStep(1)} className="text-xs text-[#6B6460] hover:text-gold transition-colors underline underline-offset-2">
                    Change date/slot
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {halls.map(hall => {
                    const isBooked = bookedHallIds.includes(hall.id);
                    return (
                      <HallCard
                        key={hall.id}
                        hall={hall}
                        selected={selectedHall?.id === hall.id}
                        unavailable={isBooked}
                        onSelect={() => !isBooked && handleSelectHall(hall)}
                      />
                    );
                  })}
                </div>

                {bookedHallIds.length > 0 && (
                  <p className="mt-4 text-xs text-[#9C948E] flex items-center gap-1.5">
                    <Lock size={10} /> Greyed-out spaces are already booked for this slot.
                  </p>
                )}
              </motion.div>
            )}

            {/* ── Step 3: Guest Details ── */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                {/* Selected hall preview */}
                {selectedHall && (
                  <div className="glass-card overflow-hidden mb-6 flex items-center gap-4 p-4">
                    <img src={selectedHall.images[0]} alt={selectedHall.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gold font-semibold uppercase tracking-wider">Selected Space</p>
                      <h3 className="font-bold text-[#1A1A1A] text-sm">{selectedHall.name}</h3>
                      <p className="text-[#9C948E] text-xs">{selectedHall.floor} · Up to {selectedHall.capacity} guests</p>
                    </div>
                    <button onClick={() => setStep(2)} className="text-xs text-gold hover:underline shrink-0">Change</button>
                  </div>
                )}

                <div className="glass-card p-6 mb-6">
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Number of Guests</label>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="w-10 h-10 rounded-lg bg-gray-50 border border-[#EDE8DF] text-[#1A1A1A] hover:bg-gray-100 transition-all text-lg font-bold">−</button>
                    <div className="flex-1 text-center">
                      <div className="text-3xl font-bold text-gold">{guestCount}</div>
                      <div className="text-xs text-[#9C948E] mt-0.5">
                        <Users size={10} className="inline mr-1" />guests
                        {selectedHall && guestCount > selectedHall.capacity && (
                          <span className="text-red-500 ml-2">Exceeds capacity ({selectedHall.capacity})</span>
                        )}
                      </div>
                    </div>
                    <button onClick={() => setGuestCount(Math.min(selectedHall?.capacity || 50, guestCount + 1))}
                      className="w-10 h-10 rounded-lg bg-gray-50 border border-[#EDE8DF] text-[#1A1A1A] hover:bg-gray-100 transition-all text-lg font-bold">+</button>
                  </div>
                  {selectedHall && (
                    <p className="text-xs text-[#9C948E] mt-3 flex items-center gap-1.5">
                      <Info size={10} /> Max capacity: {selectedHall.capacity} guests
                    </p>
                  )}
                </div>

                <div className="glass-card p-6 mb-6">
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">
                    Special Requests <span className="text-[#9C948E] font-normal">(optional)</span>
                  </label>
                  <textarea
                    value={specialRequests}
                    onChange={e => setSpecialRequests(e.target.value)}
                    placeholder="e.g., birthday decoration, wheelchair access, vegetarian food only..."
                    rows={3}
                    className="premium-input text-sm resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="px-5 py-3 border border-[#EDE8DF] text-[#6B6460] rounded-xl hover:bg-gray-50 transition-all text-sm">
                    Back
                  </button>
                  <button
                    onClick={handleProceedToMenu}
                    disabled={!selectedHall || guestCount < 1 || guestCount > (selectedHall?.capacity || 50)}
                    className="flex-1 py-3.5 bg-gold text-white font-bold rounded-xl disabled:opacity-40 hover:bg-gold/90 transition-all"
                  >
                    Proceed to Order Food →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-28">
            <div className="glass-card overflow-hidden">
              <div className="p-5 border-b border-[#EDE8DF]">
                <h3 className="font-bold text-[#1A1A1A] text-sm mb-4">Booking Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9C948E]">Date</span>
                    <span className={cn('font-medium', selectedDate ? 'text-[#1A1A1A]' : 'text-[#D0CCC8]')}>
                      {selectedDate
                        ? new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                        : '—'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9C948E]">Slot</span>
                    <span className={cn('font-medium', selectedSlot ? 'text-[#1A1A1A]' : 'text-[#D0CCC8]')}>
                      {selectedSlot ? `${timeSlots.find(s => s.id === selectedSlot)?.label} · ${slotTime}` : '—'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9C948E]">Space</span>
                    <span className={cn('font-medium', selectedHall ? 'text-[#1A1A1A]' : 'text-[#D0CCC8]')}>
                      {selectedHall?.name ?? '—'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9C948E]">Guests</span>
                    <span className="font-medium text-[#1A1A1A]">{guestCount} persons</span>
                  </div>
                </div>
              </div>

              {selectedHall ? (
                <>
                  <div className="h-36 relative overflow-hidden">
                    <img src={selectedHall.images[0]} alt={selectedHall.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-bold text-sm drop-shadow">{selectedHall.name}</p>
                      <p className="text-white/70 text-xs">{selectedHall.floor} · {selectedHall.area_sqft} sq.ft</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {selectedHall.amenities.slice(0, 4).map(a => (
                        <span key={a} className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] rounded-full border border-gold/20">{a}</span>
                      ))}
                      {selectedHall.amenities.length > 4 && (
                        <span className="px-2 py-0.5 bg-gray-50 text-[#9C948E] text-[10px] rounded-full border border-[#EDE8DF]">+{selectedHall.amenities.length - 4}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center border-t border-[#EDE8DF] pt-4">
                      <span className="text-[#6B6460] text-sm">Hall charge</span>
                      <span className="text-gold font-bold">{formatCurrency(selectedHall.price_per_slot)}</span>
                    </div>
                    <p className="text-[#9C948E] text-xs mt-1">+ Food order total (next step)</p>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-3">🏛</div>
                  <p className="text-[#9C948E] text-sm">Select date & slot, then choose your space</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HallCard({ hall, selected, unavailable, onSelect }: {
  hall: Hall; selected: boolean; unavailable: boolean; onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      disabled={unavailable}
      className={cn(
        'glass-card text-left overflow-hidden transition-all duration-200 w-full',
        unavailable
          ? 'opacity-50 cursor-not-allowed grayscale'
          : selected
          ? 'border-gold shadow-md shadow-gold/10 scale-[1.02]'
          : 'hover:border-gold/40 hover:scale-[1.02] active:scale-[0.98]'
      )}
    >
      <div className="relative h-36 overflow-hidden">
        <img src={hall.images[0]} alt={hall.name} className="w-full h-full object-cover transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {unavailable ? (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 bg-black/60 rounded-full">
            <Lock size={9} className="text-white" />
            <span className="text-white text-[9px] font-semibold">Booked</span>
          </div>
        ) : selected ? (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gold flex items-center justify-center">
            <Check size={12} className="text-white" />
          </div>
        ) : (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight size={14} className="text-white" />
          </div>
        )}
        <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 bg-gold text-white rounded-full">{hall.floor}</span>
      </div>
      <div className="p-4">
        <h3 className={cn('font-bold mb-1 text-sm', selected ? 'text-gold' : 'text-[#1A1A1A]')}>{hall.name}</h3>
        <p className="text-[#9C948E] text-xs mb-3 line-clamp-2">{hall.description}</p>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#6B6460]"><Users size={10} className="inline mr-1" />Up to {hall.capacity}</span>
          {unavailable
            ? <span className="text-red-400 font-semibold">Unavailable</span>
            : <span className="text-gold font-bold">{formatCurrency(hall.price_per_slot)}/slot</span>}
        </div>
      </div>
    </button>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 flex items-center justify-center"><Loader2 className="animate-spin text-gold" size={32} /></div>}>
      <BookingContent />
    </Suspense>
  );
}
