import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Web Design Irvine, CA | Small Business Websites',
  description:
    'Web design for Irvine, CA businesses. Custom, mobile-friendly websites with clear calls to action, basic SEO, responsive layouts, and launch support.',
  keywords: [
    'web design Irvine',
    'website design Irvine',
    'website design Irvine CA',
    'Irvine web designer',
    'small business web design Irvine',
    'responsive website design Irvine',
  ],
  alternates: {
    canonical: 'https://designedbytd.com/web-design-irvine',
  },
  openGraph: {
    title: 'Web Design Irvine, CA | Designed by TD',
    description:
      'Custom, mobile-friendly websites for Irvine businesses, with real demos and packages starting at $500.',
    url: 'https://designedbytd.com/web-design-irvine',
    type: 'website',
  },
};

const included = [
  'Custom website design matched to your business',
  'Responsive mobile, tablet, and desktop layouts',
  'Contact forms, booking links, and clear calls to action',
  'Basic on-page SEO and search-friendly structure',
  'Fast-loading pages and clean navigation',
  'Launch and post-launch support',
];

const faqs = [
  {
    question: 'How much does a website for an Irvine business cost?',
    answer:
      'Starter websites begin at $500. The final project price depends on page count, content, booking or e-commerce features, forms, integrations, and other custom requirements.',
  },
  {
    question: 'Can you redesign an existing Irvine business website?',
    answer:
      'Yes. Existing websites can be redesigned with a cleaner layout, stronger mobile experience, clearer service information, and more direct calls to action.',
  },
  {
    question: 'Do Irvine websites include mobile-friendly design?',
    answer:
      'Yes. Every project is built to adapt across phones, tablets, laptops, and desktop screens so visitors can browse and contact the business from any device.',
  },
];

export default function IrvineWebDesignPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Web Design in Irvine, California',
        serviceType: 'Custom website design for Irvine businesses',
        provider: {
          '@type': 'ProfessionalService',
          name: 'Designed by TD',
          url: 'https://designedbytd.com',
        },
        areaServed: {
          '@type': 'City',
          name: 'Irvine, California',
        },
        url: 'https://designedbytd.com/web-design-irvine',
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
              Web Design · Irvine, California
            </p>
            <h1 className="max-w-5xl text-[clamp(3.5rem,7vw,6.25rem)] font-medium leading-[.9] tracking-[-0.06em]">
              Web design for Irvine businesses that need a stronger online presence.
            </h1>
            <p className="mt-7 max-w-3xl text-lg font-light leading-relaxed text-black/65">
              Designed by TD builds custom, responsive websites for Irvine businesses that want to look professional, explain their services clearly, and make it easier for customers to call, book, request a quote, or send a message.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-full bg-black px-7 py-6 text-white hover:bg-black/85">
                <Link href="/contact">Get a Website Quote</Link>
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
              <h2 className="text-4xl font-medium leading-[1] tracking-[-0.045em] sm:text-5xl">
                A website built around the next action you want a customer to take.
              </h2>
              <p className="mt-6 font-light leading-relaxed text-black/65">
                Whether the goal is a phone call, consultation request, appointment, quote, reservation, or online purchase, the layout should make that next step obvious. Each page is organized around clear services, trust-building information, and simple navigation.
              </p>
              <p className="mt-5 font-light leading-relaxed text-black/65">
                Irvine businesses can choose from portfolio, restaurant, scheduling, and custom website directions, then tailor the final design around the brand and customer journey. You can <Link href="/demos" className="font-medium text-black underline underline-offset-4">browse the full demo library</Link> before starting.
              </p>
            </div>

            <div className="rounded-xl border border-black/10 bg-white p-7 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/40">Website foundation</p>
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
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/40">Good fits</p>
            <h2 className="mt-5 max-w-4xl text-4xl font-medium leading-[1] tracking-[-0.045em] sm:text-5xl">
              Flexible website design for different Irvine business models.
            </h2>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                'Professional and local service businesses',
                'Restaurants, cafés, and food businesses',
                'Salons, spas, and appointment-based businesses',
                'Real estate and property professionals',
                'Contractors and home-service companies',
                'Photographers and creative businesses',
              ].map((industry, index) => (
                <div key={industry} className="rounded-xl border border-black/10 p-6">
                  <p className="text-xs font-medium tracking-[0.12em] text-black/35">{String(index + 1).padStart(2, '0')}</p>
                  <p className="mt-8 text-lg font-medium tracking-[-0.025em]">{industry}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-medium tracking-[-0.045em] sm:text-5xl">Irvine web design questions</h2>
            <div className="mt-10 border-t border-black/10">
              {faqs.map((item) => (
                <article key={item.question} className="border-b border-black/10 py-7">
                  <h3 className="text-xl font-medium tracking-[-0.025em]">{item.question}</h3>
                  <p className="mt-3 font-light leading-relaxed text-black/60">{item.answer}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 text-sm font-light leading-relaxed text-black/55">
              Looking outside Irvine? See the broader <Link href="/orange-county-web-design" className="font-medium text-black underline underline-offset-4">Orange County web design services</Link> page.
            </p>
          </div>
        </section>

        <section className="bg-black py-20 text-white sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="max-w-4xl text-5xl font-medium leading-[.95] tracking-[-0.055em] sm:text-6xl">
              Ready to improve your Irvine business website?
            </h2>
            <p className="mt-6 max-w-2xl font-light leading-relaxed text-white/65">
              Send a few details about your business, current website if you have one, and the type of customer action you want the new site to generate.
            </p>
            <Button asChild className="mt-8 rounded-full bg-white px-8 py-6 text-black hover:bg-white/90">
              <Link href="/contact">Start Your Project</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
