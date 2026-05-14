'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Hall, SlotType } from '@/types';

interface BookingContextType {
  selectedHall: Hall | null;
  selectedDate: string;
  selectedSlot: SlotType | null;
  guestCount: number;
  specialRequests: string;
  setSelectedHall: (hall: Hall | null) => void;
  setSelectedDate: (date: string) => void;
  setSelectedSlot: (slot: SlotType | null) => void;
  setGuestCount: (count: number) => void;
  setSpecialRequests: (req: string) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | null>(null);
const BOOKING_KEY = 'unwind_booking_draft';

function tomorrow() {
  const d = new Date(); d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

function loadDraft() {
  if (typeof window === 'undefined') return null;
  try {
    const s = sessionStorage.getItem(BOOKING_KEY);
    return s ? JSON.parse(s) : null;
  } catch { return null; }
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const draft = loadDraft();

  const [selectedHall, setSelectedHall] = useState<Hall | null>(draft?.hall ?? null);
  const [selectedDate, setSelectedDate] = useState<string>(draft?.date ?? tomorrow());
  const [selectedSlot, setSelectedSlot] = useState<SlotType | null>(draft?.slot ?? null);
  const [guestCount, setGuestCount] = useState<number>(draft?.guestCount ?? 2);
  const [specialRequests, setSpecialRequests] = useState<string>(draft?.specialRequests ?? '');

  // Persist draft to sessionStorage so it survives login redirect
  useEffect(() => {
    try {
      sessionStorage.setItem(BOOKING_KEY, JSON.stringify({
        hall: selectedHall,
        date: selectedDate,
        slot: selectedSlot,
        guestCount,
        specialRequests,
      }));
    } catch { /* ignore */ }
  }, [selectedHall, selectedDate, selectedSlot, guestCount, specialRequests]);

  const resetBooking = () => {
    setSelectedHall(null);
    setSelectedDate(tomorrow());
    setSelectedSlot(null);
    setGuestCount(2);
    setSpecialRequests('');
    try { sessionStorage.removeItem(BOOKING_KEY); } catch { /* ignore */ }
  };

  return (
    <BookingContext.Provider value={{
      selectedHall, selectedDate, selectedSlot, guestCount, specialRequests,
      setSelectedHall, setSelectedDate, setSelectedSlot, setGuestCount, setSpecialRequests,
      resetBooking,
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider');
  return ctx;
}
