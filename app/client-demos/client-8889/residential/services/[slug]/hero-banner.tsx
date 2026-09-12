'use client';

import { useEffect, useRef } from 'react';

// Load-in animation copied from the NGUYEN Framer residential hero. The exact keyframes and
// timings were read from the residential page's Framer appear-animation JSON
// (__framer__appearAnimationsContent) and its component JS bundle, then applied here on load
// via the Web Animations API — the same mechanism Framer's "optimized appear animations" use
// (element.animate with fill:'both').
//
//   image   : clip-path inset(0% 0% 100% 0%) -> inset(0% 0% 0% 0%), opacity 0 -> 1
//             spring(stiffness 400, damping 80, mass 1) -> sampled to the linear() curve below
//   overlay : opacity 0.001 -> 1, spring(bounce .2, delay .5s, dur .4s) -> ease-out fade
//   rule L  : translateX(-600px) -> 0, opacity 0.001 -> 1, tween delay .3s dur 1s
//   rule R  : translateX( 600px) -> 0, opacity 0.001 -> 1, tween delay .3s dur 1s
//             both lines ease cubic-bezier(.44,0,.56,1)
// (image, title and caption text have no appear animation in the source, so they stay static)

// spring(stiffness 400, damping 80, mass 1) sampled to a linear() easing (overdamped, no bounce)
const IMG_SPRING =
  'linear(0,0.1956,0.3976,0.5496,0.6633,0.7484,0.8120,0.8597,0.8953,0.9219,0.9418,0.9568,0.9679,0.9762,0.9825,0.9872,0.9906,0.9933,0.9952,0.9967,0.9978,0.9986,0.9992,0.9997,1)';
const LINE_EASE = 'cubic-bezier(0.44, 0, 0.56, 1)';

export default function HeroBanner({
  hero,
  title,
  label,
  caption,
}: {
  hero: string;
  title: string;
  label: string;
  caption?: string[];
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const img = el.querySelector('img');
    const ov = el.querySelector<HTMLElement>('.nrd-banner-ov');
    const rl = el.querySelector<HTMLElement>('.nrd-rule-l');
    const rr = el.querySelector<HTMLElement>('.nrd-rule-r');

    let started = false;
    const play = () => {
      if (started) return;
      started = true;
      // Once we drive the animation ourselves, drop the CSS-fallback keyframes so they can't
      // double up with the WAAPI animations.
      el.classList.remove('nrd-anim');

      if (typeof el.animate !== 'function') {
        // No Web Animations API — reveal everything immediately.
        if (img) { img.style.clipPath = 'inset(0% 0% 0% 0%)'; img.style.opacity = '1'; }
        if (ov) ov.style.opacity = '1';
        if (rl) { rl.style.transform = 'translateX(0)'; rl.style.opacity = '1'; }
        if (rr) { rr.style.transform = 'translateX(0)'; rr.style.opacity = '1'; }
        return;
      }

      img?.animate(
        [
          { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 },
          { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 },
        ],
        { duration: 1300, easing: IMG_SPRING, fill: 'both' },
      );
      ov?.animate(
        [{ opacity: 0.001 }, { opacity: 1 }],
        { duration: 400, delay: 500, easing: 'ease-out', fill: 'both' },
      );
      rl?.animate(
        [
          { transform: 'translateX(-600px)', opacity: 0.001 },
          { transform: 'translateX(0px)', opacity: 1 },
        ],
        { duration: 1000, delay: 300, easing: LINE_EASE, fill: 'both' },
      );
      rr?.animate(
        [
          { transform: 'translateX(600px)', opacity: 0.001 },
          { transform: 'translateX(0px)', opacity: 1 },
        ],
        { duration: 1000, delay: 300, easing: LINE_EASE, fill: 'both' },
      );
    };

    // The hero sits above the fold, so it is effectively in view on load; fire when it
    // intersects, with a timeout fallback in case IntersectionObserver never fires.
    const fallback = window.setTimeout(play, 400);
    if (typeof IntersectionObserver === 'undefined') {
      play();
      window.clearTimeout(fallback);
      return () => window.clearTimeout(fallback);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            play();
            io.disconnect();
            window.clearTimeout(fallback);
          }
        }
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <section className="nrd-banner nrd-anim" ref={ref}>
      <img src={hero} alt={title} />
      <div className="nrd-banner-ov" aria-hidden="true" />
      <div className="nrd-banner-inner">
        <h1 className="nrd-banner-h1">{label}</h1>
        <div className="nrd-banner-rule" aria-hidden="true">
          <span className="nrd-rule-h nrd-rule-l" />
          <span className="nrd-rule-h nrd-rule-r" />
        </div>
        {caption ? (
          <div className="nrd-banner-cap">
            {caption.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
