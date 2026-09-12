import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Orange County Web Design for Small Businesses',
  description:
    'Custom Orange County web design for small businesses. Mobile-first websites, clear pricing from $500, local SEO setup, and launch support.',
  alternates: {
    canonical: 'https://designedbytd.com/orange-county-web-design',
  },
  openGraph: {
    title: 'Orange County Web Design for Small Businesses | DesignedbyTD',
    description:
      'Custom, mobile-friendly websites for Orange County businesses, with transparent packages starting at $500 and practical local SEO setup.',
    url: 'https://designedbytd.com/orange-county-web-design',
    type: 'website',
  },
};

const services = [
  'Custom design built around your business, services, and customers',
  'Responsive layouts for phones, tablets, laptops, and desktops',
  'Clear calls to action for calls, quotes, bookings, and messages',
  'On-page SEO basics, descriptive headings, metadata, and internal links',
  'Fast-loading page structure and image-conscious layouts',
  'Launch support and help connecting the site to your domain',
];

const industries = [
  {
    title: 'Restaurants & cafés',
    description:
      'Menus, hours, location details, reservations, online ordering links, and mobile-first layouts for people searching on the go.',
    href: '/demos',
  },
  {
    title: 'Dental, med spa & wellness',
    description:
      'Service pages, treatment information, booking paths, trust-focused layouts, and clear ways for new patients or clients to contact you.',
    href: '/services/scheduling',
  },
  {
    title: 'Contractors & local services',
    description:
      'Service-area pages, project galleries, quote requests, reviews, and simple conversion paths for homeowners comparing local providers.',
    href: '/services/custom-website',
  },
  {
    title: 'Creative & professional businesses',
    description:
      'Portfolio-led websites that make the work easy to browse while keeping services, pricing, and contact information easy to find.',
    href: '/services/portfolio',
  },
];

const faqs = [
  {
    question: 'How much does web design cost in Orange County?',
    answer:
      'Starter websites begin at $500. Final pricing depends on the number of pages, custom features, booking tools, e-commerce, integrations, and how much content needs to be created or organized.',
  },
  {
    question: 'Will my website be mobile friendly and responsive?',
    answer:
      'Yes. Every website is designed to adapt across phones, tablets, laptops, and desktop screens so customers can browse services and contact your business comfortably from any device.',
  },
  {
    question: 'Do you include SEO with the website?',
    answer:
      'Each build includes practical on-page SEO basics such as descriptive page titles, metadata, heading structure, crawlable links, mobile-friendly layouts, and search-friendly page organization. Ongoing ranking growth also depends on content, competition, authority, reviews, and links from other websites.',
  },
  {
    question: 'Can you redesign an existing business website?',
    answer:
      'Yes. Existing sites can be redesigned when the current layout feels outdated, is difficult to use on mobile, does not explain services clearly, or makes it too hard for visitors to contact the business.',
  },
  {
    question: 'What Orange County cities do you serve?',
    answer:
      'Website design is available for businesses throughout Orange County, including Garden Grove, Anaheim, Irvine, Costa Mesa, Huntington Beach, Westminster, Santa Ana, Tustin, Fullerton, Fountain Valley, Newport Beach, and nearby communities.',
  },
];

export default function OrangeCountyWebDesignPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': 'https://designedbytd.com/orange-county-web-design#service',
        name: 'Orange County Web Design',
        serviceType: 'Custom website design for small businesses',
        provider: {
          '@type': 'ProfessionalService',
          '@id': 'https://designedbytd.com/#business',
          name: 'Designed by TD',
          url: 'https://designedbytd.com',
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Orange County, California',
        },
        offers: {
          '@type': 'Offer',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: 500,
            priceCurrency: 'USD',
          },
        },
        url: 'https://designedbytd.com/orange-county-web-design',
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
              Orange County, California · Custom Website Design
            </p>
            <h1 className="max-w-5xl text-[clamp(3.5rem,7vw,6.25rem)] font-medium leading-[.9] tracking-[-0.06em]">
              Orange County web design for small businesses that need more than a pretty homepage.
            </h1>
            <p className="mt-7 max-w-3xl text-lg font-light leading-relaxed text-black/65">
              DesignedbyTD builds custom, mobile-friendly websites for Orange County businesses that want to look professional, explain their services clearly, and make it easier for customers to call, request a quote, book, or send a message.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-light text-black/55">
              <span>Packages from $500</span>
              <span>Mobile-first design</span>
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
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/40">What your website should do</p>
              <h2 className="mt-4 text-4xl font-medium leading-[1] tracking-[-0.045em] sm:text-5xl">
                Help a local customer understand your business in seconds.
              </h2>
              <p className="mt-6 font-light leading-relaxed text-black/65">
                People comparing businesses online usually want quick answers: what you offer, where you serve, what makes you credible, what the next step costs, and how to contact you. The page structure is built around those decisions instead of filling space with generic marketing copy.
              </p>
              <p className="mt-5 font-light leading-relaxed text-black/65">
                If you already have a website, the goal can be a focused redesign. If you are starting from zero, the site can be planned around your services, ideal customers, and the actions you want visitors to take.
              </p>
              <div className="mt-7 flex flex-wrap gap-4 text-sm">
                <Link href="/small-business-web-design" className="font-medium underline underline-offset-4">
                  Small business web design
                </Link>
                <Link href="/affordable-web-design" className="font-medium underline underline-offset-4">
                  Affordable website packages
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-black/10 bg-white p-7 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/40">What is included</p>
              <div className="mt-7 space-y-4">
                {services.map((service) => (
                  <div key={service} className="flex gap-3 border-b border-black/10 pb-4 last:border-b-0 last:pb-0">
                    <Check className="mt-0.5 h-5 w-5 shrink-0" />
                    <span className="text-sm font-light leading-relaxed text-black/70">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-black/10 bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/40">Built around real business needs</p>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.045em] sm:text-5xl">
                Website design for the types of businesses Orange County customers search for every day.
              </h2>
            </div>
            <div className="mt-10 grid gap-3 md:grid-cols-2">
              {industries.map((industry) => (
                <article key={industry.title} className="rounded-xl border border-black/10 bg-[#fafafa] p-7">
                  <h3 className="text-2xl font-medium tracking-[-0.035em]">{industry.title}</h3>
                  <p className="mt-4 text-sm font-light leading-relaxed text-black/60">{industry.description}</p>
                  <Link href={industry.href} className="mt-6 inline-block text-sm font-medium underline underline-offset-4">
                    See a relevant website option
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/40">Orange County service area</p>
                <h2 className="mt-4 text-4xl font-medium tracking-[-0.045em] sm:text-5xl">
                  Local web design without forcing every business into the same template.
                </h2>
                <p className="mt-6 max-w-3xl font-light leading-relaxed text-black/65">
                  Website design is available across Orange County, including Garden Grove, Anaheim, Irvine, Costa Mesa, Huntington Beach, Westminster, Santa Ana, Tustin, Fullerton, Fountain Valley, Newport Beach, Yorba Linda, and nearby communities.
                </p>
                <p className="mt-5 max-w-3xl font-light leading-relaxed text-black/65">
                  Different industries need different conversion paths. A restaurant needs fast access to menus and directions. A contractor needs project proof and quote requests. A med spa or dental office needs services, trust, and booking. The website should reflect how your customers actually choose.
                </p>
              </div>

              <div className="rounded-xl border border-black/10 bg-white p-7 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/40">Local pages</p>
                <div className="mt-7 space-y-5">
                  <div>
                    <Link href="/web-design-garden-grove" className="text-xl font-medium tracking-[-0.025em] underline underline-offset-4">
                      Garden Grove web design
                    </Link>
                    <p className="mt-2 text-sm font-light leading-relaxed text-black/55">
                      Website design for Garden Grove service businesses, restaurants, clinics, shops, and independent professionals.
                    </p>
                  </div>
                  <div className="border-t border-black/10 pt-5">
                    <Link href="/web-design-irvine" className="text-xl font-medium tracking-[-0.025em] underline underline-offset-4">
                      Irvine web design
                    </Link>
                    <p className="mt-2 text-sm font-light leading-relaxed text-black/55">
                      Custom websites for Irvine businesses that need clear services, stronger presentation, and better mobile usability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-black/10 bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-3 md:grid-cols-3">
              <article className="rounded-xl border border-black/10 p-6">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/35">01</p>
                <h2 className="mt-10 text-3xl font-medium tracking-[-0.04em]">Mobile friendly</h2>
                <p className="mt-4 text-sm font-light leading-relaxed text-black/60">
                  Responsive layouts keep services, menus, forms, galleries, and contact buttons easy to use on smaller screens.
                </p>
              </article>
              <article className="rounded-xl border border-black/10 p-6">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/35">02</p>
                <h2 className="mt-10 text-3xl font-medium tracking-[-0.04em]">Clear conversion paths</h2>
                <p className="mt-4 text-sm font-light leading-relaxed text-black/60">
                  Calls to action help visitors move from browsing to calling, requesting a quote, booking, ordering, or sending a message.
                </p>
              </article>
              <article className="rounded-xl border border-black/10 p-6">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/35">03</p>
                <h2 className="mt-10 text-3xl font-medium tracking-[-0.04em]">Search-ready structure</h2>
                <p className="mt-4 text-sm font-light leading-relaxed text-black/60">
                  Descriptive headings, crawlable pages, useful internal links, and sensible metadata make the site easier for search engines and customers to understand.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-medium tracking-[-0.045em] sm:text-5xl">Orange County web design questions</h2>
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
              Need a better website for your Orange County business?
            </h2>
            <p className="mt-6 max-w-2xl font-light leading-relaxed text-white/65">
              Browse the demo library to see different website directions, then send a few details about your business and what you want the site to accomplish.
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
