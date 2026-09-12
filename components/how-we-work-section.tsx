'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type ShowcaseDemo = {
  name: string;
  category: 'Portfolio' | 'Scheduling' | 'Restaurant' | 'Custom Website';
  industry: string;
  href: string;
  mobileImage: string;
  mobileFit?: 'cover' | 'contain';
};

const snapshot = (path: string, wait = 2) =>
  `https://image.thum.io/get/width/1440/crop/900/noanimate/wait/${wait}/https://designedbytd.com${path}`;

const demos: ShowcaseDemo[] = [
  {
    name: 'Fuel',
    category: 'Portfolio',
    industry: 'Premium creative agency',
    href: '/portfolio/fuel-agency',
    mobileImage: snapshot('/portfolio/fuel-agency'),
  },
  {
    name: 'Beanro Coffee',
    category: 'Restaurant',
    industry: 'Coffee shop',
    href: '/portfolio/auto-repair-shop',
    mobileImage: snapshot('/portfolio/auto-repair-shop'),
  },
  {
    name: 'Salonix',
    category: 'Scheduling',
    industry: 'Hair & beauty salon',
    href: '/portfolio/salon-spa',
    mobileImage: snapshot('/portfolio/salon-spa', 3),
    mobileFit: 'contain',
  },
  {
    name: 'AKJO',
    category: 'Portfolio',
    industry: 'Creative portfolio',
    href: '/portfolio/akjo-portfolio',
    mobileImage: 'https://image.thum.io/get/width/1440/crop/900/noanimate/wait/5/https://agreeable-light-499126.framer.app/',
    mobileFit: 'contain',
  },
];

const benefits = [
  { number: '01', title: 'Custom Designs Only', description: 'No random templates. Every design is created to match the business and make it easy for customers to take action.' },
  { number: '02', title: 'Fast Turnaround', description: 'Most simple business websites can be designed and launched quickly, so you can start using it with customers.' },
  { number: '03', title: 'Ongoing Support', description: 'After launch, you can get help with small updates, text changes, and improvements.' },
  { number: '04', title: 'Built for Local Businesses', description: 'The goal is not just a pretty site. The goal is to help customers trust you, call you, and request your service.' },
];

function DemoCard({ demo, index }: { demo: ShowcaseDemo; index: number }) {
  return (
    <>
      <div className="demo-showcase-preview">
        <img
          src={demo.mobileImage}
          alt={`${demo.name} website preview`}
          decoding="async"
          loading="lazy"
        />
        <Link
          href={demo.href}
          aria-label={`Open ${demo.name} demo`}
          className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black"
        />
      </div>
      <div className="demo-showcase-info">
        <div className="min-w-0">
          <h3 className="demo-showcase-title truncate">{demo.name}</h3>
          <p className="demo-showcase-industry truncate">{demo.industry}</p>
        </div>
        <span className="demo-showcase-count">
          {String(index + 1).padStart(2, '0')} / {String(demos.length).padStart(2, '0')}
        </span>
      </div>
    </>
  );
}

function MobileDemoScene({
  demo,
  index,
}: {
  demo: ShowcaseDemo;
  index: number;
}) {
  const fit = demo.mobileFit ?? 'cover';

  const slug = demo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <article className={`mobile-demo-scene mobile-demo-scene-${slug}`}>
      <div className="mobile-demo-background" aria-hidden="true">
        <img src={demo.mobileImage} alt="" decoding="async" loading="lazy" />
      </div>

      <div className="mobile-demo-card">
        <div className={`mobile-demo-preview mobile-demo-preview-${fit}`}>
          <img src={demo.mobileImage} alt={`${demo.name} website preview`} decoding="async" loading="lazy" />
          <Link
            href={demo.href}
            aria-label={`Open ${demo.name} demo`}
            className="absolute inset-0 z-20"
          />
        </div>
        <div className="demo-showcase-info">
          <div className="min-w-0">
            <h3 className="demo-showcase-title truncate">{demo.name}</h3>
            <p className="demo-showcase-industry truncate">{demo.industry}</p>
          </div>
          <span className="demo-showcase-count">
            {String(index + 1).padStart(2, '0')} / {String(demos.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      <span className="demo-showcase-category">{demo.category}</span>
    </article>
  );
}

export function HowWeWorkSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => setIsVisible(true), []);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 560px)');
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener?.('change', sync);
    return () => media.removeEventListener?.('change', sync);
  }, []);

  useEffect(() => {
    if (isMobile !== false) return;

    let frame = 0;
    let stickyTop = 0;
    let stackStart = 0;
    let maxTravel = 1;
    let stageHeight = 0;
    let gap = 24;
    let renderedActiveIndex = -1;
    let renderedIncomingIndex = -1;
    let lastIncomingTransform = '';

    const measureStack = () => {
      const stack = stackRef.current;
      const stage = stageRef.current;
      if (!stack || !stage) return;

      stickyTop = Number.parseFloat(window.getComputedStyle(stage).top) || 0;
      stackStart = stack.getBoundingClientRect().top + window.scrollY;
      stageHeight = stage.offsetHeight;
      maxTravel = Math.max(1, stack.offsetHeight - stageHeight);
      gap = window.innerWidth <= 900 ? 20 : 24;
    };

    const syncRenderedScenes = (activeIndex: number, incomingIndex: number) => {
      if (activeIndex === renderedActiveIndex && incomingIndex === renderedIncomingIndex) return;

      sceneRefs.current.forEach((scene, index) => {
        if (!scene) return;

        const shouldRender = index === activeIndex || index === incomingIndex;
        const nextVisibility = shouldRender ? 'visible' : 'hidden';
        const nextContentVisibility = shouldRender ? 'visible' : 'hidden';
        const nextWillChange = index === incomingIndex && incomingIndex !== activeIndex ? 'transform' : 'auto';

        if (scene.style.visibility !== nextVisibility) scene.style.visibility = nextVisibility;
        if (scene.style.contentVisibility !== nextContentVisibility) scene.style.contentVisibility = nextContentVisibility;
        if (scene.style.willChange !== nextWillChange) scene.style.willChange = nextWillChange;
      });

      const activeScene = sceneRefs.current[activeIndex];
      if (activeScene) activeScene.style.transform = 'translate3d(0,0,0)';

      renderedActiveIndex = activeIndex;
      renderedIncomingIndex = incomingIndex;
      lastIncomingTransform = '';
    };

    const updateStack = () => {
      frame = 0;
      if (!stackRef.current || !stageRef.current) return;

      const travelled = Math.min(maxTravel, Math.max(0, window.scrollY + stickyTop - stackStart));
      const position = (travelled / maxTravel) * (demos.length - 1);
      const activeIndex = Math.min(demos.length - 1, Math.max(0, Math.floor(position)));
      const incomingIndex = Math.min(demos.length - 1, activeIndex + 1);

      syncRenderedScenes(activeIndex, incomingIndex);
      if (incomingIndex === activeIndex) return;

      const incomingScene = sceneRefs.current[incomingIndex];
      if (!incomingScene) return;

      const localProgress = Math.min(1, Math.max(0, position - (incomingIndex - 1)));
      const translateY = (1 - localProgress) * (stageHeight + gap);
      const nextTransform = `translate3d(0,${translateY}px,0)`;

      if (nextTransform !== lastIncomingTransform) {
        incomingScene.style.transform = nextTransform;
        lastIncomingTransform = nextTransform;
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateStack);
    };

    const remeasure = () => {
      measureStack();
      renderedActiveIndex = -1;
      renderedIncomingIndex = -1;
      lastIncomingTransform = '';
      requestUpdate();
    };

    measureStack();
    updateStack();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', remeasure, { passive: true });
    window.addEventListener('load', remeasure, { once: true });
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', remeasure);
      window.removeEventListener('load', remeasure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [isMobile]);

  return (
    <section id="process" className="scroll-mt-24 border-t border-black/10 bg-[#fafafa] py-20 text-[#121212] sm:py-24 lg:py-28">
      <style>{`
        .demo-showcase-scroll{position:relative;height:2920px}
        .demo-showcase-stage{position:sticky;top:56px;height:calc(100vh - 56px);min-height:780px;max-height:1080px;overflow:hidden;isolation:isolate;background:#fafafa}
        .demo-showcase-scene{position:absolute;inset:0;overflow:visible;background:transparent;backface-visibility:hidden;-webkit-backface-visibility:hidden}
        .demo-showcase-scene-content{position:absolute;inset:0;overflow:hidden;contain:paint;isolation:isolate;background:#111;backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:translateZ(0)}
        .demo-showcase-scene:not(:first-child)::before{content:'';position:absolute;left:0;right:0;top:-24px;z-index:100;height:24px;background:#fafafa;pointer-events:none}
        .demo-showcase-bg{position:absolute;inset:-10%;z-index:0;overflow:hidden;contain:paint;background:#111;filter:blur(24px) saturate(1.12) brightness(.82) contrast(1.03);transform:scale(1.16) translateZ(0);transform-origin:center;will-change:filter;backface-visibility:hidden;-webkit-backface-visibility:hidden;pointer-events:none}
        .demo-showcase-bg::after{content:'';position:absolute;inset:0;z-index:2;background:rgba(0,0,0,.06);pointer-events:none}
        .demo-showcase-bg img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
        .demo-showcase-preview img{display:block;width:100%;height:100%;object-fit:cover;object-position:top center}
        .demo-showcase-card{position:absolute;left:50%;top:50%;z-index:5;width:min(72%,1060px);min-width:760px;overflow:hidden;background:#fff;box-shadow:0 34px 90px rgba(0,0,0,.24);transform:translate3d(-50%,-50%,0)}
        .demo-showcase-preview{position:relative;height:clamp(540px,64vh,700px);overflow:hidden;background:#fff}
        .demo-showcase-info{display:flex;align-items:center;justify-content:space-between;gap:24px;min-height:126px;padding:25px 32px 27px;background:#fff}
        .demo-showcase-title{font-size:clamp(20px,2vw,28px);font-weight:500;line-height:1;letter-spacing:-.045em}
        .demo-showcase-industry{margin-top:8px;font-size:15px;color:rgba(18,18,18,.52)}
        .demo-showcase-count{flex:none;font-size:11px;letter-spacing:.12em;color:rgba(18,18,18,.42)}
        .demo-showcase-category{position:absolute;left:24px;bottom:24px;z-index:30;border:1px solid rgba(255,255,255,.9);border-radius:999px;background:rgba(0,0,0,.24);padding:11px 20px;color:#fff;font-size:12px;font-weight:600;letter-spacing:.02em;text-transform:uppercase;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
        .view-all-demos-button{border-radius:0!important}

        @media(max-width:1100px) and (min-width:901px){
          .demo-showcase-stage{min-height:720px}
          .demo-showcase-card{width:76%;min-width:670px}
          .demo-showcase-preview{height:540px}
        }

        @media(max-width:900px) and (min-width:561px){
          .demo-showcase-scroll{height:2140px}
          .demo-showcase-stage{top:76px;height:calc(100vh - 96px);min-height:650px;max-height:820px}
          .demo-showcase-bg{inset:-12%;filter:blur(22px) saturate(1.1) brightness(.84) contrast(1.03);transform:scale(1.18) translateZ(0)}
          .demo-showcase-card{width:calc(100% - 64px);min-width:0;box-shadow:0 22px 56px rgba(0,0,0,.26)}
          .demo-showcase-preview{height:clamp(390px,56vh,520px)}.demo-showcase-info{min-height:104px;padding:20px}
          .demo-showcase-category{left:12px;bottom:14px;padding:9px 14px;font-size:10px;backdrop-filter:none;-webkit-backdrop-filter:none}
          .demo-showcase-scene:not(:first-child)::before{top:-20px;height:20px}
        }

        @media(max-width:560px){
          .mobile-demo-stack{display:block;position:relative}
          .mobile-demo-scene{position:relative;height:540px;overflow:hidden;isolation:isolate;margin:0 0 18px;background:#111;contain:layout paint style}
          .mobile-demo-background{position:absolute;inset:-40px;z-index:0;overflow:hidden;background:#111;pointer-events:none}
          .mobile-demo-background::after{content:'';position:absolute;inset:0;background:rgba(0,0,0,.10)}
          .mobile-demo-background img{width:100%;height:100%;object-fit:cover;filter:blur(22px) saturate(1.12) brightness(.82);transform:scale(1.15);transform-origin:center}
          .mobile-demo-card{position:absolute;left:18px;right:18px;top:50%;z-index:5;display:block;overflow:hidden;background:#fff;box-shadow:0 20px 52px rgba(0,0,0,.28);transform:translateY(-50%)}
          .mobile-demo-preview{position:relative;height:286px;overflow:hidden;background:#f2f2f2}
          .mobile-demo-preview>img{width:100%;height:100%;object-position:top center;display:block}
          .mobile-demo-preview-cover>img{object-fit:cover}
          .mobile-demo-preview-contain>img{object-fit:contain;background:#fff}
          .mobile-demo-scene-salonix .mobile-demo-preview{height:300px}
          .mobile-demo-scene-akjo .mobile-demo-preview{height:310px;background:#fff}
          .mobile-demo-scene .demo-showcase-info{min-height:88px;padding:15px 16px}
          .mobile-demo-scene .demo-showcase-title{font-size:19px}
          .mobile-demo-scene .demo-showcase-industry{margin-top:5px;font-size:12px}
          .mobile-demo-scene .demo-showcase-category{left:10px;bottom:12px;padding:8px 12px;font-size:9px;backdrop-filter:none;-webkit-backdrop-filter:none}
        }

        @media(prefers-reduced-motion:reduce){.demo-showcase-scene{will-change:auto}}
      `}</style>

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="border-t border-black/10 pt-7 sm:pt-8">
          <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-black/45">Selected demos</p>
              <h2 className="mt-3 max-w-[850px] text-[clamp(2.7rem,5.5vw,5rem)] font-medium leading-[.92] tracking-[-0.055em]">Websites built for different businesses</h2>
            </div>
            <Link href="/demos" style={{ borderRadius: 0 }} className="view-all-demos-button group hidden shrink-0 items-center gap-3 !rounded-none bg-black px-5 py-4 text-xs font-semibold uppercase tracking-[0.04em] text-white sm:inline-flex">
              View all demos <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {isMobile === false && (
            <div ref={stackRef} className="demo-showcase-scroll">
              <div ref={stageRef} className="demo-showcase-stage">
                {demos.map((demo, index) => (
                  <div
                    key={demo.href}
                    ref={(node) => { sceneRefs.current[index] = node; }}
                    className="demo-showcase-scene"
                    style={{
                      zIndex: 10 + index,
                      transform: index === 0 ? 'translate3d(0,0,0)' : 'translate3d(0,calc(100% + 24px),0)',
                      visibility: index <= 1 ? 'visible' : 'hidden',
                      contentVisibility: index <= 1 ? 'visible' : 'hidden',
                      willChange: index === 1 ? 'transform' : 'auto',
                    }}
                  >
                    <div className="demo-showcase-scene-content">
                      <div className="demo-showcase-bg" aria-hidden="true">
                        <img src={demo.mobileImage} alt="" decoding="async" loading="lazy" />
                      </div>
                      <div className="demo-showcase-card"><DemoCard demo={demo} index={index} /></div>
                      <span className="demo-showcase-category">{demo.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isMobile === true && (
            <div className="mobile-demo-stack">
              {demos.map((demo, index) => (
                <MobileDemoScene
                  key={demo.href}
                  demo={demo}
                  index={index}
                />
              ))}
            </div>
          )}

          <div className="flex justify-center py-16 sm:py-20">
            <Link href="/demos" style={{ borderRadius: 0 }} className="view-all-demos-button group inline-flex min-w-[190px] items-center justify-center gap-3 !rounded-none bg-black px-7 py-4 text-xs font-semibold uppercase tracking-[0.04em] text-white transition-colors duration-300 hover:bg-black/80">
              View all demos <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div id="about" className="mt-20 scroll-mt-24 border-t border-black/10 pt-20 lg:mt-28 lg:pt-24">
          <div className="border-t border-black/10 pt-7 sm:pt-8">
            <h3 className="max-w-[1000px] text-[clamp(3rem,6vw,5.5rem)] font-medium leading-[.92] tracking-[-0.06em]">Why Choose DesignedbyTD Studio?</h3>
            <p className="mt-6 max-w-[520px] text-base font-light leading-[1.45] tracking-[-0.02em] text-black/70">A focused website process built for local businesses that want to look professional and make it easier for customers to take action.</p>
          </div>
          <div className="mt-12 grid gap-3 md:grid-cols-2 lg:mt-14">
            {benefits.map((benefit, index) => (
              <article key={benefit.number} className={`group min-h-[235px] rounded-xl border border-black/10 bg-white p-6 transition-all duration-700 [transition-timing-function:cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_14px_38px_rgba(0,0,0,.06)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`} style={{ transitionDelay: `${240 + index * 80}ms` }}>
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-[38px] w-[38px] place-items-center rounded-full bg-[#121212] text-base font-semibold text-white transition-transform duration-500 [transition-timing-function:cubic-bezier(.22,1.2,.36,1)] group-hover:-rotate-[8deg] group-hover:scale-110">✓</span>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-black/35">{benefit.number}</span>
                </div>
                <h4 className="mt-10 text-[clamp(26px,2.5vw,38px)] font-medium leading-none tracking-[-0.05em]">{benefit.title}</h4>
                <p className="mt-3 max-w-[54ch] text-sm font-light leading-relaxed text-black/60">{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}