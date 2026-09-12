import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Home, Gem, Hammer, Ruler, Zap, FileCheck, Map, LayoutTemplate, ShieldCheck, Wrench,
  Check, ArrowRight,
  Coffee, UtensilsCrossed, Monitor, Building2, ShoppingBag,
  Search, PencilRuler, FileText, HardHat,
} from 'lucide-react';
import { SERVICE_DETAILS, getServiceDetail, type GalleryShot } from '../services-data';
import Gallery from './gallery';
import HeroBanner from './hero-banner';
import Navbar from '../navbar';
import FloorPlanGuide from '../adus/floor-plan-guide';
import CommercialFloorPlanGuide from '../commercial/floor-plan-guide';
import EngineeringServiceCards from '../engineering-approvals/service-cards';

const RESIDENTIAL_HREF = '/client-demos/client-8889/residential';
const HOME_HREF = '/client-demos/client-8889/arcsphere-socal';
// The services listing, matching the site nav's "Services" link so the back arrow stays consistent.
const SERVICES_HREF = `${HOME_HREF}#services`;
const CONTACT = '/client-demos/client-8889/residential/contact';

const ICONS: Record<string, typeof Home> = {
  Home, Gem, Hammer, Ruler, Zap, FileCheck, Map, LayoutTemplate, ShieldCheck, Wrench,
};

export function generateStaticParams() {
  return SERVICE_DETAILS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const svc = getServiceDetail(slug);
  return {
    title: svc ? `${svc.title} — NGUYEN Residential` : 'NGUYEN Residential',
    description: svc?.intro,
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
/* header — exact specs from NGUYEN Framer residential nav (three-section flex: links | logo | button) */
.nrd-nav{position:sticky;top:0;z-index:20;background:rgba(240,235,230,.95);backdrop-filter:blur(3px)}
.nrd-nav-in{display:flex;align-items:center;gap:20px;padding-top:13px;padding-bottom:13px;position:relative}
.nrd-nav-left{flex:1 0 0;display:flex;align-items:center;justify-content:flex-start;gap:32px}
.nrd-nav-link{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:14px;font-weight:500;letter-spacing:-.4px;line-height:110%;text-transform:uppercase;color:#4f4742;white-space:nowrap;transition:opacity .2s}
.nrd-nav-link:hover{opacity:.6}
.nrd a.nrd-nav-link.is-active{opacity:.6}
.nrd-brand{flex:none;font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:24px;letter-spacing:-.4px;line-height:110%;font-weight:400;color:#4f4742;white-space:nowrap;text-transform:uppercase}
.nrd-nav-right{flex:1 0 0;display:flex;align-items:center;justify-content:flex-end;gap:10px}
.nrd a.nrd-contact{font-family:"Inter Display","Inter Display Placeholder",sans-serif;display:inline-flex;align-items:center;justify-content:center;background:#4f4742;color:#f0ebe6;border-radius:100px;padding:10px 22px;font-size:14px;font-weight:500;letter-spacing:-.2px;line-height:120%;text-transform:uppercase;transition:opacity .2s;white-space:nowrap;backdrop-filter:blur(5px)}
.nrd a.nrd-contact:hover{opacity:.8}
.nrd-back{display:inline-flex;align-items:center;gap:8px;margin:clamp(20px,2.4vw,32px) 0 0;font-size:12.5px;letter-spacing:.05em;color:var(--muted);transition:color .2s}
.nrd-back-lead{margin:0 0 clamp(18px,2.2vw,26px)}
.nrd a.nrd-back:hover{color:var(--ink)}
/* hero */
.nrd-hero{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,4vw,56px);align-items:center;margin-top:clamp(22px,2.6vw,34px)}
.nrd-eyebrow{font-size:11px;letter-spacing:.2em;text-transform:uppercase;font-weight:600;color:var(--soft);margin:0 0 18px}
.nrd-h1{font-size:clamp(32px,5vw,58px);line-height:1.04;font-weight:600;letter-spacing:-.02em;text-transform:uppercase;margin:0}
.nrd-sub{color:var(--gold);font-size:clamp(15px,1.7vw,21px);font-weight:500;margin:18px 0 0;letter-spacing:.01em}
.nrd-intro{color:#453f39;font-size:clamp(14.5px,1.2vw,16.5px);line-height:1.62;margin:22px 0 0;max-width:34em}
.nrd-note{margin:18px 0 0;max-width:34em;font-size:12px;line-height:1.5;color:var(--soft);border-left:2px solid var(--line);padding-left:14px}
.nrd-hero-img{aspect-ratio:4/3;border-radius:0;overflow:hidden;background:#e7e0d5}
.nrd-hero-img img{width:100%;height:100%;object-fit:cover;display:block}
/* full-width banner hero */
.nrd-banner{position:relative;margin:12px;border-radius:12px;height:97vh;max-height:1000px;overflow:hidden;background:#1a1712}
.nrd-banner img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.nrd-banner-ov{position:absolute;inset:0;background:linear-gradient(#00000036 0%,#000000c9 100%)}
.nrd-banner-inner{position:absolute;left:50%;bottom:40px;z-index:1;width:94%;transform:translateX(-50%)}
.nrd-banner-h1{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(32px,3.9vw,56px);font-weight:400;letter-spacing:-.02em;line-height:1.1;color:#efede9;margin:0 0 clamp(32px,3.9vw,56px)}
.nrd-banner-rule{display:flex;height:1px;margin:0 0 20px;overflow:hidden}
.nrd-rule-h{flex:1 1 50%;height:1px;background:rgba(247,244,238,.38)}
.nrd-banner-cap{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
.nrd-banner-cap span{font-size:clamp(13px,1.1vw,16px);letter-spacing:.01em;line-height:1.3;color:rgba(239,237,233,.85);font-weight:400}
.nrd-banner-cap span:nth-child(2){text-align:center}
.nrd-banner-cap span:nth-child(3){text-align:right}
/* hero entrance — the residential animation is driven on load by hero-banner.tsx via the
   Web Animations API with Framer's exact appear keyframes/timings (image clip-path spring,
   overlay fade, rule-line slides). These base rules only hold the pre-animation (hidden)
   state so nothing flashes before JS runs; WAAPI (fill:both) animates to visible and holds
   it. The @keyframes fallbacks reveal everything if JS is disabled (WAAPI, being a script
   animation, overrides them whenever it runs). */
@keyframes nrd-img-in{to{clip-path:inset(0% 0% 0% 0%);opacity:1}}
@keyframes nrd-fade-in{to{opacity:1}}
@keyframes nrd-slide-in{to{transform:translateX(0);opacity:1}}
.nrd-anim img{clip-path:inset(0% 0% 100% 0%);opacity:0;animation:nrd-img-in 1.3s cubic-bezier(.22,1,.36,1) 2s both}
.nrd-anim .nrd-banner-ov{opacity:.001;animation:nrd-fade-in .5s ease-out 2.4s both}
.nrd-anim .nrd-rule-l{transform:translateX(-600px);opacity:.001;animation:nrd-slide-in .9s cubic-bezier(.44,0,.56,1) 2.2s both}
.nrd-anim .nrd-rule-r{transform:translateX(600px);opacity:.001;animation:nrd-slide-in .9s cubic-bezier(.44,0,.56,1) 2.2s both}
@media(max-width:600px){.nrd-banner-cap{grid-template-columns:1fr}.nrd-banner-cap span:nth-child(2),.nrd-banner-cap span:nth-child(3){display:none}}
.nrd-lead{margin-top:clamp(40px,5vw,72px)}
.nrd-lead-h{font-size:clamp(24px,3.4vw,42px);font-weight:500;line-height:1.14;letter-spacing:-.01em;color:var(--ink);margin:0;max-width:20em}
.nrd-lead-p{margin:22px 0 0;max-width:44em;font-size:clamp(14.5px,1.2vw,16.5px);line-height:1.62;color:#453f39}
/* section scaffolding */
.nrd-section{margin-top:clamp(56px,7vw,104px)}
.nrd-sechead{text-align:center;max-width:660px;margin:0 auto clamp(32px,4vw,50px)}
.nrd-sechead h2{margin:0;font-size:clamp(24px,3.4vw,40px);line-height:1.05;font-weight:600;letter-spacing:.005em;text-transform:uppercase;color:var(--ink)}
.nrd-sechead p{margin:16px 0 0;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--soft);line-height:1.7}
.nrd-ico{color:var(--gold);flex:none}
/* approach (centered icon columns, borderless) */
.nrd-approach-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(26px,3vw,48px)}
.nrd-appr{display:flex;flex-direction:column;align-items:center;text-align:center;gap:12px}
.nrd-appr h4{font-size:13px;letter-spacing:.1em;text-transform:uppercase;font-weight:600;margin:0}
.nrd-appr p{font-size:13px;line-height:1.55;color:var(--muted);margin:0;max-width:24ch}
/* offer (icon grid, borderless, uppercase titles) */
.nrd-offer{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(28px,3vw,48px)}
.nrd-off h4{display:flex;align-items:center;gap:10px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;margin:0 0 10px}
.nrd-off p{font-size:13px;line-height:1.55;color:var(--muted);margin:0;padding-left:30px}
/* scope columns (borderless, thin top rule) */
.nrd-cols{display:grid;gap:clamp(24px,3vw,44px)}
.nrd-cols.n1{grid-template-columns:minmax(0,520px);justify-content:center}
.nrd-cols.n2{grid-template-columns:repeat(2,1fr)}
.nrd-cols.n3{grid-template-columns:repeat(3,1fr)}
.nrd-cols.n4{grid-template-columns:repeat(4,1fr)}
.nrd-col{background:transparent;border:0;border-top:1px solid var(--line);border-radius:0;padding:22px 0 0}
.nrd-col-h{font-size:12px;letter-spacing:.11em;text-transform:uppercase;font-weight:600;color:var(--ink);margin:0 0 18px}
.nrd-col ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:13px}
.nrd-col li{display:flex;align-items:flex-start;gap:10px;font-size:13.5px;line-height:1.4;color:#453f39}
.nrd-col li svg{margin-top:1px}
/* ADU Option 1 — clean two-column Scope of Services body only */
.nrd-adu-scope{max-width:920px;margin-left:auto;margin-right:auto}
.nrd-adu-scope .nrd-sechead{margin-bottom:clamp(34px,4vw,48px)}
.nrd-adu-scope .nrd-sechead::after{content:"";display:block;width:32px;height:1px;background:var(--gold);margin:18px auto 0}
.nrd-adu-scope .nrd-cols.n2{grid-template-columns:1fr 1fr;gap:0;max-width:760px;margin:0 auto}
.nrd-adu-scope .nrd-col{border-top:0;padding:4px 44px 0}
.nrd-adu-scope .nrd-col:first-child{padding-left:0;border-right:1px solid var(--line)}
.nrd-adu-scope .nrd-col:last-child{padding-right:0}
.nrd-adu-scope .nrd-col-h{margin-bottom:22px}
.nrd-adu-scope .nrd-col ul{gap:15px}
/* gallery cards */
.nrd-chips{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:0 0 clamp(26px,3vw,38px)}
.nrd-chip{font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;color:var(--muted);background:transparent;border:1px solid var(--line);border-radius:4px;padding:9px 18px;cursor:pointer;transition:all .2s}
.nrd-chip:hover{border-color:#c9bda9;color:var(--ink)}
.nrd-chip.is-active{background:var(--ink);border-color:var(--ink);color:#f3f0e9}
.nrd-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(20px,2.4vw,34px)}
.nrd-shot{margin:0;cursor:zoom-in}
.nrd-shot-img{aspect-ratio:4/3;border-radius:0;overflow:hidden;background:#e7e0d5}
.nrd-shot-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s ease}
.nrd-shot:hover .nrd-shot-img img{transform:scale(1.05)}
.nrd-shot-cap{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 2px 0}
.nrd-shot-cap span{font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--soft)}
.nrd-shot-arrow{flex:none;width:34px;height:34px;border:1px solid var(--line);border-radius:50%;display:grid;place-items:center;color:var(--ink);font-size:13px;transition:border-color .2s}
.nrd-shot:hover .nrd-shot-arrow{border-color:var(--gold);color:var(--gold)}
/* lightbox */
.nrd-lb{position:fixed;inset:0;z-index:60;background:rgba(20,17,14,.92);display:flex;align-items:center;justify-content:center;padding:clamp(16px,4vw,64px);cursor:zoom-out}
.nrd-lb img{max-width:100%;max-height:90vh;object-fit:contain;display:block;box-shadow:0 24px 70px rgba(0,0,0,.55)}
.nrd-lb-x{position:absolute;top:clamp(14px,2vw,24px);right:clamp(16px,2vw,28px);width:44px;height:44px;border:1px solid rgba(243,240,233,.4);border-radius:50%;background:transparent;color:#f3f0e9;font-size:20px;line-height:1;display:grid;place-items:center;cursor:pointer;transition:background .2s}
.nrd-lb-x:hover{background:rgba(243,240,233,.14)}
/* process */
.nrd-proc-row{display:flex;gap:0}
.nrd-pstep{flex:1;text-align:center;position:relative;padding:0 clamp(6px,1vw,14px)}
.nrd-pstep::before{content:"";position:absolute;top:22px;left:-50%;width:100%;height:1px;background:var(--line);z-index:0}
.nrd-pstep:first-child::before{display:none}
.nrd-circ{position:relative;z-index:1;width:44px;height:44px;border:1px solid var(--gold);border-radius:50%;display:grid;place-items:center;margin:0 auto;background:var(--bg);color:var(--gold);font-size:13px;font-weight:600}
.nrd-pt{margin:16px 0 6px;font-size:13px;letter-spacing:.03em;text-transform:uppercase;font-weight:600;color:var(--ink)}
.nrd-pd{font-size:12px;color:var(--muted);line-height:1.45}
/* cta */
.nrd-cta{margin-top:clamp(56px,7vw,100px);background:#1f1c19;border-radius:0;color:#efe9df;
  padding:clamp(34px,5vw,64px);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:24px}
.nrd-cta-txt{max-width:620px}
.nrd-cta-h{font-size:clamp(22px,2.8vw,34px);line-height:1.1;font-weight:600;letter-spacing:.005em;margin:0;text-transform:uppercase}
.nrd-cta-b{font-size:14px;line-height:1.55;color:#c3bbaf;margin:14px 0 0}
.nrd a.nrd-btn{flex:none;display:inline-flex;align-items:center;gap:10px;background:var(--gold);color:#1c1712;border-radius:999px;
  padding:15px 26px;font-size:12.5px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;transition:background .2s,transform .2s}
.nrd a.nrd-btn:hover{background:#c99a58;transform:translateY(-2px)}
/* footer */
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
  .nrd-approach-grid,.nrd-cols.n3,.nrd-cols.n4{grid-template-columns:repeat(2,1fr)}
  .nrd-offer,.nrd-gallery{grid-template-columns:repeat(2,1fr)}
  .nrd-foot-main{grid-template-columns:1fr}
  .nrd-foot-cols{justify-content:start}
}
@media(max-width:720px){
  .nrd-brand{display:none}
  .nrd-hero{grid-template-columns:1fr}
  .nrd-proc-row{flex-direction:column;gap:18px}
  .nrd-pstep{text-align:left;display:grid;grid-template-columns:44px 1fr;gap:0 16px;padding:0}
  .nrd-pstep::before{display:none}
  .nrd-circ{margin:0}
  .nrd-pt{grid-column:2;margin:0 0 4px}
  .nrd-pd{grid-column:2}
}
@media(max-width:560px){
  .nrd-nav-left{display:none}
  .nrd-approach-grid,.nrd-offer,.nrd-cols.n1,.nrd-cols.n2,.nrd-cols.n3,.nrd-cols.n4,.nrd-gallery{grid-template-columns:1fr}
  .nrd-off p{padding-left:0}
  .nrd-adu-scope .nrd-cols.n2{grid-template-columns:1fr;max-width:520px}
  .nrd-adu-scope .nrd-col{padding:0}
  .nrd-adu-scope .nrd-col:first-child{border-right:0;border-bottom:1px solid var(--line);padding-bottom:28px;margin-bottom:28px}
  .nrd-foot-bottom{flex-direction:column;align-items:flex-start;gap:20px}
}
/* Commercial "Built For Business" image-mosaic body */
.cx-body{padding-top:clamp(36px,4.5vw,64px)}
.cx-intro{max-width:660px;margin:0 0 clamp(26px,3.4vw,44px)}
.cx-intro h2{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(30px,4.6vw,54px);line-height:1.04;letter-spacing:-.02em;font-weight:600;color:#4f4742;margin:0}
.cx-intro p{margin:16px 0 0;max-width:33em;font-size:clamp(14.5px,1.2vw,16.5px);line-height:1.6;font-weight:400;color:#6f675e}
.cx-top{display:grid;grid-template-columns:1.12fr 1fr;grid-template-rows:auto auto;gap:16px}
.cx-cell{position:relative;border-radius:0;overflow:hidden;background:#e7e0d5}
/* Commercial page: square (90°) corners on every image, incl. the shared hero banner */
.nrd-commercial .nrd-banner{border-radius:0}
.nrd-commercial .nrd-banner img,.nrd-commercial .cx-cell img{border-radius:0}
.cx-cell img{width:100%;height:100%;object-fit:cover;display:block}
.cx-cell::after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(20,17,14,.52) 0%,rgba(20,17,14,0) 40%);pointer-events:none}
.cx-label{position:absolute;left:16px;bottom:14px;z-index:1;display:flex;align-items:center;gap:9px;color:#f3f0e9;font-size:14px;font-weight:500;letter-spacing:.01em}
.cx-label svg{flex:none;opacity:.9}
.cx-cafe{grid-column:1;grid-row:1/3}
.cx-restaurant{grid-column:2;grid-row:1}
.cx-office{grid-column:2;grid-row:2}
.cx-restaurant,.cx-office{aspect-ratio:3/2}
.cx-bottom{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:16px}
.cx-bottom .cx-cell{aspect-ratio:16/10}
.cx-proc{margin-top:clamp(48px,6vw,88px);border-top:1px solid var(--line);padding-top:clamp(32px,4vw,56px);display:grid;grid-template-columns:.85fr 2.5fr;gap:clamp(28px,5vw,80px);align-items:start}
.cx-proc-h{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(24px,3vw,40px);line-height:1.08;letter-spacing:-.01em;font-weight:600;color:#4f4742;margin:0}
.cx-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(20px,2.6vw,40px)}
.cx-step svg{color:#4f4742;opacity:.9}
.cx-step h4{margin:16px 0 8px;font-size:12px;letter-spacing:.09em;text-transform:uppercase;font-weight:600;color:#4f4742}
.cx-step p{margin:0;font-size:13px;line-height:1.55;font-weight:400;color:#6f675e;max-width:22ch}
@media(max-width:820px){
  .cx-top{grid-template-columns:1fr}
  .cx-cafe{grid-column:1;grid-row:auto;aspect-ratio:4/3}
  .cx-restaurant,.cx-office{grid-column:1}
  .cx-proc{grid-template-columns:1fr}
  .cx-steps{grid-template-columns:1fr 1fr}
}
@media(max-width:560px){
  .cx-bottom{grid-template-columns:1fr}
  .cx-steps{grid-template-columns:1fr}
}
/* ADU page: "Three ADU Types" panel (detached left, attached upper-right, garage lower-right) */
.adu-head{text-align:center;margin:0 auto clamp(28px,3.6vw,48px)}
.adu-head .adu-rule{display:block;width:38px;height:2px;background:var(--gold);margin:0 auto 22px}
.adu-head h2{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(30px,4.4vw,52px);line-height:1.05;letter-spacing:-.01em;font-weight:600;color:#4f4742;margin:0}
.adu-head p{margin:14px 0 0;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--soft);line-height:1.7}
.adu-grid{display:grid;grid-template-columns:1.05fr 1fr;grid-template-rows:auto auto;gap:clamp(20px,2.4vw,32px)}
.adu-panel{display:flex;flex-direction:column;min-width:0}
.adu-cap{padding:0 2px 16px}
.adu-cap .adu-line{display:block;width:34px;height:2px;background:var(--gold);margin:0 0 14px}
.adu-cap h3{font-size:clamp(17px,1.5vw,21px);letter-spacing:.02em;text-transform:uppercase;font-weight:700;color:#1c1a17;margin:0}
.adu-cap p{margin:8px 0 0;font-size:13.5px;line-height:1.5;font-weight:500;color:#3a352f;max-width:34ch}
.adu-img{overflow:hidden;background:#e7e0d5}
.adu-img img{width:100%;height:100%;object-fit:cover;display:block}
.adu-detached{grid-column:1;grid-row:1/3}
.adu-detached .adu-img{flex:1;min-height:0}
.adu-attached{grid-column:2;grid-row:1}
.adu-attached .adu-img{aspect-ratio:536/421}
.adu-garage{grid-column:2;grid-row:2}
.adu-garage .adu-img{aspect-ratio:536/332}
@media(max-width:820px){
  .adu-grid{grid-template-columns:1fr}
  .adu-detached{grid-column:1;grid-row:auto}
  .adu-detached .adu-img{flex:none;aspect-ratio:520/560}
  .adu-attached,.adu-garage{grid-column:1}
}
/* "Our Services" cards (replaces the Explore Other Services chips).
   Breaks out of the 1200px content column to a wide, viewport-centered container
   (matching the residential page); capped so it never causes horizontal scroll. */
.svc-os{width:calc(100vw - 2 * clamp(20px,4vw,56px));margin-left:50%;transform:translateX(-50%)}
.svc-os-h{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(30px,4.4vw,52px);line-height:1.04;letter-spacing:-.01em;font-weight:500;color:#4f4742;margin:0 0 clamp(26px,3.4vw,44px)}
.svc-os-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(16px,1.7vw,26px)}
.svc-os-card{display:flex;flex-direction:column;color:inherit;text-decoration:none}
.svc-os-img{aspect-ratio:16/9;overflow:hidden;background:#e7e0d5}
.svc-os-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s cubic-bezier(.22,1,.36,1)}
.svc-os-card:hover .svc-os-img img{transform:scale(1.04)}
.svc-os-label{margin:15px 0 0;font-size:clamp(15px,1.2vw,17px);font-weight:500;letter-spacing:.01em;color:#3a352f}
@media(max-width:820px){.svc-os-grid{grid-template-columns:1fr 1fr;gap:20px}}
@media(max-width:520px){.svc-os-grid{grid-template-columns:1fr}}
/* SB 9 featured band (ADU page only) — large image left, content right; uses the page's own tokens */
.sb9-feature{margin-top:clamp(56px,7vw,104px)}
.sb9-card{display:grid;grid-template-columns:1.05fr 1fr;gap:0;background:var(--surface);border:1px solid var(--line);border-radius:14px;overflow:hidden;align-items:stretch}
.sb9-media{background:#e7e0d5;overflow:hidden}
.sb9-media img{width:100%;height:100%;min-height:clamp(300px,34vw,500px);object-fit:cover;display:block}
.sb9-body{padding:clamp(30px,3.6vw,60px)}
.sb9-eyebrow{font-size:11px;letter-spacing:.22em;text-transform:uppercase;font-weight:600;color:var(--soft);margin:0}
.sb9-eyebrow::after{content:"";display:block;width:34px;height:2px;background:var(--gold);margin:16px 0 0}
.sb9-h{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(28px,3.4vw,46px);line-height:1.06;letter-spacing:-.02em;font-weight:600;color:var(--ink);margin:22px 0 0;max-width:12em}
.sb9-p{color:#453f39;font-size:clamp(14.5px,1.2vw,16.5px);line-height:1.62;margin:18px 0 0;max-width:34em}
.nrd a.sb9-btn{display:inline-flex;align-items:center;gap:10px;margin-top:clamp(24px,2.6vw,32px);background:var(--gold);color:#1c1712;border-radius:999px;padding:14px 28px;font-size:12.5px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;transition:background .2s,transform .2s}
.nrd a.sb9-btn:hover{background:#c99a58;transform:translateY(-2px)}
.sb9-feats{display:grid;grid-template-columns:repeat(4,1fr);margin-top:clamp(28px,3.2vw,42px);border-top:1px solid var(--line);padding-top:clamp(22px,2.4vw,30px)}
.sb9-feat{display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px;padding:0 12px;position:relative}
.sb9-feat + .sb9-feat::before{content:"";position:absolute;left:0;top:1px;bottom:1px;width:1px;background:var(--line)}
.sb9-feat svg{color:var(--gold);flex:none}
.sb9-feat span{font-size:11px;letter-spacing:.1em;text-transform:uppercase;font-weight:600;color:var(--muted);line-height:1.45}
@media(max-width:820px){
  .sb9-card{grid-template-columns:1fr}
  .sb9-media img{min-height:clamp(240px,58vw,420px)}
  .sb9-feats{grid-template-columns:1fr 1fr;gap:24px 0}
  .sb9-feat:nth-child(3)::before,.sb9-feat + .sb9-feat::before{display:none}
}
`;

// Base path for the local detail images (commercial mosaic + ADU panels).
const CX = '/client-8889/residential/detail';
const SVC = '/client-8889/residential';
// Icon per gallery category so the mosaic labels stay honest to the existing content.
const CX_CAT_ICON: Record<string, typeof Home> = {
  'Cafés': Coffee,
  Restaurants: UtensilsCrossed,
  Office: Monitor,
  Retail: ShoppingBag,
};
const COMMERCIAL_STEPS = [
  { n: '1', t: 'Discover', d: 'We learn about your goals, site, and vision.', Icon: Search },
  { n: '2', t: 'Design', d: 'We create solutions that align function and brand.', Icon: PencilRuler },
  { n: '3', t: 'Permit', d: 'We handle approvals and documentation.', Icon: FileText },
  { n: '4', t: 'Build Support', d: 'We support you through construction and beyond.', Icon: HardHat },
];

function CxCell({ shot, cls }: { shot: GalleryShot; cls?: string }) {
  const Ico = CX_CAT_ICON[shot.cat] ?? Building2;
  return (
    <figure className={`cx-cell${cls ? ` ${cls}` : ''}`}>
      <img src={shot.src} alt={shot.alt} />
      <figcaption className="cx-label"><Ico size={17} strokeWidth={1.6} />{shot.label ?? shot.cat}</figcaption>
    </figure>
  );
}

const ADU_TYPES = [
  { src: `${CX}/detached_adu.png`, cls: 'adu-detached', t: 'Detached ADU', d: 'A private, standalone space with endless possibilities.' },
  { src: `${CX}/attached_adu.png`, cls: 'adu-attached', t: 'Attached ADU', d: 'Seamlessly connected. Perfectly integrated.' },
  { src: `${CX}/garage_conversion.png`, cls: 'adu-garage', t: 'Garage Conversion', d: 'Transform your garage into livable space.' },
];

// Card 3 shows Commercial everywhere except the Commercial page, where it shows
// Residential instead (so the current page isn't listed among the cards).
const ALL_SERVICES = [
  { slug: 'adus',                  href: `${RESIDENTIAL_HREF}/services/adus`,                  img: `${SVC}/svc-03-adus.jpg`,               label: 'ADU' },
  { slug: 'commercial',            href: `${RESIDENTIAL_HREF}/services/commercial`,             img: `${CX}/cx-09-building.jpg`,             label: 'Commercial' },
  { slug: 'land-development',      href: `${RESIDENTIAL_HREF}/services/land-development`,      img: `${CX}/ld-01-golden-meadow.png`,        label: 'Land Development' },
  { slug: 'engineering-approvals', href: `${RESIDENTIAL_HREF}/services/engineering-approvals`, img: `${SVC}/svc-05-structural.jpg`,         label: 'Engineering' },
  { slug: 'residential',            href: RESIDENTIAL_HREF,                                      img: `${SVC}/svc-01-custom-homes.jpg`,       label: 'Residential' },
  { slug: 'additions-remodels',    href: `${RESIDENTIAL_HREF}/services/additions-remodels`,    img: `${SVC}/svc-02-additions-remodels.jpg`, label: 'Additions & Remodels' },
  { slug: 'multifamily',           href: `${RESIDENTIAL_HREF}/services/multifamily`,           img: `${SVC}/svc-04-multifamily.jpg`,        label: 'Townhomes + Condos' },
  { slug: 'sb9-development',       href: `${RESIDENTIAL_HREF}/services/sb9-development`,       img: `${CX}/sb9-01-modern-duplex.jpg`,       label: 'SB 9 Development' },
];

function OurServices({ currentSlug }: { currentSlug: string }) {
  const cards = ALL_SERVICES.filter((s) => s.slug !== currentSlug).slice(0, 4);
  return (
    <section className="nrd-section svc-os" aria-label="Our Services">
      <h2 className="svc-os-h">Our Services</h2>
      <div className="svc-os-grid">
        {cards.map((s) => (
          <Link className="svc-os-card" href={s.href} key={s.slug}>
            <div className="svc-os-img"><img src={s.img} alt={s.label} /></div>
            <span className="svc-os-label">{s.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function AduTypes() {
  return (
    <section className="nrd-section adu-types" aria-label="Three ADU Types">
      <div className="adu-head">
        <span className="adu-rule" aria-hidden="true" />
        <h2>Three ADU Types</h2>
        <p>Flexible Solutions. Designed Around You.</p>
      </div>
      <div className="adu-grid">
        {ADU_TYPES.map((a) => (
          <figure className={`adu-panel ${a.cls}`} key={a.src}>
            <figcaption className="adu-cap">
              <span className="adu-line" aria-hidden="true" />
              <h3>{a.t}</h3>
              <p>{a.d}</p>
            </figcaption>
            <div className="adu-img"><img src={a.src} alt={a.t} /></div>
          </figure>
        ))}
      </div>
    </section>
  );
}

const SB9_HREF = `${RESIDENTIAL_HREF}/services/sb9-development`;
const SB9_FEATURES = [
  { Icon: Map, label: 'Feasibility Analysis' },
  { Icon: LayoutTemplate, label: 'Lot Split Planning' },
  { Icon: Home, label: 'Architectural Design' },
  { Icon: FileCheck, label: 'Permitting Support' },
];

function Sb9Feature() {
  return (
    <section className="nrd-section sb9-feature" aria-label="SB 9 Development">
      <div className="sb9-card">
        <div className="sb9-media">
          <img src={`${CX}/sb9-01-modern-duplex.jpg`} alt="SB 9 development — modern two-unit home" />
        </div>
        <div className="sb9-body">
          <p className="sb9-eyebrow">SB 9 Development</p>
          <h2 className="sb9-h">Maximize Your Property Potential</h2>
          <p className="sb9-p">Explore opportunities for lot splits and additional residential units under California SB 9. We can help with feasibility, architectural design, engineering, permitting, and the approval process.</p>
          <a className="sb9-btn" href={SB9_HREF}>Learn More <ArrowRight size={16} strokeWidth={2} /></a>
          <div className="sb9-feats">
            {SB9_FEATURES.map((f) => (
              <div className="sb9-feat" key={f.label}>
                <f.Icon size={22} strokeWidth={1.5} />
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CommercialBody({ shots }: { shots: GalleryShot[] }) {
  const top = shots.slice(0, 3); // large left + two stacked right (the target composition)
  const rest = shots.slice(3); // remaining gallery images, three across
  const topCls = ['cx-cafe', 'cx-restaurant', 'cx-office'];
  return (
    <div className="cx-body">
      <div className="cx-intro">
        <h2>Built For Business.<br />Designed To Perform.</h2>
        <p>Commercial environments designed with purpose—where form, function, and growth come together.</p>
      </div>

      <div className="cx-top">
        {top.map((s, i) => <CxCell key={s.src} shot={s} cls={topCls[i]} />)}
      </div>

      {rest.length ? (
        <div className="cx-bottom">
          {rest.map((s) => <CxCell key={s.src} shot={s} />)}
        </div>
      ) : null}

      <div className="cx-proc">
        <h2 className="cx-proc-h">A Clear Process.<br />Proven Results.</h2>
        <div className="cx-steps">
          {COMMERCIAL_STEPS.map((s) => (
            <div className="cx-step" key={s.n}>
              <s.Icon size={26} strokeWidth={1.4} />
              <h4>{s.n}. {s.t}</h4>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = getServiceDetail(slug);
  if (!svc) notFound();

  return (
    <div className={`nrd${slug === 'commercial' ? ' nrd-commercial' : ''}`}>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <Navbar />

      {svc.heroBanner ? (
        <HeroBanner
          hero={svc.hero}
          title={svc.title}
          label={svc.bannerLabel ?? svc.title}
          caption={svc.heroCaption}
        />
      ) : (
        <div className="nrd-shell">
          <a href={RESIDENTIAL_HREF} className="nrd-back">← Back to Residential</a>
        </div>
      )}

      {slug === 'commercial' ? <CommercialFloorPlanGuide /> : null}
      {slug === 'adus' ? <FloorPlanGuide /> : null}
      {slug === 'engineering-approvals' ? <EngineeringServiceCards /> : null}

      <div className="nrd-shell">
        {slug === 'commercial' ? (
          <>
            <CommercialBody shots={svc.gallery ?? []} />
          </>
        ) : slug === 'engineering-approvals' ? null : (
        <>
        {svc.heroBanner ? (
          <div className="nrd-lead">
            <a href={slug === 'adus' ? SERVICES_HREF : RESIDENTIAL_HREF} className="nrd-back nrd-back-lead">← Back to {slug === 'adus' ? 'Services' : 'Residential'}</a>
            {svc.subtitle && slug !== 'adus' ? <h2 className="nrd-lead-h">{svc.subtitle}</h2> : null}
            {slug !== 'adus' ? <p className="nrd-lead-p">{svc.intro}</p> : null}
            {svc.note ? <p className="nrd-note">{svc.note}</p> : null}
          </div>
        ) : (
          <section className="nrd-hero">
            <div>
              <p className="nrd-eyebrow">{svc.kicker ?? `Residential Service · ${svc.num}`}</p>
              <h1 className="nrd-h1">{svc.title}</h1>
              {svc.subtitle ? <p className="nrd-sub">{svc.subtitle}</p> : null}
              <p className="nrd-intro">{svc.intro}</p>
              {svc.note ? <p className="nrd-note">{svc.note}</p> : null}
            </div>
            <div className="nrd-hero-img">
              <img src={svc.hero} alt={svc.title} />
            </div>
          </section>
        )}

        {slug === 'adus' ? <AduTypes /> : null}

        {svc.approach ? (
          <section className="nrd-section">
            <SectionHead title="Our Approach" sub="How we plan, design, and coordinate." />
            <div className="nrd-approach-grid">
              {svc.approach.map((a) => {
                const Ico = a.icon ? ICONS[a.icon] : null;
                return (
                  <div className="nrd-appr" key={a.t}>
                    {Ico ? <Ico className="nrd-ico" size={26} strokeWidth={1.4} /> : null}
                    <h4>{a.t}</h4>
                    <p>{a.d}</p>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {svc.offer ? (
          <section className="nrd-section">
            <SectionHead title="What We Offer" sub="What we design, engineer, and permit." />
            <div className="nrd-offer">
              {svc.offer.map((o) => {
                const Ico = o.icon ? ICONS[o.icon] : null;
                return (
                  <div className="nrd-off" key={o.t}>
                    <h4>{Ico ? <Ico className="nrd-ico" size={20} strokeWidth={1.5} /> : null}{o.t}</h4>
                    <p>{o.d}</p>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {svc.columns && slug !== 'adus' ? (
          <section className="nrd-section">
            <SectionHead title="Scope of Services" sub="Coordinated across architecture, engineering, and permitting." />
            <div className={`nrd-cols n${Math.min(svc.columns.length, 4)}`}>
              {svc.columns.map((c) => (
                <div className="nrd-col" key={c.label}>
                  <p className="nrd-col-h">{c.label}</p>
                  <ul>
                    {c.items.map((it) => (
                      <li key={it}><Check className="nrd-ico" size={16} strokeWidth={2} />{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {slug === 'adus' ? <Sb9Feature /> : null}

        {svc.gallery ? (
          <section className="nrd-section">
            <SectionHead title="Project Gallery" sub="A selection of recent project work." />
            <Gallery shots={svc.gallery} />
          </section>
        ) : null}

        <section className="nrd-section">
          <SectionHead title="Our Process" sub="From first conversation through approval." />
          <div className="nrd-proc-row">
            {svc.process.map((step, i) => (
              <div className="nrd-pstep" key={step.t}>
                <div className="nrd-circ">{String(i + 1).padStart(2, '0')}</div>
                <p className="nrd-pt">{step.t}</p>
                {step.d ? <p className="nrd-pd">{step.d}</p> : null}
              </div>
            ))}
          </div>
        </section>

        <section className="nrd-cta">
          <div className="nrd-cta-txt">
            <h2 className="nrd-cta-h">{svc.ctaHeadline}</h2>
            {svc.ctaBody ? <p className="nrd-cta-b">{svc.ctaBody}</p> : null}
          </div>
          <a className="nrd-btn" href={CONTACT}>{svc.cta} <ArrowRight size={16} strokeWidth={2} /></a>
        </section>
        </>
        )}

        <OurServices currentSlug={slug} />
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
          <img src="/client-8889/residential/footer-main-1728.jpg?v=footer-hq-20260901" alt="NGUYEN residential architecture" />
        </div>
      </footer>
    </div>
  );
}