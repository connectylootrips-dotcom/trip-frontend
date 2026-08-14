'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Silently captures ?ref=CODE from the URL on any page and persists it
 * to localStorage so it travels with the user through to booking.
 * Rendered in root layout — no visible UI.
 */
export default function ReferralCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref && ref.length >= 4 && ref.length <= 20) {
      // Only set if not already referred (first referral wins)
      if (!localStorage.getItem('ylootrips-referral-from')) {
        localStorage.setItem('ylootrips-referral-from', ref.toUpperCase());
      }
    }
  }, [searchParams]);

  return null;
}
