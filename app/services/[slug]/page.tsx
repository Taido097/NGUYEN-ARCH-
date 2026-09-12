import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CalendarDays, Check, Mail, Sheet } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
  getServiceProduct,
  serviceProducts,
  type ServiceDemo,
  type ServiceProduct,
} from '@/lib/service-products';

const serviceThemes = {
  'custom-website': {
    layout: 'collage',
    hero: 'bg-[#f0ede6] text-[#151515]',
    back: 'text-black/55 hover:text-black',
    muted: 'text-black/60',
    primary: 'bg-black text-white hover:bg-black/80',
    secondary: 'border-black/20 bg-white/55 text-black hover:border-black hover:bg-white',
    features: 'bg-white',
    featureCard: 'bg-[#f7f5f0]',
    samples: 'bg-[#e9e4da] text-black',
    cta: 'bg-black text-white',
  },
  ecommerce: {
    layout: 'rail',
    hero: 'bg-[#1f2d40] text-white',
    back: 'text-white/60 hover:text-white',
    muted: 'text-white/65',
    primary: 'bg-[#2374ff] text-white hover:bg-[#1265ef]',
    secondary: 'border-white/25 bg-white/10 text-white hover:border-white hover:bg-white/15',
    features: 'bg-[#eef3fb]',
    featureCard: 'bg-white',
    samples: 'bg-[#1f2d40] text-white',
    cta: 'bg-[#2374ff] text-white',
  },
  scheduling: {
    layout: 'calendar',
    hero: 'bg-[#dff3e8] text-[#153229]',
    back: 'text-[#153229]/60 hover:text-[#153229]',
    muted: 'text-[#153229]/65',
    primary: 'bg-[#153229] text-white hover:bg-[#153229]/85',
    secondary: 'border-[#153229]/20 bg-white/45 text-[#153229] hover:border-[#153229] hover:bg-white/70',
    features: 'bg-[#f4faf6]',
    featureCard: 'bg-white',
    samples: 'bg-[#cfe8da] text-[#153229]',
    cta: 'bg-[#153229] text-white',
  },
  'lead-capture': {
    layout: 'dashboard',
    hero: 'bg-[#dfeeff] text-[#10253f]',
    back: 'text-[#10253f]/60 hover:text-[#10253f]',
    muted: 'text-[#10253f]/65',
    primary: 'bg-[#10253f] text-white hover:bg-[#10253f]/85',
    secondary: 'border-[#10253f]/20 bg-white/55 text-[#10253f] hover:border-[#10253f] hover:bg-white',
    features: 'bg-white',
    featureCard: 'bg-[#f1f7ff]',
    samples: 'bg-[#10253f] text-white',
    cta: 'bg-[#b8dcff] text-[#10253f]',
  },
  portfolio: {
    layout: 'editorial',
    hero: 'bg-[#171717] text-white',
    back: 'text-white/55 hover:text-white',
    muted: 'text-white/62',
    primary: 'bg-white text-black hover:bg-white/85',
    secondary: 'border-white/25 bg-white/5 text-white hover:border-white hover:bg-white/10',
    features: 'bg-[#eee9df]',
    featureCard: 'bg-[#f8f5ee]',
    samples: 'bg-[#f4efe6] text-black',
    cta: 'bg-[#171717] text-white',
  },
  blog: {
    layout: 'magazine',
    hero: 'bg-[#eee7ff] text-[#2c1d48]',
    back: 'text-[#2c1d48]/60 hover:text-[#2c1d48]',
    muted: 'text-[#2c1d48]/65',
    primary: 'bg-[#2c1d48] text-white hover:bg-[#2c1d48]/85',
    secondary: 'border-[#2c1d48]/20 bg-white/45 text-[#2c1d48] hover:border-[#2c1d48] hover:bg-white/70',
    features: 'bg-[#faf8ff]',
    featureCard: 'bg-white',
    samples: 'bg-[#eee7ff] text-[#2c1d48]',
    cta: 'bg-[#2c1d48] text-white',
  },
} as const;

export function generateStaticParams() {
  return serviceProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getServiceProduct(slug);

  if (!product) return {};

  return {
    title: `${product.title} Service | Designed by TD`,
    description: product.heroDescription,
    alternates: {
      canonical: `https://designedbytd.com/services/${product.slug}`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getServiceProduct(slug);

  if (!product) notFound();

  const theme =
    serviceThemes[product.slug as keyof typeof serviceThemes] ?? serviceThemes['custom-website'];
  const contactHref = `/contact?service=${encodeURIComponent(product.title)}`;

  return (
    <>
      <Header />
      <main className="bg-white pt-20 text-[#121212]">
        <section className={`overflow-hidden border-b border-black/10 py-14 sm:py-20 lg:py-24 ${theme.hero}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/#portfolio"
              className={`inline-flex items-center gap-2 text-sm transition ${theme.back}`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to services
            </Link>

            <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)] lg:items-center lg:gap-16">
              <div className="relative z-10">
                <p className={`text-xs font-medium uppercase tracking-[0.26em] ${theme.muted}`}>
                  {product.label}
                </p>
                <h1 className="mt-5 max-w-3xl text-5xl font-medium leading-[.98] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                  {product.heroTitle}
                </h1>
                <p className={`mt-7 max-w-2xl text-lg font-light leading-8 ${theme.muted}`}>
                  {product.heroDescription}
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link
                    href={contactHref}
                    className={`inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium transition hover:gap-4 ${theme.primary}`}
                  >
                    Start this project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="#samples"
                    className={`inline-flex items-center rounded-full border px-7 py-3.5 text-sm font-medium backdrop-blur-sm transition ${theme.secondary}`}
                  >
                    View samples
                  </a>
                </div>
              </div>

              <HeroPreview product={product} layout={theme.layout} />
            </div>
          </div>
        </section>

        <section className={`border-b border-black/10 py-20 sm:py-24 ${theme.features}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.26em] text-black/45">
                  What is included
                </p>
                <h2 className="mt-4 text-4xl font-medium leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                  Everything needed to make the service useful for your business.
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {product.features.map((feature, index) => (
                  <div
                    key={feature}
                    className={`flex min-h-32 gap-4 rounded-2xl border border-black/8 p-6 sm:p-7 ${theme.featureCard}`}
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-white">
                      <Check className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[.18em] text-black/35">
                        0{index + 1}
                      </p>
                      <p className="mt-2 text-base font-light leading-7 text-black/70">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="samples" className={`py-20 sm:py-24 ${theme.samples}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.26em] opacity-50">
                Sample website directions
              </p>
              <h2 className="mt-4 text-4xl font-medium leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                More ways your {product.title.toLowerCase()} could look.
              </h2>
              <p className="mt-5 max-w-2xl text-base font-light leading-7 opacity-65 sm:text-lg">
                These are visual directions for inspiration. Your final website will be customized around your business.
              </p>
            </div>

            <SampleGallery demos={product.demos} layout={theme.layout} />
          </div>
        </section>

        <section className={`py-20 sm:py-24 ${theme.cta}`}>
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.26em] opacity-45">
                Ready to begin?
              </p>
              <h2 className="mt-4 text-4xl font-medium leading-[1.04] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Let’s build your {product.title.toLowerCase()} around the way your business works.
              </h2>
            </div>
            <Link
              href={contactHref}
              className="inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:gap-4 hover:bg-white/85"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function HeroPreview({ product, layout }: { product: ServiceProduct; layout: string }) {
  const demos = product.demos;

  if (layout === 'rail') {
    return (
      <div className="relative min-h-[480px] overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 p-4 shadow-[0_30px_90px_rgba(0,0,0,.28)] sm:min-h-[610px] sm:p-6">
        <div className="absolute inset-x-6 top-7 flex gap-4 overflow-hidden sm:inset-x-8 sm:top-10">
          {demos.slice(0, 3).map((demo, index) => (
            <div
              key={demo.title}
              className={`shrink-0 overflow-hidden rounded-2xl bg-white shadow-2xl ${
                index === 1 ? 'w-[36%]' : 'w-[62%]'
              }`}
            >
              <BrowserBar label={demo.category} />
              <img src={demo.image} alt={demo.title} className="aspect-[4/3] w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="absolute bottom-7 left-7 rounded-2xl border border-white/15 bg-[#2374ff] p-5 text-white shadow-2xl sm:bottom-10 sm:left-10 sm:p-6">
          <p className="text-[10px] uppercase tracking-[.2em] text-white/65">Store preview</p>
          <p className="mt-2 max-w-xs text-xl font-medium sm:text-2xl">{product.previewTitle}</p>
        </div>
        <div className="absolute bottom-6 right-6 w-[28%] rotate-[4deg] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-2xl sm:bottom-8 sm:right-9">
          <img src={demos[4].image} alt={demos[4].title} className="aspect-[3/5] w-full object-cover" />
        </div>
      </div>
    );
  }

  if (layout === 'calendar') {
    return (
      <div className="relative min-h-[500px] sm:min-h-[620px]">
        <div className="absolute inset-x-[7%] top-[6%] overflow-hidden rounded-[2rem] border border-[#153229]/15 bg-white shadow-[0_28px_80px_rgba(21,50,41,.18)]">
          <BrowserBar label={demos[0].category} />
          <img src={demos[0].image} alt={demos[0].title} className="aspect-[16/11] w-full object-cover" />
        </div>
        <div className="absolute bottom-[7%] left-[1%] z-10 rounded-2xl bg-[#153229] p-5 text-white shadow-2xl sm:left-[3%] sm:p-6">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5" />
            <span className="text-xs uppercase tracking-[.18em] text-white/65">Next available</span>
          </div>
          <p className="mt-4 text-2xl font-medium">Thursday · 2:30 PM</p>
          <p className="mt-2 text-sm text-white/65">Simple booking on any device</p>
        </div>
        <div className="absolute bottom-[1%] right-[2%] z-20 w-[38%] rotate-[3deg] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-2xl sm:right-[5%]">
          <img src={demos[4].image} alt={demos[4].title} className="aspect-[3/4] w-full object-cover" />
        </div>
      </div>
    );
  }

  if (layout === 'dashboard') {
    return (
      <div className="relative min-h-[500px] rounded-[2rem] border border-[#10253f]/10 bg-white/50 p-4 shadow-[0_30px_90px_rgba(16,37,63,.16)] sm:min-h-[620px] sm:p-6">
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl">
          <BrowserBar label={demos[0].category} />
          <img src={demos[0].image} alt={demos[0].title} className="aspect-[16/10] w-full object-cover" />
        </div>
        <div className="absolute bottom-7 left-7 right-7 grid grid-cols-3 gap-3 sm:bottom-10 sm:left-10 sm:right-10 sm:gap-4">
          <DashboardCard icon={<Mail className="h-4 w-4" />} value="24" label="New leads" />
          <DashboardCard icon={<Sheet className="h-4 w-4" />} value="Live" label="Sheet tracking" />
          <DashboardCard icon={<Check className="h-4 w-4" />} value="100%" label="Form delivery" />
        </div>
        <div className="absolute right-5 top-[42%] w-[33%] rotate-[3deg] overflow-hidden rounded-xl border-4 border-white bg-white shadow-2xl sm:right-8">
          <img src={demos[2].image} alt={demos[2].title} className="aspect-[4/3] w-full object-cover" />
        </div>
      </div>
    );
  }

  if (layout === 'editorial') {
    return (
      <div className="relative min-h-[510px] sm:min-h-[640px]">
        <div className="absolute left-0 top-[4%] h-[72%] w-[64%] overflow-hidden rounded-sm bg-white shadow-[0_35px_90px_rgba(0,0,0,.4)]">
          <img src={demos[0].image} alt={demos[0].title} className="h-full w-full object-cover" />
        </div>
        <div className="absolute right-0 top-[18%] z-10 h-[56%] w-[42%] overflow-hidden border-[10px] border-[#171717] bg-white shadow-2xl">
          <img src={demos[1].image} alt={demos[1].title} className="h-full w-full object-cover" />
        </div>
        <div className="absolute bottom-[2%] left-[18%] z-20 max-w-sm bg-[#f4efe6] p-6 text-black shadow-2xl sm:p-8">
          <p className="text-[10px] uppercase tracking-[.22em] text-black/45">Selected work</p>
          <p className="mt-3 text-2xl font-medium leading-tight sm:text-3xl">{product.previewTitle}</p>
        </div>
      </div>
    );
  }

  if (layout === 'magazine') {
    return (
      <div className="relative min-h-[500px] sm:min-h-[620px]">
        <article className="absolute left-[2%] top-[2%] w-[62%] overflow-hidden rounded-[1.5rem] bg-white shadow-[0_30px_80px_rgba(44,29,72,.2)]">
          <img src={demos[0].image} alt={demos[0].title} className="aspect-[4/3] w-full object-cover" />
          <div className="p-5 sm:p-6">
            <p className="text-[10px] uppercase tracking-[.2em] text-[#2c1d48]/45">Featured story</p>
            <p className="mt-2 text-xl font-medium text-[#2c1d48] sm:text-2xl">{demos[0].title}</p>
          </div>
        </article>
        <article className="absolute right-[2%] top-[14%] w-[42%] overflow-hidden rounded-[1.5rem] bg-[#2c1d48] text-white shadow-2xl">
          <img src={demos[4].image} alt={demos[4].title} className="aspect-[4/3] w-full object-cover" />
          <div className="p-4 sm:p-5">
            <p className="text-sm font-medium">{demos[4].title}</p>
          </div>
        </article>
        <article className="absolute bottom-[2%] right-[10%] z-10 w-[48%] rounded-[1.5rem] border border-[#2c1d48]/10 bg-[#fffdf8] p-5 text-[#2c1d48] shadow-2xl sm:p-7">
          <p className="text-[10px] uppercase tracking-[.2em] opacity-45">Content system</p>
          <p className="mt-3 text-2xl font-medium leading-tight">{product.previewTitle}</p>
          <div className="mt-5 h-px bg-[#2c1d48]/15" />
          <p className="mt-4 text-sm leading-6 opacity-60">Articles, categories, featured images, and clear calls to action.</p>
        </article>
      </div>
    );
  }

  return (
    <div className="relative min-h-[500px] sm:min-h-[620px] lg:min-h-[660px]">
      <div className="absolute left-[2%] top-[17%] w-[58%] rotate-[-7deg] overflow-hidden rounded-2xl border border-black/15 bg-white shadow-[0_24px_65px_rgba(0,0,0,.2)] sm:left-[5%] sm:w-[55%]">
        <BrowserBar label={demos[0].category} />
        <img src={demos[0].image} alt={demos[0].title} className="aspect-[4/3] w-full object-cover" />
      </div>
      <div className="absolute right-[1%] top-[2%] z-10 w-[64%] rotate-[5deg] overflow-hidden rounded-2xl border border-black/15 bg-white shadow-[0_30px_80px_rgba(0,0,0,.24)] sm:right-[3%] sm:w-[61%]">
        <BrowserBar label={demos[1].category} />
        <img src={demos[1].image} alt={demos[1].title} className="aspect-[4/3] w-full object-cover" />
      </div>
      <div className="absolute bottom-[3%] right-[8%] z-20 w-[58%] rotate-[-2deg] overflow-hidden rounded-2xl border border-black/15 bg-white shadow-[0_32px_90px_rgba(0,0,0,.28)] sm:right-[13%] sm:w-[56%]">
        <BrowserBar label={demos[2].category} />
        <div className="relative">
          <img src={demos[2].image} alt={demos[2].title} className="aspect-[4/3] w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-16 text-white">
            <p className="text-[10px] uppercase tracking-[.2em] text-white/65">Sample concept</p>
            <p className="mt-2 text-xl font-medium">{product.previewTitle}</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[7%] left-[1%] z-30 w-[28%] rotate-[5deg] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-2xl">
        <img src={demos[5].image} alt={demos[5].title} className="aspect-[3/4] w-full object-cover" />
      </div>
    </div>
  );
}

function SampleGallery({ demos, layout }: { demos: ServiceDemo[]; layout: string }) {
  if (layout === 'rail') {
    return (
      <div className="-mx-4 mt-12 flex snap-x gap-5 overflow-x-auto px-4 pb-8 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {demos.map((demo, index) => (
          <SampleCard
            key={demo.title}
            demo={demo}
            className={`snap-start ${index % 3 === 1 ? 'min-w-[72vw] sm:min-w-[330px]' : 'min-w-[86vw] sm:min-w-[540px]'}`}
          />
        ))}
      </div>
    );
  }

  if (layout === 'editorial') {
    return (
      <div className="mt-14 grid gap-6 lg:grid-cols-12">
        {demos.map((demo, index) => (
          <article
            key={demo.title}
            className={`overflow-hidden bg-white shadow-[0_22px_60px_rgba(0,0,0,.1)] ${
              index === 0 || index === 5
                ? 'lg:col-span-8'
                : index === 1 || index === 4
                  ? 'lg:col-span-4'
                  : 'lg:col-span-6'
            }`}
          >
            <img
              src={demo.image}
              alt={`${demo.title} sample website`}
              className={`w-full object-cover ${index === 0 || index === 5 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}
            />
            <div className="flex items-end justify-between gap-5 p-6">
              <div>
                <p className="text-[10px] uppercase tracking-[.2em] text-black/40">{demo.category}</p>
                <h3 className="mt-2 text-2xl font-medium">{demo.title}</h3>
              </div>
              <span className="text-3xl font-light text-black/20">0{index + 1}</span>
            </div>
          </article>
        ))}
      </div>
    );
  }

  if (layout === 'magazine') {
    return (
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo, index) => (
          <article
            key={demo.title}
            className={`overflow-hidden rounded-[1.5rem] border border-[#2c1d48]/10 ${
              index === 0 ? 'md:col-span-2 lg:col-span-2' : 'bg-white/70'
            }`}
          >
            <img
              src={demo.image}
              alt={`${demo.title} sample website`}
              className={`w-full object-cover ${index === 0 ? 'aspect-[16/8]' : 'aspect-[4/3]'}`}
            />
            <div className="p-6">
              <p className="text-[10px] uppercase tracking-[.2em] opacity-45">Issue 0{index + 1}</p>
              <h3 className="mt-2 text-2xl font-medium">{demo.title}</h3>
              <p className="mt-2 text-sm opacity-55">{demo.category}</p>
            </div>
          </article>
        ))}
      </div>
    );
  }

  const cardClasses =
    layout === 'calendar'
      ? 'rounded-[1.75rem] border border-[#153229]/10 bg-white/70'
      : layout === 'dashboard'
        ? 'rounded-[1.25rem] border border-white/12 bg-white text-black'
        : 'rounded-[1.5rem] border border-black/10 bg-white';

  return (
    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {demos.map((demo, index) => (
        <SampleCard
          key={demo.title}
          demo={demo}
          className={`${cardClasses} ${index === 1 || index === 4 ? 'lg:translate-y-8' : ''}`}
        />
      ))}
    </div>
  );
}

function SampleCard({ demo, className = '' }: { demo: ServiceDemo; className?: string }) {
  return (
    <article className={`overflow-hidden shadow-[0_20px_55px_rgba(0,0,0,.09)] ${className}`}>
      <BrowserBar label={demo.category} />
      <img src={demo.image} alt={`${demo.title} sample website`} className="aspect-[4/3] w-full object-cover" />
      <div className="p-6">
        <p className="text-[10px] font-medium uppercase tracking-[.22em] text-black/40">{demo.category}</p>
        <h3 className="mt-3 text-2xl font-medium tracking-[-.025em] text-black">{demo.title}</h3>
      </div>
    </article>
  );
}

function DashboardCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-xl bg-white p-3 text-[#10253f] shadow-xl sm:p-4">
      <div className="flex items-center gap-2 text-[#10253f]/45">{icon}</div>
      <p className="mt-3 text-lg font-semibold sm:text-2xl">{value}</p>
      <p className="mt-1 text-[9px] uppercase tracking-[.14em] text-[#10253f]/45 sm:text-[10px]">{label}</p>
    </div>
  );
}

function BrowserBar({ label }: { label: string }) {
  return (
    <div className="flex h-10 items-center gap-3 border-b border-black/10 bg-white px-3">
      <div className="flex gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-black/15" />
        <span className="h-2 w-2 rounded-full bg-black/15" />
        <span className="h-2 w-2 rounded-full bg-black/15" />
      </div>
      <div className="truncate rounded-full bg-black/[.04] px-3 py-1 text-[9px] uppercase tracking-[.14em] text-black/40">
        {label}
      </div>
    </div>
  );
}
