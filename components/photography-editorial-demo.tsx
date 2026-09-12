'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

type HeroImage = {
  src: string;
  finalRotate: number;
  group: 1 | 2 | 3 | 4;
  x: number;
  y: number;
  rotate: number;
  rotateX: number;
  rotateY: number;
  scale: number;
};

const heroImages: HeroImage[] = [
  { src: 'https://framerusercontent.com/images/yIrZXCStv1OSKgU3LeSDNUk8.png?width=1200&height=1799', finalRotate: 5, group: 4, x: 121, y: 77, rotate: 6, rotateX: 24, rotateY: -47, scale: .3 },
  { src: 'https://framerusercontent.com/images/hy8DPmqfuubnG4z6KVW21Noim3k.png?width=750&height=1125', finalRotate: -5, group: 1, x: 112, y: 0, rotate: -14, rotateX: 0, rotateY: -70, scale: .3 },
  { src: 'https://framerusercontent.com/images/YN7uZ6616b5EToA62ayKCfXDN8.png?width=609&height=768', finalRotate: -4, group: 2, x: 210, y: -108, rotate: -25, rotateX: -32, rotateY: -24, scale: .3 },
  { src: 'https://framerusercontent.com/images/4vdqIXoUGYvEAYjE1bGxf2b99U.png?width=736&height=1104', finalRotate: 3, group: 3, x: 71, y: 106, rotate: 19, rotateX: 40, rotateY: -20, scale: .2 },
  { src: 'https://framerusercontent.com/images/nhXfOcaOehNBmm7KIBIRkPYgVs.png?width=1080&height=1350', finalRotate: -3, group: 2, x: 0, y: 0, rotate: 0, rotateX: -18, rotateY: 0, scale: .4 },
  { src: 'https://framerusercontent.com/images/dJYUrSojOaQLyxmGh7J0FA0Lys.png?width=736&height=920', finalRotate: 6, group: 4, x: 62, y: -114, rotate: 28, rotateX: -62, rotateY: 25, scale: .4 },
  { src: 'https://framerusercontent.com/images/uq180aSePM1LYy4AzlTD9RjtOM.png?width=736&height=920', finalRotate: 4, group: 4, x: 0, y: 0, rotate: 0, rotateX: 20, rotateY: 4, scale: .4 },
  { src: 'https://framerusercontent.com/images/PRVlMQdxdekMiWP3bqqhbsrUVs.png?width=896&height=1344', finalRotate: 5, group: 2, x: 0, y: 0, rotate: 0, rotateX: -18, rotateY: 0, scale: .4 },
  { src: 'https://framerusercontent.com/images/5vy8xYVbwltpvCKLNTujrSqR7j0.png?width=750&height=1126', finalRotate: -1, group: 3, x: -100, y: -125, rotate: 0, rotateX: -56, rotateY: 0, scale: .2 },
  { src: 'https://framerusercontent.com/images/cqp5MgdA765vd6QxFBN4GT6fio.png?width=736&height=1103', finalRotate: -4, group: 2, x: -186, y: 98, rotate: -18, rotateX: 23, rotateY: 26, scale: .3 },
  { src: 'https://framerusercontent.com/images/8k3F10wiAUCV1Rjw5Fi1SQySR4.png?width=896&height=1280', finalRotate: 6, group: 1, x: -112, y: 0, rotate: 14, rotateX: 0, rotateY: 70, scale: .3 },
  { src: 'https://framerusercontent.com/images/YJ2QNB6OG5lHB6PiWzPez4Eg4.png?width=1200&height=1600', finalRotate: 0, group: 4, x: -86, y: -70, rotate: -6, rotateX: -25, rotateY: 23, scale: .3 },
];

const projects = [
  { name: 'LUMIÈRE', meta: 'Editorial Fashion', image: 'https://framerusercontent.com/images/utnmS2W3FrDn7DwfxgTbsKYjA.png?width=960&height=1200' },
  { name: 'SILENCE', meta: 'Portrait · Documentary', image: 'https://framerusercontent.com/images/AhJtPwhjE62p08bXUPIRVn3NGiQ.png?width=961&height=1200' },
  { name: 'TERRAIN', meta: 'Commercial · Travel', image: 'https://framerusercontent.com/images/UYAjeQ6aXoXctPOTlHOeGo23HcM.png?width=1200&height=1800' },
  { name: 'REGARD', meta: 'Portrait · Press', image: 'https://framerusercontent.com/images/4XDKBQzLWRqFKlDZNeniPTN9ArU.png?width=735&height=895' },
  { name: 'SAISON', meta: 'Editorial Fashion', image: 'https://framerusercontent.com/images/6OvBmWhVDS6GA9MnQZDNHyV1yA.png?width=736&height=920' },
  { name: 'HORIZON', meta: 'Commercial · Campaign', image: 'https://framerusercontent.com/images/WCIGFGY62oWyMpmE4NVo2YWdXI.png?width=736&height=890' },
];

const services = [
  ['01', 'Editorial & Fashion', 'Campaigns, lookbooks, and editorial shoots for magazines and fashion houses. Available for single-day and multi-day productions across Europe and internationally.'],
  ['02', 'Commercial & Advertising', 'Product, lifestyle, and brand photography for commercial use across print, digital, and out-of-home. Working directly with brands and through agencies.'],
  ['03', 'Portrait & Documentary', 'Intimate portrait sessions and long-form documentary projects. Individuals, founders, artists, and cultural figures. Shot with natural light wherever possible.'],
  ['04', 'Art Direction', 'Creative direction for photo productions — concept development, casting, location scouting, and full on-set direction. Available as a standalone service or alongside shooting.'],
];

const portrait = 'https://framerusercontent.com/images/gPkgBcGwatmPdwzMlpToFBHNSs.png?width=912&height=1170';

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function mix(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

export function PhotographyEditorialDemo() {
  const heroRef = useRef<HTMLElement | null>(null);
  const titleGroupRef = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLElement | null>(null);
  const gridLayerRef = useRef<HTMLDivElement | null>(null);
  const heroCardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const measure = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const travel = Math.max(1, hero.offsetHeight - window.innerHeight);
      targetProgress = clamp(-rect.top / travel);
    };

    const apply = (heroProgress: number) => {
      const titleExit = clamp((heroProgress - .08) / .2);
      const gridFadeOut = 1 - clamp((heroProgress - .86) / .12);

      if (titleGroupRef.current) {
        titleGroupRef.current.style.opacity = String(1 - titleExit);
        titleGroupRef.current.style.transform = `translate(-50%, -50%) scale(${mix(1, .7, titleExit)})`;
      }

      if (portraitRef.current) {
        portraitRef.current.style.transform = `translate(-50%, -48%) rotate(${mix(0, -7, titleExit)}deg)`;
      }

      if (gridLayerRef.current) {
        gridLayerRef.current.style.opacity = String(gridFadeOut);
      }

      heroImages.forEach((item, index) => {
        const node = heroCardRefs.current[index];
        if (!node) return;

        const threshold = item.group === 1 ? .16 : item.group === 2 ? .30 : item.group === 3 ? .45 : .58;
        const p = clamp((heroProgress - threshold) / .18);
        const rotate = mix(item.rotate, item.finalRotate, p);
        const rotateX = mix(item.rotateX, 0, p);
        const rotateY = mix(item.rotateY, 0, p);
        const x = mix(item.x, 0, p);
        const y = mix(item.y, 0, p);
        const scale = mix(item.scale, 1, p);

        node.style.opacity = String(p);
        node.style.transform = `translate3d(${x}px, ${y}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotate(${rotate}deg) scale3d(${scale}, ${scale}, 1)`;
      });
    };

    const tick = () => {
      const smoothing = reducedMotion ? 1 : .11;
      currentProgress += (targetProgress - currentProgress) * smoothing;
      if (Math.abs(targetProgress - currentProgress) < .00008) currentProgress = targetProgress;
      apply(currentProgress);
      raf = requestAnimationFrame(tick);
    };

    measure();
    currentProgress = targetProgress;
    apply(currentProgress);
    raf = requestAnimationFrame(tick);

    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <main className="lm-page bg-black text-white selection:bg-white selection:text-black">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Schibsted+Grotesk:wght@400;500;700&display=swap');

        html { scroll-behavior: smooth; }

        .lm-page {
          --serif: 'Instrument Serif', Georgia, serif;
          --sans: 'Schibsted Grotesk', Arial, sans-serif;
          min-height: 100vh;
          overflow-x: clip;
          background: #000;
          font-family: var(--sans);
        }

        .lm-serif { font-family: var(--serif); }

        .lm-nav-link {
          position: relative;
          text-decoration: none;
        }
        .lm-nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          right: 100%;
          bottom: -4px;
          height: 1px;
          background: #fff;
          transition: right .35s cubic-bezier(.22,1,.36,1);
        }
        .lm-nav-link:hover::after { right: 0; }

        .lm-title-group,
        .lm-portrait,
        .lm-grid-layer,
        .lm-hero-card {
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .lm-title-group {
          animation: lmHeroEnter 1.05s cubic-bezier(.22,1,.36,1) both;
        }

        @keyframes lmHeroEnter {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .lm-hero-grid {
          width: 1480px;
          height: 568px;
          display: grid;
          grid-template-columns: repeat(6, 180px);
          grid-auto-rows: 180px;
          justify-content: center;
          align-content: center;
          gap: 54px 68px;
          perspective: 800px;
          transform-style: preserve-3d;
        }
        .lm-hero-card {
          aspect-ratio: 1 / 1;
          transform-style: preserve-3d;
          contain: layout paint style;
        }
        .lm-hero-card img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .lm-reveal {
          opacity: 0;
          transform: translateY(60px);
          animation: lmReveal linear both;
          animation-timeline: view();
          animation-range: entry 5% cover 34%;
        }

        @keyframes lmReveal {
          to { opacity: 1; transform: translateY(0); }
        }

        .lm-project img {
          transition: transform .75s cubic-bezier(.22,1,.36,1), filter .75s cubic-bezier(.22,1,.36,1);
        }
        .lm-project:hover img { transform: scale(1.025); filter: brightness(.88); }

        .lm-project::before,
        .lm-project::after {
          content: '';
          position: absolute;
          z-index: 3;
          pointer-events: none;
          width: 12px;
          height: 12px;
          opacity: 0;
          transition: opacity .25s ease;
        }
        .lm-project::before {
          left: 4px; top: 4px;
          border-left: 1px solid white;
          border-top: 1px solid white;
        }
        .lm-project::after {
          right: 4px; bottom: 4px;
          border-right: 1px solid white;
          border-bottom: 1px solid white;
        }
        .lm-project:hover::before,
        .lm-project:hover::after { opacity: 1; }

        .lm-ticker-track {
          display: flex;
          width: max-content;
          animation: lmTicker 26s linear infinite;
          will-change: transform;
        }
        @keyframes lmTicker { to { transform: translate3d(-50%, 0, 0); } }

        @media (min-width: 810px) and (max-width: 1199px) {
          .lm-hero-grid {
            width: 869px;
            height: auto;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            grid-auto-rows: auto;
            gap: 32px;
          }
        }

        @media (max-width: 809px) {
          .lm-hero-grid {
            width: 229px;
            height: auto;
            grid-template-columns: repeat(3, minmax(24px, 1fr));
            grid-auto-rows: auto;
            gap: 18px;
          }
          .lm-desktop-nav { display: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .lm-title-group,
          .lm-ticker-track,
          .lm-reveal { animation: none !important; }
          .lm-reveal { opacity: 1; transform: none; }
        }
      `}</style>

      <header className="fixed inset-x-0 top-0 z-[100] h-12 bg-black/20 backdrop-blur-[2px]">
        <div className="mx-auto grid h-full max-w-[1600px] grid-cols-[1fr_auto] items-center px-3 sm:px-5 lg:grid-cols-[1fr_3fr_1fr] lg:px-8">
          <Link href="/" className="lm-serif text-[21px] leading-none tracking-[-.06em] text-white">
            Luca Mori
          </Link>

          <nav className="lm-desktop-nav hidden items-center justify-around text-[9px] text-white lg:flex">
            <a className="lm-nav-link" href="#projects">Projects</a>
            <a className="lm-nav-link" href="#services">Services</a>
            <a className="lm-nav-link" href="#about">About</a>
            <Link className="lm-nav-link" href="/contact">Contact</Link>
          </nav>

          <div className="justify-self-end text-[9px] text-white/50 lg:block">Amsterdam</div>
        </div>
      </header>

      <section ref={heroRef} className="relative h-[3791px] bg-black">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-black px-4 py-6">
          <div
            ref={titleGroupRef}
            className="lm-title-group absolute left-1/2 top-1/2 z-30 flex w-full flex-col items-center gap-6 px-5"
          >
            <div className="relative flex w-full max-w-[1500px] items-center justify-center">
              <figure
                ref={portraitRef}
                className="lm-portrait absolute left-[49.25%] top-1/2 z-0 h-[315px] w-[271px] overflow-hidden"
              >
                <img src={portrait} alt="" className="h-full w-full object-cover" />
              </figure>

              <h1 className="lm-serif relative z-10 w-full whitespace-nowrap text-center text-[clamp(6rem,25.05vw,18.8rem)] font-normal leading-[.9] tracking-[-.04em] mix-blend-difference">
                Luca Mori
              </h1>
            </div>

            <div className="flex flex-col items-center gap-2 text-[11px] leading-none text-white">
              <span>Photographer — Amsterdam</span>
              <span>Editorial · Fashion · Commercial</span>
            </div>
          </div>

          <div ref={gridLayerRef} className="lm-grid-layer absolute inset-0 z-20 flex items-center justify-center">
            <div className="lm-hero-grid">
              {heroImages.map((item, index) => (
                <figure
                  key={item.src}
                  ref={(node) => { heroCardRefs.current[index] = node; }}
                  className="lm-hero-card overflow-hidden opacity-0"
                >
                  <img src={item.src} alt={`Luca Mori portfolio image ${index + 1}`} draggable={false} />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="intro" className="relative px-5 py-[150px] sm:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-[58px]">
          <div className="h-[273px] w-px bg-white/20" />
          <div className="flex w-full max-w-[704px] flex-col items-center gap-5 text-center">
            <SmallLabel>Intro</SmallLabel>
            <RevealText text="I photograph the moment before the moment. The tension, the light, the feeling that something is about to happen." />
          </div>

          <div className="mt-2 flex w-full flex-col items-center gap-6 overflow-hidden">
            <SmallLabel>Commissioned by</SmallLabel>
            <div className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_87%,transparent)]">
              <div className="lm-ticker-track gap-10 py-5 text-[12px] uppercase tracking-[.04em] text-white/70">
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex shrink-0 gap-10 pr-10">
                    {['DRIVE JOURNAL','MAISON VENTURI','DENZY','THE METROPOLITAN','AUTRE','ONEAUTO','LUMIÈRE MAGAZINE','NORD COLLECTIVE'].map((item) => <span key={`${copy}-${item}`}>{item}</span>)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="relative px-5 py-[150px] sm:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-10">
          <div className="lm-reveal flex items-end justify-between">
            <h2 className="text-[20px] font-medium tracking-[-.04em]">Selected Works</h2>
            <SmallLabel>Projects</SmallLabel>
          </div>

          <div className="grid grid-cols-1 gap-[26px] md:grid-cols-2">
            {projects.map((project, index) => (
              <article key={project.name} className="lm-project lm-reveal relative overflow-hidden">
                <div className="absolute inset-x-3 top-3 z-10 flex items-center justify-between text-[10px] text-white mix-blend-difference">
                  <span>{project.name}</span>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="aspect-[1.04/1] overflow-hidden bg-[#111]">
                  <img src={project.image} alt={project.name} className="h-full w-full object-cover" />
                </div>
                <div className="mt-2 text-[10px] text-white/45">{project.meta}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative px-5 py-[150px] sm:px-8">
        <div className="lm-reveal mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[276px_1fr] lg:items-start">
          <div>
            <SmallLabel>My story</SmallLabel>
            <h2 className="lm-serif mt-5 text-[38px] leading-[1.02] tracking-[-.04em]">
              “Italian-born.<br />Amsterdam-based.<br />Obsessed with light.”
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-[271px_1fr] md:items-start">
            <figure className="h-[315px] overflow-hidden">
              <img src={portrait} alt="Luca Mori" className="h-full w-full object-cover" />
            </figure>

            <div className="max-w-[560px] space-y-5 text-[15px] leading-[1.6] tracking-[-.02em] text-[#a3a3a3]">
              <p>I grew up in Milan watching my father develop film in a darkroom. I didn&apos;t know then that I was learning to see. <strong className="text-white">I know now.</strong></p>
              <p>I&apos;ve spent eight years shooting for the people and brands that understand the difference between a photograph and an image. I work in editorial, fashion, and commercial — but always with the same obsession: the fraction of a second where everything is true.</p>
              <p>Based in Amsterdam since 2019. Available worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative px-5 pb-[150px] pt-[150px] sm:px-8">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[361px_1fr] lg:gap-[116px]">
          <div className="lm-reveal lg:sticky lg:top-[200px] lg:self-start">
            <SmallLabel>What I Offer</SmallLabel>
            <h2 className="lm-serif mt-5 text-[38px] leading-[1.02] tracking-[-.04em]">
              Available for the work<br />that demands precision.
            </h2>
          </div>

          <div>
            {services.map(([number, title, body]) => (
              <div key={number} className="lm-reveal grid min-h-[173px] grid-cols-[46px_1fr] gap-5 border-t border-white/15 py-7 sm:grid-cols-[70px_1fr]">
                <div className="text-[13px] text-white/45">{number}</div>
                <div className="grid gap-4 md:grid-cols-[220px_1fr] md:gap-10">
                  <h3 className="text-[20px] font-medium tracking-[-.04em]">{title}</h3>
                  <p className="max-w-xl text-[15px] leading-[1.6] tracking-[-.02em] text-[#a3a3a3]">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="relative px-5 py-5 sm:px-8">
        <div className="lm-reveal mx-auto flex max-w-[1400px] flex-col items-center gap-9 overflow-hidden py-[248px] text-center">
          <SmallLabel>Available for commission</SmallLabel>
          <Link href="/contact" className="lm-serif text-[clamp(3.1rem,6.3vw,4.75rem)] leading-[.9] tracking-[-.04em]">
            Let&apos;s make something<br />worth remembering.
          </Link>
          <p className="text-[12px] uppercase text-[#878787]">AMSTERDAM — WORLDWIDE</p>
        </div>

        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 pb-6 text-[11px] sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="lm-serif text-[38px] leading-none tracking-[-.06em]">Luca Mori</div>
            <p className="mt-5 text-[#878787]">© 2026 Luca Mori. All rights reserved.</p>
          </div>
          <nav className="flex gap-5 text-white">
            <a className="lm-nav-link" href="#about">About</a>
            <a className="lm-nav-link" href="#projects">Projects</a>
            <Link className="lm-nav-link" href="/contact">Contact</Link>
            <a className="lm-nav-link" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}

function SmallLabel({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-[11px] text-white">
      <span className="h-2 w-2 rounded-full bg-[#404040]" />
      <span>{children}</span>
    </div>
  );
}

function RevealText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const measure = () => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const start = window.innerHeight * .75;
      const end = window.innerHeight * .15;
      targetProgress = clamp((start - rect.top) / Math.max(1, start - end));
    };

    const apply = (progress: number) => {
      spanRefs.current.forEach((span, index) => {
        if (!span) return;
        const threshold = index / Math.max(1, text.length - 1);
        const local = clamp((progress - threshold) * 7);
        const tone = Math.round(mix(102, 255, local));
        span.style.color = `rgb(${tone},${tone},${tone})`;
      });
    };

    const tick = () => {
      const smoothing = reducedMotion ? 1 : .13;
      currentProgress += (targetProgress - currentProgress) * smoothing;
      if (Math.abs(targetProgress - currentProgress) < .00008) currentProgress = targetProgress;
      apply(currentProgress);
      raf = requestAnimationFrame(tick);
    };

    measure();
    currentProgress = targetProgress;
    apply(currentProgress);
    raf = requestAnimationFrame(tick);

    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [text]);

  const chars = text.split('');

  return (
    <p ref={ref} className="lm-serif flex flex-wrap justify-center text-[clamp(2rem,4.4vw,3.3rem)] font-medium leading-[1.075] tracking-[-.029em]">
      {chars.map((char, index) => (
        <span
          key={`${char}-${index}`}
          ref={(node) => { spanRefs.current[index] = node; }}
          style={{ color: 'rgb(102,102,102)' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </p>
  );
}
