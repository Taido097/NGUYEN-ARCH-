import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AlexKabiruDemo } from '@/components/alex-kabiru-demo';
import { BeanroCoffeeDemo } from '@/components/beanro-coffee-demo';
import { PhotographyEditorialDemo } from '@/components/photography-editorial-demo';
import { RestaurantQitchenDemo } from '@/components/restaurant-qitchen-demo';
import { SalonSpaDemo } from '@/components/salon-spa-demo';

const slugs = [
  'photography-studio',
  'auto-repair-shop',
  'salon-spa',
  'restaurant-website',
  'minimal-portfolio',
] as const;

const demoSeo: Record<
  (typeof slugs)[number],
  { title: string; description: string }
> = {
  'photography-studio': {
    title: 'Photography Portfolio Website Demo',
    description:
      'Live photography portfolio website demo by Designed by TD, showcasing an editorial layout for photographers and creative studios.',
  },
  'auto-repair-shop': {
    title: 'Coffee Shop & eCommerce Website Demo',
    description:
      'Live coffee shop website demo by Designed by TD, showing an expressive eCommerce-style direction for hospitality and retail brands.',
  },
  'salon-spa': {
    title: 'Salon Booking & Scheduling Website Demo',
    description:
      'Live salon and beauty website demo by Designed by TD, featuring a polished layout suited to services, appointments, and scheduling.',
  },
  'restaurant-website': {
    title: 'Restaurant Website Demo',
    description:
      'Live restaurant website demo by Designed by TD, showcasing an immersive dining experience for menus, reservations, and hospitality brands.',
  },
  'minimal-portfolio': {
    title: 'Minimal Designer Portfolio Website Demo',
    description:
      'Live minimal designer portfolio demo by Designed by TD, featuring oversized typography, selected work, services, process, and editorial presentation.',
  },
};

export async function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (!slugs.includes(slug as (typeof slugs)[number])) {
    return {};
  }

  const seo = demoSeo[slug as (typeof slugs)[number]];
  const url = `https://designedbytd.com/portfolio/${slug}`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      url,
      siteName: 'Designed by TD',
      images: ['/icon.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/icon.png'],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!slugs.includes(slug as (typeof slugs)[number])) {
    notFound();
  }

  if (slug === 'photography-studio') {
    return <PhotographyEditorialDemo />;
  }

  if (slug === 'auto-repair-shop') {
    return <BeanroCoffeeDemo />;
  }

  if (slug === 'salon-spa') {
    return <SalonSpaDemo />;
  }

  if (slug === 'minimal-portfolio') {
    return <AlexKabiruDemo />;
  }

  return <RestaurantQitchenDemo />;
}
