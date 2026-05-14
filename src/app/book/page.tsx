'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ChevronRight, Info, Check, Loader2 } from 'lucide-react';
import { halls, timeSlots } from '@/lib/data/halls';
import { useBooking } from '@/components/providers/BookingProvider';
import { useAuth } from '@/components/providers/AuthProvider';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Hall, SlotType } from '@/types';

const RoomCanvas = dynamic(() => import('@/components/3d/RoomCanvas'), { ssr: false, loading: () => <div className="w-full h-full bg-[#0A0A0F]" /> });

// Min date: tomorrow
function minDate() {
  const d = new Date(); d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const { selectedHall, selectedDate, selectedSlot, guestCount, specialRequests,
    setSelectedHall, setSelectedDate, setSelectedSlot, setGuestCount, setSpecialRequests } = useBooking();

  const [step, setStep] = useState(1);
  const preSelectedHallId = searchParams.get('hall');

  useEffect(() => {
    if (preSelectedHallId) {
      const hall = halls.find(h => h.id === preSelectedHallId);
      if (hall) { setSelectedHall(hall); setStep(2); }
    }
  }, [preSelectedHallId, setSelectedHall]);

  const canProceedToStep2 = !!selectedHall;
  const canProceedToStep3 = !!selectedDate && !!selectedSlot && guestCount > 0;

  const handleProceedToMenu = () => {
    if (!selectedHall || !selectedDate || !selectedSlot) return;
    router.push('/menu');
  };

  const slotTime = timeSlots.find(s => s.id === selectedSlot)?.time || '';

  return (
    <div className="min-h-screen pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="mb-10">
        <div className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Book a Space</div>
        <h1 className="text-4xl font-bold">Reserve Your Experience</h1>
        <p className="text-white/40 mt-2">Select your space, date, and time slot</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-10">
        {['Choose Space', 'Date & Slot', 'Guest Details'].map((label, i) => {
          const s = i + 1;
          return (
            <div key={label} className="flex items-center gap-2">
              <div className={cn('flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all',
                step === s ? 'bg-gold text-black' : step > s ? 'bg-gold/20 text-gold' : 'bg-white/5 text-white/40')}>
                {step > s ? <Check size={12} /> : <span>{s}</span>}
                <span className="hidden sm:inline">{label}</span>
              </div>
              {i < 2 && <ChevronRight size={14} className="text-white/20" />}
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {/* ── Step 1: Choose Hall ── */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <div className="grid sm:grid-cols-2 gap-5">
                  {halls.map(hall => (
                    <HallCard
                      key={hall.id}
                      hall={hall}
                      selected={selectedHall?.id === hall.id}
                      onSelect={() => { setSelectedHall(hall); }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!canProceedToStep2}
                  className="mt-8 w-full py-3.5 bg-gold text-black font-bold rounded-xl disabled:opacity-40 hover:bg-gold/90 transition-all"
                >
                  Continue to Date & Slot
                </button>
              </motion.div>
            )}

            {/* ── Step 2: Date & Slot ── */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <div className="glass-card p-6 mb-6">
                  <label className="block text-sm font-semibold text-white/70 mb-3">Select Date</label>
                  <input
                    type="date"
                    min={minDate()}
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="premium-input text-sm"
                  />
                </div>

                <div className="glass-card p-6 mb-6">
                  <label className="block text-sm font-semibold text-white/70 mb-4">Select Time Slot</label>
                  <div className="grid grid-cols-3 gap-4">
                    {timeSlots.map(slot => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot.id as SlotType)}
                        className={cn('p-4 rounded-xl border text-center transition-all',
                          selectedSlot === slot.id
                            ? 'border-gold bg-gold/10 shadow-lg shadow-gold/10'
                            : 'border-white/10 bg-white/5 hover:border-gold/30')}
                      >
                        <div className="text-2xl mb-2">{slot.icon}</div>
                        <div className={cn('font-bold text-sm', selectedSlot === slot.id ? 'text-gold' : 'text-white')}>{slot.label}</div>
                        <div className="text-white/40 text-xs mt-1">{slot.time}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="px-5 py-3 border border-white/10 text-white/60 rounded-xl hover:bg-white/5 transition-all text-sm">
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!canProceedToStep3}
                    className="flex-1 py-3.5 bg-gold text-black font-bold rounded-xl disabled:opacity-40 hover:bg-gold/90 transition-all"
                  >
                    Continue to Guest Details
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step 3: Guest Details ── */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <div className="glass-card p-6 mb-6">
                  <label className="block text-sm font-semibold text-white/70 mb-3">Number of Guests</label>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-lg font-bold">−</button>
                    <div className="flex-1 text-center">
                      <div className="text-3xl font-bold text-gold">{guestCount}</div>
                      <div className="text-xs text-white/40 mt-0.5">
                        <Users size={10} className="inline mr-1" />guests
                        {selectedHall && guestCount > selectedHall.capacity && (
                          <span className="text-red-400 ml-2">Exceeds capacity ({selectedHall.capacity})</span>
                        )}
                      </div>
                    </div>
                    <button onClick={() => setGuestCount(Math.min(selectedHall?.capacity || 50, guestCount + 1))}
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-lg font-bold">+</button>
                  </div>
                  {selectedHall && (
                    <p className="text-xs text-white/30 mt-3 flex items-center gap-1.5">
                      <Info size={10} /> Max capacity: {selectedHall.capacity} guests
                    </p>
                  )}
                </div>

                <div className="glass-card p-6 mb-6">
                  <label className="block text-sm font-semibold text-white/70 mb-3">Special Requests <span className="text-white/30 font-normal">(optional)</span></label>
                  <textarea
                    value={specialRequests}
                    onChange={e => setSpecialRequests(e.target.value)}
                    placeholder="e.g., birthday decoration, wheelchair access, vegetarian food only..."
                    rows={3}
                    className="premium-input text-sm resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="px-5 py-3 border border-white/10 text-white/60 rounded-xl hover:bg-white/5 transition-all text-sm">
                    Back
                  </button>
                  <button
                    onClick={handleProceedToMenu}
                    disabled={!selectedHall || (guestCount > (selectedHall?.capacity || 50))}
                    className="flex-1 py-3.5 bg-gold text-black font-bold rounded-xl disabled:opacity-40 hover:bg-gold/90 transition-all"
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
          <div className="sticky top-24">
            {selectedHall ? (
              <div className="glass-card overflow-hidden">
                {/* 3D Room Preview */}
                <div className="h-48 relative">
                  <RoomCanvas color="#C9A84C" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12121A] to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-bold text-white text-sm">{selectedHall.name}</h3>
                    <p className="text-white/40 text-xs">{selectedHall.floor} · {selectedHall.area_sqft} sq.ft</p>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedHall.amenities.slice(0, 4).map(a => (
                      <span key={a} className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] rounded-full border border-gold/20">{a}</span>
                    ))}
                    {selectedHall.amenities.length > 4 && (
                      <span className="px-2 py-0.5 bg-white/5 text-white/40 text-[10px] rounded-full">+{selectedHall.amenities.length - 4}</span>
                    )}
                  </div>

                  <div className="border-t border-white/5 pt-4 space-y-2.5">
                    {selectedDate && (
                      <div className="flex justify-between text-sm">
                        <span className="text-white/40">Date</span>
                        <span className="text-white font-medium">{new Date(selectedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    )}
                    {selectedSlot && (
                      <div className="flex justify-between text-sm">
                        <span className="text-white/40">Slot</span>
                        <span className="text-white font-medium">{timeSlots.find(s => s.id === selectedSlot)?.label} · {slotTime}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Guests</span>
                      <span className="text-white font-medium">{guestCount} persons</span>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <div className="flex justify-between">
                      <span className="text-white/60 text-sm">Hall charge</span>
                      <span className="text-gold font-bold">{formatCurrency(selectedHall.price_per_slot)}</span>
                    </div>
                    <p className="text-white/25 text-xs mt-1">+ Food order total (next step)</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-card p-8 text-center">
                <div className="text-4xl mb-4">🏛</div>
                <p className="text-white/40 text-sm">Select a space to see details and pricing</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function HallCard({ hall, selected, onSelect }: { hall: Hall; selected: boolean; onSelect: () => void }) {
  const icons: Record<string, string> = { 'royal-hall': '🏛', 'garden-suite': '🌿', 'crystal-room': '💎', 'heritage-lounge': '🏺' };
  return (
    <button
      onClick={onSelect}
      className={cn('glass-card text-left p-5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]',
        selected ? 'border-gold shadow-lg shadow-gold/10' : 'hover:border-gold/30')}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-3xl">{icons[hall.id]}</span>
        {selected && <Check size={16} className="text-gold" />}
      </div>
      <h3 className={cn('font-bold mb-1 text-sm', selected ? 'text-gold' : 'text-white')}>{hall.name}</h3>
      <p className="text-white/40 text-xs mb-3 line-clamp-2">{hall.description}</p>
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/30"><Users size={10} className="inline mr-1" />Up to {hall.capacity}</span>
        <span className="text-gold font-bold">{formatCurrency(hall.price_per_slot)}/slot</span>
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
