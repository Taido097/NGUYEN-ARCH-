import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Check } from 'lucide-react';
import ServiceDetailPage from '../[slug]/page';

const LD_CARDS = [
  {
    n: '01',
    title: 'Feasibility',
    src: '/client-8889/residential/detail/ld-01-golden-meadow.png',
    alt: 'Golden meadow land development site',
    description: 'Assess opportunities and constraints to confirm the highest and best use.',
  },
  {
    n: '02',
    title: 'Site Planning',
    src: '/client-8889/residential/detail/ld-02-aerial-construction.png',
    alt: 'Aerial view of suburban construction site',
    description: 'Design thoughtful, efficient layouts that respond to the land and market.',
  },
  {
    n: '03',
    title: 'Entitlements + Civil',
    src: '/client-8889/residential/detail/ld-03-subdivision-plan.png',
    alt: 'Residential subdivision master plan',
    description: 'Navigate approvals and deliver the infrastructure to move projects forward.',
  },
];

const LD_SERVICES = [
  'Property + zoning feasibility',
  'Conceptual site planning',
  'Density + unit-yield studies',
  'Subdivision / infill concepts',
  'Access, utilities + parking',
  'Civil grading + drainage coordination',
  'Entitlement + agency support',
];

const LAND_DEVELOPMENT_CSS = `
.ld-showcase{margin:clamp(54px,7vw,96px) 0 clamp(70px,8vw,112px)}
.ld-head{text-align:center;max-width:760px;margin:0 auto clamp(44px,5vw,68px)}
.ld-eyebrow{margin:0 0 18px;color:var(--gold);font-size:11px;line-height:1.2;font-weight:600;letter-spacing:.18em;text-transform:uppercase}
.ld-head h1{margin:0;color:var(--ink);font-family:"Inter Display","Inter",sans-serif;font-size:clamp(34px,4.1vw,52px);line-height:1.06;font-weight:500;letter-spacing:-.025em}
.ld-rule{display:block;width:38px;height:1px;margin:22px auto 0;background:var(--gold)}
.ld-head p{max-width:620px;margin:22px auto 0;color:#514a43;font-size:clamp(14px,1.25vw,16.5px);line-height:1.6}
.ld-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(16px,2vw,26px)}
.ld-card{margin:0;background:var(--surface2);border:1px solid var(--line)}
.ld-card-img{aspect-ratio:3/5;overflow:hidden;background:#e7e0d5}
.ld-card-img img{width:100%;height:100%;display:block;object-fit:cover}
.ld-card-cap{padding:20px clamp(18px,2vw,26px) 24px}
.ld-card-top{display:flex;align-items:center;justify-content:space-between;gap:14px}
.ld-num{display:block;margin:0 0 9px;color:var(--gold);font-size:12px;font-weight:600;letter-spacing:.08em}
.ld-card h2{margin:0;font-size:clamp(19px,2vw,25px);line-height:1.15;font-weight:500;letter-spacing:-.02em;color:var(--ink)}
.ld-card-arrow{flex:none;width:34px;height:34px;border:1px solid #bdb4a8;border-radius:50%;display:grid;place-items:center;color:var(--ink)}
.ld-card-line{display:block;width:30px;height:1px;background:var(--gold);margin:15px 0 17px}
.ld-card p{margin:0;color:var(--muted);font-size:13px;line-height:1.55;max-width:31ch}
.ld-services{display:grid;grid-template-columns:1fr 1fr;column-gap:clamp(40px,7vw,86px);margin:clamp(46px,5.5vw,72px) auto 0;max-width:960px}
.ld-service{display:flex;align-items:center;gap:13px;min-height:54px;border-bottom:1px solid var(--line);color:#514a43;font-size:13.5px;line-height:1.35}
.ld-service:nth-last-child(-n+2){border-bottom-color:var(--line)}
.ld-check{width:22px;height:22px;border:1px solid var(--gold);border-radius:50%;display:grid;place-items:center;color:var(--gold);flex:none}
@media(max-width:760px){
  .ld-head{margin-bottom:34px}
  .ld-cards{grid-template-columns:1fr}
  .ld-card-img{aspect-ratio:4/3}
  .ld-services{grid-template-columns:1fr;margin-top:38px}
}
`;

function LandDevelopmentShowcase() {
  return (
    <section className="ld-showcase" aria-labelledby="ld-showcase-title">
      <style dangerouslySetInnerHTML={{ __html: LAND_DEVELOPMENT_CSS }} />
      <header className="ld-head">
        <p className="ld-eyebrow">Land Development</p>
        <h1 id="ld-showcase-title">From potential to place.</h1>
        <span className="ld-rule" aria-hidden="true" />
        <p>We evaluate, plan, and navigate the path from raw land to approvable, buildable, and successful developments.</p>
      </header>

      <div className="ld-cards">
        {LD_CARDS.map((card) => (
          <figure className="ld-card" key={card.n}>
            <div className="ld-card-img">
              <img src={card.src} alt={card.alt} />
            </div>
            <figcaption className="ld-card-cap">
              <span className="ld-num">{card.n}</span>
              <h2>{card.title}</h2>
              <span className="ld-card-line" aria-hidden="true" />
              <p>{card.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="ld-services" aria-label="Land development services">
        {LD_SERVICES.map((service) => (
          <div className="ld-service" key={service}>
            <span className="ld-check" aria-hidden="true">
              <Check size={12} strokeWidth={2} />
            </span>
            <span>{service}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

type NodeProps = {
  children?: ReactNode;
  className?: string;
  [key: string]: unknown;
};

function replaceLandDevelopmentBody(node: ReactNode): ReactNode {
  if (!isValidElement(node)) return node;

  const element = node as ReactElement<NodeProps>;
  const className = typeof element.props.className === 'string' ? element.props.className : '';

  if (element.type === 'section' && className.includes('nrd-hero')) {
    return <LandDevelopmentShowcase />;
  }

  if (
    element.type === 'section' &&
    className.includes('nrd-section') &&
    !className.includes('svc-os')
  ) {
    return null;
  }

  if (element.type === 'section' && className.includes('nrd-cta')) {
    return null;
  }

  if (element.props.children === undefined) return element;

  return cloneElement(element, {
    children: Children.map(element.props.children, replaceLandDevelopmentBody),
  });
}

export const metadata = {
  title: 'Land Development — NGUYEN Architecture',
  robots: { index: false, follow: false },
};

export default async function LandDevelopmentPage() {
  const rendered = await ServiceDetailPage({
    params: Promise.resolve({ slug: 'land-development' }),
  });

  if (!isValidElement(rendered)) return rendered;

  const root = rendered as ReactElement<NodeProps>;
  const page = cloneElement(root, {
    children: Children.map(root.props.children, replaceLandDevelopmentBody),
  });

  return (
    <>
      {page}
      <style>{`
        .nrd .svc-os{
          width:calc(100vw - 48px)!important;
          max-width:none!important;
          margin-left:calc(50% - 50vw + 24px)!important;
          transform:none!important;
        }
      `}</style>
    </>
  );
}
