/**
 * JSON-LD structured data components for rich Google results.
 * Usage: <OrganizationJsonLd /> in layout, <TourJsonLd ... /> on tour pages, etc.
 */

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['TravelAgency', 'LocalBusiness', 'Corporation'],
        '@id': 'https://www.ylootrips.com/#organization',
        name: 'YlooTrips',
        legalName: 'Ambe Enterprise',
        alternateName: ['Yloo Trips', 'YlooTrips India', 'Yloo Trips India'],
        disambiguatingDescription: 'YlooTrips (also written as Yloo Trips) is a registered Indian travel company operating at ylootrips.com. Not to be confused with "Yolo India", "Yolo Trips", or any other similarly named company. Ambe Enterprise is MSME-registered (UDYAM-HR-05-0141455) and headquartered in New Delhi, India.',
        url: 'https://www.ylootrips.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.ylootrips.com/logo.png',
          width: 512,
          height: 512,
          caption: 'YlooTrips — Safe & Budget India Tour Packages',
        },
        image: [
          'https://www.ylootrips.com/og-image.jpg',
          'https://www.ylootrips.com/logo.png',
        ],
        description:
          'YlooTrips crafts bespoke India travel experiences — Golden Triangle, Kerala, Rajasthan, Himalayas and more. Trusted by 25,000+ travelers from 40+ countries since 2022. MSME registered, GST certified.',
        foundingDate: '2022',
        numberOfEmployees: { '@type': 'QuantitativeValue', value: 50 },
        areaServed: ['IN', 'US', 'GB', 'AU', 'CA', 'DE', 'FR', 'SG'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'New Delhi',
          addressLocality: 'New Delhi',
          addressRegion: 'Delhi',
          postalCode: '110001',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '28.6139',
          longitude: '77.2090',
        },
        hasMap: 'https://maps.google.com/?q=YlooTrips+New+Delhi+India',
        telephone: '+91-8427831127',
        email: 'hello@ylootrips.com',
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
            opens: '09:00',
            closes: '21:00',
          },
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+91-8427831127',
            email: 'hello@ylootrips.com',
            contactType: 'customer service',
            contactOption: 'TollFree',
            availableLanguage: ['English', 'Hindi'],
            hoursAvailable: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
              opens: '09:00',
              closes: '21:00',
            },
          },
          {
            '@type': 'ContactPoint',
            telephone: '+91-8427831127',
            contactType: 'reservations',
            availableLanguage: ['English', 'Hindi'],
          },
        ],
        identifier: [
          { '@type': 'PropertyValue', name: 'GST', value: '07BATPV1942C1ZF' },
          { '@type': 'PropertyValue', name: 'MSME', value: 'UDYAM-HR-05-0141455' },
        ],
        sameAs: [
          'https://www.ylootrips.com',
          'https://www.instagram.com/ylootrips',
          'https://www.facebook.com/profile.php?id=61574908545709',
          'https://twitter.com/ylootrips',
          'https://www.youtube.com/@ylootrips',
          'https://www.linkedin.com/company/ylootrips',
          'https://in.pinterest.com/ylootrips',
          'https://www.threads.net/@ylootrips',
          'https://www.tripadvisor.in/Profile/ylootrips',
          'https://share.google/RltJUJHq75aa8yfAl',
          'https://www.wikidata.org/wiki/Q139764225',
          'https://play.google.com/store/apps/details?id=com.ylootrips.app',
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '2400',
          bestRating: '5',
          worstRating: '1',
        },
        priceRange: '₹₹',
        currenciesAccepted: 'INR, USD, GBP, EUR, AUD',
        paymentAccepted: 'Visa, Mastercard, Amex, UPI, Bank Transfer, EMI',
        knowsAbout: [
          'India Travel', 'Domestic Tours India', 'International Tours from India',
          'Manali Trip', 'Goa Tour', 'Kashmir Tour', 'Kerala Tour', 'Rajasthan Tour',
          'Spiti Valley', 'Leh Ladakh', 'Andaman Tour', 'Uttarakhand Tour', 'Himachal Pradesh Tour',
          'Kedarnath Yatra', 'Char Dham Yatra', 'Golden Triangle Tour',
          'Bali Tour from India', 'Dubai Tour from India', 'Thailand Trip from India',
          'Singapore Tour from India', 'Maldives Luxury Package', 'Europe Tour from India',
          'Vietnam Tour from India', 'Sri Lanka Tour from India', 'Nepal Tour from India',
          'Budget Travel India', 'Luxury Travel India', 'Honeymoon Packages India',
          'Solo Female Travel India', 'Family Tours India', 'Group Tours India',
          'Corporate Travel India', 'Adventure Travel India', 'Pilgrimage Tours India',
          'Travel Insurance India', 'Visa Assistance India', 'Hotel Booking India',
          'Flight Booking India', 'Trip Planning India',
        ],
        makesOffer: [
          { '@type': 'Offer', name: 'Goa Tour Package', description: 'Goa 4-day tour with AC transport, hotel, beach activities & guide', price: '9999', priceCurrency: 'INR', url: 'https://www.ylootrips.com/goa-tour-package' },
          { '@type': 'Offer', name: 'Manali Tour Package', description: 'Manali 5-day snow trip with hotel, transport, Solang Valley activities', price: '12999', priceCurrency: 'INR', url: 'https://www.ylootrips.com/manali-tour-package' },
          { '@type': 'Offer', name: 'Kerala Tour Package', description: 'Kerala 5-day backwaters, houseboat, Munnar hill station with guide', price: '14999', priceCurrency: 'INR', url: 'https://www.ylootrips.com/kerala-tour-package' },
          { '@type': 'Offer', name: 'Kashmir Tour Package', description: 'Kashmir 6-day Dal Lake, Gulmarg, Pahalgam with houseboat stay', price: '18999', priceCurrency: 'INR', url: 'https://www.ylootrips.com/kashmir-tour-package' },
          { '@type': 'Offer', name: 'Bali Honeymoon Package', description: 'Bali 6-night romantic honeymoon with private villa, sunset dinner', price: '42999', priceCurrency: 'INR', url: 'https://www.ylootrips.com/bali-honeymoon-package' },
          { '@type': 'Offer', name: 'Dubai Tour Package from Delhi', description: 'Dubai 5-night package with hotel, visa, Burj Khalifa, desert safari', price: '35999', priceCurrency: 'INR', url: 'https://www.ylootrips.com/dubai-tour-package-from-delhi' },
          { '@type': 'Offer', name: 'Thailand Budget Trip', description: 'Thailand 6-night Bangkok Phuket package with flights and hotel', price: '28999', priceCurrency: 'INR', url: 'https://www.ylootrips.com/thailand-budget-trip' },
          { '@type': 'Offer', name: 'Maldives Luxury Package', description: 'Maldives 5-night overwater bungalow luxury package from India', price: '89999', priceCurrency: 'INR', url: 'https://www.ylootrips.com/maldives-luxury-package' },
          { '@type': 'Offer', name: 'Singapore Tour Package', description: 'Singapore 5-night family-friendly tour with Universal Studios', price: '44999', priceCurrency: 'INR', url: 'https://www.ylootrips.com/singapore-tour-package' },
          { '@type': 'Offer', name: 'Europe Tour Package from India', description: 'Europe multi-country 10-night tour: Paris, Rome, Amsterdam, Switzerland', price: '149999', priceCurrency: 'INR', url: 'https://www.ylootrips.com/europe-tour-package-from-india' },
          { '@type': 'Offer', name: 'Rajasthan Heritage Tour', description: 'Rajasthan 7-day golden triangle: Jaipur, Jodhpur, Udaipur palace tour', price: '16999', priceCurrency: 'INR', url: 'https://www.ylootrips.com/rajasthan-tour-package' },
          { '@type': 'Offer', name: 'Ladakh Tour Package', description: 'Leh Ladakh 7-day adventure with Pangong Lake, Nubra Valley, biking', price: '24999', priceCurrency: 'INR', url: 'https://www.ylootrips.com/ladakh-tour-package' },
          { '@type': 'Offer', name: 'Andaman Tour Package', description: 'Andaman 5-day beach holiday: Havelock, Radhanagar Beach, scuba diving', price: '19999', priceCurrency: 'INR', url: 'https://www.ylootrips.com/andaman-tour-package' },
          { '@type': 'Offer', name: 'Group Tour India', description: 'Custom group tours from 10–500+ people: corporate, wedding, school trips', price: '9999', priceCurrency: 'INR', url: 'https://www.ylootrips.com/group-travel' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'YlooTrips Travel Services & Tour Packages',
          itemListElement: [
            {
              '@type': 'OfferCatalog',
              name: 'Domestic India Tour Packages',
              description: 'Budget to luxury domestic India tours: Manali, Goa, Kashmir, Kerala, Rajasthan, Ladakh, Andaman, Spiti Valley, Uttarakhand, Himachal Pradesh, Kedarnath',
              numberOfItems: 50,
              url: 'https://www.ylootrips.com/destinations/domestic',
            },
            {
              '@type': 'OfferCatalog',
              name: 'International Tour Packages from India',
              description: 'International tours from India: Bali, Dubai, Thailand, Singapore, Maldives, Europe, Vietnam, Sri Lanka, Nepal, Malaysia',
              numberOfItems: 30,
              url: 'https://www.ylootrips.com/destinations/international',
            },
            {
              '@type': 'OfferCatalog',
              name: 'Luxury Travel Packages',
              description: 'Premium 5-star travel: Maldives overwater bungalow, Bali private villa, Kashmir premium houseboat, Europe grand tour',
              numberOfItems: 15,
              url: 'https://www.ylootrips.com/maldives-luxury-package',
            },
            {
              '@type': 'OfferCatalog',
              name: 'Honeymoon Packages',
              description: 'Romantic honeymoon packages: Bali, Maldives, Kashmir, Kerala, Andaman, Europe — curated for couples',
              numberOfItems: 12,
              url: 'https://www.ylootrips.com/bali-honeymoon-package',
            },
            {
              '@type': 'OfferCatalog',
              name: 'Group Travel & Corporate Tours',
              description: 'Group tours for 10–500+ people: corporate incentive travel, destination weddings, school trips, family reunions',
              numberOfItems: 10,
              url: 'https://www.ylootrips.com/group-travel',
            },
          ],
        },
      },
      // MobileApplication — tells Google about the Android app on Play Store
      {
        '@type': 'MobileApplication',
        '@id': 'https://www.ylootrips.com/#app-android',
        name: 'YlooTrips',
        alternateName: ['Yloo Trips', 'YlooTrips App'],
        description: 'Book safe & affordable India tour packages on the YlooTrips app. Manali, Goa, Kashmir, Kerala, Bali, Dubai, Thailand and more. 4.9★ rated · 25,000+ travelers · MSME certified.',
        operatingSystem: 'Android',
        applicationCategory: 'TravelApplication',
        applicationSubCategory: 'TourOperator',
        url: 'https://play.google.com/store/apps/details?id=com.ylootrips.app',
        downloadUrl: 'https://play.google.com/store/apps/details?id=com.ylootrips.app',
        installUrl: 'https://play.google.com/store/apps/details?id=com.ylootrips.app',
        screenshot: 'https://www.ylootrips.com/logo.png',
        image: 'https://www.ylootrips.com/logo.png',
        featureList: [
          'Book domestic India tour packages',
          'International tour packages from India',
          'AI-powered trip planner',
          'WhatsApp 24/7 support',
          'Budget & luxury travel options',
          'Secure online payments with UPI and cards',
          'Real-time booking confirmation',
        ].join(', '),
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '2400',
          bestRating: '5',
          worstRating: '1',
        },
        brand: { '@type': 'Brand', name: 'YlooTrips' },
        publisher: { '@id': 'https://www.ylootrips.com/#organization' },
        author: { '@id': 'https://www.ylootrips.com/#organization' },
        inLanguage: 'en',
        countriesSupported: 'IN',
        availableOnDevice: 'Mobile',
        softwareVersion: '1.0',
        releaseNotes: 'Book India tour packages, international trips, and use the AI trip planner — all in one app.',
      },
      // WebSite with Sitelinks Searchbox — triggers search box in Google SERP
      {
        '@type': 'WebSite',
        '@id': 'https://www.ylootrips.com/#website',
        url: 'https://www.ylootrips.com',
        name: 'YlooTrips',
        alternateName: ['YlooTrips India', 'Yloo Trips'],
        description: 'Safe & affordable domestic and international tour packages from India. Budget trips to Manali, Kedarnath, Goa, Bali, Dubai & more.',
        publisher: { '@id': 'https://www.ylootrips.com/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://www.ylootrips.com/trips?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      // Sitelinks — key pages Google shows as sub-links under the main result
      {
        '@type': 'ItemList',
        '@id': 'https://www.ylootrips.com/#sitelinks',
        name: 'YlooTrips — Key Pages',
        description: 'Quick links to popular YlooTrips pages',
        itemListElement: [
          {
            '@type': 'ListItem', position: 1,
            name: 'Tour Packages',
            description: 'Browse 150+ domestic & international tour packages from India',
            item: {
              '@type': 'WebPage',
              '@id': 'https://www.ylootrips.com/trips',
              url: 'https://www.ylootrips.com/trips',
              name: 'India Tour Packages — Domestic & International | YlooTrips',
            },
          },
          {
            '@type': 'ListItem', position: 2,
            name: 'Contact Us',
            description: 'Book a trip or speak to a travel expert — WhatsApp +91 84278 31127',
            item: {
              '@type': 'WebPage',
              '@id': 'https://www.ylootrips.com/contact',
              url: 'https://www.ylootrips.com/contact',
              name: 'Contact YlooTrips | Book a Tour or Get a Custom Quote',
            },
          },
          {
            '@type': 'ListItem', position: 3,
            name: 'Plan Your Trip',
            description: 'Free AI-powered trip planner — get a custom India itinerary in minutes',
            item: {
              '@type': 'WebPage',
              '@id': 'https://www.ylootrips.com/trip-planner',
              url: 'https://www.ylootrips.com/trip-planner',
              name: 'Free AI Trip Planner | YlooTrips',
            },
          },
          {
            '@type': 'ListItem', position: 4,
            name: 'International Tours',
            description: 'Bali, Dubai, Thailand, Singapore, Maldives — packages from India',
            item: {
              '@type': 'WebPage',
              '@id': 'https://www.ylootrips.com/destinations/international',
              url: 'https://www.ylootrips.com/destinations/international',
              name: 'International Tour Packages from India | YlooTrips',
            },
          },
          {
            '@type': 'ListItem', position: 5,
            name: 'Reviews',
            description: '4.9★ rated by 2,400+ verified travelers',
            item: {
              '@type': 'WebPage',
              '@id': 'https://www.ylootrips.com/reviews',
              url: 'https://www.ylootrips.com/reviews',
              name: 'YlooTrips Reviews — 4.9★ Verified Traveler Testimonials',
            },
          },
          {
            '@type': 'ListItem', position: 6,
            name: 'We are Hiring',
            description: 'Join the YlooTrips team — open positions in travel, marketing & operations',
            item: {
              '@type': 'WebPage',
              '@id': 'https://www.ylootrips.com/careers',
              url: 'https://www.ylootrips.com/careers',
              name: 'Careers at YlooTrips | Join Our Team',
            },
          },
          {
            '@type': 'ListItem', position: 7,
            name: 'About Us',
            description: 'Learn about YlooTrips — India\'s trusted travel company since 2022',
            item: {
              '@type': 'WebPage',
              '@id': 'https://www.ylootrips.com/about',
              url: 'https://www.ylootrips.com/about',
              name: 'About YlooTrips | India\'s Trusted Travel Company Since 2022',
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface TourJsonLdProps {
  name: string;
  description: string;
  url: string;
  image: string;
  price: string;
  currency?: string;
  duration: string;
  startLocation: string;
  highlights: string[];
  rating?: number;
  reviewCount?: number;
  destination?: string;
}

export function TourJsonLd({
  name,
  description,
  url,
  image,
  price,
  currency = 'INR',
  duration,
  startLocation,
  highlights,
  rating = 4.9,
  reviewCount = 847,
  destination,
}: TourJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      // TouristTrip — correct type for travel packages (enables rich snippets)
      {
        '@type': 'TouristTrip',
        '@id': `${url}#trip`,
        name,
        description,
        url,
        image: { '@type': 'ImageObject', url: image, width: 1200, height: 630 },
        touristType: ['FamilyTourist', 'HoneymoonTourist', 'GroupTourist', 'SoloTourist'],
        availableLanguage: ['English', 'Hindi'],
        itinerary: {
          '@type': 'ItemList',
          name: `${name} — Day by Day`,
          description: `Complete ${duration} itinerary for ${name}`,
        },
        provider: {
          '@type': 'TravelAgency',
          name: 'YlooTrips',
          url: 'https://www.ylootrips.com',
          telephone: '+91-8427831127',
          email: 'hello@ylootrips.com',
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: currency,
          price,
          priceValidUntil: '2026-12-31',
          availability: 'https://schema.org/InStock',
          url,
          validFrom: '2026-01-01',
          seller: {
            '@type': 'TravelAgency',
            name: 'YlooTrips',
            url: 'https://www.ylootrips.com',
          },
        },
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'Duration', value: duration },
          { '@type': 'PropertyValue', name: 'Departure City', value: startLocation },
          ...(destination ? [{ '@type': 'PropertyValue', name: 'Destination', value: destination }] : []),
          ...highlights.slice(0, 6).map((h) => ({
            '@type': 'PropertyValue',
            name: 'Highlight',
            value: h,
          })),
        ],
      },
      // Product schema — AggregateRating goes here (Google only supports review snippets on Product)
      {
        '@type': 'Product',
        '@id': `${url}#product`,
        name,
        description,
        image,
        brand: { '@type': 'Brand', name: 'YlooTrips' },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: rating.toString(),
          reviewCount: reviewCount.toString(),
          bestRating: '5',
          worstRating: '1',
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: currency,
          price,
          availability: 'https://schema.org/InStock',
          url,
          seller: { '@type': 'Organization', name: 'YlooTrips', url: 'https://www.ylootrips.com' },
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── Reviews page: AggregateRating + Review list for Google rich snippets ──────
export function ReviewsPageJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.ylootrips.com/#organization',
    name: 'Ambe Enterprise',
    url: 'https://www.ylootrips.com',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2400',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Sarah Mitchell' },
        datePublished: '2025-12-10',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Absolutely incredible trip to Kerala! YlooTrips arranged everything perfectly — the houseboat stay in Alleppey was magical. Our guide Arjun was knowledgeable and attentive. Highly recommend!',
        name: 'Kerala Backwaters — Magical Experience',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'James Thornton' },
        datePublished: '2025-11-20',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Booked the Golden Triangle tour for our family of 4. Seamless from airport pickup to checkout. The private guide made the Taj Mahal come alive with stories. Worth every rupee.',
        name: 'Golden Triangle — Perfect Family Tour',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Priya Sharma' },
        datePublished: '2025-10-15',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Solo female traveler here — I was nervous about India but YlooTrips made it so safe and easy. 24/7 WhatsApp support, clean hotels, professional guides. Already planning my next trip!',
        name: 'Rajasthan Solo Trip — Safe & Beautiful',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'David Chen' },
        datePublished: '2025-09-05',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Booked Manali package last minute. YlooTrips confirmed within hours, sent a full itinerary, and our guide was waiting at the hotel. Snow activities in Solang Valley were unreal!',
        name: 'Manali Last-Minute Trip — Exceeded Expectations',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Emma Wilson' },
        datePublished: '2025-08-22',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'Honeymoon package to Bali arranged by YlooTrips. Every detail was perfect — surprise flower decoration at the villa, private sunset dinner, spa. Cannot recommend highly enough.',
        name: 'Bali Honeymoon — Absolutely Perfect',
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

// ── Speakable schema — helps Google Assistant / voice search ─────────────────
export function SpeakableJsonLd({ url, cssSelectors }: { url: string; cssSelectors: string[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    speakable: { '@type': 'SpeakableSpecification', cssSelector: cssSelectors },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

interface ArticleJsonLdProps {
  headline: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  authorUrl?: string;
  keywords?: string[];
}

export function ArticleJsonLd({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName = 'Priya Verma',
  authorUrl = 'https://www.ylootrips.com/blogs/authors/priya-verma',
  keywords = [],
}: ArticleJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    image: { '@type': 'ImageObject', url: image, width: 1200, height: 630 },
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'YlooTrips',
      url: 'https://www.ylootrips.com',
      logo: { '@type': 'ImageObject', url: 'https://www.ylootrips.com/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: keywords.join(', '),
    inLanguage: 'en',
    about: { '@type': 'Thing', name: 'India Travel' },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
