import Link from 'next/link';
import { MapPin, Phone, Mail, Share2, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0D1F3C] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-3xl font-bold mb-3">
              <span className="text-gold">UN</span><span className="text-white">WIND</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              A premium private facility in the heart of Madurai for exclusive dining, celebrations, and memorable moments.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 transition-colors">
                <Share2 size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 transition-colors">
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {[
                { href: '/book', label: 'Book a Space' },
                { href: '/menu', label: 'Order Food' },
                { href: '/my-bookings', label: 'My Bookings' },
                { href: '/login', label: 'Sign In' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="text-white/40 hover:text-gold text-sm transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-gold mt-0.5 shrink-0" />
                <span className="text-white/40 text-sm">24, Anna Nagar, Madurai – 625 020, Tamil Nadu</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-gold shrink-0" />
                <a href="tel:+919876543210" className="text-white/40 hover:text-gold text-sm transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-gold shrink-0" />
                <a href="mailto:hello@unwindmadurai.com" className="text-white/40 hover:text-gold text-sm transition-colors">hello@unwindmadurai.com</a>
              </div>
            </div>

            <div className="mt-5 p-3 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-xs text-gold font-medium">Open Daily</p>
              <p className="text-xs text-white/40 mt-0.5">11:00 AM – 11:30 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/25 text-xs">© 2025 Unwind Madurai. All rights reserved.</p>
          <p className="text-white/25 text-xs">Made with ❤ in Madurai, Tamil Nadu</p>
        </div>
      </div>
    </footer>
  );
}
