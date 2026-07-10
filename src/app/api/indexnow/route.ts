/**
 * IndexNow — submits all YlooTrips URLs to Bing, Yandex, Google (via IndexNow protocol)
 * Triggers immediate crawling of new/updated pages
 * v3 — 70+ URLs including all package pages, visa pages, group-travel, faq, blogs
 *
 * Call: GET /api/indexnow  (also auto-called on deploy)
 */

import { NextResponse } from 'next/server';

const HOST = 'https://www.ylootrips.com';
const KEY = 'fcbdc72ba8354feb90a430b55ea69636';
const KEY_LOCATION = `${HOST}/${KEY}.txt`;
const BUILD_TS = '20260710-v4'; // cache-bust token

// All important pages to submit
const URLS = [
  // Core pages
  `${HOST}/`,
  `${HOST}/trips`,
  `${HOST}/destinations`,
  `${HOST}/destinations/domestic`,
  `${HOST}/destinations/international`,
  `${HOST}/blogs`,
  `${HOST}/about`,
  `${HOST}/contact`,
  `${HOST}/events`,
  `${HOST}/reviews`,
  `${HOST}/tripadvisor`,
  `${HOST}/trip-planner`,
  `${HOST}/hotels`,
  `${HOST}/faq`,
  `${HOST}/group-travel`,
  `${HOST}/visa`,
  `${HOST}/travel-insurance`,
  `${HOST}/best-time-to-travel`,
  `${HOST}/india-travel-guide`,

  // Domestic package landing pages (high-value SEO)
  `${HOST}/kashmir-tour-package`,
  `${HOST}/manali-tour-package`,
  `${HOST}/goa-tour-package`,
  `${HOST}/kerala-tour-package`,
  `${HOST}/himachal-tour-package`,
  `${HOST}/uttarakhand-tour-package`,
  `${HOST}/rajasthan-tour-package`,
  `${HOST}/andaman-tour-package`,
  `${HOST}/ladakh-tour-package`,
  `${HOST}/spiti-valley-tour-package`,

  // International package landing pages (high-value SEO)
  `${HOST}/dubai-tour-package-from-delhi`,
  `${HOST}/bali-honeymoon-package`,
  `${HOST}/thailand-budget-trip`,
  `${HOST}/maldives-luxury-package`,
  `${HOST}/singapore-tour-package`,
  `${HOST}/europe-tour-package-from-india`,
  `${HOST}/vietnam-tour-package`,
  `${HOST}/sri-lanka-tour-package`,
  `${HOST}/nepal-tour-package`,

  // Curated tour itinerary pages
  `${HOST}/tours/golden-triangle-10-day`,
  `${HOST}/tours/kerala-south-india-14-day`,
  `${HOST}/tours/rajasthan-heritage-7-day`,

  // Visa destination pages
  `${HOST}/visa/bali`,
  `${HOST}/visa/dubai`,
  `${HOST}/visa/thailand`,
  `${HOST}/visa/singapore`,
  `${HOST}/visa/maldives`,
  `${HOST}/visa/malaysia`,
  `${HOST}/visa/vietnam`,
  `${HOST}/visa/sri-lanka`,
  `${HOST}/visa/europe`,
  `${HOST}/visa/uk`,
  `${HOST}/visa/usa`,

  // Blog posts
  `${HOST}/blogs/manali-trip-cost-for-2`,
  `${HOST}/blogs/kashmir-trip-cost-from-delhi`,
  `${HOST}/blogs/bali-trip-cost-from-india`,
  `${HOST}/blogs/best-time-to-visit-bali`,
  `${HOST}/blogs/dubai-trip-cost-from-india`,
  `${HOST}/blogs/thailand-itinerary-5-days`,
  `${HOST}/blogs/best-honeymoon-destinations-india`,
  `${HOST}/blogs/manali-trip-guide`,
  `${HOST}/blogs/kashmir-travel-guide`,
  `${HOST}/blogs/goa-budget-trip-guide`,
  `${HOST}/blogs/kedarnath-yatra-guide`,
  `${HOST}/blogs/long-weekend-getaways-delhi`,
  `${HOST}/blogs/best-time-to-visit-india`,
  `${HOST}/blogs/india-vs-thailand`,
  `${HOST}/blogs/solo-female-travel-india`,
  `${HOST}/blogs/2-week-india-trip-budget`,
  `${HOST}/blogs/first-time-india-guide`,
];

const ENGINES = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];

export async function GET() {
  const results: Record<string, number> = {};

  const body = {
    host: 'www.ylootrips.com',
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: URLS,
  };

  await Promise.allSettled(
    ENGINES.map(async (engine) => {
      try {
        const res = await fetch(engine, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(body),
        });
        results[engine] = res.status;
      } catch {
        results[engine] = 0;
      }
    })
  );

  console.log(`[indexnow] build=${BUILD_TS} submitted=${URLS.length} engines=${JSON.stringify(results)}`);
  return NextResponse.json(
    { build: BUILD_TS, submitted: URLS.length, urls: URLS, engines: results, timestamp: new Date().toISOString() },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
