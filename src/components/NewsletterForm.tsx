'use client';

import React, { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [honey, setHoney] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (honey) {
      // Bot detected via honeypot
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const payload: Record<string, string> = {
        listId: '3b3434a6-57ea-424f-a0a0-c985a61665ab',
        tenantId: 'fef82499-defd-4162-91e2-da9a06fa6d60',
        redirect: 'false',
        _honey: '',
        email: email.trim(),
      };

      if (firstName.trim()) {
        payload.firstName = firstName.trim();
      }

      const res = await fetch('https://nivipulse.in/api/v1/public/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        setStatus({
          type: 'success',
          message: result.doubleOptIn
            ? 'Please check your email to confirm your subscription!'
            : 'Success! You are now subscribed to our updates.',
        });
        setEmail('');
        setFirstName('');
      } else {
        throw new Error(result.message || 'Subscription failed. Please try again.');
      }
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-white dark:bg-surface-container border border-outline-variant dark:border-outline rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <span className="material-symbols-outlined text-primary text-3xl" data-icon="mail">
          mail
        </span>
        <h3 className="font-headline-md text-xl font-bold text-deep-navy dark:text-surface-white">
          Subscribe to our Newsletter
        </h3>
      </div>
      <p className="font-body-md text-on-surface-variant dark:text-secondary-fixed-dim mb-6 text-sm">
        Subscribe to receive deep-dive technical articles, infrastructure updates, and exclusive hosting insights delivered directly to your inbox.
      </p>

      {status.type === 'success' ? (
        <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm text-center">
          <p className="font-semibold mb-1">🎉 Thank you!</p>
          <p>{status.message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Honeypot anti-spam field */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="_honey"
              tabIndex={-1}
              autoComplete="off"
              value={honey}
              onChange={(e) => setHoney(e.target.value)}
            />
          </div>

          <input
            className="w-full bg-surface-container-lowest dark:bg-inverse-surface border border-outline text-on-surface dark:text-surface-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body-md placeholder:text-secondary transition-all text-sm"
            placeholder="First Name (optional)"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={loading}
          />

          <input
            className="w-full bg-surface-container-lowest dark:bg-inverse-surface border border-outline text-on-surface dark:text-surface-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body-md placeholder:text-secondary transition-all text-sm"
            placeholder="Enter your email address *"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          {status.type === 'error' && (
            <p className="text-red-600 dark:text-red-400 text-xs font-medium text-center">
              {status.message}
            </p>
          )}

          <button
            className="w-full bg-primary hover:bg-primary-container text-white font-body-md font-medium py-3 rounded transition-colors duration-200 shadow-sm hover:shadow active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Subscribing...' : 'Subscribe Now'}
          </button>
          <p className="font-body-md text-xs text-secondary text-center mt-2">
            We respect your inbox. No spam.
          </p>
        </form>
      )}
    </div>
  );
}
