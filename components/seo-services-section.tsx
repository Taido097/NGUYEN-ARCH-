import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Affordable Web Design',
    description:
      'Professional, mobile-friendly websites with clear pricing for local businesses that need a strong online presence without a large agency budget.',
    href: '/affordable-web-design',
  },
  {
    title: 'Small Business Web Design',
    description:
      'Custom websites for restaurants, salons, contractors, moving companies, auto shops, photographers, and other service businesses.',
    href: '/small-business-web-design',
  },
  {
    title: 'Orange County Web Design',
    description:
      'Local website design serving Garden Grove, Westminster, Anaheim, Santa Ana, Huntington Beach, Irvine, Costa Mesa, and nearby cities.',
    href: '/orange-county-web-design',
  },
];

export function SeoServicesSection() {
  return (
    <section aria-labelledby="website-design-services" className="border-y border-gray-200 bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-gray-600">
            Local website design services
          </p>
          <h2 id="website-design-services" className="mt-4 text-4xl font-light tracking-tight text-black sm:text-5xl">
            Websites built to help small businesses get found and win more customers.
          </h2>
          <p className="mt-5 text-lg font-light leading-relaxed text-gray-700">
            Designed by TD creates affordable, custom websites for Orange County businesses. Every site is responsive, easy to navigate, and structured so search engines can understand the services you offer.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article key={service.href} className="flex flex-col border border-gray-300 bg-white p-7">
              <h3 className="text-2xl font-light text-black">{service.title}</h3>
              <p className="mt-4 flex-1 text-sm font-light leading-relaxed text-gray-700">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-black underline-offset-4 hover:underline"
              >
                Learn more
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
