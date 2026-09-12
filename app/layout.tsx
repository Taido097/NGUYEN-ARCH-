import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { EcommerceGalleryAutoScrollLoader } from '@/components/ecommerce-gallery-autoscroll-loader'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://designedbytd.com'),
  title: {
    default: 'Orange County Web Design | Designed by TD',
    template: '%s | Designed by TD',
  },
  description:
    'Custom, mobile-friendly web design for Orange County small businesses, including portfolio, restaurant, scheduling, eCommerce, and custom website builds.',
  applicationName: 'Designed by TD',
  authors: [{ name: 'Tai Do', url: 'https://designedbytd.com' }],
  creator: 'Designed by TD',
  publisher: 'Designed by TD',
  category: 'web design',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/apple-icon.png',
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'Orange County Web Design | Designed by TD',
    description:
      'Custom, mobile-friendly websites for Orange County small businesses, with real demos and packages starting at $500.',
    type: 'website',
    locale: 'en_US',
    url: 'https://designedbytd.com/',
    siteName: 'Designed by TD',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orange County Web Design | Designed by TD',
    description:
      'Custom, mobile-friendly websites for Orange County small businesses, with real demos and packages starting at $500.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://designedbytd.com/#website',
        url: 'https://designedbytd.com/',
        name: 'Designed by TD',
        alternateName: 'DesignedbyTD Studio',
        inLanguage: 'en-US',
        publisher: {
          '@id': 'https://designedbytd.com/#business',
        },
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://designedbytd.com/#business',
        name: 'Designed by TD',
        alternateName: 'DesignedbyTD Studio',
        url: 'https://designedbytd.com/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://designedbytd.com/apple-icon.png',
          contentUrl: 'https://designedbytd.com/apple-icon.png',
          width: 180,
          height: 180,
          caption: 'Designed by TD logo',
        },
        image: 'https://designedbytd.com/apple-icon.png',
        description:
          'Custom, mobile-friendly website design for small businesses in Orange County, California.',
        email: 'designedbytd.studio@gmail.com',
        priceRange: '$500+',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: 'designedbytd.studio@gmail.com',
          availableLanguage: ['English', 'Vietnamese'],
        },
        areaServed: [
          {
            '@type': 'AdministrativeArea',
            name: 'Orange County, California',
          },
          {
            '@type': 'City',
            name: 'Irvine, California',
          },
          {
            '@type': 'City',
            name: 'Anaheim, California',
          },
          {
            '@type': 'City',
            name: 'Costa Mesa, California',
          },
          {
            '@type': 'City',
            name: 'Huntington Beach, California',
          },
          {
            '@type': 'City',
            name: 'Garden Grove, California',
          },
          {
            '@type': 'City',
            name: 'Westminster, California',
          },
          {
            '@type': 'City',
            name: 'Santa Ana, California',
          },
          {
            '@type': 'City',
            name: 'Tustin, California',
          },
        ],
        knowsAbout: [
          'Custom web design',
          'Small business websites',
          'Responsive web design',
          'Restaurant websites',
          'Portfolio websites',
          'Booking and scheduling websites',
          'Website redesign',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Website Design Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Custom Website Design',
                serviceType: 'Custom website design',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Portfolio Website Design',
                serviceType: 'Portfolio website design',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Restaurant Website Design',
                serviceType: 'Restaurant and food business website design',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Scheduling Website Design',
                serviceType: 'Booking and scheduling website design',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Responsive Small Business Web Design',
                serviceType: 'Responsive and mobile-friendly small business website design',
              },
            },
          ],
        },
      },
    ],
  }

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "y1ehpsj3u0");
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <EcommerceGalleryAutoScrollLoader />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
