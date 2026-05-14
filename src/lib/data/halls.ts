import { Hall, TimeSlot } from '@/types';

export const halls: Hall[] = [
  {
    id: 'royal-hall',
    name: 'The Royal Hall',
    description: 'Our grandest space, perfect for large gatherings and celebrations. Featuring high ceilings, premium decor, and an elegant ambiance.',
    capacity: 50,
    amenities: ['AC', 'Premium Sound System', 'LED Lighting', 'Projector', 'WiFi', 'Dedicated Parking'],
    price_per_slot: 4999,
    images: ['/halls/royal-1.jpg'],
    area_sqft: 1800,
    floor: 'Ground Floor',
  },
  {
    id: 'garden-suite',
    name: 'Garden Suite',
    description: 'An intimate open-air setting surrounded by lush greenery. Ideal for evening hangouts and relaxed dining experiences.',
    capacity: 20,
    amenities: ['Open Air', 'String Lights', 'Garden View', 'Private Bar Counter', 'WiFi'],
    price_per_slot: 2999,
    images: ['/halls/garden-1.jpg'],
    area_sqft: 800,
    floor: 'Terrace',
  },
  {
    id: 'crystal-room',
    name: 'Crystal Room',
    description: 'A cozy, intimate private dining room with crystal chandeliers and plush seating. Perfect for small family lunches or romantic dinners.',
    capacity: 12,
    amenities: ['AC', 'Crystal Chandelier', 'Private Entry', 'Smart TV', 'WiFi', 'Mini Bar'],
    price_per_slot: 1999,
    images: ['/halls/crystal-1.jpg'],
    area_sqft: 400,
    floor: 'First Floor',
  },
  {
    id: 'heritage-lounge',
    name: 'Heritage Lounge',
    description: 'A curated space blending Madurai\'s rich cultural heritage with modern luxury. Adorned with traditional Tamil artworks and antiques.',
    capacity: 30,
    amenities: ['AC', 'Heritage Decor', 'Traditional Seating', 'Cultural Artifacts', 'WiFi', 'Stage Area'],
    price_per_slot: 3499,
    images: ['/halls/heritage-1.jpg'],
    area_sqft: 1200,
    floor: 'Ground Floor',
  },
];

export const timeSlots: TimeSlot[] = [
  {
    id: 'lunch',
    label: 'Lunch',
    time: '12:00 PM – 3:00 PM',
    icon: '☀️',
    description: 'A relaxed midday gathering with family or colleagues',
  },
  {
    id: 'evening',
    label: 'Evening',
    time: '4:00 PM – 7:00 PM',
    icon: '🌅',
    description: 'Unwind with friends over snacks and great conversations',
  },
  {
    id: 'dinner',
    label: 'Dinner',
    time: '7:30 PM – 11:00 PM',
    icon: '🌙',
    description: 'An elegant night out for special occasions and fine dining',
  },
];
