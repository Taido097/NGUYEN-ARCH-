import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'NGUYEN Architecture & Engineering — Client Demos',
  description: 'Private website concepts prepared for NGUYEN Architecture & Engineering.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

const demos = [
  {
    number: '01',
    name: 'NGUYEN Concept 01',
    style: 'Commercial architecture · engineering · permit',
    href: '/client-demos/client-8889/arcsphere-socal',
  },
  {
    number: '02',
    name: 'NGUYEN Concept 02',
    style: 'Commercial architecture · TI · permit',
    href: '/client-demos/client-8889/prismae',
  },
  {
    number: '03',
    name: 'NGUYEN Concept 03',
    style: 'Commercial design · engineering · permit',
    href: '/client-demos/client-8889/forma',
  },
  {
    number: '04',
    name: 'NGUYEN Concept 04',
    style: 'One team · architecture · engineering · permit',
    href: '/client-demos/client-8889/architectured',
  },
];

export default function NguyenClientDemosPage() {
  return (
    <div className="min-h-screen bg-[#f6f5f2] text-[#121212]">
      <Header />
      <main className="pt-[104px] sm:pt-[122px] lg:pt-[136px]">
        <section className="mx-auto w-full max-w-[1440px] px-4 pb-24 pt-10 sm:px-6 sm:pb-28 sm:pt-14 lg:px-8 lg:pt-16">
          <div className="border-t border-black/10 pt-6 sm:pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-black/45">Private client presentation</p>
            <div className="mt-5 grid gap-7 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
              <div>
                <h1 className="max-w-[980px] text-[clamp(3rem,7vw,7rem)] font-medium leading-[.9] tracking-[-0.065em]">
                  NGUYEN Architecture & Engineering
                </h1>
              </div>
              <p className="max-w-[420px] text-sm leading-[1.65] text-black/55 sm:text-base">
                Website concepts prepared for your business. Open any option below to review the full interactive demo on desktop or mobile.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-x-5 gap-y-10 sm:mt-16 md:grid-cols-2 xl:grid-cols-3">
            {demos.map((demo) => (
              <article key={demo.href} className="group min-w-0">
                <a href={demo.href} className="block cursor-pointer" aria-label={`Open ${demo.name}`}>
                  <div className="relative aspect-[4/3] overflow-hidden border border-black/10 bg-[#dedbd4]">
                    <iframe
                      src={demo.href}
                      title={`${demo.name} website demo preview`}
                      tabIndex={-1}
                      aria-hidden="true"
                      loading="lazy"
                      className="pointer-events-none absolute left-0 top-0 border-0 bg-white"
                      style={{
                        width: '200%',
                        height: '200%',
                        maxWidth: 'none',
                        transform: 'scale(.5)',
                        transformOrigin: 'top left',
                      }}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/15 bg-black/75 px-4 py-2.5 text-[10px] uppercase tracking-[.13em] text-white/70 backdrop-blur-md">
                      <span>Interactive demo</span>
                      <span>Open to explore</span>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-4 border-b border-black/10 py-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-[.14em] text-black/35">Demo {demo.number}</div>
                      <h2 className="mt-1 text-lg font-medium tracking-[-0.03em]">{demo.name}</h2>
                      <p className="mt-1 text-sm text-black/45">{demo.style}</p>
                    </div>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-black/35 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-black" />
                  </div>
                </a>
              </article>
            ))}
          </div>

          <div className="mt-16 border-t border-black/10 pt-5 text-sm leading-relaxed text-black/50 sm:mt-20">
            More design concepts can be added here under the same private access code.
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
