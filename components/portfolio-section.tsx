'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type ServiceCard = {
  number: string;
  title: string;
  description: string;
  href: string;
  images: string[];
};

const cards: ServiceCard[] = [
  {
    number: '01',
    title: 'Portfolio',
    description:
      'Editorial, photography, creative, and personal portfolio websites that make the work itself feel premium.',
    href: '/demos?category=Portfolio',
    images: [
      'https://framerusercontent.com/images/gPkgBcGwatmPdwzMlpToFBHNSs.png?width=912&height=1170',
      'https://framerusercontent.com/images/yIrZXCStv1OSKgU3LeSDNUk8.png?width=1200&height=1799',
      'https://framerusercontent.com/images/hy8DPmqfuubnG4z6KVW21Noim3k.png?width=750&height=1125',
      'https://framerusercontent.com/images/YN7uZ6616b5EToA62ayKCfXDN8.png?width=609&height=768',
      'https://framerusercontent.com/images/4vdqIXoUGYvEAYjE1bGxf2b99U.png?width=736&height=1104',
    ],
  },
  {
    number: '02',
    title: 'Restaurant',
    description:
      'Modern restaurant and food websites built around menus, atmosphere, location, and clear customer actions.',
    href: '/demos?category=Restaurant',
    images: [
      'https://framerusercontent.com/images/9BOQjMuTjInl3CMPRrkdP4QKJZU.png?width=2440&height=2344',
      'https://framerusercontent.com/images/snawRh3kduwUM969MzVgQuJ8JM.png?width=4096&height=1712',
      'https://framerusercontent.com/images/mAJ49eFrnsg4sH11nksIz5FP0.png',
      'https://framerusercontent.com/images/tY8YxgotM6gMQRc5vO5l6zlamE.png',
      'https://framerusercontent.com/images/9BOQjMuTjInl3CMPRrkdP4QKJZU.png?width=2440&height=2344',
    ],
  },
  {
    number: '03',
    title: 'Scheduling',
    description:
      'Service websites for salons, clinics, dental offices, med spas, and businesses that depend on appointments.',
    href: '/demos?category=Scheduling',
    images: [
      'https://framerusercontent.com/images/dIylQwKI5TLfITTBRdEzEwYx7TY.jpg?width=2330&height=1536',
      'https://framerusercontent.com/images/0Ta2C6nFSV7xHeyaBtzWshdMJ7Y.png?width=480&height=518',
      'https://framerusercontent.com/images/lJExXEGT0SmfjlAZmiGFw8Mb18.png?width=480&height=518',
      'https://framerusercontent.com/images/f1qC2lR4myStW2KtLzTaO5ugjw.png?width=480&height=518',
      'https://framerusercontent.com/images/PC4iC5riUtDaAZildAdHgRXg0.png?width=904&height=1200',
    ],
  },
  {
    number: '04',
    title: 'Custom Website',
    description:
      'Flexible websites for contractors, landscaping, local services, lead generation, and businesses with unique needs.',
    href: '/demos?category=Custom%20Website',
    images: [
      'https://framerusercontent.com/images/10I4GJR5nYsUsYnoOPIDjoapkA.webp?height=2400&width=2000',
      'https://framerusercontent.com/images/QAnUAEBWAkCE4NM4Ja4aQy9Tu4.webp?height=600&width=900',
      'https://framerusercontent.com/images/quqbVpcYdgH65rZqF71BSohYQ.webp?height=600&width=900',
      'https://framerusercontent.com/images/27vE5qIMgg0IarFBK9fDPTLr9ZA.webp?height=600&width=900',
      'https://framerusercontent.com/images/SMJY8uQcFDPv5vRNMRmZijjygkM.webp?height=2400&width=2000',
    ],
  },
];

function ProgressiveBlur() {
  return (
    <div className="fiber-blur" aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => (
        <span key={index} className={`fiber-blur-${index + 1}`} />
      ))}
    </div>
  );
}

export function PortfolioSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="portfolio"
      className="scroll-mt-24 overflow-hidden border-y border-black/10 bg-white py-20 text-[#121212] sm:py-24 lg:py-28"
    >
      <style>{`
        .service-accordion {
          height: 560px;
          display: flex;
          overflow: hidden;
          background: #fff;
          border-top: 1px solid rgba(18,18,18,.10);
          border-bottom: 1px solid rgba(18,18,18,.10);
        }

        .service-panel {
          position: relative;
          display: flex;
          min-width: 86px;
          flex: 0 0 13.5%;
          overflow: hidden;
          border-right: 1px solid rgba(18,18,18,.10);
          background: #fff;
          transition: flex-basis .78s cubic-bezier(.22,1,.36,1), background-color .35s ease;
        }

        .service-panel:last-child {
          border-right: 0;
        }

        .service-panel.is-active {
          flex-basis: 59.5%;
        }

        .service-trigger {
          position: relative;
          width: 86px;
          flex: 0 0 86px;
          border: 0;
          background: transparent;
          color: #121212;
          cursor: pointer;
        }

        .service-number {
          position: absolute;
          left: 18px;
          top: 18px;
          font-size: 11px;
          color: rgba(18,18,18,.42);
          transition: transform .4s cubic-bezier(.22,1,.36,1), color .35s ease, opacity .35s ease;
        }

        .service-title-vertical {
          position: absolute;
          left: 50%;
          bottom: 30px;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: translateX(-50%);
          font-size: 26px;
          line-height: 1;
          letter-spacing: -.045em;
          text-transform: uppercase;
          white-space: nowrap;
          transition: transform .45s cubic-bezier(.22,1,.36,1), letter-spacing .45s cubic-bezier(.22,1,.36,1), opacity .35s ease;
          will-change: transform;
        }

        .service-trigger::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 2px;
          height: 0;
          background: #121212;
          transition: height .55s cubic-bezier(.22,1,.36,1);
        }

        .portfolio-demo-button {
          border-radius: 0 !important;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }

        @media (hover: hover) {
          .service-panel:not(.is-active) .service-trigger:hover {
            background: #f7f7f7;
          }

          .service-panel:not(.is-active) .service-trigger:hover .service-title-vertical {
            transform: translateX(-50%) translateY(-10px);
            letter-spacing: .015em;
          }

          .service-panel:not(.is-active) .service-trigger:hover .service-number {
            transform: translateY(5px);
            color: #121212;
            opacity: 1;
          }

          .service-panel:not(.is-active) .service-trigger:hover::after {
            height: 100%;
          }

          .service-panel.is-active .service-trigger:hover .service-title-vertical {
            transform: translateX(-50%) translateY(-4px);
          }
        }

        .service-content {
          min-width: 0;
          flex: 1;
          display: grid;
          grid-template-rows: auto 1fr;
          gap: 28px;
          padding: 28px 52px 34px 54px;
          opacity: 0;
          transform: translateX(24px);
          pointer-events: none;
          transition: opacity .28s ease .05s, transform .5s cubic-bezier(.22,1,.36,1) .05s;
        }

        .service-panel.is-active .service-content {
          opacity: 1;
          transform: translateX(0);
          pointer-events: auto;
          transition-delay: .18s;
        }

        .service-media {
          position: relative;
          min-height: 0;
          height: 100%;
          overflow: hidden;
          isolation: isolate;
          background: #e8e8e8;
        }

        .fiber-image-layer {
          transform: scale(0);
          transform-origin: 50% 50%;
          transition-property: transform;
          transition-duration: .4s;
          transition-timing-function: cubic-bezier(.2, .75, .25, 1);
          transition-delay: 100ms;
          will-change: transform;
        }

        .service-panel.is-active .fiber-image-layer {
          transform: scale(1);
          transition-delay: var(--fiber-delay);
        }

        .fiber-blur {
          position: absolute;
          inset: auto 0 0;
          z-index: 12;
          height: 30%;
          overflow: hidden;
          pointer-events: none;
        }

        .fiber-blur span {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .fiber-blur-1 {
          z-index: 1;
          backdrop-filter: blur(.28125px);
          -webkit-backdrop-filter: blur(.28125px);
          mask-image: linear-gradient(to bottom, transparent 0%, #000 12.5%, #000 25%, transparent 37.5%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 12.5%, #000 25%, transparent 37.5%);
        }
        .fiber-blur-2 {
          z-index: 2;
          backdrop-filter: blur(.5625px);
          -webkit-backdrop-filter: blur(.5625px);
          mask-image: linear-gradient(to bottom, transparent 12.5%, #000 25%, #000 37.5%, transparent 50%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 12.5%, #000 25%, #000 37.5%, transparent 50%);
        }
        .fiber-blur-3 {
          z-index: 3;
          backdrop-filter: blur(1.125px);
          -webkit-backdrop-filter: blur(1.125px);
          mask-image: linear-gradient(to bottom, transparent 25%, #000 37.5%, #000 50%, transparent 62.5%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 25%, #000 37.5%, #000 50%, transparent 62.5%);
        }
        .fiber-blur-4 {
          z-index: 4;
          backdrop-filter: blur(2.25px);
          -webkit-backdrop-filter: blur(2.25px);
          mask-image: linear-gradient(to bottom, transparent 37.5%, #000 50%, #000 62.5%, transparent 75%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 37.5%, #000 50%, #000 62.5%, transparent 75%);
        }
        .fiber-blur-5 {
          z-index: 5;
          backdrop-filter: blur(4.5px);
          -webkit-backdrop-filter: blur(4.5px);
          mask-image: linear-gradient(to bottom, transparent 50%, #000 62.5%, #000 75%, transparent 87.5%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 50%, #000 62.5%, #000 75%, transparent 87.5%);
        }
        .fiber-blur-6 {
          z-index: 6;
          backdrop-filter: blur(9px);
          -webkit-backdrop-filter: blur(9px);
          mask-image: linear-gradient(to bottom, transparent 62.5%, #000 75%, #000 87.5%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 62.5%, #000 75%, #000 87.5%, transparent 100%);
        }
        .fiber-blur-7 {
          z-index: 7;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          mask-image: linear-gradient(to bottom, transparent 75%, #000 87.5%, #000 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 75%, #000 87.5%, #000 100%);
        }
        .fiber-blur-8 {
          z-index: 8;
          backdrop-filter: blur(36px);
          -webkit-backdrop-filter: blur(36px);
          mask-image: linear-gradient(to bottom, transparent 87.5%, #000 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 87.5%, #000 100%);
        }

        @media (max-width: 900px) {
          .service-accordion {
            height: auto;
            display: block;
            border-left: 1px solid rgba(18,18,18,.10);
            border-right: 1px solid rgba(18,18,18,.10);
          }

          .service-panel,
          .service-panel.is-active {
            display: block;
            min-width: 0;
            border-right: 0;
            border-bottom: 1px solid rgba(18,18,18,.10);
          }

          .service-panel:last-child {
            border-bottom: 0;
          }

          .service-trigger {
            width: 100%;
            height: 74px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 18px;
            touch-action: manipulation;
          }

          .service-number {
            position: static;
          }

          .service-title-vertical {
            position: static;
            writing-mode: horizontal-tb;
            transform: none;
            font-size: 24px;
          }

          .service-trigger::after {
            display: none;
          }

          .service-content {
            display: none;
            padding: 8px 18px 20px;
            opacity: 1;
            transform: none;
          }

          .service-panel.is-active .service-content {
            display: grid;
          }

          .service-media {
            height: 360px;
            touch-action: manipulation;
          }

          .portfolio-demo-button {
            min-height: 44px;
            padding: 12px 16px !important;
            font-size: 12px;
          }
        }

        @media (max-width: 560px) {
          .service-content {
            padding: 8px 12px 16px;
          }

          .service-media {
            height: 300px;
          }

          .service-media .portfolio-demo-button {
            right: 12px;
            bottom: 12px;
          }

          .portfolio-demo-button {
            min-height: 44px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .service-panel,
          .service-content,
          .fiber-image-layer,
          .service-title-vertical,
          .service-number,
          .service-trigger::after {
            transition: none !important;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="border-t border-black/10 pt-7 sm:pt-8">
          <h2 className="max-w-[720px] text-[clamp(3.5rem,7vw,6.25rem)] font-medium leading-[.9] tracking-[-0.06em]">
            Services
          </h2>
          <p className="mt-6 max-w-[500px] text-base font-light leading-[1.45] tracking-[-0.02em] text-black/70">
            Custom web design for Orange County businesses, built around how you attract customers, take bookings, and present your work.
          </p>
        </div>

        <div className="service-accordion mt-12 lg:mt-14">
          {cards.map((card, index) => {
            const isActive = activeIndex === index;

            return (
              <div key={card.number} className={`service-panel ${isActive ? 'is-active' : ''}`}>
                <button
                  type="button"
                  className="service-trigger focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black"
                  onClick={() => setActiveIndex(index)}
                  aria-expanded={isActive}
                  aria-controls={`service-content-${card.number}`}
                >
                  <span className="service-number">{card.number}</span>
                  <span className="service-title-vertical">{card.title}</span>
                </button>

                <div id={`service-content-${card.number}`} className="service-content">
                  <div>
                    <p className="max-w-[410px] text-[clamp(1.35rem,2.1vw,1.7rem)] font-normal leading-[1.12] tracking-[-0.035em]">
                      {card.description}
                    </p>
                  </div>

                  <Link
                    href={card.href}
                    className="service-media group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                    aria-label={`View ${card.title} demos`}
                  >
                    {card.images.map((image, imageIndex) => (
                      <div
                        key={`${card.number}-${imageIndex}`}
                        className="fiber-image-layer absolute inset-0 overflow-hidden"
                        style={{
                          zIndex: imageIndex + 1,
                          ['--fiber-delay' as string]: imageIndex === 0 ? '0ms' : `${(imageIndex - 1) * 300}ms`,
                        }}
                      >
                        <Image
                          src={image}
                          alt=""
                          fill
                          sizes="(max-width: 900px) 92vw, 54vw"
                          className="object-cover"
                        />
                      </div>
                    ))}

                    <ProgressiveBlur />

                    <span
                      style={{ borderRadius: 0 }}
                      className="portfolio-demo-button absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 !rounded-none bg-black px-4 py-2 text-xs font-semibold text-white transition-transform duration-300 group-hover:-translate-y-0.5"
                    >
                      View demos <span aria-hidden="true">↗</span>
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center sm:justify-end">
          <Link
            href="/demos"
            style={{ borderRadius: 0 }}
            className="portfolio-demo-button group inline-flex items-center gap-3 !rounded-none bg-black px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/85 hover:shadow-[0_14px_34px_rgba(0,0,0,.2)]"
          >
            <span>View all demos</span>
            <span className="text-base transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
