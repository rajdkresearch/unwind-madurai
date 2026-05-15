'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, User, LogOut, CalendarDays, UtensilsCrossed, Phone, Mail, MapPin } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useCart } from '@/components/providers/CartProvider';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, signIn, signOut } = useAuth();
  const { cartCount } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/book', label: 'Book a Space', icon: CalendarDays },
    { href: '/menu', label: 'Order Food', icon: UtensilsCrossed },
    { href: '/my-bookings', label: 'My Bookings', icon: CalendarDays },
  ];

  const isHero = pathname === '/';
  const isTransparent = isHero && !scrolled;

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* ── Top info bar ── */}
      <div className={cn(
        'transition-all duration-500 overflow-hidden',
        isTransparent
          ? 'bg-black/30 backdrop-blur-sm'
          : 'bg-[#0D1F3C]'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-8 flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-5 text-[11px] text-white/70">
            <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Phone size={10} /> +91 98765 43210
            </a>
            <a href="mailto:hello@unwindmadurai.com" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Mail size={10} /> hello@unwindmadurai.com
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-white/70">
            <MapPin size={10} className="text-gold" />
            <span>Anna Nagar, Madurai</span>
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <nav className={cn(
        'transition-all duration-500',
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-gold">UN</span>
              <span className={cn('transition-colors', isTransparent ? 'text-white' : 'text-[#1A1A1A]')}>WIND</span>
            </span>
            <span className={cn('hidden sm:block text-xs font-light tracking-[0.2em] mt-1 transition-colors', isTransparent ? 'text-gold/60' : 'text-gold/70')}>
              MADURAI
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'text-sm font-medium tracking-wide transition-colors',
                  pathname === href
                    ? 'text-gold'
                    : isTransparent
                    ? 'text-white/80 hover:text-white'
                    : 'text-gray-700 hover:text-gold'
                )}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link href="/checkout" className={cn('relative p-2 rounded-lg transition-colors', isTransparent ? 'hover:bg-white/10' : 'hover:bg-gray-100')}>
              <ShoppingCart size={20} className={cn('transition-colors', isTransparent ? 'text-white/80' : 'text-gray-700')} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={cn('flex items-center gap-2 p-1.5 rounded-lg transition-colors', isTransparent ? 'hover:bg-white/10' : 'hover:bg-gray-100')}
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-gold/30" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
                      <User size={14} className="text-gold" />
                    </div>
                  )}
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg shadow-black/10 p-2"
                    >
                      <div className="px-3 py-2 border-b border-gray-100 mb-1">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      <Link href="/my-bookings" onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                        <CalendarDays size={14} /> My Bookings
                      </Link>
                      <button onClick={() => { signOut(); setProfileOpen(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut size={14} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button onClick={signIn}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gold text-white text-sm font-semibold rounded-lg hover:bg-gold/90 transition-all">
                Sign In
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className={cn('md:hidden p-2 rounded-lg transition-colors', isTransparent ? 'hover:bg-white/10' : 'hover:bg-gray-100')}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen
                ? <X size={20} className={isTransparent ? 'text-white' : 'text-gray-700'} />
                : <Menu size={20} className={isTransparent ? 'text-white' : 'text-gray-700'} />
              }
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-2">
                {navLinks.map(({ href, label, icon: Icon }) => (
                  <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                    className={cn('flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors',
                      pathname === href ? 'bg-gold/10 text-gold' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900')}>
                    <Icon size={16} /> {label}
                  </Link>
                ))}
                {!user && (
                  <button onClick={() => { signIn(); setMobileOpen(false); }}
                    className="mt-2 w-full py-3 bg-gold text-white font-semibold rounded-lg text-sm">
                    Sign In with Google
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
