'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, Leaf, Flame, ShoppingCart, Plus, Minus, Search, ChevronRight, Loader2, ArrowLeft } from 'lucide-react';
import { restaurants, menuItems, getMenuByRestaurant } from '@/lib/data/restaurants';
import { useCart } from '@/components/providers/CartProvider';
import { useBooking } from '@/components/providers/BookingProvider';
import { MenuItem, Restaurant } from '@/types';
import { formatCurrency, cn } from '@/lib/utils';

function SpiceIcon({ level }: { level?: string }) {
  if (!level) return null;
  const colors = { mild: 'text-yellow-400', medium: 'text-orange-400', hot: 'text-red-500' };
  return <Flame size={10} className={colors[level as keyof typeof colors]} />;
}

function MenuItemCard({ item }: { item: MenuItem }) {
  const { cart, addToCart, updateQuantity } = useCart();
  const cartItem = cart.find(c => c.id === item.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 flex gap-4 hover:border-gold/30 transition-all"
    >
      {/* Image placeholder */}
      <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-[#1A1A2E] to-[#0A2010] shrink-0 overflow-hidden flex items-center justify-center text-3xl border border-white/5 relative">
        {item.is_veg ? '🥗' : '🍖'}
        {item.is_bestseller && (
          <span className="absolute top-1 left-1 bg-gold text-black text-[8px] font-bold px-1 rounded">BEST</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-1.5 min-w-0">
            {/* Veg/Non-veg indicator */}
            <div className={cn('w-3.5 h-3.5 rounded border-2 flex items-center justify-center shrink-0',
              item.is_veg ? 'border-green-500' : 'border-red-500')}>
              <div className={cn('w-1.5 h-1.5 rounded-full', item.is_veg ? 'bg-green-500' : 'bg-red-500')} />
            </div>
            <h4 className="font-semibold text-white text-sm truncate">{item.name}</h4>
          </div>
          {item.spice_level && <SpiceIcon level={item.spice_level} />}
        </div>
        <p className="text-white/40 text-xs leading-relaxed mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-white">{formatCurrency(item.price)}</span>
          {cartItem ? (
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
                className="w-7 h-7 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/20 transition-all">
                <Minus size={12} />
              </button>
              <span className="text-white font-bold text-sm w-5 text-center">{cartItem.quantity}</span>
              <button onClick={() => addToCart(item)}
                className="w-7 h-7 rounded-lg bg-gold text-black flex items-center justify-center hover:bg-gold/90 transition-all">
                <Plus size={12} />
              </button>
            </div>
          ) : (
            <button onClick={() => addToCart(item)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 border border-gold/30 text-gold text-xs font-semibold rounded-lg hover:bg-gold/20 transition-all">
              <Plus size={12} /> Add
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function RestaurantCard({ restaurant, selected, onClick }: { restaurant: Restaurant; selected: boolean; onClick: () => void }) {
  const icons: Record<string, string> = {
    'South Indian': '🥘', 'Chettinad': '🌶', 'Traditional Tamil': '🍲',
    'Pure Vegetarian': '🥗', 'Biriyani & Kebabs': '🍚',
  };
  return (
    <button onClick={onClick}
      className={cn('text-left p-4 rounded-2xl border transition-all duration-200',
        selected ? 'border-gold bg-gold/5' : 'border-white/10 bg-white/5 hover:border-gold/30 hover:bg-white/[0.03]')}>
      <div className="text-2xl mb-2">{icons[restaurant.cuisine_type] || '🍽'}</div>
      <div className={cn('font-semibold text-sm leading-tight mb-0.5', selected ? 'text-gold' : 'text-white')}>{restaurant.name}</div>
      <div className="text-white/40 text-xs mb-2">{restaurant.cuisine_type}</div>
      <div className="flex items-center gap-2 text-xs">
        <span className="flex items-center gap-0.5 text-gold"><Star size={9} fill="currentColor" />{restaurant.rating}</span>
        <span className="flex items-center gap-0.5 text-white/40"><Clock size={9} />{restaurant.prep_time}</span>
      </div>
      {restaurant.popular_tag && (
        <span className="mt-2 inline-block px-1.5 py-0.5 bg-gold/10 text-gold text-[9px] rounded-full border border-gold/20">{restaurant.popular_tag}</span>
      )}
    </button>
  );
}

function MenuContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { cart, cartTotal, cartCount } = useCart();
  const { selectedHall } = useBooking();

  const defaultRestaurantId = searchParams.get('restaurant') || restaurants[0].id;
  const [activeRestaurantId, setActiveRestaurantId] = useState(defaultRestaurantId);
  const [search, setSearch] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const currentRestaurant = restaurants.find(r => r.id === activeRestaurantId)!;
  const allItems = getMenuByRestaurant(activeRestaurantId);
  const categories = ['All', ...new Set(allItems.map(i => i.category))];

  const filtered = allItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
    const matchesVeg = vegOnly ? item.is_veg : true;
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesVeg && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-24 pb-32 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft size={14} /> Back to Booking
          </button>
          <div className="text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-2">Step 4 · Optional</div>
          <h1 className="text-4xl font-bold">Order Food</h1>
          <p className="text-white/40 mt-1 text-sm">Pre-order from Madurai's finest — served at your space</p>
        </div>
        {selectedHall && (
          <div className="hidden sm:block text-right">
            <p className="text-xs text-white/30">Booked Space</p>
            <p className="text-sm font-semibold text-gold">{selectedHall.name}</p>
          </div>
        )}
      </div>

      {/* Zomato/Swiggy notice */}
      <div className="glass-card p-4 mb-8 flex items-start gap-3 border-blue-500/20 bg-blue-500/5">
        <span className="text-xl">🤝</span>
        <div>
          <p className="text-sm font-semibold text-white">Partnered with Madurai's Top Restaurants</p>
          <p className="text-xs text-white/40 mt-0.5">Menus curated from our verified restaurant partners. Food will be delivered hot and fresh to your booked space.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Restaurant Sidebar */}
        <div className="lg:col-span-1">
          <h3 className="text-xs font-semibold text-white/40 tracking-widest uppercase mb-4">Choose Restaurant</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3">
            {restaurants.map(r => (
              <RestaurantCard key={r.id} restaurant={r} selected={activeRestaurantId === r.id} onClick={() => { setActiveRestaurantId(r.id); setActiveCategory('All'); setSearch(''); }} />
            ))}
          </div>
        </div>

        {/* Menu Area */}
        <div className="lg:col-span-3">
          {/* Restaurant Header */}
          <div className="glass-card p-5 mb-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-2xl">
              {currentRestaurant.cuisine_type === 'South Indian' ? '🥘' : currentRestaurant.cuisine_type === 'Chettinad' ? '🌶' : currentRestaurant.cuisine_type === 'Biriyani & Kebabs' ? '🍚' : currentRestaurant.is_veg ? '🥗' : '🍲'}
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-white text-lg">{currentRestaurant.name}</h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/50 mt-1">
                <span>{currentRestaurant.cuisine_type}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Star size={10} fill="#C9A84C" className="text-gold" />{currentRestaurant.rating}</span>
                <span>·</span>
                <span><Clock size={10} className="inline mr-0.5" />{currentRestaurant.prep_time}</span>
                <span>·</span>
                <span><Leaf size={10} className="inline mr-0.5 text-green-500" />{currentRestaurant.location}</span>
              </div>
            </div>
            {currentRestaurant.is_veg && (
              <span className="hidden sm:block px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-lg font-medium">Pure Veg</span>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div className="relative flex-1 min-w-48">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text" placeholder="Search dishes..."
                value={search} onChange={e => setSearch(e.target.value)}
                className="premium-input pl-9 text-sm h-9"
              />
            </div>
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={cn('flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-all',
                vegOnly ? 'border-green-500 bg-green-500/10 text-green-400' : 'border-white/10 bg-white/5 text-white/50 hover:border-green-500/30')}
            >
              <Leaf size={12} /> Veg Only
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={cn('shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all',
                  activeCategory === cat ? 'bg-gold text-black' : 'bg-white/5 border border-white/10 text-white/60 hover:border-gold/30')}>
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-white/30">
              <div className="text-4xl mb-3">🔍</div>
              <p>No dishes found</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {filtered.map(item => <MenuItemCard key={item.id} item={item} />)}
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart Bar */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
          >
            <button onClick={() => router.push('/checkout')}
              className="w-full flex items-center justify-between px-5 py-4 bg-gold text-black font-bold rounded-2xl shadow-2xl shadow-gold/30 hover:bg-gold/90 transition-all">
              <div className="flex items-center gap-2">
                <ShoppingCart size={18} />
                <span>{cartCount} item{cartCount > 1 ? 's' : ''} in cart</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{formatCurrency(cartTotal)}</span>
                <ChevronRight size={16} />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip & Continue */}
      {cartCount === 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <button onClick={() => router.push('/checkout')}
            className="flex items-center gap-2 px-5 py-3 bg-[#143A1A] border border-gold/20 text-white/60 rounded-xl hover:border-gold/40 hover:text-white transition-all text-sm">
            Skip Food Order <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 flex items-center justify-center"><Loader2 className="animate-spin text-gold" size={32} /></div>}>
      <MenuContent />
    </Suspense>
  );
}
