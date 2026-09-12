import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Affordable Web Design for Small Businesses | Starting at $500',
  description:
    'Affordable custom web design for small businesses. Mobile-friendly websites starting at $500 with contact forms, basic SEO, and launch support.',
  alternates: { canonical: '/affordable-web-design' },
  openGraph: {
    title: 'Affordable Web Design for Small Businesses | Designed by TD',
    description: 'Professional small business websites starting at $500.',
    url: '/affordable-web-design',
    type: 'website',
  },
};

const included = [
  'Custom design matched to your business',
  'Mobile, tablet, and desktop responsive layout',
  'Contact or quote-request form',
  'Basic on-page SEO setup',
  'Fast-loading page structure',
  'Launch and handoff support',
];

const faq = [
  {
    question: 'How much does an affordable business website cost?',
    answer:
      'Starter websites begin at $500. The final price depends on the number of pages, forms, booking features, e-commerce, and other custom requirements.',
  },
  {
    question: 'Is a $500 website professionally designed?',
    answer:
      'Yes. The starter package is intended for small businesses that need a polished, mobile-friendly website with a focused set of pages and features.',
  },
  {
    question: 'Will my website work on phones?',
    answer:
      'Yes. Every website is built to adapt to phones, tablets, laptops, and desktop screens.',
  },
];

export default function AffordableWebDesignPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Affordable Web Design',
        provider: { '@type': 'ProfessionalService', name: 'Designed by TD', url: 'https://designedbytd.com' },
        areaServed: 'Orange County, California',
        offers: { '@type': 'Offer', priceCurrency: 'USD', price: '500', description: 'Starter website package starting price' },
        url: 'https://designedbytd.com/affordable-web-design',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <section className="bg-black py-24 text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm uppercase tracking-[0.2em] text-white/60">Affordable website design</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-light leading-tight sm:text-6xl">
              Professional small business websites starting at $500.
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-light leading-relaxed text-white/75">
              Get a custom, mobile-friendly website without paying large-agency prices. Designed by TD builds clear, modern websites that help local businesses look established and turn visitors into inquiries.
            </p>
            <Link href="/contact" className="mt-9 inline-flex items-center gap-2 bg-white px-7 py-4 font-medium text-black hover:bg-gray-100">
              Get a free website quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-4xl font-light text-black">What your starter website can include</h2>
              <p className="mt-5 leading-relaxed text-gray-700">
                The starter package works well for service businesses that need a strong homepage, service information, trust-building content, and a simple way for customers to get in touch.
              </p>
            </div>
            <div className="space-y-4">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3 border-b border-gray-200 pb-4">
                  <Check className="mt-0.5 h-5 w-5 shrink-0" />
                  <span className="text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-light text-black">Affordable does not mean generic</h2>
            <p className="mt-6 leading-relaxed text-gray-700">
              Template builders can be inexpensive, but business owners still have to plan the layout, write the content, choose images, and connect everything correctly. A custom starter website gives you a professional foundation while keeping the project focused and affordable.
            </p>
            <p className="mt-5 leading-relaxed text-gray-700">
              Need a local designer? Explore <Link href="/orange-county-web-design" className="font-medium underline">Orange County web design</Link>, or learn more about <Link href="/small-business-web-design" className="font-medium underline">small business website design</Link>.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-light text-black">Common questions</h2>
            <div className="mt-10 space-y-8">
              {faq.map((item) => (
                <article key={item.question}>
                  <h3 className="text-xl font-medium text-black">{item.question}</h3>
                  <p className="mt-3 leading-relaxed text-gray-700">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
