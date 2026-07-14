'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function AndroidInstallBanner() {
  const [prompt, setPrompt] = useState<Event | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('android-install-dismissed');
    if (dismissed) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e);
      // Small delay so it doesn't flash immediately on page load
      setTimeout(() => setShow(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  async function handleInstall() {
    if (!prompt) return;
    (prompt as BeforeInstallPromptEvent).prompt();
    const { outcome } = await (prompt as BeforeInstallPromptEvent).userChoice;
    if (outcome === 'accepted') {
      setShow(false);
    }
    setPrompt(null);
  }

  function dismiss() {
    setShow(false);
    localStorage.setItem('android-install-dismissed', '1');
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-3" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-3">
          <Image src="/apple-touch-icon.png" alt="YlooTrips" width={48} height={48} className="rounded-xl" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm leading-tight">Add YlooTrips to Home Screen</p>
            <p className="text-gray-500 text-xs mt-0.5">Instant access — no Play Store needed</p>
          </div>
          <button onClick={dismiss} className="text-gray-400 hover:text-gray-600 p-1 -mr-1 flex-shrink-0" aria-label="Dismiss">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 px-4 pb-4">
          <button
            onClick={dismiss}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 font-medium"
          >
            Not now
          </button>
          <button
            onClick={handleInstall}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
          >
            Install App
          </button>
        </div>
      </div>
    </div>
  );
}

// Extend the Window Event type for TypeScript
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}
