'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Menu, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const colors = {
  cream: '#f6efe5',
  brown: '#48120e',
  red: '#b82020',
};

const images = {
  heroPortrait: 'https://framerusercontent.com/images/bUi003WuBy99ULWcYF4aZYeQ.png?width=904&height=1200',
  heroBackground: 'https://framerusercontent.com/images/dIylQwKI5TLfITTBRdEzEwYx7TY.jpg?width=2330&height=1536',
  serviceOne: 'https://framerusercontent.com/images/0Ta2C6nFSV7xHeyaBtzWshdMJ7Y.png?width=480&height=518',
  serviceTwo: 'https://framerusercontent.com/images/lJExXEGT0SmfjlAZmiGFw8Mb18.png?width=480&height=518',
  serviceThree: 'https://framerusercontent.com/images/f1qC2lR4myStW2KtLzTaO5ugjw.png?width=480&height=518',
  serviceFour: 'https://framerusercontent.com/images/PC4iC5riUtDaAZildAdHgRXg0.png?width=904&height=1200',
  serviceFive: 'https://framerusercontent.com/images/OnSwV1YDaG5Ok2gtY00xImYnY.png?width=904&height=1200',
  benefitsOne: 'https://framerusercontent.com/images/XlpRhVIEtKMtCrAkBDdPvsgAPnE.jpg?width=880&height=1168',
  benefitsTwo: 'https://framerusercontent.com/images/JLhaZrelp56AZEpvoeS5QVPj7Q.png?width=1024&height=978',
  benefitsThree: 'https://framerusercontent.com/images/1z6VeaAVMfdvmGYYix7ugTnpSg.png?width=1024&height=1024',
  galleryOne: 'https://framerusercontent.com/images/12GP0R6Gl2Iqcu4iiSYRaGleo.png',
  galleryTwo: 'https://framerusercontent.com/images/j5nZhool4xsbtWAdLKYoUl04qk.png',
  galleryThree: 'https://framerusercontent.com/images/Ik3Bswoh6GtFMsis0ncNr7lhk3s.png',
  galleryFour: 'https://framerusercontent.com/images/icbK1pRSCaZu45WvSve3dQMhaY.png',
  galleryFive: 'https://framerusercontent.com/images/OO0J7KlD0ccvmK4u5tOeQJyXruI.png',
  gallerySix: 'https://framerusercontent.com/images/ElX4fEQ6C8zxD0lIUJQrxdMn6Q.png',
};

const solutions = [
  {
    number: '01',
    problem: 'Frizzy Hair',
    problemText: 'Hair that constantly looks dry, puffy, and impossible to control.',
    solution: 'Frizz Control',
    solutionText: 'We smooth and seal your hair using deep hydration treatments.',
  },
  {
    number: '02',
    problem: 'Damaged Hair',
    problemText: 'Hair that feels weak, brittle, and looks completely dull always.',
    solution: 'Hair Repair',
    solutionText: 'We rebuild and restore your hair completely from the inside.',
  },
  {
    number: '03',
    problem: 'Thinning Hair',
    problemText: 'Hair that lacks volume and looks painfully flat and limp.',
    solution: 'Add Volume',
    solutionText: 'We restore fullness with precision cuts, treatments, and extensions.',
  },
];

const services = [
  {
    number: '01',
    title: 'Precision Haircut',
    label: 'Cut & Style',
    text: 'A tailored haircut precision-crafted to your unique face shape, natural hair texture, and daily lifestyle.',
    price: '$55 – $120',
    image: images.serviceOne,
    steps: ['Consultation', 'Hair Cutting', 'Final Touch'],
  },
  {
    number: '02',
    title: 'Balayage & Colour',
    label: 'Colour Service',
    text: 'Hand-painted colour blended to your skin tone for a natural, dimensional, sun-kissed finish.',
    price: '$120 – $280',
    image: images.serviceTwo,
    steps: ['Consultation', 'Colour Apply', 'Toning'],
  },
  {
    number: '03',
    title: 'Keratin Treatment',
    label: 'Smoothing Treatment',
    text: 'Banish frizz for up to three months with our professional smoothing treatment for all hair types.',
    price: '$180 – $320',
    image: images.serviceThree,
    steps: ['Consultation', 'Treatment', 'Blow Dry'],
  },
  {
    number: '04',
    title: 'Silk Blowout',
    label: 'Blowout & Finish',
    text: 'Our most-booked treatment for glossy, frizz-free hair that stays salon-perfect all week long.',
    price: '$65 – $110',
    image: images.serviceFour,
    steps: ['Wash & Prep', 'Blow Dry', 'Silk Finish'],
  },
  {
    number: '05',
    title: 'Hair Extensions',
    label: 'Length & Volume',
    text: 'Add instant length and volume using premium ethically sourced, colour-matched, seamlessly blended human hair.',
    price: '$300 – $600',
    image: images.serviceFive,
    steps: ['Colour Match', 'Application', 'Blend & Cut'],
  },
];

const reviews = [
  ['The attention to detail at Salonix is unlike anything I have ever experienced at a salon.', 'Isabella Marchetti', 'Creative Director'],
  ['My stylist remembered exactly what I wanted from my previous visit.', 'Layla Hassan', 'Entrepreneur'],
  ['Every stylist here is incredibly skilled and makes you feel comfortable.', 'Natasha Reid', 'Graphic Designer'],
  ['Professional, warm, and genuinely talented — Salonix is in a different league.', 'Chloe Dupont', 'Fashion Blogger'],
  ['Walked out feeling like a completely different and confident woman today.', 'Priya Sharma', 'Yoga Instructor'],
  ['Salonix completely transformed my hair and my entire confidence too.', 'Sarah Mitchell', 'Marketing Manager'],
];

const faqs = [
  ['How do I book?', 'Simply choose your service, pick a time that suits you, and confirm your appointment online.'],
  ['Is consultation really free always?', 'Yes — every appointment includes a complimentary one-on-one consultation with your assigned stylist.'],
  ['What happens if I need changes?', 'If you are unhappy with your result, we will make it right at no additional charge.'],
  ['How long do appointments take?', 'Cuts take around 45 minutes while colour services can take up to three hours.'],
  ['Can I bring a photo for reference?', 'Absolutely. Reference photos are encouraged and used as a starting point for your personalised consultation.'],
];

export function SalonSpaDemo() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('salonix-visible');
        });
      },
      { threshold: 0.13, rootMargin: '0px 0px -6% 0px' },
    );

    document.querySelectorAll('.salonix-reveal').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="salonix-page min-h-screen overflow-x-clip bg-[#f6efe5] text-[#48120e]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,500;0,700;0,800;1,500;1,700;1,800&display=swap');

        .salonix-page {
          --cream: ${colors.cream};
          --brown: ${colors.brown};
          --red: ${colors.red};
          font-family: 'Rethink Sans', Arial, sans-serif;
        }

        @keyframes salonixHeroScale {
          from { transform: scale(1.15); }
          to { transform: scale(1); }
        }

        @keyframes salonixNavIn {
          from { opacity: .001; transform: translate3d(-50%, -12px, 0); }
          to { opacity: 1; transform: translate3d(-50%, 0, 0); }
        }

        @keyframes salonixTicker {
          to { transform: translate3d(-50%, 0, 0); }
        }

        @keyframes salonixPortraitFloat {
          0%, 100% { transform: translate3d(0,0,0) rotate(-2deg); }
          50% { transform: translate3d(0,-13px,0) rotate(1deg); }
        }

        .salonix-hero-bg {
          animation: salonixHeroScale 3s cubic-bezier(.25,1,.5,1) both;
          transform-origin: center;
          will-change: transform;
        }

        .salonix-nav {
          animation: salonixNavIn .9s cubic-bezier(.22,1,.36,1) .1s both;
        }

        .salonix-portrait {
          animation: salonixPortraitFloat 7s ease-in-out 3s infinite;
          will-change: transform;
        }

        .salonix-ticker {
          width: max-content;
          animation: salonixTicker 22s linear infinite;
        }

        .salonix-reveal {
          opacity: 0;
          transform: translate3d(0, 44px, 0);
          transition: opacity .85s cubic-bezier(.22,1,.36,1), transform 1s cubic-bezier(.22,1,.36,1);
          will-change: transform, opacity;
        }

        .salonix-reveal.salonix-visible {
          opacity: 1;
          transform: translate3d(0,0,0);
        }

        .salonix-image {
          transition: transform 1.1s cubic-bezier(.22,1,.36,1), filter .8s ease;
          will-change: transform;
        }

        .salonix-hover:hover .salonix-image { transform: scale(1.055); }

        .salonix-service-card .salonix-service-overlay {
          opacity: 0;
          transition: opacity .45s cubic-bezier(.22,1,.36,1);
        }
        .salonix-service-card:hover .salonix-service-overlay { opacity: 1; }

        .salonix-arrow { transition: transform .35s cubic-bezier(.22,1,.36,1); }
        .salonix-link:hover .salonix-arrow { transform: translate3d(4px,-4px,0); }

        @media (prefers-reduced-motion: reduce) {
          .salonix-hero-bg,.salonix-nav,.salonix-portrait,.salonix-ticker { animation: none !important; }
          .salonix-reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>

      <header className="relative min-h-[100svh] overflow-hidden bg-[#48120e] text-white">
        <img
          src={images.heroBackground}
          alt="Salonix hair salon"
          className="salonix-hero-bg absolute inset-0 h-full w-full object-cover brightness-[.78] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#48120e]/78 via-[#48120e]/35 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#48120e]/55 via-transparent to-black/25" />

        <nav className="salonix-nav fixed left-1/2 top-4 z-[100] flex w-[calc(100%-24px)] max-w-[1200px] items-center justify-between border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-xl sm:px-5">
          <a href="#home" className="text-[18px] font-extrabold uppercase tracking-[-.05em] text-white">Salonix®</a>

          <div className="hidden items-center gap-7 text-[11px] font-medium lowercase text-white/82 md:flex">
            <a href="#home">home</a>
            <a href="#solutions">about</a>
            <a href="#services">services</a>
            <a href="#solutions">solutions</a>
            <a href="#benefits">benefits</a>
            <a href="#booking">contact</a>
          </div>

          <div className="flex items-center gap-2">
            <a href="#booking" className="salonix-link hidden items-center gap-2 bg-[#b82020] px-4 py-2.5 text-[11px] font-bold sm:inline-flex">
              Book now <ArrowUpRight className="salonix-arrow h-3.5 w-3.5" />
            </a>
            <button type="button" onClick={() => setMenuOpen((v) => !v)} className="grid h-10 w-10 place-items-center border border-white/15 bg-white/10 md:hidden" aria-label="Toggle menu">
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="fixed inset-x-3 top-[68px] z-[95] border border-white/15 bg-[#48120e]/95 p-5 text-white backdrop-blur-xl md:hidden">
            <div className="grid gap-4 text-sm">
              {['home','solutions','services','benefits','booking'].map((item) => (
                <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)} className="border-b border-white/10 pb-3 capitalize">{item}</a>
              ))}
            </div>
          </div>
        )}

        <div id="home" className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1200px] items-end px-5 pb-8 pt-32 sm:px-6 lg:px-7">
          <div className="grid w-full gap-8 lg:grid-cols-[1fr_390px] lg:items-end">
            <div className="max-w-[720px]">
              <div className="mb-5 inline-flex items-center gap-3 bg-white/10 px-2.5 py-2 text-[11px] uppercase tracking-[.12em] backdrop-blur-md">
                <span className="bg-white px-2.5 py-1 text-[#48120e]">#01</span>
                <span>Premium Hair salon</span>
              </div>
              <h1 className="text-[clamp(5.2rem,14vw,11.5rem)] font-extrabold uppercase leading-[.73] tracking-[-.085em]">Salonix</h1>
              <p className="mt-7 max-w-[560px] text-[15px] leading-[1.5] text-white/82 sm:text-[17px]">
                Premium hair artistry tailored entirely to your texture, lifestyle, face shape, and the exact look you have always wanted.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#services" className="salonix-link inline-flex items-center gap-3 bg-white px-5 py-3 text-[12px] font-bold text-[#48120e]">
                  Explore Services <ArrowUpRight className="salonix-arrow h-4 w-4" />
                </a>
                <a href="#booking" className="salonix-link inline-flex items-center gap-3 border border-white/25 bg-white/10 px-5 py-3 text-[12px] font-bold backdrop-blur-md">
                  Contact <ArrowUpRight className="salonix-arrow h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="salonix-portrait relative ml-auto hidden w-full max-w-[360px] lg:block">
              <div className="overflow-hidden border border-white/15 bg-white/10 p-2 backdrop-blur-md">
                <img src={images.heroPortrait} alt="Salonix stylist result" className="aspect-[.86] w-full object-cover object-top" />
                <div className="flex items-end justify-between bg-white px-4 py-4 text-[#48120e]">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[.08em]">Silk Blowout</p>
                    <p className="mt-1 text-[10px] opacity-60">Most-booked treatment</p>
                  </div>
                  <span className="text-[12px] font-bold">$65 →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="overflow-hidden border-y border-[#48120e]/15 bg-[#f6efe5] py-5">
        <div className="salonix-ticker flex gap-12 pr-12 text-[clamp(2rem,5vw,4.8rem)] font-extrabold uppercase tracking-[-.06em] text-[#48120e]">
          {[0,1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-12">
              {['CRAFT','STUDIO','ARTISTRY','RESULTS'].map((item) => <span key={`${copy}-${item}`}>{item} <span className="text-[#b82020]">✦</span></span>)}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f6efe5] px-5 py-24 sm:px-6 lg:py-32">
        <div className="salonix-reveal mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <div className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.1em] text-[#b82020]">
              <Star className="h-4 w-4 fill-current" /> 4.9/5 (986+ Reviews)
            </div>
            <h2 className="text-[clamp(2.6rem,5.4vw,5rem)] font-extrabold uppercase leading-[.92] tracking-[-.055em]">
              Master stylists. Premium products. Zero compromise.
            </h2>
          </div>
          <div className="lg:pl-16">
            <p className="max-w-[500px] text-[18px] font-medium leading-[1.45] text-[#48120e]/70">
              This is what great hair actually looks like — thoughtful consultation, precision technique, and results built around you.
            </p>
            <a href="#booking" className="salonix-link mt-8 inline-flex items-center gap-3 bg-[#b82020] px-5 py-3 text-[12px] font-bold text-white">
              Book Appointment <ArrowUpRight className="salonix-arrow h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="solutions" className="bg-[#48120e] px-5 py-24 text-white sm:px-6 lg:py-32">
        <div className="mx-auto max-w-[1200px]">
          <div className="salonix-reveal mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/45">[ problems + solution ]</p>
              <h2 className="mt-4 text-[clamp(3rem,7vw,6.5rem)] font-extrabold uppercase leading-[.8] tracking-[-.07em]">Solutions</h2>
            </div>
            <p className="max-w-[500px] text-[16px] leading-[1.5] text-white/65 lg:ml-auto">
              Real hair problems deserve real solutions — not temporary fixes, but lasting results that transform how you feel.
            </p>
          </div>

          <div className="grid border-t border-white/15 md:grid-cols-3">
            {solutions.map((item, index) => (
              <article key={item.number} className={`salonix-reveal border-b border-white/15 py-8 md:border-b-0 md:px-7 md:py-10 ${index !== 0 ? 'md:border-l' : ''}`} style={{ transitionDelay: `${index * 90}ms` }}>
                <div className="mb-16 text-[12px] text-white/40">{item.number}</div>
                <p className="text-[11px] uppercase tracking-[.12em] text-white/40">Problem</p>
                <h3 className="mt-2 text-[25px] font-bold uppercase">{item.problem}</h3>
                <p className="mt-3 text-[13px] leading-[1.55] text-white/55">{item.problemText}</p>
                <div className="my-7 h-px bg-white/15" />
                <p className="text-[11px] uppercase tracking-[.12em] text-[#e1a3a3]">Solution</p>
                <h4 className="mt-2 text-[25px] font-bold uppercase">{item.solution}</h4>
                <p className="mt-3 text-[13px] leading-[1.55] text-white/55">{item.solutionText}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#f6efe5] px-5 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-[1200px]">
          <div className="salonix-reveal mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#b82020]">[ What We Offer ]</p>
              <h2 className="mt-4 text-[clamp(3rem,6vw,5.8rem)] font-extrabold uppercase leading-[.84] tracking-[-.065em]">Signature<br />Services</h2>
            </div>
            <p className="max-w-[470px] text-[15px] leading-[1.55] text-[#48120e]/65">
              Five signature services, each carefully crafted to give you results that genuinely last, impress, and keep you coming back.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {services.slice(0,3).map((service, index) => <ServiceCard key={service.number} service={service} delay={index * 80} />)}
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {services.slice(3).map((service, index) => <ServiceCard key={service.number} service={service} delay={(index + 3) * 80} wide />)}
          </div>
        </div>
      </section>

      <section id="benefits" className="bg-[#f6efe5] px-5 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-[1200px]">
          <div className="salonix-reveal mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#b82020]">[ benefits ]</p>
              <h2 className="mt-3 text-[clamp(3rem,6vw,5.8rem)] font-extrabold uppercase leading-[.84] tracking-[-.065em]">Why us?</h2>
            </div>
            <p className="max-w-[500px] text-[16px] leading-[1.55] text-[#48120e]/65 lg:ml-auto">
              Elevate your hair with bespoke styling, premium products, and unmatched luxury salon care.
            </p>
          </div>

          <div className="grid auto-rows-[280px] gap-4 md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[290px]">
            <div className="salonix-reveal salonix-hover relative overflow-hidden md:row-span-2">
              <img src={images.benefitsOne} alt="Salonix styling" className="salonix-image h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#48120e]/90 to-transparent p-6 pt-20 text-white">
                <p className="text-[11px] uppercase tracking-[.12em] text-white/60">Crafted with passion</p>
                <h3 className="mt-2 text-2xl font-bold uppercase">Precision in every appointment.</h3>
              </div>
            </div>

            <div className="salonix-reveal flex flex-col justify-between bg-white/55 p-7">
              <p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#b82020]">Pure products</p>
              <p className="text-[24px] font-bold uppercase leading-[1.1]">Only professional-grade brands trusted by top stylists worldwide.</p>
              <div className="flex gap-2 text-[10px] uppercase"><span className="bg-[#f6efe5] px-3 py-2">Hydrating</span><span className="bg-[#f6efe5] px-3 py-2">Salon Grade</span></div>
            </div>

            <div className="salonix-reveal relative overflow-hidden bg-white/55 p-7">
              <div className="relative z-10 max-w-[190px]">
                <p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#b82020]">Results</p>
                <p className="mt-4 text-[64px] font-extrabold leading-none tracking-[-.07em]">441</p>
                <p className="mt-2 text-[12px] leading-[1.4] text-[#48120e]/65">Signature styles completed by our expert team each month.</p>
              </div>
              <img src={images.benefitsTwo} alt="Hair treatment" className="absolute -bottom-6 -right-10 w-[62%] object-contain" />
            </div>

            <div className="salonix-reveal relative overflow-hidden bg-[#b82020] p-7 text-white lg:col-span-2">
              <div className="relative z-10 max-w-[420px]">
                <p className="text-[11px] font-bold uppercase tracking-[.12em] text-white/55">Care Continues</p>
                <h3 className="mt-3 text-[30px] font-bold uppercase leading-[1.05]">Your hair journey continues at home.</h3>
                <p className="mt-4 max-w-[360px] text-[13px] leading-[1.5] text-white/70">Expert product recommendations and maintenance advice keep the result working long after your appointment.</p>
              </div>
              <img src={images.benefitsThree} alt="Salonix care" className="absolute -bottom-16 right-2 w-[42%] object-contain opacity-95" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#48120e] py-24 text-white lg:py-32">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="salonix-reveal mb-12 flex items-end justify-between gap-5">
            <div><p className="text-[11px] uppercase tracking-[.14em] text-white/45">[ client words ]</p><h2 className="mt-4 text-[clamp(3rem,6vw,5.8rem)] font-extrabold uppercase leading-[.84] tracking-[-.065em]">Loved<br />Locally.</h2></div>
            <div className="text-right"><p className="text-[13px] text-white/45">Average rating</p><p className="mt-1 text-[28px] font-bold">4.9/5</p></div>
          </div>

          <div className="grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map(([quote,name,role], index) => (
              <article key={name} className="salonix-reveal min-h-[260px] bg-[#48120e] p-7" style={{ transitionDelay: `${index * 55}ms` }}>
                <div className="flex gap-1 text-[#e89696]">{Array.from({length:5}).map((_,i)=><Star key={i} className="h-3 w-3 fill-current" />)}</div>
                <p className="mt-10 text-[19px] font-bold leading-[1.25]">“{quote}”</p>
                <div className="mt-8 border-t border-white/15 pt-4"><p className="text-[12px] font-bold uppercase">{name}</p><p className="mt-1 text-[11px] text-white/40">{role}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6efe5] px-5 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-[1200px]">
          <div className="salonix-reveal mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
            <div><p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#b82020]">[ How It Works ]</p><h2 className="mt-4 text-[clamp(3rem,6vw,5.8rem)] font-extrabold uppercase leading-[.84] tracking-[-.065em]">Process</h2></div>
            <p className="max-w-[470px] text-[15px] leading-[1.55] text-[#48120e]/65 lg:ml-auto">Every Salonix appointment follows a simple three step process designed entirely around you and your hair.</p>
          </div>

          <div className="grid border-y border-[#48120e]/18 md:grid-cols-3">
            {[
              ['01','Book & Consult','Book online and arrive for a free one-on-one consultation with your stylist.'],
              ['02','Custom Treatment','Precision, care, and full attention on your hair only.'],
              ['03','Final Touch','We finish, style, and send you out looking better than you expected.'],
            ].map(([num,title,text],index)=>(
              <div key={num} className={`salonix-reveal py-10 md:px-8 ${index > 0 ? 'md:border-l md:border-[#48120e]/18' : ''}`}>
                <span className="text-[12px] text-[#b82020]">{num}</span><h3 className="mt-14 text-[25px] font-bold uppercase">{title}</h3><p className="mt-4 text-[13px] leading-[1.55] text-[#48120e]/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6efe5] px-5 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[.75fr_1.25fr]">
          <div className="salonix-reveal lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#b82020]">[ Common Questions ]</p>
            <h2 className="mt-4 text-[clamp(3rem,6vw,5.8rem)] font-extrabold uppercase leading-[.84] tracking-[-.065em]">Clarity</h2>
            <a href="#booking" className="salonix-link mt-7 inline-flex items-center gap-3 bg-[#b82020] px-5 py-3 text-[12px] font-bold text-white">Contact us <ArrowUpRight className="salonix-arrow h-4 w-4" /></a>
          </div>
          <div className="border-t border-[#48120e]/18">
            {faqs.map(([question,answer], index) => (
              <details key={question} className="salonix-reveal group border-b border-[#48120e]/18 py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[20px] font-bold uppercase"><span>{question}</span><span className="text-[#b82020] transition group-open:rotate-45">+</span></summary>
                <p className="max-w-[620px] pt-5 text-[14px] leading-[1.6] text-[#48120e]/60">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#48120e] px-5 py-24 text-white sm:px-6 lg:py-32">
        <div className="mx-auto max-w-[1200px]">
          <div className="salonix-reveal mb-12 flex items-end justify-between gap-5"><div><p className="text-[11px] uppercase tracking-[.14em] text-white/45">[ Real Results ]</p><h2 className="mt-4 text-[clamp(3rem,6vw,5.8rem)] font-extrabold uppercase leading-[.84] tracking-[-.065em]">Gallery</h2></div><p className="max-w-[400px] text-[13px] leading-[1.5] text-white/55">Real results from real clients — texture, colour, shape, and finish.</p></div>
          <div className="grid auto-rows-[260px] gap-3 md:grid-cols-3 md:auto-rows-[320px]">
            {[images.galleryOne,images.galleryTwo,images.galleryThree,images.galleryFour,images.galleryFive,images.gallerySix].map((src,index)=>(
              <figure key={src} className={`salonix-reveal salonix-hover overflow-hidden ${index === 0 || index === 4 ? 'md:row-span-2' : ''}`}><img src={src} alt={`Salonix client result ${index+1}`} className="salonix-image h-full w-full object-cover" /></figure>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="bg-[#b82020] px-5 py-24 text-white sm:px-6 lg:py-32">
        <div className="salonix-reveal mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.14em] text-white/55">[ get started ]</p>
            <h2 className="mt-4 text-[clamp(3.5rem,7vw,7rem)] font-extrabold uppercase leading-[.78] tracking-[-.075em]">Booking</h2>
            <p className="mt-8 max-w-[430px] text-[16px] leading-[1.55] text-white/72">Book your appointment today for professional hair cutting, styling, and premium salon beauty services.</p>
          </div>

          <form className="grid gap-4 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
            {['First Name *','Last Name *','Email *','Phone no *'].map((label)=><input key={label} placeholder={label} className="h-14 border border-white/25 bg-transparent px-4 text-[13px] text-white outline-none placeholder:text-white/55 focus:bg-white/8" />)}
            <select defaultValue="" className="h-14 border border-white/25 bg-transparent px-4 text-[13px] text-white outline-none sm:col-span-2"><option value="" disabled className="text-black">Select Service *</option><option className="text-black">Precision Haircut</option><option className="text-black">Balayage & Colour</option><option className="text-black">Keratin Treatment</option><option className="text-black">Hair Extension</option></select>
            <textarea placeholder="Message *" rows={5} className="border border-white/25 bg-transparent p-4 text-[13px] text-white outline-none placeholder:text-white/55 sm:col-span-2" />
            <button className="salonix-link flex items-center justify-between bg-white px-5 py-4 text-[12px] font-bold text-[#48120e] sm:col-span-2">Submit Form <ArrowUpRight className="salonix-arrow h-4 w-4" /></button>
          </form>
        </div>
      </section>

      <footer className="bg-[#48120e] px-5 pb-8 pt-20 text-white sm:px-6">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 border-b border-white/15 pb-16 lg:grid-cols-[1.4fr_.6fr_.6fr]">
            <div><div className="text-[clamp(3.2rem,8vw,8rem)] font-extrabold uppercase leading-[.8] tracking-[-.075em]">Salonix®</div><p className="mt-7 max-w-[480px] text-[14px] leading-[1.55] text-white/55">A premium hair salon built on craft, trust, and genuine results for every single client.</p><Link href="/contact" className="salonix-link mt-7 inline-flex items-center gap-3 bg-white px-5 py-3 text-[12px] font-bold text-[#48120e]">Contact Salonix <ArrowUpRight className="salonix-arrow h-4 w-4" /></Link></div>
            <div><p className="mb-5 text-[11px] uppercase tracking-[.12em] text-white/35">Quick links</p><div className="grid gap-3 text-[13px]">{['Home','About','Services','Solutions','Benefits','Booking'].map((item)=><a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</div></div>
            <div><p className="mb-5 text-[11px] uppercase tracking-[.12em] text-white/35">Info</p><div className="grid gap-3 text-[13px] text-white/72"><span>hello@salonix.com</span><span>+1 714 555 0198</span><span>Orange County, CA</span></div></div>
          </div>
          <div className="flex flex-col gap-4 pt-7 text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Salonix. All rights reserved.</span><div className="flex gap-5"><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a><a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a></div></div>
        </div>
      </footer>
    </main>
  );
}

function ServiceCard({ service, delay, wide = false }: { service: (typeof services)[number]; delay: number; wide?: boolean }) {
  return (
    <article className={`salonix-service-card salonix-reveal group relative overflow-hidden bg-[#48120e] text-white ${wide ? 'min-h-[480px]' : 'min-h-[520px]'}`} style={{ transitionDelay: `${delay}ms` }}>
      <img src={service.image} alt={service.title} className="salonix-image absolute inset-0 h-full w-full object-cover opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#48120e] via-[#48120e]/20 to-black/10" />
      <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-between p-6">
        <div className="flex items-start justify-between text-[11px] uppercase tracking-[.1em]"><span>[ {service.number} ]</span><span>{service.label}</span></div>
        <div>
          <h3 className="max-w-[90%] text-[30px] font-extrabold uppercase leading-[.95] tracking-[-.04em]">{service.title}</h3>
          <p className="mt-4 max-w-[420px] text-[13px] leading-[1.5] text-white/65">{service.text}</p>
          <div className="mt-6 flex items-end justify-between gap-4 border-t border-white/20 pt-5"><div><p className="text-[10px] uppercase tracking-[.1em] text-white/40">Price range</p><p className="mt-1 text-[16px] font-bold">{service.price}</p></div><a href="#booking" className="salonix-link inline-flex items-center gap-2 text-[11px] font-bold">Book Service <ArrowUpRight className="salonix-arrow h-4 w-4" /></a></div>
        </div>
      </div>
      <div className="salonix-service-overlay absolute inset-0 z-20 hidden bg-[#b82020]/96 p-6 md:flex md:flex-col md:justify-between">
        <div className="flex items-center justify-between text-[11px] uppercase"><span>Process</span><ArrowRight className="h-4 w-4" /></div>
        <div className="grid gap-3">{service.steps.map((step,index)=><div key={step} className="flex items-center gap-3 border-t border-white/20 pt-3 text-[15px] font-bold uppercase"><span className="text-white/40">0{index+1}</span><span>{step}</span></div>)}</div>
        <div className="flex items-center gap-2 text-[12px]"><Check className="h-4 w-4" /> Tailored to you</div>
      </div>
    </article>
  );
}
