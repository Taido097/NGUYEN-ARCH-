import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check, ArrowRight } from 'lucide-react';
import Navbar from '../../navbar';

const CONTACT = '/client-demos/client-8889/residential/contact';
const ENG_HREF = '/client-demos/client-8889/residential/services/engineering-approvals';
const RESIDENTIAL_HREF = '/client-demos/client-8889/residential';
const HOME_HREF = '/client-demos/client-8889/arcsphere-socal';
const D = '/client-8889/residential/detail';

type EngService = {
  label: string;
  title: string;
  subtitle: string;
  img: string;
  overview: string[];
  provide: string[];
  projects: string[];
  deliverables: string[];
  ctaHeadline: string;
  ctaBody: string;
  ctaButton: string;
};

const SERVICES: Record<string, EngService> = {
  'structural-engineering': {
    label: 'ENGINEERING SERVICE 01',
    title: 'Structural Engineering',
    subtitle: 'Safe, efficient structural systems designed around your building and project goals.',
    img: `${D}/eng-svc-01-structural.png`,
    overview: [
      'Our structural engineering services support residential and commercial construction from early design through permit approval. We develop practical structural systems that provide strength, stability, and code compliance while coordinating closely with the architectural design.',
      'Our project documentation includes foundation plans, floor and roof framing plans, structural details, seismic requirements, equipment anchorage, and special-inspection coordination.',
    ],
    provide: [
      'Structural analysis and calculations',
      'Foundation and footing design',
      'Floor and roof framing plans',
      'Beam, header, post, and connection design',
      'Shear-wall and lateral-force-resisting systems',
      'Seismic design and structural anchorage',
      'Structural evaluation for remodels and additions',
      'Structural details and construction notes',
      'Coordination with architectural and building systems',
      'Responses to structural plan-check comments',
    ],
    projects: [
      'Custom homes',
      'Home additions and remodels',
      'Accessory dwelling units',
      'Multi-family residential projects',
      'Retail tenant improvements',
      'Restaurants and coffee shops',
      'Commercial renovations',
      'Interior wall removal and open-layout conversions',
    ],
    deliverables: [
      'Structural drawings',
      'Foundation plans',
      'Framing plans',
      'Structural details',
      'Engineering calculations',
      'Construction notes',
      'Plan-check response revisions',
    ],
    ctaHeadline: 'Build With Confidence',
    ctaBody: 'Tell us about your project, and we\'ll help develop a safe and practical structural solution.',
    ctaButton: 'Discuss Your Structural Project',
  },
  'electrical-engineering': {
    label: 'ENGINEERING SERVICE 02',
    title: 'Electrical Engineering',
    subtitle: 'Coordinated power and lighting systems designed for safety, performance, and code compliance.',
    img: `${D}/eng-svc-02-electrical.png`,
    overview: [
      'Our electrical engineering services provide clear, coordinated electrical plans for residential and commercial projects. We design systems around the building layout, equipment requirements, occupant needs, and current applicable California and local codes.',
      'Our commercial documentation includes electrical scope drawings, single-line diagrams, power plans, lighting plans, panel coordination, and lighting compliance documentation.',
    ],
    provide: [
      'Electrical power plans',
      'Interior and exterior lighting plans',
      'Receptacle and equipment layouts',
      'Circuiting and panel coordination',
      'Electrical load calculations',
      'Single-line diagrams',
      'Service and panel planning',
      'Lighting controls',
      'Emergency and exit-lighting coordination',
      'Equipment power connections',
      'Grounding and GFCI requirements',
      'Title 24 lighting coordination',
      'Responses to electrical plan-check comments',
    ],
    projects: [
      'New residential construction',
      'Home additions and remodels',
      'Accessory dwelling units',
      'Retail stores',
      'Restaurants and coffee shops',
      'Offices',
      'Commercial tenant improvements',
      'Equipment and service upgrades',
    ],
    deliverables: [
      'Electrical floor plans',
      'Power plans',
      'Lighting plans',
      'Single-line diagrams',
      'Panel and load information',
      'Electrical notes and schedules',
      'Title 24 coordination',
      'Plan-check response revisions',
    ],
    ctaHeadline: 'Power Your Project Properly',
    ctaBody: 'We\'ll develop an electrical system that supports your space, equipment, lighting, and long-term needs.',
    ctaButton: 'Discuss Your Electrical Project',
  },
  'mechanical-hvac-engineering': {
    label: 'ENGINEERING SERVICE 03',
    title: 'Mechanical / HVAC Engineering',
    subtitle: 'Efficient heating, cooling, and ventilation systems designed for dependable indoor comfort.',
    img: `${D}/eng-svc-03-mechanical-hvac.png`,
    overview: [
      'Our mechanical and HVAC engineering services help create comfortable, properly ventilated, and energy-efficient buildings. Each system is coordinated with the architectural layout, ceiling design, electrical requirements, plumbing systems, and applicable energy standards.',
      'Our plans address air-conditioning equipment, ventilation, exhaust, ceiling layouts, equipment anchorage, and energy-code requirements.',
    ],
    provide: [
      'Heating and cooling system planning',
      'HVAC equipment selection and placement',
      'Supply- and return-air layouts',
      'Ductwork routing and sizing',
      'Ventilation and exhaust planning',
      'Bathroom and kitchen exhaust coordination',
      'Diffuser, grille, and register layouts',
      'Mechanical equipment schedules',
      'Equipment anchorage requirements',
      'HVAC controls coordination',
      'Energy-code coordination',
      'Responses to mechanical plan-check comments',
    ],
    projects: [
      'Custom homes',
      'Residential additions and remodels',
      'Accessory dwelling units',
      'Retail stores',
      'Offices',
      'Restaurants and coffee shops',
      'Commercial tenant improvements',
      'Existing HVAC system modifications',
    ],
    deliverables: [
      'Mechanical floor plans',
      'HVAC equipment layouts',
      'Duct and air-distribution plans',
      'Ventilation and exhaust plans',
      'Equipment schedules',
      'Mechanical notes and details',
      'Energy-compliance coordination',
      'Plan-check response revisions',
    ],
    ctaHeadline: 'Create a More Comfortable Space',
    ctaBody: 'Let us design an HVAC system that supports comfort, airflow, efficiency, and the needs of your building.',
    ctaButton: 'Discuss Your HVAC Project',
  },
  'plumbing-engineering': {
    label: 'ENGINEERING SERVICE 04',
    title: 'Plumbing Engineering',
    subtitle: 'Reliable water, waste, vent, and gas systems coordinated for efficient building performance.',
    img: `${D}/eng-svc-04-plumbing.png`,
    overview: [
      'Our plumbing engineering services provide coordinated systems for water delivery, drainage, waste, venting, gas, fixtures, and project-specific equipment. We develop practical layouts that work with the architectural design and other engineering disciplines.',
      'Our commercial documentation includes plumbing general notes, floor plans, isometric riser diagrams, fixture connections, and equipment coordination.',
    ],
    provide: [
      'Domestic hot- and cold-water systems',
      'Sanitary waste and vent systems',
      'Natural-gas piping layouts',
      'Plumbing fixture coordination',
      'Water-heater planning',
      'Floor drains and floor sinks',
      'Plumbing equipment connections',
      'Restaurant and food-service plumbing coordination',
      'Isometric riser diagrams',
      'Water-saving fixture requirements',
      'Plumbing details and schedules',
      'Responses to plumbing plan-check comments',
    ],
    projects: [
      'Custom homes',
      'Residential additions and remodels',
      'Accessory dwelling units',
      'Multi-family buildings',
      'Retail stores',
      'Restaurants and coffee shops',
      'Offices',
      'Commercial tenant improvements',
    ],
    deliverables: [
      'Plumbing floor plans',
      'Water-distribution plans',
      'Waste and vent plans',
      'Gas-piping plans',
      'Isometric riser diagrams',
      'Fixture and equipment schedules',
      'Plumbing notes and details',
      'Plan-check response revisions',
    ],
    ctaHeadline: 'Plan Every Connection',
    ctaBody: 'We\'ll coordinate a dependable plumbing system around your building layout, fixtures, and equipment requirements.',
    ctaButton: 'Discuss Your Plumbing Project',
  },
  'energy-title-24': {
    label: 'ENGINEERING SERVICE 05',
    title: 'Energy & Title 24',
    subtitle: 'California energy-compliance documentation that supports efficient and permit-ready design.',
    img: `${D}/eng-svc-05-energy-title24.png`,
    overview: [
      'Our Energy and Title 24 services help residential and commercial projects meet current applicable California energy-efficiency requirements. We coordinate energy documentation with the building envelope, lighting, HVAC equipment, controls, and water-heating systems.',
      'Our project files include Title 24 sheets, compliance forms, lighting documentation, energy-efficiency requirements, and coordination with residential and commercial building systems.',
    ],
    provide: [
      'Residential Title 24 documentation',
      'Nonresidential Title 24 documentation',
      'Building-envelope energy analysis',
      'Insulation and glazing coordination',
      'HVAC efficiency coordination',
      'Indoor and outdoor lighting compliance',
      'Lighting-power and control documentation',
      'Water-heating system coordination',
      'Energy-compliance forms',
      'Coordination with architectural and engineering plans',
      'Responses to energy plan-check comments',
      'Updated compliance documents when designs change',
    ],
    projects: [
      'New custom homes',
      'Residential additions',
      'Major remodels',
      'Accessory dwelling units',
      'Retail stores',
      'Offices',
      'Restaurants and coffee shops',
      'Commercial tenant improvements',
    ],
    deliverables: [
      'Title 24 compliance forms',
      'Energy calculations',
      'Required energy notes',
      'Lighting compliance documentation',
      'Building-envelope specifications',
      'Mechanical-system coordination',
      'Plan-check response revisions',
    ],
    ctaHeadline: 'Make Your Project Energy Compliant',
    ctaBody: 'We\'ll coordinate the required energy documentation with your building design and permit package.',
    ctaButton: 'Discuss Title 24',
  },
  'fire-life-safety': {
    label: 'ENGINEERING SERVICE 06',
    title: 'Fire & Life Safety',
    subtitle: 'Code-focused planning that supports safe occupancy, emergency access, and compliant exit systems.',
    img: `${D}/eng-svc-06-fire-life-safety.png`,
    overview: [
      'Our fire and life-safety coordination helps projects meet current applicable requirements for occupancy, exits, emergency movement, fire protection, and rated construction. The goal is to identify life-safety requirements early and coordinate them clearly throughout the drawing set.',
      'Our commercial plans address occupancy-load calculations, exit requirements, maximum travel distances, paths of egress, fire-code notes, fire extinguishers, emergency systems, rated walls, and fire-sprinkler coordination.',
    ],
    provide: [
      'Occupancy classification and load analysis',
      'Number and location of required exits',
      'Exit-access and egress-route planning',
      'Maximum travel-distance review',
      'Exit signage and emergency-lighting coordination',
      'Fire-extinguisher locations',
      'Fire-alarm coordination',
      'Fire-sprinkler coordination',
      'Fire-rated wall and assembly requirements',
      'Protection of system penetrations',
      'Life-safety notes and diagrams',
      'Responses to fire and building plan-check comments',
    ],
    projects: [
      'Retail stores',
      'Restaurants and coffee shops',
      'Offices',
      'Commercial tenant improvements',
      'Multi-family residential projects',
      'New residential construction',
      'Remodels affecting exits or occupancy',
      'Projects requiring rated construction',
    ],
    deliverables: [
      'Life-safety plans',
      'Occupancy-load calculations',
      'Egress and exit diagrams',
      'Travel-distance information',
      'Fire-protection coordination notes',
      'Rated-assembly details',
      'Emergency-lighting coordination',
      'Plan-check response revisions',
    ],
    ctaHeadline: 'Design With Safety in Mind',
    ctaBody: 'We\'ll help coordinate the life-safety requirements needed for a safe, clear, and permit-ready design.',
    ctaButton: 'Discuss Life Safety',
  },
};

export function generateStaticParams() {
  return Object.keys(SERVICES).map((service) => ({ service }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  const svc = SERVICES[service];
  return {
    title: svc ? `${svc.title} — NGUYEN Engineering` : 'NGUYEN Engineering',
    description: svc?.subtitle,
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  };
}

function SectionHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="nrd-sechead">
      <h2>{title}</h2>
      {sub ? <p>{sub}</p> : null}
    </div>
  );
}

const CSS = `
.nrd{--bg:#efece5;--surface:#f7f4ee;--surface2:#fbf9f5;--ink:#1f1c19;--muted:#6f675e;--soft:#8a8177;--line:#e0d9cc;--gold:#b3894f;
  background:var(--bg);color:var(--ink);min-height:100vh;
  font-family:"Inter","Inter Display",system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif;
  -webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
.nrd *{box-sizing:border-box}
.nrd a{color:inherit;text-decoration:none}
.nrd-shell{width:min(1200px,100%);margin:0 auto;padding:0 clamp(20px,4vw,56px)}
.nrd-nav{position:sticky;top:0;z-index:20;background:rgba(240,235,230,.95);backdrop-filter:blur(3px)}
.nrd-nav-in{display:flex;align-items:center;gap:20px;padding-top:13px;padding-bottom:13px;position:relative}
.nrd-nav-left{flex:1 0 0;display:flex;align-items:center;justify-content:flex-start;gap:32px}
.nrd-nav-link{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:14px;font-weight:500;letter-spacing:-.4px;line-height:110%;text-transform:uppercase;color:#4f4742;white-space:nowrap;transition:opacity .2s}
.nrd-nav-link:hover{opacity:.6}
.nrd a.nrd-nav-link.is-active{opacity:.6}
.nrd-brand{flex:none;font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:24px;letter-spacing:-.4px;line-height:110%;font-weight:400;color:#4f4742;white-space:nowrap;text-transform:uppercase}
.nrd-nav-right{flex:1 0 0;display:flex;align-items:center;justify-content:flex-end;gap:10px}
.nrd a.nrd-contact{font-family:"Inter Display","Inter Display Placeholder",sans-serif;display:inline-flex;align-items:center;justify-content:center;background:#4f4742;color:#f0ebe6;border-radius:100px;padding:10px 22px;font-size:14px;font-weight:500;letter-spacing:-.2px;line-height:120%;text-transform:uppercase;transition:opacity .2s;white-space:nowrap}
.nrd a.nrd-contact:hover{opacity:.8}
.nrd-back{display:inline-flex;align-items:center;gap:8px;margin:clamp(20px,2.4vw,32px) 0 0;font-size:12.5px;letter-spacing:.05em;color:var(--muted);transition:color .2s}
.nrd a.nrd-back:hover{color:var(--ink)}
.nrd-hero{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,4vw,56px);align-items:center;margin-top:clamp(22px,2.6vw,34px)}
.nrd-eyebrow{font-size:11px;letter-spacing:.2em;text-transform:uppercase;font-weight:600;color:var(--soft);margin:0 0 18px}
.nrd-h1{font-size:clamp(32px,5vw,58px);line-height:1.04;font-weight:600;letter-spacing:-.02em;text-transform:uppercase;margin:0}
.nrd-sub{color:var(--gold);font-size:clamp(15px,1.7vw,21px);font-weight:500;margin:18px 0 0;letter-spacing:.01em}
.nrd-intro{color:#453f39;font-size:clamp(14.5px,1.2vw,16.5px);line-height:1.62;margin:22px 0 0;max-width:34em}
.nrd-hero-img{aspect-ratio:4/3;border-radius:0;overflow:hidden;background:#e7e0d5}
.nrd-hero-img img{width:100%;height:100%;object-fit:cover;display:block}
.nrd-section{margin-top:clamp(56px,7vw,104px)}
.nrd-sechead{text-align:center;max-width:660px;margin:0 auto clamp(32px,4vw,50px)}
.nrd-sechead h2{margin:0;font-size:clamp(24px,3.4vw,40px);line-height:1.05;font-weight:600;letter-spacing:.005em;text-transform:uppercase;color:var(--ink)}
.nrd-sechead p{margin:16px 0 0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--soft);line-height:1.7}
.nrd-ico{color:var(--gold);flex:none}
.nrd-cols{display:grid;gap:clamp(24px,3vw,44px)}
.nrd-cols.n2{grid-template-columns:repeat(2,1fr)}
.nrd-col{background:transparent;border:0;border-top:1px solid var(--line);border-radius:0;padding:22px 0 0}
.nrd-col-h{font-size:12px;letter-spacing:.11em;text-transform:uppercase;font-weight:600;color:var(--ink);margin:0 0 18px}
.nrd-col ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:13px}
.nrd-col li{display:flex;align-items:flex-start;gap:10px;font-size:13.5px;line-height:1.4;color:#453f39}
.nrd-col li svg{margin-top:1px}
.nrd-cta{margin-top:clamp(56px,7vw,100px);background:#1f1c19;border-radius:0;color:#efe9df;
  padding:clamp(34px,5vw,64px);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:24px}
.nrd-cta-txt{max-width:620px}
.nrd-cta-h{font-size:clamp(22px,2.8vw,34px);line-height:1.1;font-weight:600;letter-spacing:.005em;margin:0;text-transform:uppercase}
.nrd-cta-b{font-size:14px;line-height:1.55;color:#c3bbaf;margin:14px 0 0}
.nrd a.nrd-btn{flex:none;display:inline-flex;align-items:center;gap:10px;background:var(--gold);color:#1c1712;border-radius:999px;
  padding:15px 26px;font-size:12.5px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;transition:background .2s,transform .2s}
.nrd a.nrd-btn:hover{background:#c99a58;transform:translateY(-2px)}
.nrd-foot{margin-top:clamp(56px,7vw,96px);border-top:1px solid var(--line);padding:clamp(40px,5vw,72px) 0 0;overflow:hidden}
.nrd-foot-main{display:grid;grid-template-columns:1.3fr .7fr;gap:clamp(28px,4vw,56px);align-items:start}
.nrd-foot-head{font-size:clamp(26px,3.4vw,40px);line-height:1.2;font-weight:500;letter-spacing:-.035em;text-transform:uppercase;margin:0;max-width:14em;color:#4f4742}
.nrd a.nrd-foot-cta{display:inline-block;margin-top:clamp(20px,2.4vw,30px);font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;border-bottom:1px solid var(--ink);padding-bottom:6px;color:var(--ink);transition:color .2s,border-color .2s}
.nrd a.nrd-foot-cta:hover{color:var(--gold);border-color:var(--gold)}
.nrd-foot-cols{display:grid;grid-template-columns:minmax(150px,220px);justify-content:end}
.nrd-foot-col{display:flex;flex-direction:column;gap:clamp(16px,1.55vw,24px)}
.nrd-foot-col a,.nrd-foot-col span{font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);transition:color .2s}
.nrd-foot-col a:hover{color:var(--ink)}
.nrd-foot-bottom{display:flex;align-items:center;justify-content:flex-end;gap:18px;margin-top:clamp(34px,4vw,52px);padding-top:clamp(22px,2.6vw,32px);border-top:1px solid var(--line);flex-wrap:wrap}
.nrd-foot-copy{font-size:11.5px;color:var(--soft);letter-spacing:.02em;margin:0}
.nrd-marquee{overflow:hidden;white-space:nowrap;margin:clamp(30px,4vw,56px) 0 clamp(24px,3vw,40px)}
.nrd-marquee-track{display:inline-flex;align-items:center;animation:nrd-scroll 40s linear infinite;will-change:transform}
.nrd-marquee-track span{flex:none;white-space:nowrap;font-size:clamp(64px,23vw,340px);line-height:.9;font-weight:800;letter-spacing:-.04em;text-transform:uppercase;color:#4f4742}
.nrd-marquee-track span::after{content:"·";padding:0 .3em;color:#4f4742}
@keyframes nrd-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@media(prefers-reduced-motion:reduce){.nrd-marquee-track{animation:none}}
.nrd-foot-img{width:100%;aspect-ratio:16/6;overflow:hidden;background:#e7e0d5}
.nrd-foot-img img{width:100%;height:100%;object-fit:cover;display:block}
@media(max-width:940px){
  .nrd-foot-main{grid-template-columns:1fr}
  .nrd-foot-cols{justify-content:start}
}
@media(max-width:720px){
  .nrd-brand{display:none}
  .nrd-hero{grid-template-columns:1fr}
}
@media(max-width:560px){
  .nrd-nav-left{display:none}
  .nrd-cols.n2{grid-template-columns:1fr}
  .nrd-foot-bottom{flex-direction:column;align-items:flex-start;gap:20px}
}
`;

export default async function EngSubServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const svc = SERVICES[service];
  if (!svc) notFound();

  const mid = Math.ceil(svc.provide.length / 2);

  return (
    <div className="nrd">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <Navbar />

      <div className="nrd-shell">
        <a href={ENG_HREF} className="nrd-back">← Back to Engineering Services</a>

        <section className="nrd-hero">
          <div>
            <p className="nrd-eyebrow">{svc.label}</p>
            <h1 className="nrd-h1">{svc.title}</h1>
            <p className="nrd-sub">{svc.subtitle}</p>
            {svc.overview.map((p, i) => (
              <p className="nrd-intro" key={i}>{p}</p>
            ))}
          </div>
          <div className="nrd-hero-img">
            <img src={svc.img} alt={svc.title} />
          </div>
        </section>

        <section className="nrd-section">
          <SectionHead title="What We Provide" />
          <div className="nrd-cols n2">
            <div className="nrd-col">
              <ul>
                {svc.provide.slice(0, mid).map((item) => (
                  <li key={item}><Check className="nrd-ico" size={16} strokeWidth={2} />{item}</li>
                ))}
              </ul>
            </div>
            <div className="nrd-col">
              <ul>
                {svc.provide.slice(mid).map((item) => (
                  <li key={item}><Check className="nrd-ico" size={16} strokeWidth={2} />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="nrd-section">
          <div className="nrd-cols n2">
            <div className="nrd-col">
              <p className="nrd-col-h">Projects We Support</p>
              <ul>
                {svc.projects.map((item) => (
                  <li key={item}><Check className="nrd-ico" size={16} strokeWidth={2} />{item}</li>
                ))}
              </ul>
            </div>
            <div className="nrd-col">
              <p className="nrd-col-h">Typical Deliverables</p>
              <ul>
                {svc.deliverables.map((item) => (
                  <li key={item}><Check className="nrd-ico" size={16} strokeWidth={2} />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="nrd-cta">
          <div className="nrd-cta-txt">
            <h2 className="nrd-cta-h">{svc.ctaHeadline}</h2>
            <p className="nrd-cta-b">{svc.ctaBody}</p>
          </div>
          <a className="nrd-btn" href={CONTACT}>{svc.ctaButton} <ArrowRight size={16} strokeWidth={2} /></a>
        </section>
      </div>

      <footer className="nrd-foot">
        <div className="nrd-shell">
          <div className="nrd-foot-main">
            <div className="nrd-foot-lead">
              <h2 className="nrd-foot-head">Open to new projects and collaborations that shape meaningful spaces.</h2>
              <a className="nrd-foot-cta" href={CONTACT}>Start a Project</a>
            </div>
            <div className="nrd-foot-cols">
              <div className="nrd-foot-col">
                <a href={HOME_HREF}>Home</a>
                <a href={`${HOME_HREF}#services`}>Services</a>
                <a href={`${HOME_HREF}#featured-projects`}>Projects</a>
                <a href={HOME_HREF}>Process</a>
                <a href={CONTACT}>Contact</a>
              </div>
            </div>
          </div>
          <div className="nrd-foot-bottom">
            <p className="nrd-foot-copy">© 2026 NGUYEN ARCHITECTURE. All Rights Reserved.</p>
          </div>
        </div>
        <div className="nrd-marquee" aria-hidden="true">
          <div className="nrd-marquee-track">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i}>NGUYEN Architecture &amp; Engineering</span>
            ))}
          </div>
        </div>
        <div className="nrd-foot-img">
          <img src="/client-8889/residential/footer-main-1728.jpg?v=footer-hq-20260901" alt="NGUYEN architecture" />
        </div>
      </footer>
    </div>
  );
}