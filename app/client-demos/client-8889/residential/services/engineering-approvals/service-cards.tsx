const D = '/client-8889/residential/detail';
const BASE = '/client-demos/client-8889/residential/services/engineering-approvals';

const CARDS = [
  {
    img: `${D}/eng-svc-01-structural.png`,
    title: 'Structural Engineering',
    desc: 'Foundation systems, structural framing, load calculations, and permit-ready documentation — coordinated with the architectural design.',
    href: `${BASE}/structural-engineering`,
  },
  {
    img: `${D}/eng-svc-02-electrical.png`,
    title: 'Electrical Engineering',
    desc: 'Panel coordination, lighting layouts, load calculations, and code-compliant electrical design for residential and commercial projects.',
    href: `${BASE}/electrical-engineering`,
  },
  {
    img: `${D}/eng-svc-03-mechanical-hvac.png`,
    title: 'Mechanical / HVAC Engineering',
    desc: 'Heating, cooling, and ventilation system design — energy-efficient and coordinated with the architectural and structural documents.',
    href: `${BASE}/mechanical-hvac-engineering`,
  },
  {
    img: `${D}/eng-svc-04-plumbing.png`,
    title: 'Plumbing Engineering',
    desc: 'Water supply, drainage, and fixture coordination — designed to code and integrated with the architectural and structural set.',
    href: `${BASE}/plumbing-engineering`,
  },
  {
    img: `${D}/eng-svc-05-energy-title24.png`,
    title: 'Energy & Title 24',
    desc: 'California Title 24 energy compliance analysis and documentation — required for permit submittal on most residential and commercial projects.',
    href: `${BASE}/energy-title-24`,
  },
  {
    img: `${D}/eng-svc-06-fire-life-safety.png`,
    title: 'Fire & Life Safety',
    desc: 'Fire sprinkler layout, egress planning, and life-safety code coordination through building department review and permit approval.',
    href: `${BASE}/fire-life-safety`,
  },
];

const CSS = `
#eng-service-cards{
  background:transparent;
  padding:clamp(56px,8vw,120px) 0;
  font-family:"Inter Display","Inter",system-ui,-apple-system,"Segoe UI",Helvetica,Arial,sans-serif;
  color:#4f4742;
}
#eng-service-cards .esc-shell{
  width:min(1460px,100%);
  margin:0 auto;
  padding:0 clamp(20px,4vw,60px);
  box-sizing:border-box;
}
#eng-service-cards .esc-eyebrow{
  font-size:12px;
  text-transform:uppercase;
  letter-spacing:.2em;
  font-weight:600;
  color:#736b62;
  margin:0 0 clamp(32px,4vw,54px);
}
#eng-service-cards .esc-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:clamp(20px,2vw,30px);
}
#eng-service-cards .esc-card{
  display:flex;
  flex-direction:column;
  color:inherit;
  text-decoration:none;
  cursor:pointer;
}
#eng-service-cards .esc-img{
  aspect-ratio:3/2;
  overflow:hidden;
  background:#e7e0d5;
  border-radius:0;
}
#eng-service-cards .esc-img img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
  transition:transform .6s ease;
}
#eng-service-cards .esc-card:hover .esc-img img{
  transform:scale(1.045);
}
#eng-service-cards .esc-text{
  padding-top:clamp(18px,1.5vw,24px);
}
#eng-service-cards .esc-head{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:12px;
}
#eng-service-cards .esc-title{
  text-transform:uppercase;
  font-size:clamp(15px,1.15vw,18.5px);
  line-height:1.22;
  font-weight:600;
  letter-spacing:.005em;
  color:#1f1c19;
  margin:0;
}
#eng-service-cards .esc-arrow{
  flex:none;
  width:38px;
  height:38px;
  border:1px solid #b7afa3;
  border-radius:50%;
  display:grid;
  place-items:center;
  font-size:15px;
  color:#1f1c19;
  transition:background .3s,color .3s,border-color .3s;
}
#eng-service-cards .esc-card:hover .esc-arrow{
  background:#1f1c19;
  color:#f3f0e9;
  border-color:#1f1c19;
}
#eng-service-cards .esc-copy{
  font-size:13px;
  line-height:1.5;
  color:#8a8177;
  margin:14px 0 0;
  max-width:94%;
}
@media(max-width:1100px){
  #eng-service-cards .esc-grid{grid-template-columns:repeat(2,1fr);gap:32px}
}
@media(max-width:560px){
  #eng-service-cards .esc-grid{grid-template-columns:1fr}
}
`;

export default function EngineeringServiceCards() {
  return (
    <section id="eng-service-cards">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="esc-shell">
        <p className="esc-eyebrow">Our Engineering Services</p>
        <div className="esc-grid">
          {CARDS.map((card) => (
            <a className="esc-card" href={card.href} key={card.title}>
              <div className="esc-img">
                <img src={card.img} alt={card.title} loading="lazy" />
              </div>
              <div className="esc-text">
                <div className="esc-head">
                  <h3 className="esc-title">{card.title}</h3>
                  <span className="esc-arrow">↗</span>
                </div>
                <p className="esc-copy">{card.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
