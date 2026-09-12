'use client';

import { useEffect, useRef, useState } from 'react';
import type { ServiceDemo } from '@/lib/service-products';

export function AutoScrollServiceGallery({ demos }: { demos: ServiceDemo[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || demos.length === 0) return;

    const speed = 34;

    const animate = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const delta = Math.min(time - lastTimeRef.current, 40);
      lastTimeRef.current = time;

      if (!pausedRef.current) {
        track.scrollLeft += (speed * delta) / 1000;

        const loopPoint = track.scrollWidth / 2;
        if (track.scrollLeft >= loopPoint) {
          track.scrollLeft -= loopPoint;
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      lastTimeRef.current = null;
    };
  }, [demos]);

  const repeatedDemos = [...demos, ...demos];

  return (
    <div
      ref={trackRef}
      className="auto-service-gallery -mx-4 mt-12 overflow-x-auto px-4 pb-8 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onPointerDown={() => setIsPaused(true)}
      onPointerUp={() => setIsPaused(false)}
      aria-label="Automatically scrolling eCommerce website samples"
    >
      <style>{`
        .auto-service-gallery {
          scrollbar-width: none;
          overscroll-behavior-inline: contain;
        }
        .auto-service-gallery::-webkit-scrollbar {
          display: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .auto-service-gallery {
            scroll-behavior: auto;
          }
        }
      `}</style>

      <div className="flex w-max gap-5 pr-5">
        {repeatedDemos.map((demo, index) => {
          const originalIndex = index % demos.length;
          const isCompact = originalIndex % 3 === 1;

          return (
            <article
              key={`${demo.title}-${index}`}
              className={`shrink-0 overflow-hidden bg-white text-black shadow-[0_20px_55px_rgba(0,0,0,.16)] ${
                isCompact ? 'w-[72vw] sm:w-[330px]' : 'w-[86vw] sm:w-[540px]'
              }`}
              aria-hidden={index >= demos.length}
            >
              <div className="flex h-10 items-center gap-3 border-b border-black/10 bg-white px-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-black/15" />
                  <span className="h-2 w-2 rounded-full bg-black/15" />
                  <span className="h-2 w-2 rounded-full bg-black/15" />
                </div>
                <div className="truncate rounded-full bg-black/[.04] px-3 py-1 text-[9px] uppercase tracking-[.14em] text-black/40">
                  {demo.category}
                </div>
              </div>

              <img
                src={demo.image}
                alt={index < demos.length ? `${demo.title} sample website` : ''}
                className="aspect-[4/3] w-full object-cover"
                draggable={false}
              />

              <div className="p-6">
                <p className="text-[10px] font-medium uppercase tracking-[.22em] text-black/40">
                  {demo.category}
                </p>
                <h3 className="mt-3 text-2xl font-medium tracking-[-.025em] text-black">
                  {demo.title}
                </h3>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
