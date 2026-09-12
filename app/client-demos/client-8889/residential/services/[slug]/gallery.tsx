'use client';

import { useEffect, useMemo, useState } from 'react';
import type { GalleryShot } from '../services-data';

export default function Gallery({ shots }: { shots: GalleryShot[] }) {
  const filters = useMemo(() => {
    const cats: string[] = [];
    for (const s of shots) if (!cats.includes(s.cat)) cats.push(s.cat);
    return ['All', ...cats];
  }, [shots]);
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState<GalleryShot | null>(null);
  const visible = active === 'All' ? shots : shots.filter((s) => s.cat === active);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightbox]);

  return (
    <div>
      <div className="nrd-chips" role="tablist" aria-label="Gallery filters">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className={`nrd-chip${f === active ? ' is-active' : ''}`}
            aria-pressed={f === active}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="nrd-gallery">
        {visible.map((s) => (
          <figure className="nrd-shot" key={s.src} onClick={() => setLightbox(s)}>
            <div className="nrd-shot-img">
              <img src={s.src} alt={s.alt} loading="lazy" />
            </div>
            <figcaption className="nrd-shot-cap">
              <span>{s.label ?? s.cat}</span>
              <span className="nrd-shot-arrow" aria-hidden="true">↗</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {lightbox ? (
        <div className="nrd-lb" role="dialog" aria-modal="true" aria-label={lightbox.alt} onClick={() => setLightbox(null)}>
          <button type="button" className="nrd-lb-x" aria-label="Close" onClick={() => setLightbox(null)}>✕</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox.src} alt={lightbox.alt} onClick={(e) => e.stopPropagation()} />
        </div>
      ) : null}
    </div>
  );
}
