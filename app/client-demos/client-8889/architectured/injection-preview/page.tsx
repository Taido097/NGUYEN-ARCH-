"use client"

import { useCallback, useEffect, useRef, useState } from "react"

const PAGES = [
  "https://framerusercontent.com/images/QDQKylWWIf9VYDvFE8d8MTxUJ1o.png",
  "https://framerusercontent.com/images/cwOkVnjxy6x4U3eWGZEKmj7BBgo.jpg?scale-down-to=1024&width=768&height=1086",
  "https://framerusercontent.com/images/OhGj99mJnab8DPy2PMfd98jhF6I.jpg?scale-down-to=1024&width=768&height=1086",
  "https://framerusercontent.com/images/lAU1MDwSV1dq0S6amUC8jsOg.jpg?scale-down-to=1024&width=768&height=1086",
  "https://framerusercontent.com/images/hv0I9A0DXUdvIK6c42B46rsfzg.jpg?scale-down-to=1024&width=768&height=1086",
  "https://framerusercontent.com/images/cKChIxjzaNsc5t2NxVN78mx8Q.png?scale-down-to=1024&width=768&height=1086",
  "https://framerusercontent.com/images/hFP2svt3lNsx1A9P1zA6bFzdWM.png?scale-down-to=1024&width=768&height=1086",
  "https://framerusercontent.com/images/7q3XJntgf3apOgAI7m0Yai1Mz0.png?scale-down-to=1024&width=768&height=1086",
]

const STYLE_ID = "td-framer-handbook-preview-style"
const HOST_ATTR = "data-td-framer-handbook-host"
const ROOT_ATTR = "data-td-framer-handbook"

const INJECTION_CSS = `
  [${HOST_ATTR}="true"] {
    min-height: clamp(720px, 72vw, 980px) !important;
    width: 100% !important;
    max-width: none !important;
    padding: clamp(76px, 7vw, 112px) clamp(16px, 3vw, 52px) !important;
    margin: 0 !important;
    background: #1f1e1a !important;
    color: #f3f0e9 !important;
    position: relative !important;
    overflow: hidden !important;
    box-sizing: border-box !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  [${HOST_ATTR}="true"] > *:not([${ROOT_ATTR}="true"]) {
    display: none !important;
    visibility: hidden !important;
  }

  [${ROOT_ATTR}="true"] {
    display: flex !important;
    width: min(1180px, 100%) !important;
    min-height: 620px !important;
    margin: 0 auto !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    position: relative !important;
    z-index: 2147483000 !important;
    visibility: visible !important;
    opacity: 1 !important;
    font-family: Arial, Helvetica, sans-serif !important;
    box-sizing: border-box !important;
  }

  .td-preview-kicker {
    margin: 0 0 18px !important;
    color: #b9b2a8 !important;
    font-size: 11px !important;
    line-height: 1 !important;
    letter-spacing: .16em !important;
    text-transform: uppercase !important;
    text-align: center !important;
  }

  .td-preview-title {
    margin: 0 0 clamp(38px, 5vw, 64px) !important;
    color: #f3f0e9 !important;
    font-size: clamp(36px, 5vw, 76px) !important;
    line-height: .92 !important;
    letter-spacing: -.055em !important;
    font-weight: 700 !important;
    text-align: center !important;
  }

  .td-preview-book-shell {
    width: min(920px, 84vw) !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    visibility: visible !important;
  }

  .td-preview-book {
    width: 100% !important;
    aspect-ratio: 10 / 7 !important;
    position: relative !important;
    perspective: 2000px !important;
    transform-style: preserve-3d !important;
    transition: transform .7s cubic-bezier(.44,0,.56,1) !important;
    touch-action: pan-y !important;
    user-select: none !important;
    cursor: pointer !important;
    outline: none !important;
    visibility: visible !important;
  }

  .td-preview-book::after {
    content: "" !important;
    position: absolute !important;
    left: 50% !important;
    top: 1% !important;
    bottom: 1% !important;
    width: 2px !important;
    transform: translateX(-50%) !important;
    z-index: 999 !important;
    pointer-events: none !important;
    background: linear-gradient(180deg, rgba(255,255,255,.25), rgba(0,0,0,.55), rgba(255,255,255,.2)) !important;
    box-shadow: 0 0 18px rgba(0,0,0,.28) !important;
  }

  .td-preview-sheet {
    position: absolute !important;
    left: 50% !important;
    top: 0 !important;
    width: 50% !important;
    height: 100% !important;
    transform-origin: left center !important;
    transform-style: preserve-3d !important;
    transition: transform .7s cubic-bezier(.44,0,.56,1) !important;
    will-change: transform !important;
    visibility: visible !important;
  }

  .td-preview-sheet.is-flipped {
    transform: rotateY(-180deg) !important;
  }

  .td-preview-face {
    position: absolute !important;
    inset: 0 !important;
    overflow: hidden !important;
    backface-visibility: hidden !important;
    -webkit-backface-visibility: hidden !important;
    background: #fff !important;
    box-shadow: 0 28px 70px rgba(0,0,0,.38) !important;
    visibility: visible !important;
  }

  .td-preview-face.front {
    transform: rotateY(0deg) !important;
    border-radius: 2px 9px 9px 2px !important;
  }

  .td-preview-face.back {
    transform: rotateY(180deg) !important;
    border-radius: 9px 2px 2px 9px !important;
  }

  .td-preview-face img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    display: block !important;
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: none !important;
  }

  .td-preview-controls {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 18px !important;
    margin-top: 30px !important;
    color: #f3f0e9 !important;
    visibility: visible !important;
  }

  .td-preview-control {
    width: 50px !important;
    height: 50px !important;
    border: 1px solid rgba(243,240,233,.5) !important;
    border-radius: 999px !important;
    padding: 0 !important;
    background: transparent !important;
    color: #f3f0e9 !important;
    display: grid !important;
    place-items: center !important;
    font: 400 22px/1 Arial, sans-serif !important;
    cursor: pointer !important;
    visibility: visible !important;
  }

  .td-preview-control:hover:not(:disabled) {
    background: #f3f0e9 !important;
    color: #1f1e1a !important;
  }

  .td-preview-control:disabled {
    opacity: .3 !important;
    cursor: default !important;
  }

  .td-preview-indicator {
    min-width: 92px !important;
    color: #f3f0e9 !important;
    font-size: 11px !important;
    line-height: 1 !important;
    letter-spacing: .14em !important;
    text-align: center !important;
    text-transform: uppercase !important;
    visibility: visible !important;
  }

  .td-preview-help {
    margin-top: 18px !important;
    color: #9f988f !important;
    font-size: 10px !important;
    line-height: 1.35 !important;
    letter-spacing: .14em !important;
    text-align: center !important;
    text-transform: uppercase !important;
    visibility: visible !important;
  }

  @media (max-width: 700px) {
    [${HOST_ATTR}="true"] {
      min-height: 610px !important;
      padding: 64px 10px !important;
    }
    [${ROOT_ATTR}="true"] { min-height: 500px !important; }
    .td-preview-title { margin-bottom: 34px !important; }
    .td-preview-book-shell { width: min(96vw, 620px) !important; }
    .td-preview-controls { margin-top: 22px !important; }
  }
`

function normalize(value: string | null | undefined) {
  return (value || "").toLowerCase().replace(/\s+/g, " ").trim()
}

function findTestimonialHost(doc: Document) {
  const quoteNeedle = "pinterest board full of ideas"
  const authorNeedle = "orion caldwell"
  const elements = Array.from(doc.querySelectorAll<HTMLElement>("body *"))
  const anchors = elements.filter((element) => {
    const text = normalize(element.innerText || element.textContent)
    return text.includes(quoteNeedle) || text.includes(authorNeedle)
  })

  const candidates = new Set<HTMLElement>()

  anchors.forEach((anchor) => {
    let node: HTMLElement | null = anchor
    for (let depth = 0; node && depth < 15; depth += 1, node = node.parentElement) {
      const text = normalize(node.innerText || node.textContent)
      if (!text.includes(quoteNeedle) || !text.includes(authorNeedle)) continue
      const rect = node.getBoundingClientRect()
      if (rect.width < 280 || rect.height < 220) continue
      candidates.add(node)
    }
  })

  const ranked = Array.from(candidates).sort((a, b) => {
    const ar = a.getBoundingClientRect()
    const br = b.getBoundingClientRect()
    const aScore = ar.width * ar.height
    const bScore = br.width * br.height
    return aScore - bScore
  })

  if (!ranked.length) return null

  // Start from the smallest common wrapper, then prefer a parent that captures
  // the full visual testimonial block (large image + quote + avatar row).
  let host = ranked[0]
  const viewportWidth = doc.defaultView?.innerWidth || 1200
  for (let i = 0; i < 5 && host.parentElement; i += 1) {
    const parent = host.parentElement
    const rect = parent.getBoundingClientRect()
    const text = normalize(parent.innerText || parent.textContent)
    if (!text.includes(quoteNeedle) || !text.includes(authorNeedle)) break
    if (rect.width >= Math.min(760, viewportWidth * 0.7) && rect.height >= 420) {
      host = parent
      break
    }
    host = parent
  }

  return host
}

function buildHandbook(doc: Document, host: HTMLElement) {
  doc.getElementById(STYLE_ID)?.remove()
  const style = doc.createElement("style")
  style.id = STYLE_ID
  style.textContent = INJECTION_CSS
  doc.head.appendChild(style)

  host.setAttribute(HOST_ATTR, "true")
  host.querySelector(`[${ROOT_ATTR}="true"]`)?.remove()

  const root = doc.createElement("div")
  root.setAttribute(ROOT_ATTR, "true")
  root.innerHTML = `
    <div class="td-preview-kicker">NGUYEN Architecture &amp; Engineering</div>
    <div class="td-preview-title">Interactive Handbook</div>
    <div class="td-preview-book-shell">
      <div class="td-preview-book" tabindex="0" role="group" aria-label="Interactive 3D handbook"></div>
      <div class="td-preview-controls">
        <button class="td-preview-control td-preview-prev" type="button" aria-label="Previous pages">←</button>
        <div class="td-preview-indicator">Cover · 1 / ${PAGES.length}</div>
        <button class="td-preview-control td-preview-next" type="button" aria-label="Next pages">→</button>
      </div>
      <div class="td-preview-help">Click either side · swipe · or use keyboard arrows</div>
    </div>
  `
  host.appendChild(root)

  const stage = root.querySelector<HTMLElement>(".td-preview-book")!
  const indicator = root.querySelector<HTMLElement>(".td-preview-indicator")!
  const previousButton = root.querySelector<HTMLButtonElement>(".td-preview-prev")!
  const nextButton = root.querySelector<HTMLButtonElement>(".td-preview-next")!
  const sheets: HTMLElement[] = []

  for (let i = 0; i < PAGES.length; i += 2) {
    const sheet = doc.createElement("div")
    sheet.className = "td-preview-sheet"
    sheet.innerHTML = `
      <div class="td-preview-face front"><img src="${PAGES[i]}" alt="Handbook page ${i + 1}" draggable="false"></div>
      <div class="td-preview-face back"><img src="${PAGES[i + 1]}" alt="Handbook page ${i + 2}" draggable="false"></div>
    `
    stage.appendChild(sheet)
    sheets.push(sheet)
  }

  let spread = 0
  let pointerStart: number | null = null

  const render = () => {
    sheets.forEach((sheet, index) => {
      const flipped = index < spread
      sheet.classList.toggle("is-flipped", flipped)
      sheet.style.zIndex = flipped ? String(index + 1) : String(100 - index)
    })

    stage.style.transform = spread === 0
      ? "translateX(-25%)"
      : spread === sheets.length
        ? "translateX(25%)"
        : "translateX(0)"

    if (spread === 0) indicator.textContent = `Cover · 1 / ${PAGES.length}`
    else if (spread === sheets.length) indicator.textContent = `Back · ${PAGES.length} / ${PAGES.length}`
    else indicator.textContent = `${spread * 2}–${spread * 2 + 1} / ${PAGES.length}`

    previousButton.disabled = spread === 0
    nextButton.disabled = spread === sheets.length
  }

  const next = () => {
    spread = Math.min(sheets.length, spread + 1)
    render()
  }

  const previous = () => {
    spread = Math.max(0, spread - 1)
    render()
  }

  previousButton.addEventListener("click", (event) => {
    event.preventDefault()
    event.stopPropagation()
    previous()
  })

  nextButton.addEventListener("click", (event) => {
    event.preventDefault()
    event.stopPropagation()
    next()
  })

  stage.addEventListener("click", (event) => {
    const rect = stage.getBoundingClientRect()
    if ((event as MouseEvent).clientX < rect.left + rect.width / 2) previous()
    else next()
  })

  stage.addEventListener("keydown", (event) => {
    const keyboardEvent = event as KeyboardEvent
    if (keyboardEvent.key === "ArrowLeft") {
      keyboardEvent.preventDefault()
      previous()
    }
    if (keyboardEvent.key === "ArrowRight") {
      keyboardEvent.preventDefault()
      next()
    }
  })

  stage.addEventListener("pointerdown", (event) => {
    pointerStart = (event as PointerEvent).clientX
  })

  stage.addEventListener("pointerup", (event) => {
    if (pointerStart === null) return
    const delta = (event as PointerEvent).clientX - pointerStart
    pointerStart = null
    if (Math.abs(delta) < 35) return
    if (delta < 0) next()
    else previous()
  })

  render()
  return root
}

function injectHandbook(frame: HTMLIFrameElement) {
  const doc = frame.contentDocument
  if (!doc?.body || !doc.head) return { ok: false, reason: "iframe-not-ready" }

  const existing = doc.querySelector<HTMLElement>(`[${ROOT_ATTR}="true"]`)
  if (existing) return { ok: true, root: existing }

  const host = findTestimonialHost(doc)
  if (!host) return { ok: false, reason: "testimonial-not-found" }

  const root = buildHandbook(doc, host)
  return { ok: true, root }
}

export default function InjectionPreviewPage() {
  const frameRef = useRef<HTMLIFrameElement>(null)
  const retryTimers = useRef<number[]>([])
  const [status, setStatus] = useState<"loading" | "searching" | "success" | "error">("loading")
  const [detail, setDetail] = useState("Loading the actual Framer Concept 04…")

  const clearRetries = useCallback(() => {
    retryTimers.current.forEach((timer) => window.clearTimeout(timer))
    retryTimers.current = []
  }, [])

  const runInjection = useCallback(() => {
    const frame = frameRef.current
    if (!frame) return false

    try {
      const result = injectHandbook(frame)
      if (!result.ok) {
        setStatus("searching")
        setDetail(result.reason === "testimonial-not-found"
          ? "Finding ORION CALDWELL testimonial…"
          : "Waiting for Framer to finish loading…")
        return false
      }

      setStatus("success")
      setDetail("HANDBOOK INJECTED ✓ · ORION testimonial replaced")
      result.root?.scrollIntoView({ behavior: "smooth", block: "center" })
      return true
    } catch (error) {
      setStatus("error")
      setDetail(`Injection error: ${error instanceof Error ? error.message : "unknown error"}`)
      return false
    }
  }, [])

  const scheduleInjection = useCallback(() => {
    clearRetries()
    setStatus("searching")
    setDetail("Waiting for Framer, then replacing ORION testimonial…")

    const delays = [100, 350, 800, 1400, 2300, 3600, 5200, 7500]
    delays.forEach((delay, index) => {
      const timer = window.setTimeout(() => {
        if (runInjection()) {
          clearRetries()
          return
        }
        if (index === delays.length - 1) {
          setStatus("error")
          setDetail("HANDBOOK NOT INJECTED ✕ · ORION testimonial was not found")
        }
      }, delay)
      retryTimers.current.push(timer)
    })
  }, [clearRetries, runInjection])

  useEffect(() => clearRetries, [clearRetries])

  const badgeBackground = status === "success"
    ? "#167a42"
    : status === "error"
      ? "#b42318"
      : "rgba(0,0,0,.86)"

  return (
    <main style={{ margin: 0, width: "100vw", height: "100vh", overflow: "hidden", background: "#111" }}>
      <div
        style={{
          position: "fixed",
          zIndex: 2147483647,
          top: 14,
          left: "50%",
          transform: "translateX(-50%)",
          maxWidth: "calc(100vw - 28px)",
          padding: "11px 17px",
          borderRadius: 999,
          background: badgeBackground,
          color: "white",
          font: "700 12px/1.15 Arial, sans-serif",
          letterSpacing: ".035em",
          textAlign: "center",
          boxShadow: "0 8px 30px rgba(0,0,0,.32)",
          whiteSpace: "nowrap",
        }}
      >
        {detail} · PREVIEW ONLY
      </div>

      <iframe
        ref={frameRef}
        title="Concept 04 Framer handbook code injection preview"
        src="/client-demos/client-8889/architectured/optimized"
        onLoad={scheduleInjection}
        style={{ display: "block", width: "100%", height: "100%", border: 0, background: "#1f1e1a" }}
      />
    </main>
  )
}
