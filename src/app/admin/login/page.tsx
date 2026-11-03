'use client';

import { type FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const sendCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) {
      setMessage('Admin sign-in is not configured yet. Add the Supabase URL and publishable key.');
      return;
    }

    setBusy(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: { shouldCreateUser: false },
    });
    setBusy(false);

    if (error) {
      setMessage('Could not send a sign-in code. Check the email address and Supabase email settings.');
      return;
    }

    setCodeSent(true);
    setMessage('If this email belongs to an admin account, a one-time code has been sent.');
  };

  const verifyCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;

    setBusy(true);
    setMessage('');
    const { data, error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: code.trim(),
      type: 'email',
    });

    if (error || !data.user) {
      setBusy(false);
      setMessage('That code is invalid or expired. Request a new one and try again.');
      return;
    }

    const { data: admin, error: adminError } = await supabase
      .from('admin_users')
      .select('role')
      .eq('user_id', data.user.id)
      .maybeSingle();

    if (adminError || !admin) {
      await supabase.auth.signOut();
      setBusy(false);
      setMessage('This account does not have admin access.');
      return;
    }

    router.replace('/admin/orders');
    router.refresh();
  };

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem 1rem', background: 'var(--bg-page)' }}>
      <section style={{ width: 'min(100%, 440px)', background: '#fff', border: '1px solid var(--border-color)', borderRadius: 20, padding: '2.25rem', boxShadow: 'var(--shadow-subtle)' }}>
        <Link href="/" style={{ color: 'var(--color-sage-700)', fontSize: '.9rem', textDecoration: 'none' }}>← Crafted by Reet storefront</Link>
        <p style={{ margin: '1.75rem 0 .5rem', color: 'var(--color-sage-700)', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', fontSize: '.75rem' }}>Atelier operations</p>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: '2rem' }}>Admin sign in</h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Sign in with the email address registered for your shop administrator account.</p>

        {!codeSent ? (
          <form onSubmit={sendCode} style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
            <label htmlFor="admin-email" style={{ fontWeight: 600 }}>Admin email</label>
            <input id="admin-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" style={{ width: '100%' }} />
            <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? 'Sending code…' : 'Email me a sign-in code'}</button>
          </form>
        ) : (
          <form onSubmit={verifyCode} style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
            <label htmlFor="admin-code" style={{ fontWeight: 600 }}>One-time code</label>
            <input id="admin-code" inputMode="numeric" autoComplete="one-time-code" required minLength={6} maxLength={8} value={code} onChange={(event) => setCode(event.target.value)} placeholder="Enter the code from your email" style={{ width: '100%' }} />
            <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? 'Verifying…' : 'Verify and continue'}</button>
            <button type="button" className="btn btn-outline" disabled={busy} onClick={() => { setCodeSent(false); setCode(''); setMessage(''); }}>Use a different email</button>
          </form>
        )}

        {message && <p role="status" style={{ color: message.startsWith('This account') || message.startsWith('Could not') ? 'var(--color-terracotta-600)' : 'var(--text-secondary)', lineHeight: 1.5, marginTop: '1rem' }}>{message}</p>}
        <p style={{ fontSize: '.82rem', lineHeight: 1.5, color: 'var(--text-muted)', marginTop: '1.5rem' }}>Admin access is granted separately. Receiving a code alone does not grant access to orders.</p>
      </section>
    </main>
  );
}
