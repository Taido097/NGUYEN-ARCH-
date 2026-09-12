'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  MapPin,
  Menu as MenuIcon,
  Star,
  Users,
  X,
} from 'lucide-react';

type View = 'home' | 'menu' | 'about' | 'reserve';
type MenuCategory = 'Maki' | 'Uramaki' | 'Special Rolls';

const media = {
  texture:
    'https://framerusercontent.com/images/RAU19PL6ISblT8l98fG6ggBX9g.jpg?height=1100&width=1920',
  hero:
    'https://framerusercontent.com/images/10I4GJR5nYsUsYnoOPIDjoapkA.webp?height=2400&width=2000',
  interior:
    'https://framerusercontent.com/images/SMJY8uQcFDPv5vRNMRmZijjygkM.webp?height=2400&width=2000',
  dining:
    'https://framerusercontent.com/images/I8AGYbzHAG3DaCqU2wYCmWnrFLw.webp?height=1600&width=1600',
  tuna:
    'https://framerusercontent.com/images/QAnUAEBWAkCE4NM4Ja4aQy9Tu4.webp?height=600&width=900',
  salmon:
    'https://framerusercontent.com/images/quqbVpcYdgH65rZqF71BSohYQ.webp?height=600&width=900',
  special:
    'https://framerusercontent.com/images/27vE5qIMgg0IarFBK9fDPTLr9ZA.webp?height=600&width=900',
  chef:
    'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1600&q=88',
  reservation:
    'https://images.unsplash.com/photo-1516211697506-8360dbcfe9a4?auto=format&fit=crop&w=1600&q=88',
};

const menuItems: Record<
  MenuCategory,
  { name: string; price: string; description: string; image: string }[]
> = {
  Maki: [
    {
      name: 'Spicy Tuna Maki',
      price: '$5',
      description: 'Spicy tuna, cucumber, avocado, nori, and seasoned rice.',
      image: media.tuna,
    },
    {
      name: 'Salmon Maki',
      price: '$5',
      description: 'Fresh salmon, avocado, cucumber, sesame, and sushi rice.',
      image: media.salmon,
    },
    {
      name: 'Cucumber Maki',
      price: '$5',
      description: 'Crisp cucumber, toasted sesame, nori, and seasoned rice.',
      image: media.tuna,
    },
    {
      name: 'Tuna Maki',
      price: '$5',
      description: 'Fresh tuna, scallion, sesame, nori, and sushi rice.',
      image: media.salmon,
    },
  ],
  Uramaki: [
    {
      name: 'Volcano Delight',
      price: '$12',
      description: 'Crab, avocado, cucumber, spicy tuna, and sriracha.',
      image: media.special,
    },
    {
      name: 'Rainbow Fusion',
      price: '$12',
      description: 'Tuna, salmon, avocado, cucumber, and crab stick.',
      image: media.salmon,
    },
    {
      name: 'Dragon Elegance',
      price: '$12',
      description: 'Grilled eel, avocado, cucumber, sesame, and sweet soy.',
      image: media.tuna,
    },
    {
      name: 'Ocean Breeze',
      price: '$12',
      description: 'Shrimp, crab, avocado, cucumber, and yuzu tobiko.',
      image: media.special,
    },
  ],
  'Special Rolls': [
    {
      name: 'Sunrise Bliss',
      price: '$16',
      description: 'Salmon, asparagus, cream cheese, and orange tobiko.',
      image: media.salmon,
    },
    {
      name: 'Mango Tango',
      price: '$16',
      description: 'Tempura shrimp, mango, avocado, cucumber, and mango glaze.',
      image: media.special,
    },
    {
      name: 'Truffle Indulgence',
      price: '$16',
      description: 'Wagyu, cucumber, microgreens, black truffle, and sesame.',
      image: media.tuna,
    },
    {
      name: 'Pacific Firecracker',
      price: '$16',
      description: 'Spicy crab, tempura shrimp, jalapeño, and chili aioli.',
      image: media.special,
    },
  ],
};

export function RestaurantQitchenDemo() {
  const [view, setView] = useState<View>('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [category, setCategory] = useState<MenuCategory>('Maki');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileOpen(false);
  }, [view]);

  return (
    <main
      className="min-h-screen bg-[#0d0d0d] text-[#f4f0e7] selection:bg-[#efe8d8] selection:text-black"
      style={{
        backgroundImage: `linear-gradient(rgba(13,13,13,.96),rgba(13,13,13,.96)),url(${media.texture})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
      <style>{`
        @keyframes qitchenIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes qitchenImage {
          from { transform: scale(1.035); }
          to { transform: scale(1); }
        }
        @keyframes qitchenArrow {
          0%,100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        .qitchen-view { animation: qitchenIn .62s cubic-bezier(.22,1,.36,1) both; }
        .qitchen-hero-img { animation: qitchenImage 1.25s cubic-bezier(.22,1,.36,1) both; }
        .qitchen-card:hover .qitchen-arrow { animation: qitchenArrow .8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .qitchen-view,.qitchen-hero-img,.qitchen-arrow { animation: none !important; }
        }
      `}</style>

      <TopNav
        view={view}
        onNavigate={setView}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div key={view} className="qitchen-view">
        {view === 'home' && <HomeView onNavigate={setView} />}
        {view === 'menu' && (
          <MenuView
            category={category}
            setCategory={setCategory}
            onNavigate={setView}
          />
        )}
        {view === 'about' && <AboutView onNavigate={setView} />}
        {view === 'reserve' && (
          <ReservationView
            submitted={submitted}
            onSubmit={() => setSubmitted(true)}
          />
        )}
      </div>
    </main>
  );
}

function TopNav({
  view,
  onNavigate,
  mobileOpen,
  setMobileOpen,
}: {
  view: View;
  onNavigate: (view: View) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  const nav: { label: string; view: View }[] = [
    { label: 'Menu', view: 'menu' },
    { label: 'About', view: 'about' },
    { label: 'Book a Table', view: 'reserve' },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[90] border-b border-white/10 bg-[#0b0b0b]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1700px] items-center justify-between px-4 sm:px-7 lg:px-10">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/#portfolio"
              aria-label="Back to portfolio"
              className="grid h-10 w-10 place-items-center border border-white/15 text-white/65 transition hover:border-white/50 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-[15px] font-semibold uppercase tracking-[.34em] text-white"
            >
              Qitchen
            </button>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            {nav.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => onNavigate(item.view)}
                className={`border px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[.18em] transition ${
                  view === item.view
                    ? 'border-[#eee7d9] bg-[#eee7d9] text-black'
                    : 'border-white/15 text-white/60 hover:border-white/45 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Toggle restaurant menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="grid h-10 w-10 place-items-center border border-white/15 md:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[85] flex items-center justify-center bg-[#0b0b0b] px-6 pt-[76px] md:hidden">
          <div className="w-full max-w-md divide-y divide-white/10 border-y border-white/10">
            {nav.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => onNavigate(item.view)}
                className="flex w-full items-center justify-between py-7 text-left text-2xl font-medium"
              >
                <span>{item.label}</span>
                <span className="text-xs text-white/35">0{index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function HomeView({ onNavigate }: { onNavigate: (view: View) => void }) {
  const cards: { label: string; view: View; image: string; eyebrow: string }[] = [
    { label: 'Menu', view: 'menu', image: media.salmon, eyebrow: 'Discover' },
    { label: 'Reservation', view: 'reserve', image: media.dining, eyebrow: 'Join us' },
    { label: 'Our Restaurant', view: 'about', image: media.interior, eyebrow: 'The story' },
  ];

  return (
    <section className="min-h-screen pt-[76px] lg:h-screen lg:overflow-hidden">
      <div className="grid min-h-[calc(100vh-76px)] gap-3 p-3 lg:grid-cols-[minmax(0,1.55fr)_minmax(420px,.72fr)] lg:p-4">
        <div className="relative min-h-[620px] overflow-hidden border border-white/10 bg-black lg:min-h-0">
          <img
            src={media.hero}
            alt="Qitchen signature sushi dish"
            className="qitchen-hero-img absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.72),rgba(0,0,0,.05)_58%),linear-gradient(90deg,rgba(0,0,0,.26),transparent_55%)]" />

          <div className="absolute left-5 top-5 border border-white/20 bg-black/20 px-4 py-2 backdrop-blur-md sm:left-8 sm:top-8">
            <span className="text-[10px] font-semibold uppercase tracking-[.28em] text-white/75">
              Japanese kitchen · sushi bar
            </span>
          </div>

          <div className="relative flex h-full min-h-[620px] flex-col justify-end p-6 sm:p-10 lg:min-h-0 lg:p-12 xl:p-16">
            <p className="mb-5 text-xs font-medium uppercase tracking-[.36em] text-white/55">
              Qitchen presents
            </p>
            <h1 className="max-w-[780px] text-[clamp(4.3rem,9vw,9rem)] font-medium uppercase leading-[.78] tracking-[-.065em] text-white">
              Sushi
              <span className="block font-light">Sensation</span>
            </h1>
            <div className="mt-8 flex max-w-2xl items-center gap-5 border-t border-white/25 pt-5 text-xs uppercase tracking-[.18em] text-white/55">
              <span>Precision</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>Texture</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>Season</span>
            </div>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-rows-3">
          {cards.map((card, index) => (
            <button
              key={card.label}
              type="button"
              onClick={() => onNavigate(card.view)}
              className="qitchen-card group relative min-h-[240px] overflow-hidden border border-white/10 bg-[#151515] text-left lg:min-h-0"
            >
              <img
                src={card.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-1000 ease-out group-hover:scale-[1.07] group-hover:opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/5" />
              <div className="relative flex h-full min-h-[240px] items-end justify-between gap-6 p-6 lg:min-h-0 lg:p-7">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[.24em] text-white/45">
                    0{index + 1} · {card.eyebrow}
                  </p>
                  <h2 className="mt-3 text-3xl font-medium tracking-[-.045em] sm:text-4xl">
                    {card.label}
                  </h2>
                </div>
                <span className="grid h-12 w-12 shrink-0 place-items-center border border-white/25 bg-black/20 transition group-hover:border-white group-hover:bg-white group-hover:text-black">
                  <ArrowRight className="qitchen-arrow h-4 w-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function SplitTitle({ image, title }: { image: string; title: React.ReactNode }) {
  return (
    <div className="relative min-h-[430px] overflow-hidden border border-white/10 lg:sticky lg:top-[92px] lg:h-[calc(100vh-112px)]">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
      <div className="relative flex h-full min-h-[430px] items-end p-7 sm:p-10 lg:min-h-0 lg:p-12">
        <h1 className="text-[clamp(4.5rem,9vw,8.4rem)] font-medium uppercase leading-[.82] tracking-[-.07em]">
          {title}
        </h1>
      </div>
    </div>
  );
}

function MenuView({
  category,
  setCategory,
  onNavigate,
}: {
  category: MenuCategory;
  setCategory: (category: MenuCategory) => void;
  onNavigate: (view: View) => void;
}) {
  const categories = Object.keys(menuItems) as MenuCategory[];

  return (
    <section className="pt-[76px]">
      <div className="grid gap-3 p-3 lg:grid-cols-[.8fr_1.2fr] lg:p-4">
        <SplitTitle image={media.hero} title={<>Me<br />nu</>} />

        <div className="border border-white/10 bg-[#111] px-5 py-8 sm:px-8 lg:px-10 lg:py-12 xl:px-14">
          <div className="mb-10 flex flex-wrap gap-2 border-b border-white/10 pb-6">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[.2em] transition ${
                  category === item
                    ? 'border-[#efe8d8] bg-[#efe8d8] text-black'
                    : 'border-white/15 text-white/55 hover:border-white/50 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div key={category} className="qitchen-view">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[.28em] text-white/35">Qitchen menu</p>
                <h2 className="mt-2 text-4xl font-medium tracking-[-.05em] sm:text-5xl">{category}</h2>
              </div>
              <p className="hidden max-w-xs text-right text-xs leading-6 text-white/40 sm:block">
                Prepared to order with premium ingredients and precise technique.
              </p>
            </div>

            <div className="divide-y divide-white/10 border-y border-white/10">
              {menuItems[category].map((item) => (
                <article
                  key={item.name}
                  className="group grid gap-5 py-6 sm:grid-cols-[110px_1fr_auto] sm:items-center"
                >
                  <div className="h-[90px] overflow-hidden bg-black sm:h-[78px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium tracking-[-.025em]">{item.name}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">{item.description}</p>
                  </div>
                  <div className="text-lg font-medium text-[#efe8d8]">{item.price}</div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('reserve')}
            className="mt-10 inline-flex items-center gap-3 border border-white bg-white px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[.18em] text-black transition hover:bg-transparent hover:text-white"
          >
            Book a Table <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function AboutView({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <section className="pt-[76px]">
      <div className="grid gap-3 p-3 lg:grid-cols-[.8fr_1.2fr] lg:p-4">
        <SplitTitle image={media.interior} title={<>Abo<br />ut</>} />

        <div className="space-y-3">
          <div className="border border-white/10 bg-[#111] p-7 sm:p-10 lg:p-12 xl:p-14">
            <p className="text-[10px] uppercase tracking-[.3em] text-white/35">Our philosophy</p>
            <h2 className="mt-5 max-w-3xl text-5xl font-medium leading-[.94] tracking-[-.055em] sm:text-6xl xl:text-7xl">
              Sushi Artistry<br />
              <span className="font-light italic text-white/55">Redefined.</span>
            </h2>
            <p className="mt-7 max-w-2xl text-base font-light leading-8 text-white/50">
              Where culinary craftsmanship meets modern elegance. Qitchen brings precision,
              atmosphere, and thoughtful hospitality together in one immersive dining experience.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="min-h-[420px] overflow-hidden border border-white/10">
              <img src={media.dining} alt="Guest at Qitchen" className="h-full w-full object-cover" />
            </div>
            <div className="min-h-[420px] overflow-hidden border border-white/10">
              <img src={media.chef} alt="Chef preparing dinner" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
            {[
              ['Trip Advisor', 'Best Sushi'],
              ['Michelin Guide', 'Quality Food'],
              ['Star Dining', 'Cool Vibe'],
            ].map(([top, bottom]) => (
              <div key={top} className="bg-[#111] p-7 text-center sm:p-9">
                <Star className="mx-auto h-4 w-4 text-[#efe8d8]" />
                <p className="mt-5 text-[9px] uppercase tracking-[.25em] text-white/35">{top}</p>
                <p className="mt-2 text-xl font-medium">{bottom}</p>
              </div>
            ))}
          </div>

          <div className="border border-white/10 bg-[#111] p-7 sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[.6fr_1fr]">
              <h3 className="text-3xl font-medium tracking-[-.04em]">Our Story</h3>
              <div>
                <p className="text-sm font-light leading-8 text-white/50">
                  Built around a love for modern Japanese cooking, Qitchen turns every plate into
                  a small composition. The room is intentionally dark, warm, and tactile so the
                  food remains the focus from the first course to the last.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('reserve')}
                  className="mt-7 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.2em] text-white transition hover:text-white/60"
                >
                  Start Dining <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReservationView({
  submitted,
  onSubmit,
}: {
  submitted: boolean;
  onSubmit: () => void;
}) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <section className="pt-[76px]">
      <div className="grid gap-3 p-3 lg:grid-cols-[.8fr_1.2fr] lg:p-4">
        <SplitTitle image={media.reservation} title={<>Book<br />a Table</>} />

        <div className="flex min-h-[calc(100vh-112px)] items-center border border-white/10 bg-[#111] p-6 sm:p-10 lg:p-14 xl:p-20">
          <div className="mx-auto w-full max-w-3xl">
            <p className="text-[10px] uppercase tracking-[.3em] text-white/35">Reservation</p>
            <h2 className="mt-4 text-4xl font-medium tracking-[-.05em] sm:text-5xl">
              Your table is waiting.
            </h2>
            <p className="mt-5 max-w-xl text-sm font-light leading-7 text-white/45">
              Secure your spot at Qitchen for an evening of precise sushi, warm service, and a
              relaxed atmosphere.
            </p>

            {submitted ? (
              <div className="mt-10 border border-white/15 bg-white/[.035] p-8 sm:p-10">
                <p className="text-[10px] uppercase tracking-[.24em] text-white/40">Request received</p>
                <h3 className="mt-3 text-3xl font-medium">Thank you.</h3>
                <p className="mt-4 max-w-lg text-sm leading-7 text-white/50">
                  This is an interactive portfolio demo. In a client website, this step would send
                  the booking request to the restaurant or reservation platform.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 grid gap-5 sm:grid-cols-2">
                <Field label="Name">
                  <input required placeholder="Jane Smith" className="qitchen-input" />
                </Field>
                <Field label="Email">
                  <input required type="email" placeholder="jane@example.com" className="qitchen-input" />
                </Field>
                <Field label="Phone Number">
                  <input required type="tel" placeholder="(714) 555-0123" className="qitchen-input" />
                </Field>
                <Field label="People">
                  <div className="relative">
                    <Users className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                    <select className="qitchen-input pl-11" defaultValue="2">
                      {[1,2,3,4,5,6,7,8,9,10].map((count) => (
                        <option key={count} value={count}>{count} {count === 1 ? 'guest' : 'guests'}</option>
                      ))}
                    </select>
                  </div>
                </Field>
                <Field label="Date">
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                    <input required type="date" className="qitchen-input pl-11" />
                  </div>
                </Field>
                <Field label="Time">
                  <div className="relative">
                    <Clock3 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                    <select className="qitchen-input pl-11" defaultValue="19:00">
                      <option value="17:30">5:30 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="18:30">6:30 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="20:30">8:30 PM</option>
                    </select>
                  </div>
                </Field>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-between border border-[#efe8d8] bg-[#efe8d8] px-6 py-4 text-[11px] font-semibold uppercase tracking-[.2em] text-black transition hover:bg-transparent hover:text-white"
                  >
                    Book a Table <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}

            <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4" />
                <span>Orange County, California</span>
              </div>
              <div className="flex items-center gap-3 sm:justify-end">
                <Clock3 className="h-4 w-4" />
                <span>Tue–Sun · 5 PM–11 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .qitchen-input {
          width: 100%;
          min-height: 52px;
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 0;
          background: rgba(255,255,255,.025);
          padding: 0 16px;
          color: #f4f0e7;
          outline: none;
          font-size: 14px;
          transition: border-color .2s ease, background .2s ease;
        }
        .qitchen-input:focus {
          border-color: rgba(255,255,255,.55);
          background: rgba(255,255,255,.05);
        }
        .qitchen-input::placeholder { color: rgba(255,255,255,.28); }
        select.qitchen-input option { color: #111; }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[.22em] text-white/35">
        {label}
      </span>
      {children}
    </label>
  );
}
