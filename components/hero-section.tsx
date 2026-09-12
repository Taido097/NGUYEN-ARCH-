'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatedDemoPreview } from '@/components/animated-demo-preview';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { MouseEvent, TouchEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

type PreviewVariant = 'photography' | 'auto' | 'salon' | 'restaurant';

type Project = {
  name: string;
  image: string;
  video: string;
  objectPosition: string;
  href: string;
  variant: PreviewVariant;
};

const projects: Project[] = [
  {
    name: 'Luna Frame Studio',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=82',
    video: 'https://www.pexels.com/download/video/25839108/',
    objectPosition: 'center 42%',
    href: '/portfolio/photography-studio',
    variant: 'photography',
  },
  {
    name: 'Beanro Coffee',
    image:
      'https://framerusercontent.com/images/9BOQjMuTjInl3CMPRrkdP4QKJZU.png?width=2440&height=2344',
    video: 'https://framerusercontent.com/assets/v4aErQGkJo2Q26RGPB8Mac4c.mp4',
    objectPosition: 'center 50%',
    href: '/portfolio/auto-repair-shop',
    variant: 'auto',
  },
  {
    name: 'Velvet Glow Salon',
    image:
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=82',
    video: 'https://www.pexels.com/download/video/7754397/',
    objectPosition: 'center 44%',
    href: '/portfolio/salon-spa',
    variant: 'salon',
  },
  {
    name: 'Qitchen Sushi',
    image:
      'https://framerusercontent.com/images/10I4GJR5nYsUsYnoOPIDjoapkA.webp?height=1400&width=1100',
    video: 'https://www.pexels.com/download/video/4253333/',
    objectPosition: 'center 48%',
    href: '/portfolio/restaurant-website',
    variant: 'restaurant',
  },
];

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);
  const pointerFrameRef = useRef<number>(0);
  const pointerSampleRef = useRef<{
    element: HTMLElement;
    clientX: number;
    clientY: number;
  } | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener?.('change', sync);
    return () => media.removeEventListener?.('change', sync);
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(pointerFrameRef.current);
  }, []);

  const advanceDemo = useCallback(() => {
    setActiveIndex((current) => (current + 1) % projects.length);
  }, []);

  const previousDemo = useCallback(() => {
    setActiveIndex((current) => (current - 1 + projects.length) % projects.length);
  }, []);

  const previousIndex = (activeIndex - 1 + projects.length) % projects.length;
  const nextIndex = (activeIndex + 1) % projects.length;
  const activeProject = projects[activeIndex];

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    if (isMobile) return;

    pointerSampleRef.current = {
      element: event.currentTarget,
      clientX: event.clientX,
      clientY: event.clientY,
    };

    if (pointerFrameRef.current) return;

    pointerFrameRef.current = requestAnimationFrame(() => {
      pointerFrameRef.current = 0;
      const sample = pointerSampleRef.current;
      if (!sample) return;

      const rect = sample.element.getBoundingClientRect();
      const x = (sample.clientX - rect.left) / rect.width - 0.5;
      const y = (sample.clientY - rect.top) / rect.height - 0.5;

      sample.element.style.setProperty('--center-x', `${x * 8}px`);
      sample.element.style.setProperty('--center-y', `${y * 6}px`);
      sample.element.style.setProperty('--left-x', `${x * -12}px`);
      sample.element.style.setProperty('--left-y', `${y * -7}px`);
      sample.element.style.setProperty('--right-x', `${x * 12}px`);
      sample.element.style.setProperty('--right-y', `${y * 7}px`);
    });
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    touchStartRef.current = null;
    if (!start || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const horizontalSwipe = Math.abs(deltaX) >= 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.15;

    if (!horizontalSwipe) return;

    suppressClickRef.current = true;
    if (deltaX < 0) {
      advanceDemo();
    } else {
      previousDemo();
    }

    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 350);
  };

  return (
    <section
      id="hero"
      onMouseMove={handlePointerMove}
      className="showcase-hero relative overflow-hidden bg-black pb-20 pt-28 font-sans text-white"
    >
      <style>{`
        .showcase-hero {
          --center-x: 0px;
          --center-y: 0px;
          --left-x: 0px;
          --left-y: 0px;
          --right-x: 0px;
          --right-y: 0px;
        }

        @keyframes showcaseCenterFloat {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -7px, 0); }
        }

        .showcase-center-card { animation: showcaseCenterFloat 6s ease-in-out infinite; }
        .showcase-left-card,
        .showcase-right-card { animation: none; }

        .showcase-center-wrap {
          transform: translate3d(var(--center-x), var(--center-y), 0) translateX(-50%);
        }

        .showcase-left-wrap {
          transform: translate3d(var(--left-x), var(--left-y), 0);
        }

        .showcase-right-wrap {
          transform: translate3d(var(--right-x), var(--right-y), 0);
        }

        @media (max-width: 767px) {
          .showcase-center-card {
            animation: none !important;
          }

          .showcase-center-wrap,
          .showcase-left-wrap,
          .showcase-right-wrap {
            will-change: auto;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .showcase-center-card {
            animation: none !important;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {isMobile ? (
          <HeroBackground project={activeProject} active playVideo={false} />
        ) : (
          projects.map((project, index) => (
            <HeroBackground
              key={project.name}
              project={project}
              active={index === activeIndex}
              playVideo
            />
          ))
        )}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,.62)_0%,rgba(0,0,0,.5)_24%,rgba(0,0,0,.34)_55%,rgba(0,0,0,.76)_100%)]" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_42%,transparent_0%,rgba(0,0,0,.08)_46%,rgba(0,0,0,.34)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-black via-black/55 to-transparent" />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-semibold leading-[0.92] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Make every visit count.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            Custom, mobile-friendly websites for local businesses—built to look professional, load fast, and turn visitors into customers.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="group rounded-none bg-white px-8 py-6 text-xs font-semibold tracking-[0.09em] text-black hover:bg-white/88">
              <Link href="/contact" prefetch={false} className="flex items-center gap-3">
                Start Your Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="group rounded-none border-white/55 bg-black/20 px-8 py-6 text-xs font-semibold tracking-[0.09em] text-white backdrop-blur-md hover:bg-white hover:text-black">
              <Link href="/demos" prefetch={false} className="flex items-center gap-3">
                Explore the Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        <div
          className="relative mt-10 h-[330px] flex-none touch-pan-y select-none sm:h-[400px] lg:h-[460px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClickCapture={(event) => {
            if (!suppressClickRef.current) return;
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <div className="showcase-left-wrap absolute -left-[29%] top-14 z-10 w-[59%] transition-transform duration-200 sm:-left-[12%] sm:w-[46%] lg:left-[1%] lg:top-20 lg:w-[32%]">
            <button
              type="button"
              onClick={() => setActiveIndex(previousIndex)}
              className="group showcase-left-card block w-full text-left opacity-90 transition-opacity duration-300 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              aria-label={`Show ${projects[previousIndex].name}`}
            >
              <WebsiteCard project={projects[previousIndex]} position="side" />
            </button>
          </div>

          <div className="showcase-center-wrap absolute left-1/2 top-0 z-30 w-[78%] transition-transform duration-200 sm:w-[62%] lg:w-[47%]">
            <div className="showcase-center-card">
              <Link
                href={activeProject.href}
                prefetch={false}
                className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                aria-label={`Open ${activeProject.name} demo`}
              >
                <WebsiteCard project={activeProject} position="center" onComplete={advanceDemo} />
              </Link>
            </div>
          </div>

          <div className="showcase-right-wrap absolute -right-[29%] top-16 z-20 w-[59%] transition-transform duration-200 sm:-right-[12%] sm:w-[46%] lg:right-[1%] lg:top-24 lg:w-[32%]">
            <button
              type="button"
              onClick={() => setActiveIndex(nextIndex)}
              className="group showcase-right-card block w-full text-left opacity-90 transition-opacity duration-300 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              aria-label={`Show ${projects[nextIndex].name}`}
            >
              <WebsiteCard project={projects[nextIndex]} position="side" />
            </button>
          </div>
        </div>

        <div className="relative z-40 mt-5 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/60">
            Swipe left or right to browse · tap the active card to view
          </p>
          <div className="flex items-center gap-2" aria-label="Choose featured demo">
            {projects.map((project, index) => (
              <button
                key={project.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-9 bg-white' : 'w-2.5 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Show ${project.name}`}
                aria-current={index === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroBackground({ project, active, playVideo }: { project: Project; active: boolean; playVideo: boolean }) {
  return (
    <div
      className={`absolute inset-0 transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`}
      style={{
        zIndex: active ? 2 : 1,
        transitionDuration: '1800ms',
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: active ? 'opacity' : 'auto',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
      }}
      aria-hidden="true"
    >
      <Image
        src={project.image}
        alt=""
        fill
        sizes="100vw"
        style={{ objectPosition: project.objectPosition }}
        className="object-cover brightness-[0.86] saturate-[0.92]"
        priority={active}
      />
      {active && playVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={project.image}
          tabIndex={-1}
          style={{ objectPosition: project.objectPosition }}
          className="absolute inset-0 h-full w-full object-cover brightness-[0.88] saturate-[0.92] motion-reduce:hidden"
        >
          <source src={project.video} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

function WebsiteCard({
  project,
  position,
  onComplete,
}: {
  project: Project;
  position: 'center' | 'side';
  onComplete?: () => void;
}) {
  return (
    <AnimatedDemoPreview
      variant={project.variant}
      name={project.name}
      image={project.image}
      href={project.href}
      isCenter={position === 'center'}
      onComplete={onComplete}
    />
  );
}
