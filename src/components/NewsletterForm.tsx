'use client';

import React, { useState, useRef } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Check if email is valid
    if (!email) return;

    setLoading(true);

    // Let the native HTML form submit to the hidden iframe.
    // This avoids browser CORS restrictions on client-side fetch()
    // while keeping the user seamlessly on the same page.
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail('');
      setFirstName('');
    }, 1200);
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

      {/* Hidden iframe target for seamless background submission without page reload */}
      <iframe
        name="nvp-hidden-iframe"
        id="nvp-hidden-iframe"
        className="hidden"
        style={{ display: 'none' }}
        title="Subscription Target"
      />

      {submitted ? (
        <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-sm text-center">
          <p className="font-semibold mb-1">🎉 Thank you for subscribing!</p>
          <p>Please check your inbox to confirm your subscription or view the latest updates.</p>
        </div>
      ) : (
        <form
          ref={formRef}
          action="https://nivipulse.in/api/v1/public/subscribe"
          method="POST"
          target="nvp-hidden-iframe"
          onSubmit={handleSubmit}
          className="flex flex-col gap-3"
        >
          {/* Required Nivi Pulse Hidden Fields */}
          <input type="hidden" name="listId" value="3b3434a6-57ea-424f-a0a0-c985a61665ab" />
          <input type="hidden" name="tenantId" value="fef82499-defd-4162-91e2-da9a06fa6d60" />
          <input type="hidden" name="redirect" value="false" />
          
          {/* Honeypot field for anti-spam */}
          <div className="hidden" style={{ display: 'none' }}>
            <input type="text" name="_honey" defaultValue="" tabIndex={-1} autoComplete="off" />
          </div>

          <input
            className="w-full bg-surface-container-lowest dark:bg-inverse-surface border border-outline text-on-surface dark:text-surface-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body-md placeholder:text-secondary transition-all text-sm"
            placeholder="First Name (optional)"
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={loading}
          />

          <input
            className="w-full bg-surface-container-lowest dark:bg-inverse-surface border border-outline text-on-surface dark:text-surface-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body-md placeholder:text-secondary transition-all text-sm"
            placeholder="Enter your email address *"
            required
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

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
