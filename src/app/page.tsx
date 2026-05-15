'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Star, Users, Clock, ChevronDown, Sparkles } from 'lucide-react';
import { halls } from '@/lib/data/halls';
import { restaurants } from '@/lib/data/restaurants';
import { formatCurrency } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

export default function HomePage() {
  return (
    <div className="relative">
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Full-bleed food photography background */}
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90&auto=format&fit=crop"
          alt="Elegant dining"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-transparent to-black/30" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-16">
          <div className="max-w-2xl">
            <motion.div
              initial="hidden" animate="visible" variants={fadeUp} custom={0}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold tracking-widest uppercase mb-6"
            >
              <MapPin size={10} /> Madurai, Tamil Nadu
            </motion.div>

            <motion.h1
              initial="hidden" animate="visible" variants={fadeUp} custom={1}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 text-white"
            >
              Your Private<br />
              <span className="gradient-text">Dining Haven</span><br />
              in Madurai
            </motion.h1>

            <motion.p
              initial="hidden" animate="visible" variants={fadeUp} custom={2}
              className="text-lg text-white/70 leading-relaxed mb-8 max-w-xl"
            >
              Book exclusive halls and rooms for intimate lunches, evening celebrations, and memorable dinners.
              Order from Madurai's finest restaurants — served personally at your private space.
            </motion.p>

            <motion.div
              initial="hidden" animate="visible" variants={fadeUp} custom={3}
              className="flex flex-wrap gap-4"
            >
              <Link href="/book"
                className="group flex items-center gap-2 px-6 py-3.5 bg-gold text-white font-bold rounded-xl hover:bg-gold/90 transition-all glow-gold-sm">
                Book a Space
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/menu"
                className="flex items-center gap-2 px-6 py-3.5 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all">
                Explore Menus
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial="hidden" animate="visible" variants={fadeUp} custom={4}
              className="mt-12 flex gap-8"
            >
              {[
                { value: '4', label: 'Exclusive Spaces' },
                { value: '5★', label: 'Rated Facility' },
                { value: '5', label: 'Partner Restaurants' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-gold">{value}</div>
                  <div className="text-xs text-white/50 mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <ChevronDown size={24} className="text-gold/60" />
        </motion.div>
      </section>

      {/* ─── ABOUT STRIP ─── */}
      <section className="py-16 border-y border-[#EDE8DF] bg-[#FBF8F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: '🏛', title: 'Private & Exclusive', desc: 'Entire space reserved only for you' },
              { icon: '🍽', title: 'Curated Menus', desc: "Order from Madurai's top restaurants" },
              { icon: '✨', title: 'Premium Ambiance', desc: 'Thoughtfully designed interiors' },
              { icon: '📍', title: 'Heart of Madurai', desc: 'Anna Nagar, easily accessible' },
            ].map(({ icon, title, desc }) => (
              <div key={title}>
                <div className="text-3xl mb-3">{icon}</div>
                <div className="font-semibold text-[#1A1A1A] text-sm mb-1">{title}</div>
                <div className="text-xs text-[#6B6460]">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPACES ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Our Spaces</div>
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-[#C9A84C] text-sm">◈ ── ◈</span>
            </div>
            <h2 className="text-4xl font-bold text-[#1A1A1A]">Choose Your Perfect Space</h2>
            <p className="text-[#6B6460] mt-3 max-w-lg mx-auto">Each space is uniquely designed for a different mood and occasion</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {halls.map((hall, i) => (
              <motion.div
                key={hall.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link href={`/book?hall=${hall.id}`}
                  className="group block glass-card overflow-hidden hover:border-gold/40 hover:shadow-lg transition-all duration-300">
                  {/* Hall photo */}
                  <div className="h-44 relative overflow-hidden">
                    <img
                      src={hall.images[0]}
                      alt={hall.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 bg-gold text-white text-[10px] font-bold rounded-full">{hall.floor}</span>
                    </div>
                    <div className="absolute bottom-3 right-3 text-xs text-white/90 font-medium drop-shadow">
                      <Users size={10} className="inline mr-1" />{hall.capacity} guests
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#1A1A1A] mb-1 group-hover:text-gold transition-colors">{hall.name}</h3>
                    <p className="text-[#9C948E] text-xs leading-relaxed mb-4 line-clamp-2">{hall.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gold font-bold">{formatCurrency(hall.price_per_slot)}<span className="text-[#9C948E] text-xs font-normal">/slot</span></span>
                      <ArrowRight size={14} className="text-gray-300 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/book"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/5 transition-colors text-sm font-medium">
              View All Spaces <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 bg-[#FBF8F3] border-y border-[#EDE8DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-16"
          >
            <div className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">How It Works</div>
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-[#C9A84C] text-sm">◈ ── ◈</span>
            </div>
            <h2 className="text-4xl font-bold text-[#1A1A1A]">Effortlessly Simple</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', icon: '🔐', title: 'Sign In', desc: 'Quick Google sign-in — no new account needed' },
              { step: '02', icon: '🏛', title: 'Pick a Space', desc: 'Choose from 4 premium halls and rooms' },
              { step: '03', icon: '📅', title: 'Select Date & Slot', desc: 'Lunch, Evening, or Dinner — you decide' },
              { step: '04', icon: '🍽', title: 'Order Food', desc: 'Browse and order from 5 Madurai restaurants' },
            ].map(({ step, icon, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center relative"
              >
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-gold/30 to-transparent" />
                )}
                <div className="w-16 h-16 rounded-2xl bg-white border border-[#EDE8DF] shadow-sm flex items-center justify-center text-2xl mx-auto mb-4 relative z-10">
                  {icon}
                </div>
                <div className="text-xs text-gold font-bold tracking-widest mb-2">{step}</div>
                <h3 className="font-bold text-[#1A1A1A] mb-2">{title}</h3>
                <p className="text-[#6B6460] text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARTNER RESTAURANTS ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-14"
          >
            <div className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Food Partners</div>
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-[#C9A84C] text-sm">◈ ── ◈</span>
            </div>
            <h2 className="text-4xl font-bold text-[#1A1A1A]">Madurai's Finest, Delivered to You</h2>
            <p className="text-[#6B6460] mt-3 max-w-lg mx-auto">Pre-order from legendary Madurai restaurants. We handle delivery to your booked space.</p>
          </motion.div>

          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
            {restaurants.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="shrink-0 w-60"
              >
                <Link href={`/menu?restaurant=${r.id}`}
                  className="group block glass-card p-5 hover:border-gold/40 hover:shadow-md transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center text-2xl mb-4 mx-auto">
                    {r.cuisine_type === 'South Indian' ? '🥘' : r.cuisine_type === 'Chettinad' ? '🌶' : r.cuisine_type === 'Biriyani & Kebabs' ? '🍚' : r.is_veg ? '🥗' : '🍲'}
                  </div>
                  <h3 className="font-bold text-[#1A1A1A] text-center mb-1 text-sm group-hover:text-gold transition-colors">{r.name}</h3>
                  <p className="text-[#9C948E] text-xs text-center mb-3">{r.cuisine_type}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-gold">
                      <Star size={10} fill="currentColor" />{r.rating}
                    </span>
                    <span className="flex items-center gap-1 text-[#9C948E]">
                      <Clock size={10} />{r.prep_time}
                    </span>
                    {r.popular_tag && (
                      <span className="px-1.5 py-0.5 bg-gold/10 text-gold text-[9px] rounded-full">{r.popular_tag}</span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIME SLOTS PREVIEW ─── */}
      <section className="py-20 bg-[#FBF8F3] border-t border-[#EDE8DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-12"
          >
            <div className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-3">Time Slots</div>
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-[#C9A84C] text-sm">◈ ── ◈</span>
            </div>
            <h2 className="text-4xl font-bold text-[#1A1A1A]">Pick Your Moment</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: '☀️', slot: 'Lunch', time: '12 PM – 3 PM', desc: 'A relaxed midday gathering' },
              { emoji: '🌅', slot: 'Evening', time: '4 PM – 7 PM', desc: 'Unwind over snacks & conversations' },
              { emoji: '🌙', slot: 'Dinner', time: '7:30 PM – 11 PM', desc: 'Elegant nights for special occasions' },
            ].map(({ emoji, slot, time, desc }) => (
              <motion.div
                key={slot}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Link href="/book"
                  className="group block glass-card p-8 hover:border-gold/40 hover:shadow-md transition-all">
                  <div className="text-4xl mb-4">{emoji}</div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] group-hover:text-gold transition-colors mb-1">{slot}</h3>
                  <p className="text-gold text-sm font-medium mb-2">{time}</p>
                  <p className="text-[#6B6460] text-sm">{desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-28 relative overflow-hidden bg-[#0D1F3C]">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/3" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <Sparkles className="text-gold mx-auto mb-6" size={32} />
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-[#C9A84C] text-sm">◈ ── ◈</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              Ready to <span className="gradient-text">Unwind?</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              Book your exclusive space in seconds. Madurai's most memorable experiences await.
            </p>
            <Link href="/book"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-white font-bold text-lg rounded-xl hover:bg-gold/90 transition-all glow-gold">
              Book Now — It's Free <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
