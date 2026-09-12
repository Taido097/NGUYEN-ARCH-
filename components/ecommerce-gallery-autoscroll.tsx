'use client'

import { useEffect } from 'react'

export function EcommerceGalleryAutoScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const gallery = document.querySelector<HTMLElement>(
      '#samples .snap-x.overflow-x-auto',
    )

    if (!gallery || gallery.dataset.autoScrollReady === 'true') return

    gallery.dataset.autoScrollReady = 'true'
    gallery.style.scrollSnapType = 'none'
    gallery.style.scrollBehavior = 'auto'

    const originalCards = Array.from(gallery.children) as HTMLElement[]
    const clones = originalCards.map((card) => {
      const clone = card.cloneNode(true) as HTMLElement
      clone.setAttribute('aria-hidden', 'true')
      clone.dataset.autoScrollClone = 'true'
      gallery.appendChild(clone)
      return clone
    })

    let paused = false
    let frameId = 0
    let previousTime = performance.now()
    const speed = 36

    const pause = () => {
      paused = true
    }

    const resume = () => {
      paused = false
      previousTime = performance.now()
    }

    gallery.addEventListener('mouseenter', pause)
    gallery.addEventListener('mouseleave', resume)
    gallery.addEventListener('focusin', pause)
    gallery.addEventListener('focusout', resume)
    gallery.addEventListener('pointerdown', pause)
    gallery.addEventListener('pointerup', resume)
    gallery.addEventListener('pointercancel', resume)

    const move = (time: number) => {
      const elapsed = Math.min(time - previousTime, 40)
      previousTime = time

      if (!paused) {
        gallery.scrollLeft += (speed * elapsed) / 1000

        const loopPoint = gallery.scrollWidth / 2
        if (gallery.scrollLeft >= loopPoint) {
          gallery.scrollLeft -= loopPoint
        }
      }

      frameId = requestAnimationFrame(move)
    }

    frameId = requestAnimationFrame(move)

    return () => {
      cancelAnimationFrame(frameId)
      gallery.removeEventListener('mouseenter', pause)
      gallery.removeEventListener('mouseleave', resume)
      gallery.removeEventListener('focusin', pause)
      gallery.removeEventListener('focusout', resume)
      gallery.removeEventListener('pointerdown', pause)
      gallery.removeEventListener('pointerup', resume)
      gallery.removeEventListener('pointercancel', resume)
      clones.forEach((clone) => clone.remove())
      delete gallery.dataset.autoScrollReady
      gallery.style.scrollSnapType = ''
      gallery.style.scrollBehavior = ''
    }
  }, [])

  return null
}
