'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// Handles Google OAuth implicit flow callback
export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) { router.replace('/login'); return; }

    const params = new URLSearchParams(hash.slice(1));
    const accessToken = params.get('access_token');

    if (!accessToken) { router.replace('/login'); return; }

    // Fetch user info from Google
    fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(r => r.json())
      .then(info => {
        const user = {
          id: info.sub,
          name: info.name,
          email: info.email,
          avatar: info.picture,
        };
        localStorage.setItem('unwind_user', JSON.stringify(user));
        const redirect = sessionStorage.getItem('auth_redirect') || '/book';
        sessionStorage.removeItem('auth_redirect');
        router.replace(redirect);
      })
      .catch(() => router.replace('/login'));
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060F08]">
      <div className="text-center">
        <Loader2 size={40} className="animate-spin text-gold mx-auto mb-4" />
        <p className="text-white/50 text-sm">Signing you in...</p>
      </div>
    </div>
  );
}
