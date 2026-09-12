import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get a Website Quote in Orange County',
  description:
    'Contact Designed by TD for a custom website quote in Orange County. Ask about portfolio, eCommerce, scheduling, lead-capture, or custom small-business websites starting at $500.',
  alternates: {
    canonical: 'https://designedbytd.com/contact',
  },
  openGraph: {
    title: 'Get a Website Quote in Orange County',
    description:
      'Tell Designed by TD about your business and get a quote for a custom small-business website in Orange County.',
    type: 'website',
    url: 'https://designedbytd.com/contact',
    siteName: 'Designed by TD',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get a Website Quote in Orange County',
    description:
      'Request a quote for a custom portfolio, eCommerce, scheduling, lead-capture, or small-business website.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
