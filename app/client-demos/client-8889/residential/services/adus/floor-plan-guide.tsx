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

function IconHome() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/>
    </svg>
  );
}
function IconKey() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="4.5"/><path d="M21 2l-9.6 9.6M15.5 7.5l2 2"/>
    </svg>
  );
}
function IconDoor() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="1"/><circle cx="15" cy="12" r="1" fill="currentColor"/>
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
function IconCheck() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/>
    </svg>
  );
}
function IconBox() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M9 21V9"/>
    </svg>
  );
}

const TABS: Tab[] = [
  {
    id: 'detached',
    label: 'Detached ADU',
    heading: 'Explore Detached ADUs',
    subheading: 'Standalone structures purpose-built for rental income, multigenerational living, or a private retreat on your existing lot.',
    tagline: ['DETACHED', 'LIVING,', 'FULLY', 'INDEPENDENT'],
    features: [
      { Icon: IconHome,  label: 'Full Privacy',       sub: 'Standalone Unit' },
      { Icon: IconKey,   label: 'Rental Income',      sub: 'Ready' },
      { Icon: IconDoor,  label: 'Private Entry',      sub: 'Independent Access' },
    ],
    plans: [
      { sqft: '749 SQ FT',   name: 'The Compact Retreat',    desc: 'A well-proportioned detached ADU with an open living area, full kitchen, and private bedroom—ideal for rental or multigenerational use.',    src: `${BASE}/detached_adu/detached_adu_749_sq_ft.png`,   alt: 'Detached ADU 749 sq ft floor plan' },
      { sqft: '850 SQ FT',   name: 'The Garden Suite',       desc: 'A comfortable standalone unit featuring a spacious living-kitchen layout, dedicated bedroom, and full bath with generous natural light.',      src: `${BASE}/detached_adu/detached_adu_850_sq_ft.png`,   alt: 'Detached ADU 850 sq ft floor plan' },
      { sqft: '1,000 SQ FT', name: 'The Premier Detached',   desc: 'A generous freestanding ADU with an open living-dining area, full kitchen, primary bedroom, and ample storage—maximizes rental value.',        src: `${BASE}/detached_adu/detached_adu_1000_sq_ft.png`,  alt: 'Detached ADU 1,000 sq ft floor plan' },
    ],
  },
  {
    id: 'attached',
    label: 'Attached ADU',
    heading: 'Explore Attached ADUs',
    subheading: 'Additions connected to the main residence—cost-effective, code-compliant, and ideal for keeping family close while maintaining privacy.',
    tagline: ['CONNECTED', 'LIVING,', 'SEPARATE', 'SPACES'],
    features: [
      { Icon: IconLayers, label: 'Shared Wall',      sub: 'Efficient Build' },
      { Icon: IconCheck,  label: 'Cost Effective',   sub: 'Lower Site Work' },
      { Icon: IconDoor,   label: 'Private Entry',    sub: 'Separate Access' },
    ],
    plans: [
      { sqft: '500 SQ FT', name: 'The Studio Addition',    desc: 'A compact attached unit with an open studio layout, kitchenette, and full bath—efficient to permit and build alongside the existing structure.',   src: `${BASE}/attached_adu/attached_adu_500_sq_ft.png`, alt: 'Attached ADU 500 sq ft floor plan' },
      { sqft: '650 SQ FT', name: 'The One-Bedroom Annex',  desc: 'A well-proportioned attached ADU with a distinct bedroom, open living-kitchen, and private exterior entry that feels fully self-contained.',       src: `${BASE}/attached_adu/attached_adu_650_sq_ft.png`, alt: 'Attached ADU 650 sq ft floor plan' },
      { sqft: '800 SQ FT', name: 'The Family Suite',       desc: 'A spacious attached ADU with a full bedroom, generous living area, complete kitchen, and ample storage—ideal for long-term multigenerational living.', src: `${BASE}/attached_adu/attached_adu_800_sq_ft.png`, alt: 'Attached ADU 800 sq ft floor plan' },
    ],
  },
  {
    id: 'garage',
    label: 'Garage Conversion',
    heading: 'Explore Garage Conversions',
    subheading: 'Transform an underused garage into a fully permitted, habitable living space—no new footprint, faster approvals, and immediate value.',
    tagline: ['TRANSFORM', 'YOUR', 'GARAGE', 'INTO A', 'HOME'],
    features: [
      { Icon: IconBox,    label: 'No New Footprint', sub: 'Existing Structure' },
      { Icon: IconCheck,  label: 'Fast Permit',      sub: 'Streamlined Process' },
      { Icon: IconKey,    label: 'Income Potential', sub: 'Rental Ready' },
    ],
    plans: [
      { sqft: '400 SQ FT', name: 'The Studio Conversion',      desc: 'A fully permitted studio carved from a single-car garage—open living, kitchenette, and bath in an efficient, code-compliant footprint.',       src: `${BASE}/garage_conversion/garage_conversion_400_sq_ft.png`, alt: 'Garage Conversion 400 sq ft floor plan' },
      { sqft: '550 SQ FT', name: 'The One-Bedroom Conversion', desc: 'A comfortable one-bedroom ADU converted from a standard two-car garage with defined living zones and a private bath.',                          src: `${BASE}/garage_conversion/garage_conversion_550_sq_ft.png`, alt: 'Garage Conversion 550 sq ft floor plan' },
      { sqft: '700 SQ FT', name: 'The Expanded Conversion',    desc: 'A generous garage-to-ADU conversion with a full bedroom, open kitchen-living area, and dedicated storage—maximizes your existing square footage.', src: `${BASE}/garage_conversion/garage_conversion_700_sq_ft.png`, alt: 'Garage Conversion 700 sq ft floor plan' },
    ],
  },
];

const CSS = `
/* ── ADU Floor Plan Guide ── */
.afpg{
  --afpg-bg:#f3f0e9;
  --afpg-surface:#faf8f3;
  --afpg-line:#ddd5c4;
  --afpg-ink:#1a1814;
  --afpg-muted:#6b6358;
  --afpg-soft:#9a9188;
  --afpg-gold:#b3894f;
  width:100%;
  background:var(--afpg-bg);
  border-top:1px solid var(--afpg-line);
  border-bottom:1px solid var(--afpg-line);
  padding:clamp(40px,5vw,72px) clamp(24px,4vw,80px) clamp(32px,4vw,56px);
}
.afpg *{box-sizing:border-box}
.afpg-inner{max-width:1600px;margin:0 auto}

/* ── Section label row ── */
.afpg-label-row{display:flex;align-items:center;gap:14px;margin:0 0 clamp(20px,2.6vw,36px)}
.afpg-label-line{flex:none;width:36px;height:1px;background:var(--afpg-ink)}
.afpg-label-txt{font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;font-weight:600;color:var(--afpg-ink);margin:0}

/* ── Main 3-column grid ── */
.afpg-main{
  display:grid;
  grid-template-columns:26fr 48fr 26fr;
  gap:0;
  align-items:stretch;
}

/* ── LEFT PANEL ── */
.afpg-left{
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  padding-right:clamp(20px,2.4vw,36px);
  border-right:1px solid var(--afpg-line);
  min-height:620px;
}
.afpg-left-heading{
  font-size:clamp(26px,3vw,42px);
  line-height:1.04;
  font-weight:600;
  letter-spacing:-.02em;
  color:var(--afpg-ink);
  margin:0 0 16px;
}
.afpg-left-desc{
  font-size:13.5px;
  line-height:1.6;
  color:var(--afpg-muted);
  margin:0;
  max-width:30ch;
}
.afpg-left-divider{width:40px;height:1px;background:var(--afpg-line);margin:clamp(20px,2.4vw,32px) 0}
.afpg-tagline{display:flex;flex-direction:column;gap:1px}
.afpg-tagline span{font-size:10px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;color:var(--afpg-soft);line-height:1.5}

/* ── CENTER: dominant featured image ── */
.afpg-center{
  display:flex;
  align-items:stretch;
  padding:0 clamp(12px,1.6vw,24px);
}
.afpg-featured-wrap{
  width:100%;
  height:620px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:transparent;
  padding:0;
}
.afpg-featured-wrap img{
  max-width:100%;
  max-height:100%;
  width:100%;
  height:100%;
  object-fit:contain;
  display:block;
}

/* ── RIGHT PANEL ── */
.afpg-right{
  display:flex;
  flex-direction:column;
  padding-left:clamp(20px,2.4vw,36px);
  border-left:1px solid var(--afpg-line);
}

/* Tabs */
.afpg-tabs{
  display:flex;
  gap:0;
  border-bottom:1px solid var(--afpg-line);
  margin:0 0 clamp(16px,2vw,26px);
}
.afpg-tab{
  background:transparent;
  border:0;
  border-bottom:2px solid transparent;
  padding:10px 0;
  margin-right:clamp(12px,1.6vw,20px);
  margin-bottom:-1px;
  font-size:12.5px;
  font-weight:400;
  letter-spacing:.01em;
  color:var(--afpg-muted);
  cursor:pointer;
  transition:color .2s,border-color .2s;
  font-family:inherit;
  white-space:nowrap;
}
.afpg-tab:hover{color:var(--afpg-ink)}
.afpg-tab.is-active{color:var(--afpg-ink);border-bottom-color:var(--afpg-ink);font-weight:500}

/* Plan info */
.afpg-plan-eyebrow{
  font-size:10px;
  letter-spacing:.2em;
  text-transform:uppercase;
  font-weight:600;
  color:var(--afpg-soft);
  margin:0 0 8px;
  display:flex;
  align-items:center;
  gap:10px;
}
.afpg-plan-eyebrow::before{content:"";display:inline-block;width:20px;height:1px;background:var(--afpg-gold)}
.afpg-plan-sqft{
  font-size:clamp(17px,1.7vw,22px);
  font-weight:700;
  letter-spacing:.04em;
  color:var(--afpg-ink);
  margin:0 0 4px;
  text-transform:uppercase;
}
.afpg-plan-name{
  font-size:clamp(22px,2.2vw,32px);
  font-weight:600;
  line-height:1.08;
  letter-spacing:-.015em;
  color:var(--afpg-ink);
  margin:0 0 clamp(10px,1.2vw,16px);
}
.afpg-plan-rule{height:1px;background:var(--afpg-line);margin:0 0 clamp(10px,1.2vw,14px)}
.afpg-plan-desc{
  font-size:13px;
  line-height:1.65;
  color:var(--afpg-muted);
  margin:0 0 clamp(14px,1.8vw,22px);
}

/* Feature icons — horizontal 3-column */
.afpg-features{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:8px;
  padding:clamp(12px,1.6vw,18px) 0;
  border-top:1px solid var(--afpg-line);
  border-bottom:1px solid var(--afpg-line);
  margin:0 0 clamp(16px,2vw,24px);
}
.afpg-feature{
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:8px;
  text-align:center;
}
.afpg-feature-icon{
  width:40px;
  height:40px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:var(--afpg-ink);
  opacity:.8;
}
.afpg-feature-label{font-size:10px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;color:var(--afpg-ink);line-height:1.3}
.afpg-feature-sub{font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--afpg-soft);line-height:1.2;margin-top:-4px}

/* CTA button */
.afpg-cta-btn{
  display:flex;
  align-items:center;
  justify-content:space-between;
  background:var(--afpg-ink);
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
.afpg-cta-arrow{font-size:14px;opacity:.85}

/* ── Bottom plan cards — horizontal layout ── */
.afpg-cards{
  margin-top:clamp(20px,2.6vw,36px);
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:clamp(10px,1.2vw,16px);
}
.afpg-card{
  display:flex;
  flex-direction:row;
  background:var(--afpg-surface);
  border:1px solid var(--afpg-line);
  cursor:pointer;
  transition:border-color .18s;
  text-align:left;
  padding:0;
  font-family:inherit;
  overflow:hidden;
}
.afpg-card:hover{border-color:var(--afpg-gold)}
.afpg-card.is-active{border-color:var(--afpg-ink);box-shadow:0 0 0 1px var(--afpg-ink)}
.afpg-card-img{
  flex:none;
  width:clamp(120px,10vw,170px);
  background:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:10px;
  border-right:1px solid var(--afpg-line);
}
.afpg-card-img img{max-width:100%;max-height:140px;object-fit:contain;display:block}
.afpg-card-body{
  flex:1;
  padding:clamp(12px,1.2vw,18px) clamp(14px,1.4vw,20px);
  display:flex;
  flex-direction:column;
  justify-content:space-between;
}
.afpg-card-sqft{font-size:10px;letter-spacing:.18em;text-transform:uppercase;font-weight:700;color:var(--afpg-soft);margin:0 0 4px}
.afpg-card-name{font-size:clamp(12px,1vw,14px);font-weight:600;line-height:1.2;color:var(--afpg-ink);margin:0 0 6px}
.afpg-card-desc{font-size:11.5px;line-height:1.5;color:var(--afpg-muted);margin:0 0 10px;flex:1}
.afpg-card-cta{font-size:10px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;color:var(--afpg-ink);display:inline-flex;align-items:center;gap:6px}
.afpg-card.is-active .afpg-card-sqft{color:var(--afpg-gold)}

/* ── Responsive ── */
@media(max-width:1100px){
  .afpg-featured-wrap{height:480px}
  .afpg-left{min-height:480px}
}
@media(max-width:860px){
  .afpg-main{grid-template-columns:1fr 1fr;grid-template-rows:auto auto}
  .afpg-left{
    grid-column:1/3;
    flex-direction:row;
    align-items:flex-start;
    min-height:auto;
    border-right:0;
    border-bottom:1px solid var(--afpg-line);
    padding-right:0;
    padding-bottom:clamp(16px,2.4vw,24px);
    margin-bottom:clamp(16px,2.4vw,24px);
    gap:clamp(20px,3vw,40px);
  }
  .afpg-left-divider,.afpg-tagline{display:none}
  .afpg-center{grid-column:1;padding-left:0}
  .afpg-featured-wrap{height:380px}
  .afpg-right{grid-column:2;border-left:0;padding-left:clamp(14px,2vw,24px)}
}
@media(max-width:620px){
  .afpg-main{grid-template-columns:1fr}
  .afpg-left{grid-column:1;flex-direction:column;gap:0}
  .afpg-center{grid-column:1;padding:0}
  .afpg-featured-wrap{height:280px}
  .afpg-right{grid-column:1;border-left:0;padding-left:0;margin-top:clamp(14px,2vw,20px)}
  .afpg-cards{grid-template-columns:1fr}
  .afpg-card-img{width:100px}
  .afpg-tabs{overflow-x:auto;-webkit-overflow-scrolling:touch}
  .afpg-tab{font-size:12px;margin-right:10px}
}
`;

export default function FloorPlanGuide() {
  const [activeTab, setActiveTab] = useState(0);
  const [activePlan, setActivePlan] = useState(0);

  const tab = TABS[activeTab];
  const plan = tab.plans[activePlan];

  function handleTabChange(idx: number) {
    setActiveTab(idx);
    setActivePlan(0);
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section className="afpg" aria-label="ADU Floor Plan Guide">
      <div className="afpg-inner">

        {/* Section label */}
        <div className="afpg-label-row">
          <span className="afpg-label-line" aria-hidden="true" />
          <p className="afpg-label-txt">ADU Floor Plan Guide</p>
        </div>

        {/* 3-column main grid */}
        <div className="afpg-main">

          {/* LEFT: heading + description + tagline */}
          <div className="afpg-left">
            <div>
              <h2 className="afpg-left-heading">{tab.heading}</h2>
              <p className="afpg-left-desc">{tab.subheading}</p>
              <div className="afpg-left-divider" />
            </div>
            <div className="afpg-tagline" aria-hidden="true">
              {tab.tagline.map((w) => <span key={w}>{w}</span>)}
            </div>
          </div>

          {/* CENTER: dominant floor plan image */}
          <div className="afpg-center">
            <div className="afpg-featured-wrap">
              <img src={plan.src} alt={plan.alt} />
            </div>
          </div>

          {/* RIGHT: tabs + plan info + feature icons + CTA */}
          <div className="afpg-right">
            <div className="afpg-tabs" role="tablist">
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={activeTab === i}
                  className={`afpg-tab${activeTab === i ? ' is-active' : ''}`}
                  onClick={() => handleTabChange(i)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <p className="afpg-plan-eyebrow">Featured Plan</p>
            <p className="afpg-plan-sqft">{plan.sqft}</p>
            <h3 className="afpg-plan-name">{plan.name}</h3>
            <div className="afpg-plan-rule" />
            <p className="afpg-plan-desc">{plan.desc}</p>

            <div className="afpg-features">
              {tab.features.map((f) => (
                <div className="afpg-feature" key={f.label}>
                  <div className="afpg-feature-icon"><f.Icon /></div>
                  <span className="afpg-feature-label">{f.label}</span>
                  <span className="afpg-feature-sub">{f.sub}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Bottom: 3 horizontal plan cards */}
        <div className="afpg-cards">
          {tab.plans.map((p, i) => (
            <button
              key={p.sqft}
              className={`afpg-card${activePlan === i ? ' is-active' : ''}`}
              onClick={() => setActivePlan(i)}
              aria-pressed={activePlan === i}
            >
              <div className="afpg-card-img">
                <img src={p.src} alt={p.alt} loading="lazy" />
              </div>
              <div className="afpg-card-body">
                <div>
                  <p className="afpg-card-sqft">{p.sqft}</p>
                  <p className="afpg-card-name">{p.name}</p>
                  <p className="afpg-card-desc">{p.desc}</p>
                </div>
                <span className="afpg-card-cta">View Plan &nbsp;&#8594;</span>
              </div>
            </button>
          ))}
        </div>

      </div>{/* afpg-inner */}
      </section>
    </>
  );
}
