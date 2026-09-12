import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AllDemosGallery } from '@/components/all-demos-gallery';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Website Design Portfolio & Live Demos',
  description:
    'Browse live website demos by Designed by TD for photography portfolios, salon scheduling, restaurants, coffee shops, creative agencies, and personal portfolio websites.',
  alternates: {
    canonical: 'https://designedbytd.com/demos',
  },
  openGraph: {
    title: 'Website Design Portfolio & Live Demos',
    description:
      'Explore live website examples across portfolio, scheduling, restaurant, coffee shop, creative agency, and personal-brand projects by Designed by TD.',
    type: 'website',
    url: 'https://designedbytd.com/demos',
    siteName: 'Designed by TD',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Design Portfolio & Live Demos',
    description:
      'Explore live website examples across portfolio, scheduling, restaurant, coffee shop, creative agency, and personal-brand projects.',
  },
};

export default function DemosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#fafafa] text-[#121212]">
        <section className="pt-32 sm:pt-36 lg:pt-40">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <div className="pb-12 sm:pb-14 lg:pb-16">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-black/35">
                DesignedbyTD
              </p>
              <h1 className="mt-5 max-w-[920px] text-[clamp(4rem,8vw,7.5rem)] font-medium leading-[.88] tracking-[-0.065em]">
                All Demos
              </h1>
              <p className="mt-7 max-w-[560px] text-base font-light leading-[1.5] tracking-[-0.02em] text-black/60 sm:text-lg">
                Explore live website directions for different types of businesses. Each preview automatically scrolls through the real demo so you can see more than just the first screen.
              </p>
            </div>
          </div>
        </section>

        <AllDemosGallery />
      </main>
      <Footer />
    </>
  );
}
