import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 1,
    title: 'Custom Web Design',
    slug: 'custom-web-design',
    description:
      'Beautiful, bespoke websites built specifically for your business and target audience.',
    features: ['Unique Design', 'Responsive Layout', 'Fast Performance', 'SEO Optimized'],
    price: '$2,000 - $5,000',
  },
  {
    id: 2,
    title: 'E-Commerce Solutions',
    slug: 'ecommerce',
    description:
      'Complete e-commerce websites with shopping carts, payment processing, and inventory management.',
    features: ['Shopping Cart', 'Payment Gateway', 'Inventory System', 'Product Gallery'],
    price: '$3,000 - $8,000',
  },
  {
    id: 3,
    title: 'Booking & Scheduling',
    slug: 'booking-scheduling',
    description:
      'Appointment and booking systems integrated into your website for salons, clinics, and services.',
    features: ['Online Booking', 'Calendar Integration', 'Email Reminders', 'Payment Processing'],
    price: '$2,500 - $6,000',
  },
  {
    id: 4,
    title: 'Website Redesign',
    slug: 'redesign',
    description:
      'Modernize your existing website with improved design, performance, and user experience.',
    features: ['Modern Design', 'Better UX', 'Performance Boost', 'Improved Conversions'],
    price: '$1,500 - $4,000',
  },
  {
    id: 5,
    title: 'Mobile App Landing Pages',
    slug: 'app-landing-pages',
    description:
      'High-converting landing pages designed to promote your mobile application and drive downloads.',
    features: ['App Showcase', 'Download Links', 'Screenshots', 'Testimonials'],
    price: '$1,000 - $3,000',
  },
  {
    id: 6,
    title: 'Ongoing Support & Maintenance',
    slug: 'maintenance',
    description:
      'Monthly support plans to keep your website updated, secure, and running smoothly.',
    features: ['Monthly Updates', 'Security Patches', 'Performance Monitoring', 'Email Support'],
    price: '$150 - $500/month',
  },
];

export const metadata: Metadata = {
  title: 'Web Design Services for Orange County Businesses',
  description:
    'Explore custom web design, website redesign, eCommerce, booking and scheduling, landing pages, and ongoing website support for Orange County businesses.',
  alternates: {
    canonical: 'https://designedbytd.com/services',
  },
  openGraph: {
    title: 'Web Design Services for Orange County Businesses',
    description:
      'Custom websites, redesigns, eCommerce, booking systems, landing pages, and ongoing website support from Designed by TD.',
    type: 'website',
    url: 'https://designedbytd.com/services',
    siteName: 'Designed by TD',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Design Services for Orange County Businesses',
    description:
      'Custom websites, redesigns, eCommerce, booking systems, landing pages, and ongoing website support from Designed by TD.',
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen pt-20">
        {/* Hero */}
        <section className="bg-white py-20 border-b border-gray-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-6xl sm:text-7xl font-light text-black mb-6">
              Our Services
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-light">
              Comprehensive web design solutions tailored to your business needs and goals.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 flex-grow">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="border border-gray-300 rounded-none p-8 hover:border-black transition-colors flex flex-col"
                >
                  <h3 className="text-2xl font-light text-black mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed font-light mb-6 flex-grow">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="text-sm text-gray-600 font-light flex items-center gap-2"
                        >
                          <span className="text-black">•</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & CTA */}
                  <div className="border-t border-gray-300 pt-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wider font-medium mb-1">
                        Starting At
                      </p>
                      <p className="text-xl font-medium text-black">
                        {service.price}
                      </p>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-black font-medium text-sm hover:gap-3 transition-all"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-white border-t border-gray-300">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-5xl sm:text-6xl font-light text-black mb-6">
              Don't see what you need?
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-light mb-8">
              We create custom solutions for unique business needs. Get in touch to discuss your project.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-black hover:bg-gray-800 text-white font-medium transition-colors rounded-none"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
