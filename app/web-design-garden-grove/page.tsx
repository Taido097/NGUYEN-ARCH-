import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Garden Grove Web Design for Small Businesses',
  description:
    'Garden Grove web design for local small businesses. Custom mobile-friendly websites, clear pricing from $500, local SEO basics, and English or Vietnamese communication.',
  alternates: {
    canonical: 'https://designedbytd.com/web-design-garden-grove',
  },
  openGraph: {
    title: 'Garden Grove Web Design for Small Businesses | DesignedbyTD',
    description:
      'Custom website design for Garden Grove businesses, with mobile-first layouts, clear calls to action, local SEO basics, and packages starting at $500.',
    url: 'https://designedbytd.com/web-design-garden-grove',
    type: 'website',
  },
};

const included = [
  'Custom website layout based on your business and services',
  'Responsive design for phones, tablets, and desktop screens',
  'Contact, quote, booking, or ordering paths based on your business',
  'Search-friendly titles, headings, metadata, and internal links',
  'Service-area and location information organized clearly',
  'Launch support and help connecting your domain',
];

const faqs = [
  {
    question: 'How much does a small business website cost in Garden Grove?',
    answer:
      'DesignedbyTD starter website packages begin at $500. Pricing changes based on page count, custom features, scheduling, e-commerce, integrations, and the amount of content that needs to be organized or created.',
  },
  {
    question: 'Can you redesign my current website?',
    answer:
      'Yes. A redesign can focus on making the site easier to use on mobile, presenting services more clearly, improving calls to action, and creating a cleaner visual direction without changing what already works for the business.',
  },
  {
    question: 'Can we communicate in Vietnamese?',
    answer:
      'Yes. Website project communication is available in English or Vietnamese, which can be helpful for local business owners who prefer discussing their services, customers, and website goals in either language.',
  },
  {
    question: 'Do you only work with Garden Grove businesses?',
    answer:
      'No. Garden Grove is part of the broader Orange County service area. DesignedbyTD also works with businesses in Anaheim, Westminster, Santa Ana, Irvine, Costa Mesa, Huntington Beach, Tustin, and nearby communities.',
  },
];

export default function GardenGroveWebDesignPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': 'https://designedbytd.com/web-design-garden-grove#service',
        name: 'Garden Grove Web Design',
        serviceType: 'Custom website design for small businesses',
        provider: {
          '@type': 'ProfessionalService',
          '@id': 'https://designedbytd.com/#business',
          name: 'Designed by TD',
          url: 'https://designedbytd.com/',
        },
        areaServed: {
          '@type': 'City',
          name: 'Garden Grove, California',
        },
        availableLanguage: ['English', 'Vietnamese'],
        url: 'https://designedbytd.com/web-design-garden-grove',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://designedbytd.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Orange County Web Design',
            item: 'https://designedbytd.com/orange-county-web-design',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Garden Grove Web Design',
            item: 'https://designedbytd.com/web-design-garden-grove',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#fafafa] pt-24 text-[#121212]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

        <section className="border-b border-black/10 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-black/45">
              Garden Grove, California · Small Business Website Design
            </p>
            <h1 className="max-w-5xl text-[clamp(3.5rem,7vw,6.25rem)] font-medium leading-[.9] tracking-[-0.06em]">
              Garden Grove web design built around how local customers choose a business.
            </h1>
            <p className="mt-7 max-w-3xl text-lg font-light leading-relaxed text-black/65">
              DesignedbyTD creates custom, mobile-friendly websites for Garden Grove restaurants, clinics, service businesses, shops, contractors, and independent professionals that need a clearer and more credible online presence.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-light text-black/55">
              <span>Packages from $500</span>
              <span>English or Vietnamese communication</span>
              <span>Local SEO basics included</span>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-full bg-black px-7 py-6 text-white hover:bg-black/85">
                <Link href="/contact">Request a Website Quote</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-black/20 bg-white px-7 py-6 hover:bg-black hover:text-white">
                <Link href="/demos">View Website Demos</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/40">Designed for local businesses</p>
              <h2 className="mt-4 text-4xl font-medium leading-[1] tracking-[-0.045em] sm:text-5xl">
                A website should make the next step obvious.
              </h2>
              <p className="mt-6 font-light leading-relaxed text-black/65">
                A visitor should not have to search around to figure out what you do, whether you serve their area, how to view your work, or how to contact you. The layout is organized so your services, proof, and calls to action are easy to find on both desktop and mobile.
              </p>
              <p className="mt-5 font-light leading-relaxed text-black/65">
                That can mean a quote form for a contractor, booking for a salon or clinic, a menu and directions for a restaurant, or a portfolio and inquiry form for a creative professional.
              </p>
              <Link href="/orange-county-web-design" className="mt-7 inline-block text-sm font-medium underline underline-offset-4">
                See Orange County web design services
              </Link>
            </div>

            <div className="rounded-xl border border-black/10 bg-white p-7 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/40">What is included</p>
              <div className="mt-7 space-y-4">
                {included.map((item) => (
                  <div key={item} className="flex gap-3 border-b border-black/10 pb-4 last:border-b-0 last:pb-0">
                    <Check className="mt-0.5 h-5 w-5 shrink-0" />
                    <span className="text-sm font-light leading-relaxed text-black/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-black/10 bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/40">Common Garden Grove website projects</p>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.045em] sm:text-5xl">
                Different businesses need different ways to turn a visit into an inquiry.
              </h2>
            </div>
            <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {[
                ['Restaurants & cafés', 'Menus, hours, directions, ordering links, and fast mobile browsing.'],
                ['Dental & wellness', 'Services, treatment information, trust-focused layouts, and booking paths.'],
                ['Contractors & trades', 'Service areas, project proof, quote requests, and clear contact options.'],
                ['Salons & local shops', 'Services, galleries, pricing direction, booking, and location information.'],
              ].map(([title, description]) => (
                <article key={title} className="rounded-xl border border-black/10 bg-[#fafafa] p-6">
                  <h3 className="text-xl font-medium tracking-[-0.03em]">{title}</h3>
                  <p className="mt-4 text-sm font-light leading-relaxed text-black/60">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-medium tracking-[-0.045em] sm:text-5xl">Garden Grove web design questions</h2>
            <div className="mt-10 border-t border-black/10">
              {faqs.map((item) => (
                <article key={item.question} className="border-b border-black/10 py-7">
                  <h3 className="text-xl font-medium tracking-[-0.025em]">{item.question}</h3>
                  <p className="mt-3 font-light leading-relaxed text-black/60">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black py-20 text-white sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="max-w-4xl text-5xl font-medium leading-[.95] tracking-[-0.055em] sm:text-6xl">
              Ready to improve your Garden Grove business website?
            </h2>
            <p className="mt-6 max-w-2xl font-light leading-relaxed text-white/65">
              Browse the website demos, then send a few details about your business, current site, and what you want customers to do next.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-full bg-white px-8 py-6 text-black hover:bg-white/90">
                <Link href="/contact">Request a Website Quote</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/25 bg-transparent px-8 py-6 text-white hover:bg-white hover:text-black">
                <Link href="/demos">Explore All Demos</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
