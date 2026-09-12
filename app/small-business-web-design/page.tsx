import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Small Business Web Design in Orange County',
  description:
    'Custom small business web design for contractors, restaurants, salons, auto shops, movers, photographers, and local service companies in Orange County.',
  alternates: { canonical: '/small-business-web-design' },
  openGraph: {
    title: 'Small Business Web Design in Orange County | Designed by TD',
    description: 'Custom websites built for local service businesses and growing companies.',
    url: '/small-business-web-design',
    type: 'website',
  },
};

const industries = [
  'Contractors and home-service companies',
  'Restaurants, cafés, and food businesses',
  'Salons, spas, and beauty professionals',
  'Auto repair shops and dealerships',
  'Movers, cleaners, and local service providers',
  'Photographers and creative businesses',
];

export default function SmallBusinessWebDesignPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Small Business Web Design',
    serviceType: 'Custom website design for small businesses',
    provider: {
      '@type': 'ProfessionalService',
      name: 'Designed by TD',
      url: 'https://designedbytd.com',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Orange County, California',
    },
    url: 'https://designedbytd.com/small-business-web-design',
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

        <section className="border-b border-gray-200 py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-600">Small business web design</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-light leading-tight text-black sm:text-6xl">
              A website that makes your small business look established.
            </h1>
            <p className="mt-7 max-w-3xl text-lg font-light leading-relaxed text-gray-700">
              Designed by TD creates custom websites for local businesses that need to explain their services clearly, build trust quickly, and make it easy for customers to call, request a quote, or book the next step.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-black px-7 py-4 font-medium text-white hover:bg-gray-800">
                Start your website <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/#portfolio" className="inline-flex items-center justify-center border border-black px-7 py-4 font-medium text-black hover:bg-gray-50">
                View website examples
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-4xl font-light text-black">Built around how customers choose a business</h2>
              <p className="mt-6 leading-relaxed text-gray-700">
                Most visitors want quick answers: what you do, where you work, whether they can trust you, how much it may cost, and how to contact you. Your website should answer those questions without making people search through cluttered pages.
              </p>
              <p className="mt-5 leading-relaxed text-gray-700">
                Each project is structured around clear service pages, strong calls to action, mobile usability, and content that search engines can understand.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {industries.map((industry) => (
                <div key={industry} className="border border-gray-300 p-5 text-sm leading-relaxed text-gray-800">
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black py-20 text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-3">
              <div>
                <h2 className="text-3xl font-light">Clear services</h2>
                <p className="mt-4 font-light leading-relaxed text-white/70">
                  Dedicated sections explain what you offer and help customers understand why your business is the right fit.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-light">Local search foundation</h2>
                <p className="mt-4 font-light leading-relaxed text-white/70">
                  Descriptive page titles, structured content, local service information, and crawlable internal links create a stronger SEO foundation.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-light">More inquiries</h2>
                <p className="mt-4 font-light leading-relaxed text-white/70">
                  Clear buttons, contact forms, and mobile-friendly layouts reduce friction when a visitor is ready to reach out.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-light text-black">Choose the right starting point</h2>
            <p className="mt-6 leading-relaxed text-gray-700">
              Smaller projects can begin with an <Link href="/affordable-web-design" className="font-medium underline">affordable website package starting at $500</Link>. Businesses that need more pages, booking, e-commerce, or custom features can receive a tailored quote.
            </p>
            <p className="mt-5 leading-relaxed text-gray-700">
              For local service coverage, visit the <Link href="/orange-county-web-design" className="font-medium underline">Orange County web design page</Link>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
