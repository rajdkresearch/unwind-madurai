'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
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

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedHall, setSelectedHall] = useState<Hall | null>(null);
  const [selectedDate, setSelectedDate] = useState(tomorrow());
  const [selectedSlot, setSelectedSlot] = useState<SlotType | null>(null);
  const [guestCount, setGuestCount] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');

  const resetBooking = () => {
    setSelectedHall(null);
    setSelectedDate(tomorrow());
    setSelectedSlot(null);
    setGuestCount(2);
    setSpecialRequests('');
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
