'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function IOSInstallBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only iOS Safari (not Chrome/Firefox on iOS, not already installed)
    const ua = window.navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua);
    const isStandalone = ('standalone' in window.navigator) && (window.navigator as { standalone?: boolean }).standalone;
    const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);
    const dismissed = localStorage.getItem('ios-install-dismissed');

    if (isIOS && isSafari && !isStandalone && !dismissed) {
      // Delay slightly so it doesn't flash on page load
      const t = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss() {
    setShow(false);
    localStorage.setItem('ios-install-dismissed', '1');
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-3 safe-area-bottom" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-gray-100">
          <Image src="/apple-touch-icon.png" alt="YlooTrips" width={48} height={48} className="rounded-xl" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm leading-tight">Add YlooTrips to Home Screen</p>
            <p className="text-gray-500 text-xs mt-0.5">Quick access — no App Store needed</p>
          </div>
          <button onClick={dismiss} className="text-gray-400 hover:text-gray-600 p-1 -mr-1 flex-shrink-0" aria-label="Dismiss">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Steps */}
        <div className="px-4 py-3 space-y-2.5">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-blue-600">1</span>
            </div>
            <p className="text-sm text-gray-700">
              Tap the{' '}
              <span className="inline-flex items-center gap-0.5 font-medium text-blue-600">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                  <polyline points="16 6 12 2 8 6"/>
                  <line x1="12" y1="2" x2="12" y2="15"/>
                </svg>
                Share
              </span>{' '}
              button at the bottom of Safari
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-blue-600">2</span>
            </div>
            <p className="text-sm text-gray-700">
              Scroll down and tap{' '}
              <span className="font-medium text-gray-900">"Add to Home Screen"</span>
            </p>
          </div>
        </div>

        {/* Arrow pointing down to Safari toolbar */}
        <div className="flex justify-center pb-3">
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-gray-400">then tap Add</p>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <polyline points="19 12 12 19 5 12"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
