'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { DemoCategorySync } from '@/components/demo-category-sync'

const EcommerceGalleryAutoScroll = dynamic(
  () =>
    import('@/components/ecommerce-gallery-autoscroll').then(
      (module) => module.EcommerceGalleryAutoScroll,
    ),
  { ssr: false },
)

const categoryByDemoPath: Record<string, string> = {
  '/portfolio/photography-studio': 'Portfolio',
  '/portfolio/auto-repair-shop': 'Restaurant',
  '/portfolio/salon-spa': 'Scheduling',
  '/portfolio/restaurant-website': 'Custom Website',
}

export function EcommerceGalleryAutoScrollLoader() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== '/') return

    const handleClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (!target.closest('#portfolio')) return

      const link = target.closest<HTMLAnchorElement>('a')
      if (!link) return

      const href = link.getAttribute('href') ?? ''
      const category = categoryByDemoPath[href]
      if (!category) return

      link.setAttribute('href', `/demos?category=${encodeURIComponent(category)}`)
      event.stopImmediatePropagation()
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [pathname])

  if (pathname === '/demos') return <DemoCategorySync />
  if (pathname !== '/services/ecommerce') return null

  return <EcommerceGalleryAutoScroll />
}
