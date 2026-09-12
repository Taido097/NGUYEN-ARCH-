"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import styles from "./native.module.css"
import { BOBA_PROJECT_IMAGE } from "./branded/project-image-boba"
import { RESTAURANT_PROJECT_IMAGE } from "./branded/project-image-restaurant"
import { COMMERCIAL_PROJECT_IMAGE } from "./branded/project-image-commercial"

const HERO_IMAGE = "https://framerusercontent.com/images/1bcyDuRfQDTRBuPmXk32I5cKWc0.webp?height=1920&width=2400"
const ABOUT_SKETCH = "https://framerusercontent.com/images/bPmhZf6Cfqh0tq7ok2WiGtZUc.png?height=1278&width=2400"
const ABOUT_PHOTO = "https://framerusercontent.com/images/zNwUrKf5wBzZ5mlqn3ZSHYTgQk.png?height=1674&width=1856"

const HANDBOOK_PAGES = [
  "https://framerusercontent.com/images/QDQKylWWIf9VYDvFE8d8MTxUJ1o.png",
  "https://framerusercontent.com/images/cwOkVnjxy6x4U3eWGZEKmj7BBgo.jpg?scale-down-to=512&width=768&height=1086",
  "https://framerusercontent.com/images/OhGj99mJnab8DPy2PMfd98jhF6I.jpg?scale-down-to=1024&width=768&height=1086",
  "https://framerusercontent.com/images/lAU1MDwSV1dq0S6amUC8jsOg.jpg?scale-down-to=512&width=768&height=1086",
  "https://framerusercontent.com/images/hv0I9A0DXUdvIK6c42B46rsfzg.jpg?scale-down-to=512&width=768&height=1086",
  "https://framerusercontent.com/images/cKChIxjzaNsc5t2NxVN78mx8Q.png?scale-down-to=512&width=768&height=1086",
  "https://framerusercontent.com/images/hFP2svt3lNsx1A9P1zA6bFzdWM.png?scale-down-to=512&width=768&height=1086",
  "https://framerusercontent.com/images/7q3XJntgf3apOgAI7m0Yai1Mz0.png?scale-down-to=512&width=768&height=1086",
]

const services = [
  {
    title: "Site & Planning + Architectural Design",
    tags: ["Site Survey & Existing Conditions", "Zoning & Code Review", "Space Planning", "Concept Design", "Floor Plans", "Elevations & Sections", "Reflected Ceiling Plans", "Construction Details · 3D Renderings · TI Plans"],
    image: "https://framerusercontent.com/images/6wohe4Mtd0vJm99l0f5QsIGb8hs.webp",
    copy: "Planning and architectural design are coordinated from the existing site conditions through permit-ready drawings, keeping zoning, layout, code and visualization aligned from the start.",
  },
  {
    title: "Structural Engineering",
    tags: ["Structural Design", "Structural Details", "Structural Calculations", "Foundation & Framing", "Retaining Walls", "Existing Building Modification", "ADU & Commercial TI Structural Support"],
    image: "https://framerusercontent.com/images/Mm4vdpwIwDCj6RkdrL6NcBp3z0.webp",
    copy: "Structural systems are designed and documented as part of the same coordinated package, reducing handoffs between architectural and engineering teams.",
  },
  {
    title: "MEP Engineering",
    tags: ["Electrical Design", "Plumbing Design", "HVAC Design", "Electrical Load Calculations", "Equipment Coordination"],
    image: "https://framerusercontent.com/images/AfUELZk0dVk5hVjWkreKnPPhCw.jpg",
    copy: "Mechanical, electrical and plumbing design is coordinated with the architecture so equipment, loads and building systems fit the project before submittal.",
  },
  {
    title: "Code, Energy & Permit Services",
    tags: ["Title 24", "CalGreen", "ADA Compliance", "Building Code Review", "Accessibility · Occupancy & Egress", "Permit Submittal · City Submittal", "Plan Check · Corrections · Resubmittal · Approval Support"],
    image: "https://framerusercontent.com/images/c8yTRHwU0lDfYXWKVCoGbX7HJs.jpg",
    copy: "Code, energy and permit coordination continues through plan check, corrections, resubmittal and approval so the project has one clear path from design to permit.",
  },
]

const projects = [
  { title: "Boba Shops & Cafés", image: BOBA_PROJECT_IMAGE, type: "Tenant Improvement", location: "Garden Grove, CA", scope: "Interior TI · 1,200 SF" },
  { title: "Restaurants", image: RESTAURANT_PROJECT_IMAGE, type: "Commercial", location: "Anaheim, CA", scope: "Full-service restaurant · 3,500 SF" },
  { title: "New Commercial Buildings", image: COMMERCIAL_PROJECT_IMAGE, type: "Architecture + Engineering", location: "Riverside, CA", scope: "Ground-Up · 8,500 SF" },
]

const differences = [
  ["001", "Client Focused", "We listen, understand project goals and communicate clearly from the first conversation through approval."],
  ["002", "Quality Driven", "Architecture and engineering are coordinated together with attention to clarity, constructability and documentation quality."],
  ["003", "Code & Safety Compliant", "Planning, ADA, Title 24, CalGreen, occupancy, egress and building-code requirements are considered throughout the design process."],
  ["004", "On Time & On Budget", "A coordinated team reduces unnecessary handoffs and helps keep design decisions, plan-check responses and project milestones moving."],
]

const processSteps = [
  {
    title: "Consultation & Feasibility",
    image: "https://framerusercontent.com/images/NPECM2ziENhHhdNoAT3unXgBhD0.jpg?height=4800&width=7200",
    copy: "We discuss goals, scope, budget and schedule, then review the site, existing conditions, zoning, land use and code requirements to define a practical approval path.",
  },
  {
    title: "Concept Design",
    image: "https://framerusercontent.com/images/hTlOWGa5zyQTaf2BY6I2VyHfntk.png?height=1024&width=1024",
    copy: "We develop conceptual design, preliminary layouts, 3D massing or renderings and the design direction that will guide the project.",
  },
  {
    title: "Design & Engineering",
    image: "https://framerusercontent.com/images/T2Y0onUmpS5OqiyQ5nQDnrQnAkE.png?height=1257&width=1856",
    copy: "Architecture, structural engineering, MEP and Title 24 documentation are coordinated as one complete permit-ready package.",
  },
  {
    title: "Permit & Approval",
    image: "https://framerusercontent.com/images/kHdNIpsTdurehv9wVtAF250fwE.webp?height=1920&width=2400",
    copy: "We prepare and submit the permit package, coordinate plan check, respond to comments, manage revisions and resubmittals, and support the project through final approval.",
  },
]

const gallery = [
  "https://framerusercontent.com/images/cKdwx0TQxw7MKiUKihFL5Qif0M.webp?height=1920&width=2400",
  "https://framerusercontent.com/images/1t4Nn4XTSLSI7Gr2H5Y2Jv5oY.webp?height=1920&width=2400",
  "https://framerusercontent.com/images/52byqNtSxRbm8zsP7HCFXNnG1pg.webp?height=1920&width=2400",
  "https://framerusercontent.com/images/xbwRPxHMsVhX9Gse4yisTBolkjM.webp?height=1920&width=2400",
]

const faqs = [
  ["Do you handle permit submittal and plan check?", "Yes. Permit support includes permit package preparation, city or agency submittal, plan check coordination, corrections, resubmittals and permit approval support."],
  ["Can NGUYEN coordinate architecture and engineering under one team?", "Yes. NGUYEN coordinates architectural design, structural engineering, MEP engineering and Title 24 as an integrated project team."],
  ["What commercial project types do you work on?", "Commercial work includes boba shops and cafés, restaurants, nail and beauty salons, retail stores, offices and tenant improvements, commercial remodels and renovations, and new commercial buildings."],
  ["Can you help with ADUs?", "Yes. ADU services can include planning, architectural design, structural engineering, MEP engineering, Title 24 and permit coordination."],
  ["Do you handle code and energy compliance?", "Yes. Services include Title 24, CalGreen, ADA compliance, building code review, accessibility, occupancy and egress coordination."],
  ["Where does NGUYEN provide services?", "NGUYEN serves Northern and Southern California, including Orange County and Sacramento."],
]

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div data-reveal className={`${styles.reveal} ${className}`}>{children}</div>
}

function Handbook() {
  const [page, setPage] = useState(0)
  const startX = useRef<number | null>(null)
  const sheets = useMemo(() => HANDBOOK_PAGES.reduce<string[][]>((all, url, i) => {
    if (i % 2 === 0) all.push([url, HANDBOOK_PAGES[i + 1]])
    return all
  }, []), [])

  const next = () => setPage((p) => Math.min(sheets.length, p + 1))
  const previous = () => setPage((p) => Math.max(0, p - 1))

  return (
    <div>
      <div
        className={styles.handbookWrap}
        role="group"
        tabIndex={0}
        aria-label="Interactive NGUYEN handbook"
        style={{ transform: page === 0 ? "translateX(-25%)" : page === sheets.length ? "translateX(25%)" : "translateX(0)" }}
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect()
          if (event.clientX < rect.left + rect.width / 2) previous()
          else next()
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") next()
          if (event.key === "ArrowLeft") previous()
        }}
        onPointerDown={(event) => { startX.current = event.clientX }}
        onPointerUp={(event) => {
          if (startX.current === null) return
          const delta = event.clientX - startX.current
          startX.current = null
          if (Math.abs(delta) < 35) return
          if (delta < 0) next()
          else previous()
        }}
      >
        {sheets.map(([front, back], index) => {
          const flipped = index < page
          return (
            <div
              key={front}
              className={`${styles.sheet} ${flipped ? styles.sheetFlipped : ""}`}
              style={{ zIndex: flipped ? index + 1 : 100 - index }}
            >
              <div className={`${styles.face} ${styles.front}`}><img src={front} alt="" draggable={false} /></div>
              <div className={`${styles.face} ${styles.back}`}><img src={back} alt="" draggable={false} /></div>
            </div>
          )
        })}
      </div>
      <div className={styles.handbookHint}>Click or swipe to turn pages</div>
    </div>
  )
}

export default function NativeArchitecturedPage() {
  const [openService, setOpenService] = useState(0)
  const [step, setStep] = useState(0)
  const [openFaq, setOpenFaq] = useState(0)

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={`${styles.shell} ${styles.headerInner}`}>
          <div className={styles.brand}>NGUYEN Architecture & Engineering</div>
          <nav className={styles.nav}>
            <a href="#services">Services</a><a href="#projects">Projects</a><a href="#about">About</a><a href="#process">Process</a><a href="#faq">FAQs</a>
          </nav>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.shell}>
          <div className={styles.heroGrid}>
            <div>
              <div className={styles.heroStats}>
                {[['15+','Years of experience'],['500+','Successful projects'],['2','California regions'],['100%','Focused on our clients']].map(([value,label]) => <div className={styles.stat} key={label}><strong>{value}</strong><span>{label}</span></div>)}
              </div>
              <div className={styles.heroText}>
                <p className={styles.eyebrow}>Architecture · Engineering · Permits</p>
                <h1>Architecture that connects people and places</h1>
                <p>NGUYEN Architecture & Engineering provides full-service design, engineering, code compliance and permit support for commercial, residential and ADU projects across California.</p>
                <a className={styles.button} href="mailto:info@nguyenarchitecture.com">Request Consultation <span>↗</span></a>
              </div>
            </div>
            <div className={styles.heroMedia}><img src={HERO_IMAGE} alt="Modern architecture" /></div>
          </div>
        </div>
      </section>

      <section id="services" className={`${styles.section} ${styles.dark}`}>
        <div className={styles.shell}>
          <Reveal className={styles.servicesHeader}><div><p className={styles.eyebrow}>Our Services</p><h2 className={styles.titleSmall}>One coordinated team.</h2></div><p className={`${styles.copy} ${styles.muted}`}>One coordinated team for planning, architecture, structural, MEP, code, energy compliance and permit services.</p></Reveal>
          <div className={styles.serviceList}>
            {services.map((service, index) => {
              const isOpen = openService === index
              return <div key={service.title} className={`${styles.serviceRow} ${isOpen ? styles.open : ""}`}>
                <button className={styles.serviceButton} onClick={() => setOpenService(isOpen ? -1 : index)}>
                  <span className={styles.serviceName}>{service.title}</span>
                  <span className={styles.tagList}>{service.tags.map((tag) => <span className={styles.tag} key={tag}>{tag}</span>)}</span>
                  <span className={styles.toggle}>{isOpen ? "Hide Details" : "Show Details"}<span className={styles.plus}>+</span></span>
                </button>
                <div className={styles.serviceDetails}><img src={service.image} alt="" /><p>{service.copy}</p></div>
              </div>
            })}
          </div>
        </div>
      </section>

      <section id="projects" className={styles.section}>
        <div className={styles.shell}>
          <Reveal className={styles.projectsHeader}><div><p className={styles.eyebrow}>Our Best Projects</p><h2 className={styles.titleSmall}>What we’ve been up to.</h2></div><p className={`${styles.copy} ${styles.muted}`}>Commercial experience includes cafés, restaurants, tenant improvements, remodels and new commercial buildings.</p></Reveal>
          <div className={styles.projectGrid}>{projects.map((project) => <Reveal key={project.title}><article className={styles.projectCard}><div className={styles.projectImage}><img src={project.image} alt={project.title} /></div><div className={styles.projectInfo}><div><h3 className={styles.projectTitle}>{project.title}</h3><div className={styles.meta}>{project.type}<br />{project.location}<br />{project.scope}</div></div><div className={styles.arrow}>↗</div></div></article></Reveal>)}</div>
        </div>
      </section>

      <section id="about" className={styles.section}>
        <div className={styles.shell}>
          <div className={styles.aboutGrid}>
            <Reveal><div className={styles.aboutSketch}><img src={ABOUT_SKETCH} alt="Architecture sketch" /></div></Reveal>
            <Reveal className={styles.aboutCopy}><p className={styles.eyebrow}>About NGUYEN</p><h2 className={styles.titleSmall}>One team. Complete solution.</h2><p className={`${styles.copy} ${styles.muted}`}>At NGUYEN, every project starts with a clear plan and moves through design, engineering and permit approval.</p><p className={styles.copy}>NGUYEN Architecture & Engineering provides full-service solutions from design and engineering through permit processing for commercial projects, custom homes and ADUs. Our in-house team coordinates architectural, structural, MEP and Title 24 work with local code and permit requirements.</p></Reveal>
          </div>
          <Reveal className={styles.aboutPhoto}><img src={ABOUT_PHOTO} alt="Architect working with building models" /></Reveal>
        </div>
      </section>

      <section className={`${styles.section} ${styles.dark}`}>
        <div className={styles.shell}>
          <div className={styles.differenceGrid}>
            <Reveal className={styles.differenceIntro}><p className={styles.eyebrow}>Why Choose Us</p><h2 className={styles.titleSmall}>Built on values.<br />Focused on results.</h2></Reveal>
            <div className={styles.differenceList}>{differences.map(([num,title,copy]) => <Reveal className={styles.differenceItem} key={num}><div className={styles.differenceTop}><span className={styles.differenceNum}>{num}</span><h3>{title}</h3></div><p>{copy}</p></Reveal>)}</div>
          </div>
        </div>
      </section>

      <section className={`${styles.handbookSection} ${styles.dark}`} aria-label="NGUYEN handbook">
        <Handbook />
      </section>

      <section id="process" className={styles.section}>
        <div className={styles.shell}>
          <Reveal className={styles.processHeader}><div><p className={styles.eyebrow}>Our Process</p><h2 className={styles.titleSmall}>A clear path from idea to approval.</h2></div><p className={`${styles.copy} ${styles.muted}`}>A coordinated process from the first conversation through design, engineering, permit submittal and approval.</p></Reveal>
          <div className={styles.processTabs}>
            <div className={styles.stepNav}>{processSteps.map((item,index) => <button key={item.title} className={`${styles.stepButton} ${step===index?styles.stepButtonActive:""}`} onClick={() => setStep(index)}><span>Step {index+1}</span><span>0{index+1}</span></button>)}</div>
            <div className={styles.stepCard}><div className={styles.stepImage}><img src={processSteps[step].image} alt="" /></div><div className={styles.stepCopy}><span className={styles.stepIndex}>Step 0{step+1}</span><h3>{processSteps[step].title}</h3><p>{processSteps[step].copy}</p></div></div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.dark}`}>
        <div className={styles.shell}>
          <Reveal className={styles.galleryHeader}><div><p className={styles.eyebrow}>Project Gallery</p><h2 className={styles.titleSmall}>Commercial work across California.</h2></div><p className={`${styles.copy} ${styles.muted}`}>From tenant improvements and remodels to ground-up projects, the portfolio spans a range of commercial spaces and building types.</p></Reveal>
          <div className={styles.galleryMosaic}>{gallery.map((url,index) => <figure key={url}><img src={url} alt="Architecture project" />{index===0&&<figcaption className={styles.galleryStat}><strong>500+</strong>Successful projects</figcaption>}</figure>)}</div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.shell}>
          <Reveal className={styles.projectsHeader}><div><p className={styles.eyebrow}>Project Insights</p><h2 className={styles.titleSmall}>Practical guidance, no fluff.</h2></div><p className={`${styles.copy} ${styles.muted}`}>Guidance around commercial design, engineering, code compliance, ADUs and the permit process.</p></Reveal>
          <div className={styles.insightGrid}><article className={styles.featureInsight}><img src={gallery[1]} alt="Commercial architecture" /><p className={styles.eyebrow}>Permit & Planning</p><h3>Tenant Improvement: From Site Review to Permit Approval</h3></article><div className={styles.insightList}>{[
            ["Commercial Design","What to Plan for Before Opening a Restaurant or Café"],
            ["ADU Solutions","ADU Design, Engineering & Permit — One Coordinated Team"],
            ["Code & Engineering","How Title 24, CalGreen & ADA Fit Into Your Project"],
            ["Architecture + Engineering","New Commercial Buildings: From Concept to Completion"],
          ].map(([cat,title]) => <article className={styles.insightItem} key={title}><small>{cat}</small><h4>{title}</h4></article>)}</div></div>
        </div>
      </section>

      <section id="faq" className={styles.section}>
        <div className={styles.shell}>
          <Reveal className={styles.faqHeader}><div><p className={styles.eyebrow}>Project FAQs</p><h2 className={styles.titleSmall}>Questions before you start?</h2></div><p className={`${styles.copy} ${styles.muted}`}>Questions about architecture, engineering, project types, ADUs, code compliance or permitting? Start here.</p></Reveal>
          <div className={styles.faqGrid}>
            <aside className={styles.contactCard}><h3>Tell NGUYEN about your project.</h3><input placeholder="Name" /><input placeholder="Phone" /><input placeholder="Email" /><textarea placeholder="Message" /><a className={styles.button} href="mailto:info@nguyenarchitecture.com">Email NGUYEN ↗</a></aside>
            <div className={styles.faqList}>{faqs.map(([question,answer],index) => <div key={question} className={`${styles.faqItem} ${openFaq===index?styles.faqOpen:""}`}><button className={styles.faqQuestion} onClick={() => setOpenFaq(openFaq===index?-1:index)}><span>{question}</span><span>{openFaq===index?"−":"+"}</span></button><div className={styles.faqAnswer}><p>{answer}</p></div></div>)}</div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <div className={styles.footerTop}><p className={styles.footerLead}>Full-service architecture, engineering, Title 24, code compliance and permitting for commercial projects, custom homes and ADUs across Northern and Southern California.</p><div className={styles.footerCol}><h4>Phone</h4><a href="tel:+12092338888">(209) 233-8888</a><a href="tel:+17147078889">(714) 707-8889</a></div><div className={styles.footerCol}><h4>Email / Web</h4><a href="mailto:info@nguyenarchitecture.com">info@nguyenarchitecture.com</a><p>www.nguyenarchitecture.com</p></div><div className={styles.footerCol}><h4>Address</h4><p>7171 Warner Ave. Ste. B<br />Huntington Beach, CA 92647</p></div></div>
          <div className={styles.footerBottom}><span>© NGUYEN Architecture & Engineering</span><span>Architecture · Engineering · Design · Permit</span></div>
        </div>
      </footer>
      <div className={styles.chat} aria-hidden="true">▰</div>
    </main>
  )
}
