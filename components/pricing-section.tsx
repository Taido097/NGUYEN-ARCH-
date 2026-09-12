'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    price: '$500+',
    description: 'Perfect for a simple local business website',
    features: [
      'Up to 5 pages',
      'Mobile responsive',
      'Contact form',
      'Basic SEO setup',
      'Fast loading layout',
      'Simple launch support',
    ],
    highlighted: true,
  },
  {
    name: 'Professional',
    price: '$1,000+',
    description: 'Great for businesses that want a stronger online presence',
    features: [
      'Up to 10 pages',
      'Custom homepage design',
      'Service pages',
      'Contact form',
      'Google Maps link',
      'SEO-friendly structure',
      'Mobile responsive',
      'Post-launch support',
    ],
    highlighted: false,
  },
  {
    name: 'Custom',
    price: 'Custom',
    description: 'For booking, e-commerce, or more advanced features',
    features: [
      'Custom page count',
      'Booking or request forms',
      'Custom integrations',
      'Advanced sections',
      'Ongoing updates',
      'Priority support',
    ],
    highlighted: false,
    ctaText: 'Ask for Quote',
    ctaLink: '/contact',
  },
];

export function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="pricing" className="scroll-mt-24 border-t border-black/10 bg-[#fafafa] py-20 text-[#121212] sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="border-t border-black/10 pt-7 sm:pt-8">
          <h2 className="max-w-[900px] text-[clamp(3.5rem,7vw,6.25rem)] font-medium leading-[.9] tracking-[-0.06em]">
            Simple Pricing
          </h2>
          <p className="mt-6 max-w-[520px] text-base font-light leading-[1.45] tracking-[-0.02em] text-black/70">
            Choose the right starting point for your business. Every package is adjusted based on what the website needs.
          </p>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-3 lg:mt-14">
          {plans.map((plan, index) => (
            <article
              key={plan.name}
              className={`flex min-h-[540px] flex-col rounded-none border p-7 transition-all duration-700 [transition-timing-function:cubic-bezier(.22,1,.36,1)] sm:p-8 ${
                plan.highlighted
                  ? 'border-black bg-[#121212] text-white'
                  : 'border-black/10 bg-white text-[#121212]'
              } ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0'}`}
              style={{ transitionDelay: `${index * 90}ms`, borderRadius: 0 }}
            >
              <div className={`text-[11px] uppercase tracking-[0.14em] ${plan.highlighted ? 'text-white/55' : 'text-black/40'}`}>
                {plan.highlighted ? 'Most Chosen' : index === 1 ? 'For growing businesses' : 'Advanced projects'}
              </div>

              <h3 className="mt-7 text-[clamp(30px,3vw,42px)] font-medium leading-none tracking-[-0.05em]">
                {plan.name}
              </h3>
              <p className={`mt-3 max-w-[34ch] text-sm font-light leading-relaxed ${plan.highlighted ? 'text-white/60' : 'text-black/60'}`}>
                {plan.description}
              </p>

              <div className="mt-10">
                <div className="text-[clamp(44px,4vw,66px)] font-medium leading-[.95] tracking-[-0.06em]">
                  {plan.price}
                </div>
                <p className={`mt-2 text-xs ${plan.highlighted ? 'text-white/45' : 'text-black/45'}`}>
                  {plan.price === 'Custom' ? 'project quote' : 'starting price'}
                </p>
              </div>

              <div className="my-8 flex flex-grow flex-col gap-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm leading-relaxed">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" />
                    <span className={plan.highlighted ? 'text-white/75' : 'text-black/70'}>{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={plan.ctaLink || '/contact'}
                style={{ borderRadius: 0 }}
                className={`group inline-flex items-center justify-between rounded-none px-5 py-3.5 text-sm font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'bg-[#121212] text-white hover:bg-black/85'
                }`}
              >
                <span>{plan.ctaText || 'Get Started'}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-20 border-t border-black/10 pt-10 lg:mt-24">
          <h3 className="text-[clamp(28px,3vw,42px)] font-medium leading-none tracking-[-0.05em]">Questions?</h3>
          <div className="mt-8 grid max-w-4xl gap-10 md:grid-cols-2">
            <div>
              <h4 className="text-lg font-medium tracking-[-0.03em]">Do you offer payment plans?</h4>
              <p className="mt-3 text-sm font-light leading-relaxed text-black/60">
                Yes. Payment plans can be discussed depending on the project size and timeline.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium tracking-[-0.03em]">What's included in support?</h4>
              <p className="mt-3 text-sm font-light leading-relaxed text-black/60">
                Support can include bug fixes, small text changes, and help after the website goes live.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
