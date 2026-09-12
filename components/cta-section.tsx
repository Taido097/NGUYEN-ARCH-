'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="cta" className="scroll-mt-24 border-t border-black/10 bg-[#fafafa] py-20 text-[#121212] sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div
          className={`border-t border-black/10 pt-7 transition-all duration-700 [transition-timing-function:cubic-bezier(.22,1,.36,1)] sm:pt-8 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0'
          }`}
        >
          <h2 className="max-w-[1100px] text-[clamp(4.2rem,9vw,8rem)] font-medium leading-[.84] tracking-[-0.07em]">
            Ready to start?
          </h2>

          <p className="mt-7 max-w-[600px] text-lg font-light leading-[1.5] tracking-[-0.02em] text-black/70 sm:text-xl">
            Let's create a clean, professional website that helps customers understand your business and contact you faster.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              style={{ borderRadius: 0 }}
              className="group inline-flex items-center justify-between gap-5 rounded-none bg-[#121212] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/85"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href="mailto:designedbytd.studio@gmail.com"
              style={{ borderRadius: 0 }}
              className="inline-flex items-center justify-center rounded-none border border-black/10 bg-white px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20"
            >
              Email Me
            </a>
          </div>

          <div className="mt-16 border-t border-black/10 pt-10">
            <p className="text-sm font-light text-black/55">Website design for local businesses and entrepreneurs</p>
            <div className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-0">
              <div className="sm:pr-8">
                <div className="text-[clamp(40px,4vw,58px)] font-medium leading-none tracking-[-0.06em]">100%</div>
                <p className="mt-2 text-sm font-light text-black/50">Custom Design</p>
              </div>
              <div className="border-black/10 sm:border-l sm:px-8">
                <div className="text-[clamp(40px,4vw,58px)] font-medium leading-none tracking-[-0.06em]">2-4</div>
                <p className="mt-2 text-sm font-light text-black/50">Week Turnaround</p>
              </div>
              <div className="border-black/10 sm:border-l sm:pl-8">
                <div className="text-[clamp(40px,4vw,58px)] font-medium leading-none tracking-[-0.06em]">∞</div>
                <p className="mt-2 text-sm font-light text-black/50">Ongoing Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
