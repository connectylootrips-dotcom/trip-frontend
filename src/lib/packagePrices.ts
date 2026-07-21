import { unstable_cache } from 'next/cache';
import { db } from '@/lib/firestore';
import { PACKAGE_DEFAULTS } from '@/lib/packageDefaults';

async function fetchPackagePrice(slug: string): Promise<{ priceINR: number; originalPriceINR: number }> {
  const defaults = PACKAGE_DEFAULTS[slug];
  if (!defaults) return { priceINR: 0, originalPriceINR: 0 };

  try {
    const snap = await db().collection('package_prices').doc(slug).get();
    const override = snap.data();
    return {
      priceINR: (override?.priceINR as number) ?? defaults.priceINR,
      originalPriceINR: (override?.originalPriceINR as number) ?? defaults.originalPriceINR,
    };
  } catch {
    return { priceINR: defaults.priceINR, originalPriceINR: defaults.originalPriceINR };
  }
}

// Cache Firestore price lookups for 1 hour — prices rarely change
export function getPackagePrice(slug: string) {
  return unstable_cache(
    () => fetchPackagePrice(slug),
    [`package-price-${slug}`],
    { revalidate: 3600, tags: [`package-price`, `package-price-${slug}`] }
  )();
}
