'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const caseStudies = [
  {
    id: 1,
    title: 'Photography Studio Website',
    client: 'Aurora Photography',
    result: '150% Increase in Inquiries',
    description:
      'Redesigned portfolio website with gallery, client testimonials, and booking integration. Results in first 3 months.',
  },
  {
    id: 2,
    title: 'Local Auto Repair Shop',
    client: 'Premium Auto Care',
    result: '$50K+ Revenue in First Year',
    description:
      'Custom e-commerce site with appointment booking system. Customers can now book and pay online.',
  },
  {
    id: 3,
    title: 'Beauty Salon Website',
    client: 'Luxe Salon & Spa',
    result: '3x More Bookings',
    description:
      'Mobile-optimized site with integrated booking calendar. Reduced no-shows by 40% with email reminders.',
  },
];

export function CaseStudiesSection() {
  return (
    <section className="py-24 bg-white border-t border-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-5xl sm:text-6xl font-light text-black leading-tight mb-6 max-w-3xl">
            Real Results
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl font-light">
            See how we've helped real businesses grow with custom web design.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="border border-gray-300 rounded-none p-8 flex flex-col h-full hover:border-black transition-colors"
            >
              {/* Result */}
              <div className="mb-6">
                <p className="text-sm font-medium text-black uppercase tracking-wider mb-2">
                  Result
                </p>
                <h3 className="text-2xl font-light text-black">
                  {study.result}
                </h3>
              </div>

              {/* Client & Title */}
              <div className="mb-6 flex-grow">
                <p className="text-xs text-gray-600 uppercase tracking-wider font-medium mb-2">
                  {study.client}
                </p>
                <h4 className="font-medium text-black mb-3">{study.title}</h4>
                <p className="text-gray-700 text-sm leading-relaxed font-light">
                  {study.description}
                </p>
              </div>

              {/* Read More */}
              <Link
                href="#"
                className="inline-flex items-center gap-2 text-black font-medium text-sm hover:gap-3 transition-all"
              >
                Read Full Case Study <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-gray-300">
          <p className="text-gray-700 mb-6 font-light">
            Want to see more results? Check out our full portfolio.
          </p>
          <Link
            href="#portfolio"
            className="inline-flex items-center gap-2 px-8 py-3 bg-black hover:bg-gray-800 text-white font-medium transition-colors rounded-none"
          >
            View Portfolio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
