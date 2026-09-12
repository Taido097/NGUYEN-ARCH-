'use client';
import React, { useState } from 'react';

const BASE = '/client-8889/residential/floor-plans';

type Plan = {
  sqft: string;
  name: string;
  desc: string;
  src: string;
  alt: string;
};

type Tab = {
  id: string;
  label: string;
  heading: string;
  subheading: string;
  tagline: string[];
  features: { Icon: () => React.ReactElement; label: string; sub: string }[];
  plans: Plan[];
};

function IconFlow() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M3 12h18M3 18h18"/>
    </svg>
  );
}
function IconGrid() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  );
}
function IconLeaf() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6 2 2 8 2 14c0 4 2 7 6 9 0-6 2-10 4-12 2 2 4 6 4 12 4-2 6-5 6-9 0-6-4-12-10-12z"/>
    </svg>
  );
}
function IconPulse() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  );
}
function IconLayers() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  );
}
function IconBuilding() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="1"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
    </svg>
  );
}

const TABS: Tab[] = [
  {
    id: 'retail',
    label: 'Retail',
    heading: 'Explore Retail Spaces',
    subheading: 'Layouts crafted for customer flow, curated display, and high-impact brand presence.',
    tagline: ['DESIGNED', 'FOR', 'COMMERCE,', 'BUILT', 'FOR', 'PEOPLE'],
    features: [
      { Icon: IconFlow,     label: 'Customer Flow',    sub: 'Optimization' },
      { Icon: IconGrid,     label: 'Display Zone',     sub: 'Flexibility' },
      { Icon: IconPulse,    label: 'Back-of-House',    sub: 'Efficiency' },
    ],
    plans: [
      { sqft: '1,200 SQ FT', name: 'The Boutique Storefront', desc: 'An intimate retail layout optimized for curated product display and personalized customer engagement.',          src: `${BASE}/retail/retail_size_1.png`, alt: 'Retail boutique storefront 1,200 sq ft floor plan' },
      { sqft: '2,500 SQ FT', name: 'The Mid-Size Retail',     desc: 'A flexible floor plan with dedicated display zones, fitting rooms, and a welcoming entry sequence.',           src: `${BASE}/retail/retail_size_2.png`, alt: 'Retail mid-size 2,500 sq ft floor plan' },
      { sqft: '4,000 SQ FT', name: 'The Flagship Store',      desc: 'A spacious retail environment with multiple display zones, a private consultation area, and a statement entrance.', src: `${BASE}/retail/retail_size_3.png`, alt: 'Retail flagship store 4,000 sq ft floor plan' },
    ],
  },
  {
    id: 'office',
    label: 'Office',
    heading: 'Explore Office Spaces',
    subheading: 'Professional environments designed for focus, collaboration, and organizational identity.',
    tagline: ['SPACES', 'THAT', 'INSPIRE', 'PEOPLE', 'TO DO', 'GREAT WORK'],
    features: [
      { Icon: IconGrid,     label: 'Collaborative',    sub: 'Zones' },
      { Icon: IconLayers,   label: 'Private Focus',    sub: 'Areas' },
      { Icon: IconBuilding, label: 'Conference',       sub: 'Facilities' },
    ],
    plans: [
      { sqft: '1,400 SQ FT', name: 'The Studio Suite',      desc: 'A compact, collaborative workspace with private focus areas, open work zones, and a welcoming reception.',           src: `${BASE}/office/office_size_1.png`, alt: 'Office studio suite 1,400 sq ft floor plan' },
      { sqft: '2,800 SQ FT', name: 'The Professional Office', desc: 'A balanced floor plan with private offices, open collaboration areas, and a dedicated conference room.',            src: `${BASE}/office/office_size_2.png`, alt: 'Office professional 2,800 sq ft floor plan' },
      { sqft: '4,500 SQ FT', name: 'The Corporate Floor',    desc: 'A comprehensive office suite with executive offices, large conference facilities, and expansive collaborative zones.', src: `${BASE}/office/office_size_3.png`, alt: 'Office corporate floor 4,500 sq ft floor plan' },
    ],
  },
  {
    id: 'restaurant',
    label: 'Restaurant / Café',
    heading: 'Explore Restaurant & Café Spaces',
    subheading: 'Layouts crafted for hospitality, service flow, and memorable guest experiences.',
    tagline: ['GOOD', 'FOOD', 'BUILDS', 'BRIGHTER', 'TOMORROWS'],
    features: [
      { Icon: IconFlow,  label: 'Seamless',         sub: 'Service Flow' },
      { Icon: IconGrid,  label: 'Flexible',         sub: 'Seating Zones' },
      { Icon: IconLeaf,  label: 'Indoor / Outdoor', sub: 'Experience' },
    ],
    plans: [
      { sqft: '1,600 SQ FT', name: 'The Neighborhood Café',       desc: 'A compact, efficient layout perfect for boutique cafés, with inviting seating and a streamlined service counter.',                                        src: `${BASE}/restaurant_cafe/restaurant_cafe_size_1.png`, alt: 'Restaurant neighborhood café 1,600 sq ft floor plan' },
      { sqft: '2,400 SQ FT', name: 'The Modern Bistro',           desc: 'A versatile layout with a spacious dining room, central bar, and open kitchen concept.',                                                                   src: `${BASE}/restaurant_cafe/restaurant_cafe_size_2.png`, alt: 'Restaurant modern bistro 2,400 sq ft floor plan' },
      { sqft: '3,200 SQ FT', name: 'The Signature Hospitality Plan', desc: 'A refined layout designed for modern dining, with an efficient service flow, a welcoming atmosphere, and seamless indoor-outdoor connection.',          src: `${BASE}/restaurant_cafe/restaurant_cafe_size_3.png`, alt: 'Restaurant signature hospitality 3,200 sq ft floor plan' },
    ],
  },
];

const CSS = `
/* ── Commercial Floor Plan Guide ── */
.cfpg{
  --cfpg-bg:#f3f0e9;
  --cfpg-surface:#faf8f3;
  --cfpg-line:#ddd5c4;
  --cfpg-ink:#1a1814;
  --cfpg-muted:#6b6358;
  --cfpg-soft:#9a9188;
  --cfpg-gold:#b3894f;
  width:100%;
  background:var(--cfpg-bg);
  border-top:1px solid var(--cfpg-line);
  border-bottom:1px solid var(--cfpg-line);
  padding:clamp(40px,5vw,72px) clamp(24px,4vw,80px) clamp(32px,4vw,56px);
}
.cfpg *{box-sizing:border-box}
.cfpg-inner{max-width:1600px;margin:0 auto}

/* ── Section label row (top of section) ── */
.cfpg-label-row{display:flex;align-items:center;gap:14px;margin:0 0 clamp(20px,2.6vw,36px)}
.cfpg-label-line{flex:none;width:36px;height:1px;background:var(--cfpg-ink)}
.cfpg-label-txt{font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;font-weight:600;color:var(--cfpg-ink);margin:0}

/* ── Main 3-column grid ── */
.cfpg-main{
  display:grid;
  grid-template-columns:26fr 48fr 26fr;
  gap:0;
  align-items:stretch;
}

/* ── LEFT PANEL ── */
.cfpg-left{
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  padding-right:clamp(20px,2.4vw,36px);
  border-right:1px solid var(--cfpg-line);
  min-height:620px;
}
.cfpg-left-heading{
  font-size:clamp(26px,3vw,42px);
  line-height:1.04;
  font-weight:600;
  letter-spacing:-.02em;
  color:var(--cfpg-ink);
  margin:0 0 16px;
}
.cfpg-left-desc{
  font-size:13.5px;
  line-height:1.6;
  color:var(--cfpg-muted);
  margin:0;
  max-width:30ch;
}
.cfpg-left-divider{width:40px;height:1px;background:var(--cfpg-line);margin:clamp(20px,2.4vw,32px) 0}
.cfpg-tagline{display:flex;flex-direction:column;gap:1px}
.cfpg-tagline span{font-size:10px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;color:var(--cfpg-soft);line-height:1.5}

/* ── CENTER: dominant featured image ── */
.cfpg-center{
  display:flex;
  align-items:stretch;
  padding:0 clamp(12px,1.6vw,24px);
}
.cfpg-featured-wrap{
  width:100%;
  height:620px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:transparent;
  padding:0;
}
.cfpg-featured-wrap img{
  max-width:100%;
  max-height:100%;
  width:100%;
  height:100%;
  object-fit:contain;
  display:block;
}

/* ── RIGHT PANEL ── */
.cfpg-right{
  display:flex;
  flex-direction:column;
  padding-left:clamp(20px,2.4vw,36px);
  border-left:1px solid var(--cfpg-line);
}

/* Tabs */
.cfpg-tabs{
  display:flex;
  gap:0;
  border-bottom:1px solid var(--cfpg-line);
  margin:0 0 clamp(16px,2vw,26px);
}
.cfpg-tab{
  background:transparent;
  border:0;
  border-bottom:2px solid transparent;
  padding:10px 0;
  margin-right:clamp(14px,1.8vw,24px);
  margin-bottom:-1px;
  font-size:13px;
  font-weight:400;
  letter-spacing:.01em;
  color:var(--cfpg-muted);
  cursor:pointer;
  transition:color .2s,border-color .2s;
  font-family:inherit;
  white-space:nowrap;
}
.cfpg-tab:hover{color:var(--cfpg-ink)}
.cfpg-tab.is-active{color:var(--cfpg-ink);border-bottom-color:var(--cfpg-ink);font-weight:500}

/* Plan info */
.cfpg-plan-eyebrow{
  font-size:10px;
  letter-spacing:.2em;
  text-transform:uppercase;
  font-weight:600;
  color:var(--cfpg-soft);
  margin:0 0 8px;
  display:flex;
  align-items:center;
  gap:10px;
}
.cfpg-plan-eyebrow::before{content:"";display:inline-block;width:20px;height:1px;background:var(--cfpg-gold)}
.cfpg-plan-sqft{
  font-size:clamp(17px,1.7vw,22px);
  font-weight:700;
  letter-spacing:.04em;
  color:var(--cfpg-ink);
  margin:0 0 4px;
  text-transform:uppercase;
}
.cfpg-plan-name{
  font-size:clamp(22px,2.2vw,32px);
  font-weight:600;
  line-height:1.08;
  letter-spacing:-.015em;
  color:var(--cfpg-ink);
  margin:0 0 clamp(10px,1.2vw,16px);
}
.cfpg-plan-rule{height:1px;background:var(--cfpg-line);margin:0 0 clamp(10px,1.2vw,14px)}
.cfpg-plan-desc{
  font-size:13px;
  line-height:1.65;
  color:var(--cfpg-muted);
  margin:0 0 clamp(14px,1.8vw,22px);
}

/* Feature icons — horizontal 3-column, matching reference */
.cfpg-features{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:8px;
  padding:clamp(12px,1.6vw,18px) 0;
  border-top:1px solid var(--cfpg-line);
  border-bottom:1px solid var(--cfpg-line);
  margin:0 0 clamp(16px,2vw,24px);
}
.cfpg-feature{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:8px;
  text-align:center;
}
.cfpg-feature-icon{
  width:40px;
  height:40px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:var(--cfpg-ink);
  opacity:.8;
}
.cfpg-feature-label{font-size:10px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;color:var(--cfpg-ink);line-height:1.3}
.cfpg-feature-sub{font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--cfpg-soft);line-height:1.2;margin-top:-4px}

/* CTA button */
.cfpg-cta-btn{
  display:flex;
  align-items:center;
  justify-content:space-between;
  background:var(--cfpg-ink);
  color:#f5f2eb;
  padding:15px 20px;
  font-size:11.5px;
  letter-spacing:.1em;
  text-transform:uppercase;
  font-weight:600;
  font-family:inherit;
  border:0;
  cursor:default;
  width:100%;
}
.cfpg-cta-arrow{font-size:14px;opacity:.85}

/* ── Bottom plan cards — horizontal layout (image left, text right) ── */
.cfpg-cards{
  margin-top:clamp(20px,2.6vw,36px);
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:clamp(10px,1.2vw,16px);
}
.cfpg-card{
  display:flex;
  flex-direction:row;
  background:var(--cfpg-surface);
  border:1px solid var(--cfpg-line);
  cursor:pointer;
  transition:border-color .18s;
  text-align:left;
  padding:0;
  font-family:inherit;
  overflow:hidden;
}
.cfpg-card:hover{border-color:var(--cfpg-gold)}
.cfpg-card.is-active{border-color:var(--cfpg-ink);box-shadow:0 0 0 1px var(--cfpg-ink)}
.cfpg-card-img{
  flex:none;
  width:clamp(120px,10vw,170px);
  background:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:10px;
  border-right:1px solid var(--cfpg-line);
}
.cfpg-card-img img{max-width:100%;max-height:140px;object-fit:contain;display:block}
.cfpg-card-body{
  flex:1;
  padding:clamp(12px,1.2vw,18px) clamp(14px,1.4vw,20px);
  display:flex;
  flex-direction:column;
  justify-content:space-between;
}
.cfpg-card-sqft{font-size:10px;letter-spacing:.18em;text-transform:uppercase;font-weight:700;color:var(--cfpg-soft);margin:0 0 4px}
.cfpg-card-name{font-size:clamp(12px,1vw,14px);font-weight:600;line-height:1.2;color:var(--cfpg-ink);margin:0 0 6px}
.cfpg-card-desc{font-size:11.5px;line-height:1.5;color:var(--cfpg-muted);margin:0 0 10px;flex:1}
.cfpg-card-cta{font-size:10px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;color:var(--cfpg-ink);display:inline-flex;align-items:center;gap:6px}
.cfpg-card.is-active .cfpg-card-sqft{color:var(--cfpg-gold)}

/* ── Responsive ── */
@media(max-width:1100px){
  .cfpg-featured-wrap{height:480px}
  .cfpg-left{min-height:480px}
}
@media(max-width:860px){
  .cfpg-main{grid-template-columns:1fr 1fr;grid-template-rows:auto auto}
  .cfpg-left{
    grid-column:1/3;
    flex-direction:row;
    align-items:flex-start;
    min-height:auto;
    border-right:0;
    border-bottom:1px solid var(--cfpg-line);
    padding-right:0;
    padding-bottom:clamp(16px,2.4vw,24px);
    margin-bottom:clamp(16px,2.4vw,24px);
    gap:clamp(20px,3vw,40px);
  }
  .cfpg-left-divider,.cfpg-tagline{display:none}
  .cfpg-center{grid-column:1;padding-left:0}
  .cfpg-featured-wrap{height:380px}
  .cfpg-right{grid-column:2;border-left:0;padding-left:clamp(14px,2vw,24px)}
}
@media(max-width:620px){
  .cfpg-main{grid-template-columns:1fr}
  .cfpg-left{grid-column:1;flex-direction:column;gap:0}
  .cfpg-center{grid-column:1;padding:0}
  .cfpg-featured-wrap{height:280px}
  .cfpg-right{grid-column:1;border-left:0;padding-left:0;margin-top:clamp(14px,2vw,20px)}
  .cfpg-cards{grid-template-columns:1fr}
  .cfpg-card-img{width:100px}
  .cfpg-tabs{overflow-x:auto;-webkit-overflow-scrolling:touch}
  .cfpg-tab{font-size:12px;margin-right:12px}
}
`;

export default function CommercialFloorPlanGuide() {
  const [activeTab, setActiveTab] = useState(2); // default: Restaurant / Café
  const [activePlan, setActivePlan] = useState(2); // default: largest plan

  const tab = TABS[activeTab];
  const plan = tab.plans[activePlan];

  function handleTabChange(idx: number) {
    setActiveTab(idx);
    setActivePlan(2);
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section id="commercial-floor-plans" className="cfpg" aria-label="Commercial Floor Plan Guide">
      <div className="cfpg-inner">

        {/* Section label */}
        <div className="cfpg-label-row">
          <span className="cfpg-label-line" aria-hidden="true" />
          <p className="cfpg-label-txt">Commercial Floor Plan Guide</p>
        </div>

        {/* 3-column main grid */}
        <div className="cfpg-main">

          {/* LEFT: heading + description + tagline */}
          <div className="cfpg-left">
            <div>
              <h2 className="cfpg-left-heading">{tab.heading}</h2>
              <p className="cfpg-left-desc">{tab.subheading}</p>
              <div className="cfpg-left-divider" />
            </div>
            <div className="cfpg-tagline" aria-hidden="true">
              {tab.tagline.map((w) => <span key={w}>{w}</span>)}
            </div>
          </div>

          {/* CENTER: dominant floor plan image */}
          <div className="cfpg-center">
            <div className="cfpg-featured-wrap">
              <img src={plan.src} alt={plan.alt} />
            </div>
          </div>

          {/* RIGHT: tabs + plan info + feature icons + CTA */}
          <div className="cfpg-right">
            <div className="cfpg-tabs" role="tablist">
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={activeTab === i}
                  className={`cfpg-tab${activeTab === i ? ' is-active' : ''}`}
                  onClick={() => handleTabChange(i)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <p className="cfpg-plan-eyebrow">Featured Plan</p>
            <p className="cfpg-plan-sqft">{plan.sqft}</p>
            <h3 className="cfpg-plan-name">{plan.name}</h3>
            <div className="cfpg-plan-rule" />
            <p className="cfpg-plan-desc">{plan.desc}</p>

            <div className="cfpg-features">
              {tab.features.map((f) => (
                <div className="cfpg-feature" key={f.label}>
                  <div className="cfpg-feature-icon"><f.Icon /></div>
                  <span className="cfpg-feature-label">{f.label}</span>
                  <span className="cfpg-feature-sub">{f.sub}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Bottom: 3 horizontal plan cards */}
        <div className="cfpg-cards">
          {tab.plans.map((p, i) => (
            <button
              key={p.sqft}
              className={`cfpg-card${activePlan === i ? ' is-active' : ''}`}
              onClick={() => setActivePlan(i)}
              aria-pressed={activePlan === i}
            >
              <div className="cfpg-card-img">
                <img src={p.src} alt={p.alt} loading="lazy" />
              </div>
              <div className="cfpg-card-body">
                <div>
                  <p className="cfpg-card-sqft">{p.sqft}</p>
                  <p className="cfpg-card-name">{p.name}</p>
                  <p className="cfpg-card-desc">{p.desc}</p>
                </div>
                <span className="cfpg-card-cta">View Plan &nbsp;&#8594;</span>
              </div>
            </button>
          ))}
        </div>

      </div>{/* cfpg-inner */}
      </section>
    </>
  );
}
