'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: 'How long does a website project take?',
    answer:
      'Most simple business websites take 2-4 weeks from start to launch. The timeline depends on the number of pages, features, and how quickly feedback is provided.',
  },
  {
    id: 2,
    question: "What's included in your web design service?",
    answer:
      'A typical project can include custom design, mobile responsive pages, contact form setup, basic SEO structure, launch support, and help after the website goes live.',
  },
  {
    id: 3,
    question: 'Do you provide ongoing support after launch?',
    answer:
      'Yes. After launch, you can get help with small updates, text changes, bug fixes, and improvements as your business grows.',
  },
  {
    id: 4,
    question: 'Can you redesign my existing website?',
    answer:
      'Yes. If your current website looks outdated or does not clearly explain your services, we can redesign it into something cleaner and easier for customers to use.',
  },
  {
    id: 5,
    question: 'Can you add forms or booking links?',
    answer:
      'Yes. We can add contact forms, quote request forms, booking links, Google Maps, phone buttons, and other features that make it easier for customers to reach you.',
  },
  {
    id: 6,
    question: 'Can I request revisions?',
    answer:
      'Yes. Revisions are part of the design process so the final website feels right for your business before launch.',
  },
];

export function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section id="faq" className="scroll-mt-24 border-t border-black/10 bg-[#fafafa] py-20 text-[#121212] sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="border-t border-black/10 pt-7 sm:pt-8">
          <h2 className="max-w-[900px] text-[clamp(3.5rem,7vw,6.25rem)] font-medium leading-[.9] tracking-[-0.06em]">
            Common Questions
          </h2>
          <p className="mt-6 max-w-[520px] text-base font-light leading-[1.45] tracking-[-0.02em] text-black/70">
            Have questions about the process? Here are answers to the most common ones.
          </p>
        </div>

        <div className="mt-12 border-t border-black/10 lg:mt-14">
          {faqs.map((faq, index) => {
            const open = openId === faq.id;
            return (
              <div key={faq.id} className="border-b border-black/10">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : faq.id)}
                  className="grid w-full grid-cols-[42px_1fr_auto] items-center gap-4 py-6 text-left transition-colors hover:text-black/60 sm:grid-cols-[54px_1fr_auto] sm:py-7"
                  aria-expanded={open}
                >
                  <span className="text-[11px] tracking-[0.14em] text-black/35">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-[clamp(20px,2vw,28px)] font-medium leading-tight tracking-[-0.035em]">
                    {faq.question}
                  </span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-black/45 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                </button>

                <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-3xl pb-7 pl-[58px] pr-8 text-sm font-light leading-relaxed text-black/60 sm:pl-[70px]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-black/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm font-light text-black/60">Still have questions? Send a quick message.</p>
          <a
            href="/contact"
            className="inline-flex items-center rounded-full bg-[#121212] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/85"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
