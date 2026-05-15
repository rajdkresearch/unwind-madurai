'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

function buildGoogleOAuthUrl(redirectOrigin: string) {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID || '',
    redirect_uri: `${redirectOrigin}/login/callback`,
    response_type: 'token',
    scope: 'openid email profile',
    prompt: 'select_account',
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

// Inner component that uses useSearchParams — must be inside Suspense
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const redirectTo = searchParams.get('redirect') || '/book';

  useEffect(() => {
    if (user) router.replace(redirectTo);
  }, [user, router, redirectTo]);

  const handleGoogleSignIn = () => {
    setLoading(true);
    sessionStorage.setItem('auth_redirect', redirectTo);
    window.location.href = buildGoogleOAuthUrl(window.location.origin);
  };

  const handleDemoSignIn = () => {
    setLoading(true);
    const demoUser = {
      id: 'demo-user-001',
      name: 'Arjun Krishnamurthy',
      email: 'arjun@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Arjun+Krishnamurthy&background=C9A84C&color=000&bold=true',
    };
    localStorage.setItem('unwind_user', JSON.stringify(demoUser));
    window.location.href = redirectTo;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-20 w-full max-w-md mx-4"
    >
      <div className="glass-card p-8 sm:p-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl font-bold mb-2">
            <span className="text-gold">UN</span><span className="text-[#1A1A1A]">WIND</span>
          </div>
          <p className="text-[#6B6460] text-sm">Madurai's Premier Private Dining Experience</p>
        </div>

        <div className="border-t border-[#EDE8DF] pt-8 mb-6">
          <h2 className="text-xl font-bold text-[#1A1A1A] text-center mb-1">Welcome Back</h2>
          <p className="text-[#6B6460] text-sm text-center mb-8">Sign in to book your exclusive space</p>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-white border border-[#EDE8DF] text-gray-800 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-sm disabled:opacity-60 mb-3"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin text-gray-500" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-[#EDE8DF]" />
            <span className="text-[#9C948E] text-xs">or</span>
            <div className="flex-1 h-px bg-[#EDE8DF]" />
          </div>

          {/* Demo Sign In */}
          <button
            onClick={handleDemoSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-gold/10 border border-gold/30 text-gold font-semibold rounded-xl hover:bg-gold/15 transition-all disabled:opacity-60"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : '✨'}
            Try Demo (No login needed)
          </button>
        </div>

        <p className="text-center text-[#9C948E] text-xs mt-6 leading-relaxed">
          By signing in, you agree to our{' '}
          <span className="text-gold/70">Terms of Service</span> and{' '}
          <span className="text-gold/70">Privacy Policy</span>
        </p>
      </div>

      {/* Trust indicators */}
      <div className="flex items-center justify-center gap-6 mt-6 text-xs text-[#9C948E]">
        <span>🔒 Secure Login</span>
        <span>✅ No spam</span>
        <span>🏛 Madurai&apos;s #1</span>
      </div>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FBF8F3]">
      {/* Soft warm background pattern */}
      <div className="absolute inset-0 z-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(circle at 30% 20%, #C9A84C22 0%, transparent 50%), radial-gradient(circle at 70% 80%, #C9A84C11 0%, transparent 50%)',
      }} />

      {/* Suspense wraps useSearchParams */}
      <Suspense fallback={
        <div className="relative z-20 flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-gold" />
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
