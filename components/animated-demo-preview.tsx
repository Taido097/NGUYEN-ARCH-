'use client';

import { ArrowUpRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

type Variant = 'photography' | 'auto' | 'salon' | 'restaurant';

type AnimatedDemoPreviewProps = {
  variant: Variant;
  name: string;
  image: string;
  href: string;
  isCenter: boolean;
  onComplete?: () => void;
};

const PAUSE_STYLE_ID = 'designedbytd-preview-pause';

function setEmbeddedPreviewPaused(frame: HTMLIFrameElement, paused: boolean) {
  try {
    const doc = frame.contentDocument;
    if (!doc) return;

    const existing = doc.getElementById(PAUSE_STYLE_ID);

    if (paused) {
      if (!existing) {
        const style = doc.createElement('style');
        style.id = PAUSE_STYLE_ID;
        style.textContent = `
          *, *::before, *::after {
            animation-play-state: paused !important;
          }
        `;
        doc.head?.appendChild(style);
      }

      doc.querySelectorAll('video').forEach((video) => video.pause());
      return;
    }

    existing?.remove();
    doc.querySelectorAll('video').forEach((video) => {
      void video.play().catch(() => undefined);
    });
  } catch {
    // Preview pages are same-origin, but fail safely if a browser restricts access.
  }
}

export function AnimatedDemoPreview({ name, href, isCenter, onComplete }: AnimatedDemoPreviewProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const rafRef = useRef<number>(0);
  const completedRef = useRef(false);
  const [inView, setInView] = useState(false);
  const running = isCenter && inView;

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.2),
      { threshold: [0, 0.2, 0.5] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const stopPreview = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
  }, []);

  const resetToTop = useCallback(() => {
    const frame = iframeRef.current;
    const win = frame?.contentWindow;
    const doc = frame?.contentDocument;
    if (!win || !doc) return;

    doc.documentElement.style.scrollBehavior = 'auto';
    if (doc.body) doc.body.style.scrollBehavior = 'auto';
    win.scrollTo(0, 0);
  }, []);

  const startPreview = useCallback(() => {
    stopPreview();

    const frame = iframeRef.current;
    const win = frame?.contentWindow;
    const doc = frame?.contentDocument;
    if (!frame || !win || !doc) return;

    doc.documentElement.style.scrollBehavior = 'auto';
    if (doc.body) doc.body.style.scrollBehavior = 'auto';
    setEmbeddedPreviewPaused(frame, !running);

    // Side cards stay paused at the top and do not run their embedded app JS.
    if (!running) {
      win.scrollTo(0, 0);
      return;
    }

    completedRef.current = false;
    win.scrollTo(0, 0);

    const holdAtTop = 100;
    const scrollDuration = 8200;
    const startedAt = performance.now();

    const fastSlowFast = (t: number) => {
      const shaped = t + (0.72 / (2 * Math.PI)) * Math.sin(2 * Math.PI * t);
      return Math.min(1, Math.max(0, shaped));
    };

    const getHalfPageTarget = () => {
      const maxScroll = Math.max(
        0,
        doc.documentElement.scrollHeight - win.innerHeight,
        doc.body ? doc.body.scrollHeight - win.innerHeight : 0,
      );
      return maxScroll * 0.5;
    };

    // Keep the scroll path responsive to late layout changes without forcing
    // a scrollHeight/layout read on every animation frame.
    let targetScroll = getHalfPageTarget();
    let targetReadAt = startedAt;

    const finish = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      win.scrollTo(0, getHalfPageTarget());
      onComplete?.();
    };

    const tick = (now: number) => {
      if (!running || iframeRef.current !== frame) return;

      const elapsed = now - startedAt;
      const scrollingFor = elapsed - holdAtTop;

      if (now - targetReadAt >= 500) {
        targetScroll = getHalfPageTarget();
        targetReadAt = now;
      }

      if (elapsed <= holdAtTop) {
        win.scrollTo(0, 0);
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (scrollingFor < scrollDuration) {
        const progress = Math.min(1, Math.max(0, scrollingFor / scrollDuration));
        win.scrollTo(0, targetScroll * fastSlowFast(progress));
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      finish();
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [onComplete, running, stopPreview]);

  useEffect(() => {
    const frame = iframeRef.current;

    if (!running) {
      completedRef.current = false;
      stopPreview();
      if (frame?.contentDocument?.readyState === 'complete') {
        resetToTop();
        setEmbeddedPreviewPaused(frame, true);
      }
      return;
    }

    if (frame?.contentDocument?.readyState === 'complete') {
      startPreview();
    }

    return stopPreview;
  }, [href, running, resetToTop, startPreview, stopPreview]);

  return (
    <div
      ref={rootRef}
      className={`demo-preview relative overflow-hidden border border-white/20 bg-[#111] shadow-[0_30px_80px_rgba(0,0,0,.42)] ${
        isCenter
          ? 'h-[300px] rounded-[1.35rem] sm:h-[350px] lg:h-[400px]'
          : 'h-[225px] rounded-[1.1rem] sm:h-[270px] lg:h-[310px]'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden bg-black">
        <iframe
          key={href}
          ref={iframeRef}
          src={href}
          title={`${name} live website preview`}
          onLoad={startPreview}
          tabIndex={-1}
          aria-hidden="true"
          loading="lazy"
          sandbox={isCenter ? undefined : 'allow-same-origin'}
          className="pointer-events-none absolute left-0 top-0 border-0 bg-black"
          style={{
            width: '200%',
            maxWidth: 'none',
            height: '200%',
            transform: 'scale(.5)',
            transformOrigin: 'top left',
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-white/10 bg-black/72 px-4 py-2.5 text-[8px] uppercase tracking-[.14em] text-white/65 backdrop-blur-md sm:px-5">
        <span>{name}</span>
        <span className="inline-flex items-center gap-1.5 text-white/85">
          {isCenter ? 'Real demo · auto scroll' : 'Real demo · paused'}
          <ArrowUpRight className="h-3 w-3" />
        </span>
      </div>
    </div>
  );
}