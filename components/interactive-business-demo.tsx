'use client';

import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Camera,
  Car,
  CheckCircle,
  Clock,
  Phone,
  Scissors,
  Sparkles,
  Star,
  Utensils,
} from 'lucide-react';

type BusinessType = 'camera' | 'car' | 'salon' | 'food';
type LayoutType = 'luxury' | 'professional' | 'minimal' | 'aesthetic';

type Service = {
  title: string;
  description: string;
  image: string;
};

type StyleOption = {
  name: string;
  mood: string;
  layout: LayoutType;
  heroImage: string;
};

type DemoConfig = {
  slug: string;
  name: string;
  logo: string;
  eyebrow: string;
  headline: string;
  subtext: string;
  primaryCta: string;
  nav: string[];
  type: BusinessType;
  fallbackImage: string;
  services: Service[];
  styles: StyleOption[];
};

type Theme = {
  page: string;
  text: string;
  muted: string;
  accent: string;
  button: string;
  outline: string;
  card: string;
  line: string;
};

const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=86`;

const configs: Record<string, DemoConfig> = {
  'photography-studio': {
    slug: 'photography-studio',
    name: 'Luna Frame Studio',
    logo: 'LF',
    eyebrow: 'Wedding • Portrait • Brand Photography',
    headline: 'Editorial photography for stories worth keeping.',
    subtext: 'Natural, cinematic images with a calm guided experience from inquiry to final gallery.',
    primaryCta: 'Book a Session',
    nav: ['Portfolio', 'Sessions', 'About', 'Contact'],
    type: 'camera',
    fallbackImage: '/portfolio-photography.jpg',
    services: [
      {
        title: 'Wedding Stories',
        description: 'Emotional wedding coverage with an editorial, timeless finish.',
        image: photo('photo-1519741497674-611481863552'),
      },
      {
        title: 'Portrait Sessions',
        description: 'Relaxed portraits with guided posing and natural expression.',
        image: photo('photo-1494790108377-be9c29b29330'),
      },
      {
        title: 'Brand Shoots',
        description: 'Polished visual content for founders, creators, and local brands.',
        image: photo('photo-1452780212940-6f5c0d14d848'),
      },
    ],
    styles: [
      {
        name: 'Luxury Editorial',
        mood: 'Immersive full-screen photography and elegant magazine typography',
        layout: 'luxury',
        heroImage: photo('photo-1511285560929-80b456fea0bc'),
      },
      {
        name: 'Professional Studio',
        mood: 'Structured business layout with trust stats and a booking panel',
        layout: 'professional',
        heroImage: photo('photo-1524504388940-b1c1722653e1'),
      },
      {
        name: 'Minimal Gallery',
        mood: 'Gallery-first composition with white space and thin editorial lines',
        layout: 'minimal',
        heroImage: photo('photo-1452780212940-6f5c0d14d848'),
      },
      {
        name: 'Romantic Aesthetic',
        mood: 'Soft scrapbook collage, curved imagery, and warm romantic details',
        layout: 'aesthetic',
        heroImage: photo('photo-1519741497674-611481863552'),
      },
    ],
  },
  'auto-repair-shop': {
    slug: 'auto-repair-shop',
    name: 'Apex Auto Care',
    logo: 'AA',
    eyebrow: 'Diagnostics • Brakes • Maintenance',
    headline: 'Fast repairs. Honest pricing. No surprises.',
    subtext: 'Trusted local mechanics with online scheduling, transparent estimates, and same-day service options.',
    primaryCta: 'Schedule Service',
    nav: ['Services', 'Reviews', 'Fleet', 'Contact'],
    type: 'car',
    fallbackImage: '/portfolio-auto-repair.jpg',
    services: [
      {
        title: 'Brake Repair',
        description: 'Inspection, pad replacement, rotor service, and safe stopping performance.',
        image: photo('photo-1486262715619-67b85e0b08d3'),
      },
      {
        title: 'Oil Change',
        description: 'Fast preventive maintenance with fluid and filter checks included.',
        image: photo('photo-1487754180451-c456f719a1fc'),
      },
      {
        title: 'Engine Diagnostics',
        description: 'Computer diagnostics and clear repair recommendations before work begins.',
        image: photo('photo-1530046339160-ce3e530c7d2f'),
      },
    ],
    styles: [
      { name: 'Luxury Performance', mood: 'Dark performance branding with cinematic vehicle photography', layout: 'luxury', heroImage: photo('photo-1503376780353-7e6692767b70') },
      { name: 'Professional Trust', mood: 'Clear service information and neighborhood credibility', layout: 'professional', heroImage: photo('photo-1486262715619-67b85e0b08d3') },
      { name: 'Minimal Service', mood: 'Sharp type, simple service rows, and no visual clutter', layout: 'minimal', heroImage: photo('photo-1530046339160-ce3e530c7d2f') },
      { name: 'Retro Aesthetic', mood: 'Vintage custom-garage collage with energetic personality', layout: 'aesthetic', heroImage: photo('photo-1492144534655-ae79c964c9d7') },
    ],
  },
  'salon-spa': {
    slug: 'salon-spa',
    name: 'Velvet Glow Salon',
    logo: 'VG',
    eyebrow: 'Hair • Skin • Lashes • Bridal',
    headline: 'Beauty that feels personal, polished, and effortless.',
    subtext: 'Explore services, meet the artists, and book your next appointment in minutes.',
    primaryCta: 'Book Appointment',
    nav: ['Services', 'Artists', 'Gallery', 'Book'],
    type: 'salon',
    fallbackImage: '/portfolio-salon.jpg',
    services: [
      {
        title: 'Hair Styling',
        description: 'Cuts, color, blowouts, and event styling personalized to every client.',
        image: photo('photo-1522337360788-8b13dee7a37e'),
      },
      {
        title: 'Facials',
        description: 'Restorative skin treatments in a calm, elevated setting.',
        image: photo('photo-1540555700478-4be289fbecef'),
      },
      {
        title: 'Lash Extensions',
        description: 'Natural to full-volume lash sets designed around your eye shape.',
        image: photo('photo-1487412947147-5cebf100ffc2'),
      },
    ],
    styles: [
      { name: 'Luxury Beauty', mood: 'High-fashion imagery and an elegant black-and-blush experience', layout: 'luxury', heroImage: photo('photo-1560066984-138dadb4c035') },
      { name: 'Professional Salon', mood: 'Booking-first layout with clear service and artist information', layout: 'professional', heroImage: photo('photo-1522337360788-8b13dee7a37e') },
      { name: 'Minimal Spa', mood: 'Quiet wellness layout with generous white space', layout: 'minimal', heroImage: photo('photo-1540555700478-4be289fbecef') },
      { name: 'Soft Aesthetic', mood: 'Dreamy beauty collage with rounded cards and playful details', layout: 'aesthetic', heroImage: photo('photo-1487412947147-5cebf100ffc2') },
    ],
  },
  'restaurant-website': {
    slug: 'restaurant-website',
    name: 'Harvest & Ember',
    logo: 'H&E',
    eyebrow: 'Seasonal Menu • Private Events • Reservations',
    headline: 'Seasonal food, warm hospitality, unforgettable nights.',
    subtext: 'Reserve a table, explore the latest menu, or plan a private gathering with us.',
    primaryCta: 'Reserve a Table',
    nav: ['Menu', 'Events', 'Hours', 'Reserve'],
    type: 'food',
    fallbackImage: '/portfolio-restaurant.jpg',
    services: [
      {
        title: 'Dinner Menu',
        description: 'Seasonal dishes, local ingredients, and chef-led weekly features.',
        image: photo('photo-1504674900247-0877df9cc836'),
      },
      {
        title: 'Private Events',
        description: 'A warm private dining experience for celebrations and company dinners.',
        image: photo('photo-1414235077428-338989a2e8c0'),
      },
      {
        title: 'Catering',
        description: 'Restaurant-quality menus prepared for off-site gatherings and events.',
        image: photo('photo-1515003197210-e0cd71810b5f'),
      },
    ],
    styles: [
      { name: 'Luxury Fine Dining', mood: 'Immersive food photography and an elegant reservation experience', layout: 'luxury', heroImage: photo('photo-1414235077428-338989a2e8c0') },
      { name: 'Professional Neighborhood', mood: 'Friendly information layout with clear hours and reservations', layout: 'professional', heroImage: photo('photo-1552566626-52f8b828add9') },
      { name: 'Minimal Menu', mood: 'Editorial menu typography and food-first white space', layout: 'minimal', heroImage: photo('photo-1473093295043-cdd812d0e601') },
      { name: 'Bold Aesthetic', mood: 'Expressive bistro collage with nightlife energy', layout: 'aesthetic', heroImage: photo('photo-1504674900247-0877df9cc836') },
    ],
  },
};

export function InteractiveBusinessDemo({ slug }: { slug: string }) {
  const demo = configs[slug];
  const [styleIndex, setStyleIndex] = useState(0);

  if (!demo) return null;

  const style = demo.styles[styleIndex];
  const theme = themeFor(demo.type, style.layout);

  return (
    <div className={`${theme.page} ${theme.text} min-h-screen transition-colors duration-500`}>
      <style>{`
        @keyframes demoRise { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes demoFloat { 0%, 100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-12px) rotate(1deg); } }
        @keyframes demoFloatTwo { 0%, 100% { transform: translateY(0) rotate(3deg); } 50% { transform: translateY(10px) rotate(-1deg); } }
        @keyframes demoMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .demo-rise { animation: demoRise .75s ease both; }
        .demo-float { animation: demoFloat 5s ease-in-out infinite; }
        .demo-float-two { animation: demoFloatTwo 6s ease-in-out infinite; }
        .demo-marquee { animation: demoMarquee 22s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .demo-rise, .demo-float, .demo-float-two, .demo-marquee { animation: none !important; } }
      `}</style>

      <PreviewToolbar demo={demo} styleIndex={styleIndex} onChange={setStyleIndex} />

      <div key={`${demo.slug}-${style.layout}`} className="demo-rise">
        {style.layout === 'luxury' && <LuxuryPage demo={demo} style={style} theme={theme} />}
        {style.layout === 'professional' && <ProfessionalPage demo={demo} style={style} theme={theme} />}
        {style.layout === 'minimal' && <MinimalPage demo={demo} style={style} theme={theme} />}
        {style.layout === 'aesthetic' && <AestheticPage demo={demo} style={style} theme={theme} />}
      </div>

      <StyleChooser demo={demo} activeIndex={styleIndex} onChange={setStyleIndex} />
    </div>
  );
}

function PreviewToolbar({ demo, styleIndex, onChange }: { demo: DemoConfig; styleIndex: number; onChange: (index: number) => void }) {
  return (
    <div className="sticky top-0 z-[70] border-b border-black/10 bg-white/95 text-black backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/#portfolio" className="inline-flex shrink-0 items-center gap-2 text-sm text-black/65 hover:text-black">
          <ArrowLeft className="h-4 w-4" /> Back to Portfolio
        </Link>
        <div className="flex max-w-full gap-2 overflow-x-auto py-1">
          {demo.styles.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => onChange(index)}
              className={`shrink-0 border px-4 py-2 text-xs font-medium transition ${
                index === styleIndex ? 'border-black bg-black text-white' : 'border-black/15 bg-white hover:border-black/40'
              } ${item.layout === 'aesthetic' ? 'rounded-full' : item.layout === 'professional' ? 'rounded-lg' : 'rounded-none'}`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <Link href="/contact" className="hidden shrink-0 bg-black px-5 py-2 text-sm font-medium text-white sm:inline-flex">
          Get This Style
        </Link>
      </div>
    </div>
  );
}

function LuxuryPage({ demo, style, theme }: PageProps) {
  return (
    <>
      <header className="relative min-h-[760px] overflow-hidden bg-black text-white">
        <BusinessImage src={style.heroImage} fallback={demo.fallbackImage} alt={`${demo.name} luxury website`} className="absolute inset-0 h-full w-full object-cover contrast-110 saturate-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/25" />
        <div className="relative mx-auto flex min-h-[760px] max-w-7xl flex-col px-4 py-9 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between border-b border-white/25 pb-6">
            <div className="font-serif text-2xl tracking-wide">{demo.name}</div>
            <div className="hidden gap-8 text-sm text-white/70 md:flex">
              {demo.nav.map((item) => <a key={item} href="#luxury-services" className="hover:text-white">{item}</a>)}
            </div>
          </nav>
          <div className="mt-auto max-w-5xl pb-8">
            <p className="mb-5 text-xs uppercase tracking-[0.35em] text-white/60">{demo.eyebrow}</p>
            <h1 className="font-serif text-5xl font-normal leading-[0.9] sm:text-7xl lg:text-8xl">{demo.headline}</h1>
            <div className="mt-8 flex flex-col justify-between gap-7 border-t border-white/25 pt-7 md:flex-row md:items-end">
              <p className="max-w-xl text-lg leading-relaxed text-white/70">{demo.subtext}</p>
              <a href="#luxury-services" className="inline-flex w-fit items-center border border-white bg-white px-7 py-4 font-medium text-black">
                {demo.primaryCta}<ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <section id="luxury-services" className={`${theme.page} px-4 py-24 sm:px-6 lg:px-8`}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-3xl font-serif text-5xl leading-tight sm:text-6xl">An image-led experience with almost no visual clutter.</h2>
            <p className={`max-w-sm text-sm leading-relaxed ${theme.muted}`}>Large photography, refined typography, and quiet calls to action create a premium presentation.</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-current/15 bg-current/15 md:grid-cols-3">
            {demo.services.map((service) => (
              <article key={service.title} className="group relative min-h-[500px] overflow-hidden bg-black">
                <BusinessImage src={service.image} fallback={demo.fallbackImage} alt={service.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/55">Featured service</p>
                  <h3 className="font-serif text-3xl">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProfessionalPage({ demo, style, theme }: PageProps) {
  return (
    <>
      <header className={`${theme.page} border-b ${theme.line}`}>
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${theme.button} font-bold`}>{demo.logo}</div>
              <div><p className="font-semibold">{demo.name}</p><p className={`text-xs ${theme.muted}`}>Licensed • Insured • Local</p></div>
            </div>
            <div className="hidden gap-7 text-sm md:flex">{demo.nav.map((item) => <a key={item} href="#professional-services" className="opacity-65 hover:opacity-100">{item}</a>)}</div>
            <a href="#professional-services" className={`hidden rounded-lg px-5 py-3 text-sm font-medium sm:inline-flex ${theme.button}`}>Request Appointment</a>
          </nav>

          <div className="grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className={`mb-6 inline-flex rounded-lg border px-4 py-2 text-xs uppercase tracking-[0.18em] ${theme.line}`}>Trusted professional service</div>
              <p className={`mb-4 text-xs uppercase tracking-[0.28em] ${theme.accent}`}>{demo.eyebrow}</p>
              <h1 className="text-5xl font-bold leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl">{demo.headline}</h1>
              <p className={`mt-7 max-w-xl text-lg leading-relaxed ${theme.muted}`}>{demo.subtext}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#professional-services" className={`inline-flex items-center justify-center rounded-lg px-7 py-4 font-medium ${theme.button}`}>{demo.primaryCta}<ArrowRight className="ml-2 h-4 w-4" /></a>
                <a href="#professional-services" className={`inline-flex items-center justify-center rounded-lg border px-7 py-4 font-medium ${theme.outline}`}>View Services</a>
              </div>
              <div className={`mt-10 grid grid-cols-3 gap-4 border-t pt-6 ${theme.line}`}>
                <Stat icon={<Star className="h-4 w-4" />} value="4.9★" label="Client rating" muted={theme.muted} />
                <Stat icon={<Clock className="h-4 w-4" />} value="24h" label="Fast response" muted={theme.muted} />
                <Stat icon={<CheckCircle className="h-4 w-4" />} value="100%" label="Clear process" muted={theme.muted} />
              </div>
            </div>

            <div className="relative">
              <div className={`overflow-hidden rounded-2xl border shadow-2xl ${theme.card}`}>
                <BusinessImage src={style.heroImage} fallback={demo.fallbackImage} alt={`${demo.name} professional website`} className="h-[520px] w-full object-cover" />
              </div>
              <div className={`absolute -bottom-7 -left-5 w-[88%] rounded-xl border p-5 shadow-xl sm:w-[360px] ${theme.card}`}>
                <p className={`text-xs uppercase tracking-[0.2em] ${theme.accent}`}>Quick request</p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className={`rounded-lg border px-3 py-3 ${theme.line}`}>Choose service</div>
                  <div className={`rounded-lg border px-3 py-3 ${theme.line}`}>Select date</div>
                </div>
                <div className={`mt-3 flex items-center justify-between rounded-lg px-4 py-3 ${theme.button}`}><span className="text-sm font-medium">Book online</span><Calendar className="h-4 w-4" /></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="professional-services" className={`${theme.page} px-4 py-28 sm:px-6 lg:px-8`}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 lg:grid-cols-2 lg:items-end">
            <h2 className="text-4xl font-bold sm:text-5xl">Clear services, credibility, and an easy next step.</h2>
            <p className={`max-w-xl lg:ml-auto ${theme.muted}`}>This direction feels organized and dependable. It is built for visitors who want information fast before contacting the business.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {demo.services.map((service) => (
              <article key={service.title} className={`overflow-hidden rounded-xl border shadow-sm ${theme.card}`}>
                <BusinessImage src={service.image} fallback={demo.fallbackImage} alt={service.title} className="aspect-[4/3] w-full object-cover" />
                <div className="p-6">
                  <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-lg ${theme.button}`}><BusinessIcon type={demo.type} /></div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className={`mt-3 text-sm leading-relaxed ${theme.muted}`}>{service.description}</p>
                  <a href="#style-chooser" className="mt-5 inline-flex items-center text-sm font-semibold">Learn more <ArrowRight className="ml-2 h-4 w-4" /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function MinimalPage({ demo, style, theme }: PageProps) {
  return (
    <>
      <header className={`${theme.page} px-4 pb-14 pt-8 sm:px-6 lg:px-8`}>
        <div className="mx-auto max-w-7xl">
          <nav className={`flex items-center justify-between border-b pb-5 text-xs uppercase tracking-[0.2em] ${theme.line}`}>
            <span>{demo.name}</span>
            <div className="hidden gap-8 sm:flex">{demo.nav.map((item) => <a key={item} href="#minimal-services" className="opacity-55 hover:opacity-100">{item}</a>)}</div>
            <span>Menu</span>
          </nav>

          <div className="grid gap-10 py-16 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className={`mb-8 text-xs uppercase tracking-[0.35em] ${theme.muted}`}>{demo.eyebrow}</p>
              <h1 className="text-6xl font-light leading-[0.88] tracking-[-0.055em] sm:text-7xl lg:text-8xl">{demo.headline}</h1>
            </div>
            <div className={`border-l pl-7 ${theme.line}`}>
              <p className={`text-lg leading-relaxed ${theme.muted}`}>{demo.subtext}</p>
              <a href="#minimal-services" className="mt-8 inline-flex items-center border-b border-current pb-2 text-sm font-medium">{demo.primaryCta}<ArrowRight className="ml-2 h-4 w-4" /></a>
            </div>
          </div>

          <div className="grid h-[650px] gap-4 md:grid-cols-[1.4fr_0.6fr]">
            <BusinessImage src={style.heroImage} fallback={demo.fallbackImage} alt={`${demo.name} minimal gallery`} className="h-full w-full object-cover grayscale" />
            <div className="grid gap-4">
              <BusinessImage src={demo.services[0].image} fallback={demo.fallbackImage} alt={demo.services[0].title} className="h-full min-h-0 w-full object-cover grayscale" />
              <BusinessImage src={demo.services[1].image} fallback={demo.fallbackImage} alt={demo.services[1].title} className="h-full min-h-0 w-full object-cover grayscale" />
            </div>
          </div>
          <div className={`mt-4 flex items-center justify-between border-y py-4 text-xs uppercase tracking-[0.22em] ${theme.line}`}><span>Selected work</span><span>01 — 03</span></div>
        </div>
      </header>

      <section id="minimal-services" className={`${theme.page} px-4 py-24 sm:px-6 lg:px-8`}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between gap-6"><h2 className="text-4xl font-light sm:text-5xl">Services</h2><span className={`text-sm ${theme.muted}`}>Simple. Clear. Image first.</span></div>
          <div className={`border-y ${theme.line}`}>
            {demo.services.map((service, index) => (
              <article key={service.title} className={`grid gap-6 border-b py-8 last:border-b-0 md:grid-cols-[80px_1fr_240px] md:items-center ${theme.line}`}>
                <span className={`text-sm ${theme.muted}`}>0{index + 1}</span>
                <div><h3 className="text-3xl font-light">{service.title}</h3><p className={`mt-3 max-w-2xl text-sm leading-relaxed ${theme.muted}`}>{service.description}</p></div>
                <BusinessImage src={service.image} fallback={demo.fallbackImage} alt={service.title} className="h-32 w-full object-cover grayscale" />
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function AestheticPage({ demo, style, theme }: PageProps) {
  return (
    <>
      <header className={`${theme.page} relative overflow-hidden px-4 pb-24 pt-8 sm:px-6 lg:px-8`}>
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-white/55 blur-3xl" />
        <div className="absolute -right-20 bottom-16 h-80 w-80 rounded-full bg-white/40 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <nav className="flex items-center justify-between">
            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${theme.button} font-semibold`}>{demo.logo}</div>
            <div className="hidden gap-7 text-sm sm:flex">{demo.nav.map((item) => <a key={item} href="#aesthetic-services" className="opacity-65 hover:opacity-100">{item}</a>)}</div>
            <a href="#aesthetic-services" className={`rounded-full px-5 py-3 text-sm font-medium ${theme.outline}`}>Let’s create</a>
          </nav>

          <div className="grid gap-12 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="relative z-10">
              <div className={`mb-6 inline-flex rounded-full border px-4 py-2 text-xs uppercase tracking-[0.22em] ${theme.card}`}>Aesthetic concept ✦</div>
              <p className={`mb-4 text-xs uppercase tracking-[0.28em] ${theme.accent}`}>{demo.eyebrow}</p>
              <h1 className="font-serif text-5xl italic leading-[0.94] sm:text-6xl lg:text-7xl">{demo.headline}</h1>
              <p className={`mt-7 max-w-xl text-lg leading-relaxed ${theme.muted}`}>{demo.subtext}</p>
              <a href="#aesthetic-services" className={`mt-9 inline-flex items-center rounded-full px-8 py-4 font-medium ${theme.button}`}>{demo.primaryCta}<ArrowRight className="ml-2 h-4 w-4" /></a>
            </div>

            <div className="relative min-h-[620px]">
              <div className="demo-float absolute left-0 top-6 h-[430px] w-[64%] overflow-hidden rounded-[45%_55%_42%_58%/48%_42%_58%_52%] shadow-2xl">
                <BusinessImage src={style.heroImage} fallback={demo.fallbackImage} alt={`${demo.name} aesthetic collage`} className="h-full w-full object-cover saturate-110" />
              </div>
              <div className="demo-float-two absolute bottom-0 right-0 h-[330px] w-[48%] overflow-hidden rounded-[2.5rem] border-[10px] border-white/70 shadow-2xl">
                <BusinessImage src={demo.services[0].image} fallback={demo.fallbackImage} alt={demo.services[0].title} className="h-full w-full object-cover" />
              </div>
              <div className={`absolute right-4 top-8 rotate-6 rounded-full border px-6 py-8 text-center text-xs uppercase tracking-[0.22em] shadow-lg ${theme.card}`}>made with<br />feeling</div>
              <div className={`absolute bottom-20 left-[38%] -rotate-6 rounded-full px-5 py-3 font-serif italic shadow-lg ${theme.button}`}>soft • warm • memorable</div>
            </div>
          </div>
        </div>
      </header>

      <section id="aesthetic-services" className={`${theme.page} px-4 py-24 sm:px-6 lg:px-8`}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center"><p className={`text-xs uppercase tracking-[0.3em] ${theme.accent}`}>Explore the experience</p><h2 className="mt-4 font-serif text-5xl italic sm:text-6xl">Made to feel personal</h2></div>
          <div className="grid gap-7 md:grid-cols-12">
            {demo.services.map((service, index) => (
              <article key={service.title} className={`overflow-hidden rounded-[2.5rem] border shadow-sm ${theme.card} ${index === 0 ? 'md:col-span-7' : index === 1 ? 'md:col-span-5 md:mt-20' : 'md:col-span-7 md:col-start-3'}`}>
                <BusinessImage src={service.image} fallback={demo.fallbackImage} alt={service.title} className="h-72 w-full object-cover transition duration-500 hover:scale-105" />
                <div className="p-7"><p className={`text-xs uppercase tracking-[0.25em] ${theme.accent}`}>0{index + 1}</p><h3 className="mt-3 font-serif text-3xl italic">{service.title}</h3><p className={`mt-3 text-sm leading-relaxed ${theme.muted}`}>{service.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function StyleChooser({ demo, activeIndex, onChange }: { demo: DemoConfig; activeIndex: number; onChange: (index: number) => void }) {
  return (
    <section id="style-chooser" className="border-t border-black/10 bg-[#f4f4f2] px-4 py-24 text-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12"><p className="text-xs uppercase tracking-[0.28em] text-black/50">Interactive design directions</p><h2 className="mt-4 text-4xl font-medium sm:text-5xl">These are different websites, not color filters.</h2></div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {demo.styles.map((style, index) => (
            <button key={style.name} type="button" onClick={() => { onChange(index); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`overflow-hidden border bg-white text-left transition hover:-translate-y-1 ${activeIndex === index ? 'ring-2 ring-black ring-offset-4 ring-offset-[#f4f4f2]' : 'border-black/10'} ${style.layout === 'aesthetic' ? 'rounded-[2rem]' : style.layout === 'professional' ? 'rounded-xl' : 'rounded-none'}`}>
              <StyleThumbnail demo={demo} style={style} />
              <div className="p-5"><h3 className="text-lg font-semibold">{style.name}</h3><p className="mt-2 text-sm leading-relaxed text-black/55">{style.mood}</p><div className="mt-5 flex items-center gap-2 text-sm font-medium">{activeIndex === index ? <><CheckCircle className="h-4 w-4" /> Active style</> : <>Open this website <ArrowRight className="h-4 w-4" /></>}</div></div>
            </button>
          ))}
        </div>
        <div className="mt-16 text-center"><Link href="/contact" className="inline-flex items-center bg-black px-8 py-4 font-medium text-white">Customize a Demo <ArrowRight className="ml-2 h-4 w-4" /></Link></div>
      </div>
    </section>
  );
}

function StyleThumbnail({ demo, style }: { demo: DemoConfig; style: StyleOption }) {
  if (style.layout === 'luxury') {
    return <div className="relative h-60 overflow-hidden bg-black"><BusinessImage src={style.heroImage} fallback={demo.fallbackImage} alt={`${style.name} preview`} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" /><div className="absolute inset-x-5 bottom-5 text-white"><div className="mb-3 h-px bg-white/40" /><p className="font-serif text-2xl">{demo.name}</p><p className="text-xs uppercase tracking-[0.22em] text-white/55">Luxury editorial</p></div></div>;
  }
  if (style.layout === 'professional') {
    return <div className="grid h-60 grid-cols-[0.9fr_1.1fr] bg-slate-50 text-slate-950"><div className="flex flex-col justify-between p-5"><div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-950 text-[9px] text-white">{demo.logo}</div><div><div className="mb-3 h-2 w-16 bg-blue-700" /><div className="mb-2 h-4 w-full bg-slate-900" /><div className="h-4 w-3/4 bg-slate-300" /><div className="mt-5 h-8 w-24 rounded-md bg-blue-700" /></div></div><BusinessImage src={style.heroImage} fallback={demo.fallbackImage} alt={`${style.name} preview`} className="h-full w-full object-cover" /></div>;
  }
  if (style.layout === 'minimal') {
    return <div className="h-60 bg-white p-5 text-black"><div className="flex items-center justify-between border-b border-black/15 pb-3 text-[10px] uppercase tracking-widest"><span>{demo.logo}</span><span>Gallery</span></div><div className="grid h-[175px] grid-cols-[1.2fr_0.8fr] gap-3 pt-4"><BusinessImage src={style.heroImage} fallback={demo.fallbackImage} alt={`${style.name} preview`} className="h-full w-full object-cover grayscale" /><div className="grid gap-3"><BusinessImage src={demo.services[0].image} fallback={demo.fallbackImage} alt="Gallery detail" className="h-full min-h-0 w-full object-cover grayscale" /><div className="border-t border-black/20 pt-2 text-[9px] uppercase tracking-widest">Selected work</div></div></div></div>;
  }
  return <div className="relative h-60 overflow-hidden bg-[#fff0ed]"><div className="absolute left-5 top-5 h-36 w-32 rotate-[-5deg] overflow-hidden rounded-[2rem] shadow-lg"><BusinessImage src={style.heroImage} fallback={demo.fallbackImage} alt={`${style.name} preview`} className="h-full w-full object-cover" /></div><div className="absolute right-5 top-12 h-32 w-28 rotate-6 overflow-hidden rounded-full border-4 border-white shadow-lg"><BusinessImage src={demo.services[0].image} fallback={demo.fallbackImage} alt="Aesthetic detail" className="h-full w-full object-cover" /></div><div className="absolute bottom-4 left-5 rounded-full bg-[#8c4855] px-4 py-2 font-serif text-sm italic text-white">romantic mood</div></div>;
}

function Stat({ icon, value, label, muted }: { icon: React.ReactNode; value: string; label: string; muted: string }) {
  return <div><div className="mb-2 flex items-center gap-2">{icon}<strong className="text-xl">{value}</strong></div><span className={`text-xs ${muted}`}>{label}</span></div>;
}

function BusinessImage({ src, fallback, alt, className }: { src: string; fallback: string; alt: string; className: string }) {
  return <img src={src} alt={alt} onError={(event) => replaceBrokenImage(event, fallback)} className={className} />;
}

function BusinessIcon({ type }: { type: BusinessType }) {
  const className = 'h-5 w-5';
  if (type === 'camera') return <Camera className={className} />;
  if (type === 'car') return <Car className={className} />;
  if (type === 'salon') return <Scissors className={className} />;
  return <Utensils className={className} />;
}

function replaceBrokenImage(event: SyntheticEvent<HTMLImageElement>, fallback: string) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = fallback;
}

function themeFor(type: BusinessType, layout: LayoutType): Theme {
  if (layout === 'luxury') {
    if (type === 'car') return { page: 'bg-[#080808]', text: 'text-white', muted: 'text-zinc-400', accent: 'text-red-500', button: 'bg-red-600 text-white', outline: 'border-white/25 text-white', card: 'bg-[#141414] border-zinc-800', line: 'border-zinc-800' };
    if (type === 'salon') return { page: 'bg-[#140f11]', text: 'text-[#fff7f8]', muted: 'text-[#d5bdc2]', accent: 'text-[#e1aab6]', button: 'bg-[#e7bdc6] text-[#27161a]', outline: 'border-[#e7bdc6]/40 text-white', card: 'bg-[#201719] border-[#51333a]', line: 'border-[#51333a]' };
    if (type === 'food') return { page: 'bg-[#140d08]', text: 'text-[#fff4dd]', muted: 'text-[#d6bea2]', accent: 'text-amber-300', button: 'bg-amber-300 text-[#28170a]', outline: 'border-amber-200/40 text-amber-50', card: 'bg-[#21150d] border-[#59391f]', line: 'border-[#59391f]' };
    return { page: 'bg-[#171411]', text: 'text-[#fffaf2]', muted: 'text-[#d8cabb]', accent: 'text-[#d9b98c]', button: 'bg-[#f1dfc5] text-[#211b16]', outline: 'border-[#f1dfc5]/40 text-[#fffaf2]', card: 'bg-[#211d18] border-[#4a4035]', line: 'border-[#4a4035]' };
  }
  if (layout === 'professional') {
    if (type === 'salon') return { page: 'bg-[#fffafb]', text: 'text-rose-950', muted: 'text-rose-900/60', accent: 'text-rose-700', button: 'bg-rose-800 text-white', outline: 'border-rose-200 text-rose-950', card: 'bg-white border-rose-100', line: 'border-rose-100' };
    if (type === 'food') return { page: 'bg-[#fffdf8]', text: 'text-[#2b2119]', muted: 'text-[#6f6258]', accent: 'text-[#9a4c2a]', button: 'bg-[#9a4c2a] text-white', outline: 'border-[#dccabd] text-[#2b2119]', card: 'bg-white border-[#eadfd5]', line: 'border-[#eadfd5]' };
    return { page: 'bg-slate-50', text: 'text-slate-950', muted: 'text-slate-600', accent: 'text-blue-700', button: 'bg-slate-950 text-white', outline: 'border-slate-300 text-slate-950', card: 'bg-white border-slate-200', line: 'border-slate-200' };
  }
  if (layout === 'minimal') {
    if (type === 'salon') return { page: 'bg-[#f7f9f5]', text: 'text-[#24372b]', muted: 'text-[#617267]', accent: 'text-[#355b45]', button: 'bg-[#355b45] text-white', outline: 'border-[#cad8ce] text-[#24372b]', card: 'bg-white border-[#dce7df]', line: 'border-[#cad8ce]' };
    return { page: 'bg-white', text: 'text-neutral-950', muted: 'text-neutral-500', accent: 'text-neutral-950', button: 'bg-neutral-950 text-white', outline: 'border-neutral-300 text-neutral-950', card: 'bg-white border-neutral-200', line: 'border-neutral-200' };
  }
  if (type === 'car') return { page: 'bg-[#f4e5cc]', text: 'text-[#312219]', muted: 'text-[#735947]', accent: 'text-[#a53f2b]', button: 'bg-[#a53f2b] text-white', outline: 'border-[#b98e6d] text-[#312219]', card: 'bg-[#fff9ee]/85 border-[#d7b995]', line: 'border-[#d7b995]' };
  if (type === 'salon') return { page: 'bg-[#fff1f6]', text: 'text-[#682f48]', muted: 'text-[#9c6b80]', accent: 'text-[#bd5f88]', button: 'bg-[#a84f76] text-white', outline: 'border-[#e6b7ca] text-[#682f48]', card: 'bg-white/75 border-[#f0cede]', line: 'border-[#f0cede]' };
  if (type === 'food') return { page: 'bg-[#f4d84a]', text: 'text-[#1a1111]', muted: 'text-[#65451c]', accent: 'text-red-800', button: 'bg-red-800 text-white', outline: 'border-black/30 text-black', card: 'bg-[#fff4bf]/85 border-black/15', line: 'border-black/15' };
  return { page: 'bg-[#fff4ef]', text: 'text-[#572f35]', muted: 'text-[#8b6268]', accent: 'text-[#b05d6b]', button: 'bg-[#8c4855] text-white', outline: 'border-[#d9aeb5] text-[#572f35]', card: 'bg-white/75 border-[#efd5d9]', line: 'border-[#efd5d9]' };
}

type PageProps = { demo: DemoConfig; style: StyleOption; theme: Theme };
