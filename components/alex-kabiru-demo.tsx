'use client';

import { useEffect } from 'react';

const works = [
  {
    title: 'Artistry',
    meta: 'Art Direction · Branding',
    image: 'https://framerusercontent.com/images/aR8lgPFFN66VCepoexfO7uVoBo.png?width=840&height=1200',
  },
  {
    title: 'Barack',
    meta: 'Modeling · Photography',
    image: 'https://framerusercontent.com/images/FJKONnkO9QwjgRpCcBKWEBxYmI.png?width=904&height=1200',
  },
  {
    title: 'Ozilla',
    meta: 'Fashion · Branding',
    image: 'https://framerusercontent.com/images/DicS4TyTFVCgPqCLAQqtdy9pAqc.png?width=904&height=1200',
  },
];

const process = [
  {
    number: '01',
    title: 'DISCOVER',
    copy: 'I start by understanding the brand—its goals, audience, and what makes it distinct. This sets the foundation for everything that follows.',
  },
  {
    number: '02',
    title: 'DIRECTION',
    copy: 'I define the visual approach, exploring concepts, references, and design systems that shape the overall look and feel.',
  },
  {
    number: '03',
    title: 'DESIGN',
    copy: 'I bring the direction to life through layouts, typography, and refined details—building a cohesive and functional experience.',
  },
  {
    number: '04',
    title: 'DELIVERY',
    copy: 'I finalize and prepare everything for launch, ensuring the work is polished, consistent, and ready to perform in the real world.',
  },
];

export function AlexKabiruDemo() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-alex-reveal]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.alexVisible = 'true';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="alex-demo min-h-screen overflow-hidden bg-[#f4f4f4] text-black">
      <style>{`
        .alex-demo {
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .alex-display {
          font-family: "Arial Black", Inter, ui-sans-serif, system-ui, sans-serif;
        }
        [data-alex-reveal] {
          opacity: 0;
          transform: translateY(42px);
          transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1);
        }
        [data-alex-reveal][data-alex-visible="true"] {
          opacity: 1;
          transform: translateY(0);
        }
        .alex-work-image img {
          transition: transform .7s cubic-bezier(.22,1,.36,1), filter .7s ease;
        }
        .alex-work:hover .alex-work-image img {
          transform: scale(1.035);
          filter: saturate(1.03);
        }
        .alex-work-arrow {
          transition: transform .35s cubic-bezier(.22,1,.36,1);
        }
        .alex-work:hover .alex-work-arrow {
          transform: translate(7px,-7px);
        }
        @media (prefers-reduced-motion: reduce) {
          [data-alex-reveal] { opacity: 1 !important; transform: none !important; transition: none !important; }
          .alex-work-image img, .alex-work-arrow { transition: none !important; }
        }
      `}</style>

      <header className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-6 text-[11px] font-semibold uppercase tracking-[.06em] sm:px-10">
        <span>ALEX KABIRU</span>
        <nav className="hidden gap-8 sm:flex">
          <a href="#about" className="transition-opacity hover:opacity-45">About</a>
          <a href="#works" className="transition-opacity hover:opacity-45">Works</a>
          <a href="#contact" className="transition-opacity hover:opacity-45">Contact</a>
        </nav>
        <a href="#contact" className="border-b border-black pb-1">Contact now</a>
      </header>

      <section className="mx-auto w-full max-w-[1600px] px-6 pb-10 pt-12 sm:px-10 sm:pt-20">
        <div className="overflow-hidden">
          <h1 className="alex-display text-[clamp(5rem,13vw,12rem)] font-black leading-[.73] tracking-[-.075em]">
            <span className="block">ALEX</span>
            <span className="block text-right">KABIRU</span>
          </h1>
        </div>

        <div className="mt-14 grid gap-10 border-t border-black/20 pt-5 text-[11px] font-semibold uppercase leading-[1.35] sm:grid-cols-3 sm:gap-6">
          <p className="max-w-[280px] text-[15px] normal-case font-medium leading-[1.25] tracking-[-.02em] sm:text-[18px]">
            I design websites with art direction that brings brands to life.
          </p>
          <p>Art Director + Brand Design</p>
          <div className="grid gap-4 sm:text-right">
            <p>Based in<br />Oke Mapo, San Fransisco</p>
            <p>Available for freelance</p>
          </div>
        </div>
      </section>

      <section className="mx-auto h-[72vh] min-h-[560px] w-full max-w-[1600px] px-6 py-10 sm:h-screen sm:px-10">
        <div className="h-full overflow-hidden rounded-2xl" data-alex-reveal>
          <img
            src="https://framerusercontent.com/images/X7JJLLwwyF2vEFAb300AsdBt8.jpg?width=904&height=1200"
            alt="Portrait"
            className="h-full w-full object-cover object-center"
          />
        </div>
      </section>

      <section id="about" className="mx-auto grid w-full max-w-[1600px] gap-14 px-6 py-24 sm:px-10 lg:grid-cols-[.62fr_1.38fr] lg:py-36">
        <div />
        <div data-alex-reveal>
          <p className="text-sm font-bold uppercase tracking-[-.02em]">About me</p>
          <div className="mt-10 grid gap-10 lg:grid-cols-[262px_1fr] lg:items-start">
            <div className="overflow-hidden rounded-lg">
              <img
                src="https://framerusercontent.com/images/mXExoJzaJXgdXzy2oxmkGDGimY.png?width=960&height=1200"
                alt="Portrait wearing glasses"
                loading="lazy"
                className="aspect-[.8] h-auto w-full object-cover"
              />
            </div>
            <h2 className="alex-display max-w-[760px] text-[clamp(2.5rem,4.5vw,4.7rem)] font-bold leading-[.97] tracking-[-.055em]">
              I’m a designer focused on websites and art direction, creating clean, thoughtful experiences that help brands feel clear and distinct.
            </h2>
          </div>

          <div className="mt-16 grid gap-10 border-t border-black/20 pt-6 text-sm leading-[1.5] lg:grid-cols-[262px_1fr]">
            <p className="max-w-[265px] text-black/65">
              My approach is simple: understand the brand first, then shape how it shows up online. From layout to typography, every detail has a purpose.
            </p>
            <div className="grid grid-cols-3 gap-6 text-[11px] font-semibold uppercase">
              <p>Projects<br /><span className="mt-2 block text-3xl font-black">18+</span></p>
              <p>Clients<br /><span className="mt-2 block text-3xl font-black">12</span></p>
              <p>Experience<br /><span className="mt-2 block text-3xl font-black">5Y</span></p>
            </div>
          </div>
        </div>
      </section>

      <section id="works" className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 sm:py-32">
        <div className="border-t border-black/20 pt-8" data-alex-reveal>
          <p className="text-sm font-bold uppercase">Selected</p>
          <h2 className="alex-display mt-2 text-[clamp(4.5rem,11vw,10rem)] font-black leading-[.82] tracking-[-.07em]">WORKS</h2>
        </div>

        <div className="mt-14 space-y-2 sm:mt-20">
          {works.map((work, index) => (
            <article
              key={work.title}
              data-alex-reveal
              className="alex-work group grid cursor-pointer gap-5 border-t border-black/20 py-8 sm:grid-cols-[110px_1fr_190px] sm:items-end sm:py-10"
            >
              <span className="text-xs font-semibold">0{index + 1}</span>
              <div className="alex-work-image overflow-hidden rounded-2xl bg-black/5">
                <img src={work.image} alt="" loading="lazy" className="h-[55vh] min-h-[430px] w-full object-cover" />
              </div>
              <div className="flex items-end justify-between gap-5 sm:block">
                <div>
                  <h3 className="alex-display text-3xl font-bold tracking-[-.04em] sm:text-4xl">{work.title}</h3>
                  <p className="mt-2 text-xs text-black/55">{work.meta}</p>
                </div>
                <span className="alex-work-arrow mt-8 block text-4xl">↗</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-6 py-24 sm:px-10 sm:py-36">
        <div className="border-t border-black/20 pt-8" data-alex-reveal>
          <h2 className="alex-display text-[clamp(4rem,9vw,8rem)] font-black leading-[.86] tracking-[-.065em]">SERVICES</h2>
          <div className="mt-16 grid divide-y divide-black/20 border-y border-black/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {['ART DIRECTION', 'WEB DESIGN', 'GRAPHIC DESIGN'].map((service) => (
              <div key={service} className="min-h-[260px] p-6 sm:p-8">
                <p className="alex-display text-2xl font-bold tracking-[-.035em]">{service}</p>
                <p className="mt-20 max-w-[310px] text-sm leading-[1.55] text-black/60">
                  I create visual systems and digital experiences with a focus on clarity, cohesion, and thoughtful design.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-6 py-24 sm:px-10 sm:py-36">
        <div className="border-t border-black/20 pt-8" data-alex-reveal>
          <h2 className="alex-display text-[clamp(4rem,9vw,8rem)] font-black leading-[.86] tracking-[-.065em]">PROCESS</h2>
          <div className="mt-16">
            {process.map((item) => (
              <div key={item.number} className="grid gap-5 border-t border-black/20 py-7 sm:grid-cols-[100px_1fr_1fr] sm:gap-10 sm:py-9">
                <span className="text-sm font-bold">{item.number}</span>
                <h3 className="alex-display text-3xl font-bold tracking-[-.04em]">{item.title}</h3>
                <p className="max-w-[560px] text-sm leading-[1.55] text-black/60">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-6 py-24 sm:px-10 sm:py-40">
        <div className="grid gap-12 border-y border-black/20 py-14 lg:grid-cols-[.55fr_1.45fr]" data-alex-reveal>
          <p className="text-sm font-bold uppercase">Testimonial</p>
          <div>
            <blockquote className="alex-display max-w-[900px] text-[clamp(2.3rem,4.6vw,4.5rem)] font-bold leading-[.98] tracking-[-.055em]">
              “Working together felt easy from start to finish. He really understood what we were trying to say as a brand and translated it into a website that finally feels like us.”
            </blockquote>
            <p className="mt-10 text-sm font-bold">Amidu Adigun <span className="font-normal text-black/50">· Founder</span></p>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto w-full max-w-[1600px] px-6 pb-10 pt-24 sm:px-10 sm:pt-36">
        <div data-alex-reveal>
          <p className="alex-display text-[clamp(4rem,11vw,10rem)] font-black leading-[.78] tracking-[-.075em]">
            LET’S BRING<br />YOUR VISION<br /><span className="block text-right">TO LIFE</span>
          </p>
          <div className="mt-20 flex flex-col gap-8 border-t border-black/20 py-8 text-xs font-semibold uppercase sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p>Get in touch</p>
              <a href="mailto:47thegreatt@gmail.com" className="mt-3 block text-xl normal-case tracking-[-.03em] underline underline-offset-4">47thegreatt@gmail.com</a>
            </div>
            <div className="flex gap-6">
              <span>Behance</span><span>X (Twitter)</span><span>Instagram</span>
            </div>
            <a href="#" className="border-b border-black pb-1">Back to top</a>
          </div>
          <p className="pb-4 text-[10px] uppercase text-black/45">© 47 2026</p>
        </div>
      </section>
    </main>
  );
}
