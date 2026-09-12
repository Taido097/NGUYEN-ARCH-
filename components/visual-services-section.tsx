'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const offers = [
  {
    title: 'Custom Websites',
    description: 'A polished, responsive website designed around your business, customers, and goals.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=86',
    href: '/contact',
    eyebrow: 'Design + Development',
    detail: 'Built for your brand',
  },
  {
    title: 'Interactive Demos',
    description: 'Show the vision before launch with clickable styles, layouts, and business-specific previews.',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=86',
    href: '/#portfolio',
    eyebrow: 'Visual Concepts',
    detail: 'See it before you build it',
  },
  {
    title: 'Email Outreach',
    description: 'Lead lists, short emails, organized sending, and follow-ups built to start conversations.',
    image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=1200&q=86',
    href: '/contact',
    eyebrow: 'Lead Generation',
    detail: 'Reach more local clients',
  },
  {
    title: 'Launch Support',
    description: 'Help with your domain, business email, contact forms, analytics, and final website setup.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=86',
    href: '/contact',
    eyebrow: 'Setup + Support',
    detail: 'Ready to go live',
  },
];

export function VisualServicesSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * Math.min(track.clientWidth * 0.82, 430), behavior: 'smooth' });
  };

  return (
    <section id="services" className="scroll-mt-20 overflow-hidden bg-[#f4f4f1] px-4 py-24 sm:px-6 lg:px-8">
      <style>{`
        @keyframes serviceCardRise { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes serviceGlow { 0%, 100% { opacity: .3; transform: translate3d(-8%, 0, 0) scale(1); } 50% { opacity: .58; transform: translate3d(8%, -4%, 0) scale(1.12); } }
        .service-card-rise { animation: serviceCardRise .8s ease both; }
        .service-card-glow { animation: serviceGlow 8s ease-in-out infinite; }
        .visual-service-track { scrollbar-width: none; }
        .visual-service-track::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) { .service-card-rise, .service-card-glow { animation: none !important; } }
      `}</style>

      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.26em] text-black/45">What DesignedbyTD can handle</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-black sm:text-5xl lg:text-6xl">
              Everything your business needs to look established online.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-black/60 lg:ml-auto">
            Choose one service or combine them into a complete website and outreach system. Every part is customized around the business.
          </p>
        </div>

        <div ref={trackRef} className="visual-service-track flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 lg:gap-6">
          {offers.map((offer, index) => (
            <Link
              key={offer.title}
              href={offer.href}
              className="service-card-rise group relative min-h-[500px] min-w-[84vw] snap-start overflow-hidden rounded-[1.6rem] bg-neutral-950 text-white shadow-[0_20px_50px_rgba(0,0,0,.12)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_32px_75px_rgba(0,0,0,.22)] sm:min-w-[390px] lg:min-w-[330px] xl:min-w-[350px]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img src={offer.image} alt={`${offer.title} service preview`} loading={index === 0 ? 'eager' : 'lazy'} className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black/85" />
              <div className="service-card-glow absolute -right-16 top-1/3 h-56 w-56 rounded-full bg-white/15 blur-3xl" />

              <div className="relative flex min-h-[500px] flex-col p-7 sm:p-8">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-white/55">{offer.eyebrow}</p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-[1.7rem]">{offer.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">{offer.description}</p>
                </div>

                <div className="mt-auto">
                  <div className="mb-5 inline-flex rounded-full border border-white/25 bg-black/20 px-4 py-2 text-xs text-white/80 backdrop-blur-md">{offer.detail}</div>
                  <div className="flex items-end justify-between gap-5 border-t border-white/20 pt-5">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/50">Explore service</span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md transition duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-black">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-between gap-5">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-black/25" />
            <span className="h-1.5 w-10 rounded-full bg-black/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-black/25" />
            <span className="h-1.5 w-1.5 rounded-full bg-black/25" />
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => move(-1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 bg-white text-black transition hover:border-black hover:bg-black hover:text-white" aria-label="Previous services">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => move(1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 bg-white text-black transition hover:border-black hover:bg-black hover:text-white" aria-label="Next services">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
