import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ClientDemoAccessForm } from '@/components/client-demo-access-form';

export const metadata: Metadata = {
  title: 'Client Demo | DesignedbyTD Studio',
  description: 'Enter your private DesignedbyTD client demo code to view your website preview.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ClientDemoPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#121212]">
      <Header />
      <main className="min-h-[calc(100vh-160px)] pt-[104px] sm:pt-[122px] lg:pt-[136px]">
        <section className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="border-t border-black/10 pt-7 sm:pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-black/45">Client access</p>
            <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,460px)] lg:items-end">
              <div>
                <h1 className="max-w-[900px] text-[clamp(3.2rem,7vw,7rem)] font-medium leading-[.88] tracking-[-0.065em]">
                  View your website demo.
                </h1>
                <p className="mt-7 max-w-[620px] text-base font-light leading-[1.55] text-black/60 sm:text-lg">
                  Enter the private code provided by DesignedbyTD Studio to open the website preview prepared for your business.
                </p>
                <ClientDemoAccessForm />
              </div>

              <div className="border-t border-black/10 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40">How it works</p>
                <div className="mt-5 space-y-5 text-sm leading-relaxed text-black/60">
                  <p><span className="mr-3 text-black">01</span>Enter the demo code sent to you.</p>
                  <p><span className="mr-3 text-black">02</span>Your custom website preview opens immediately.</p>
                  <p><span className="mr-3 text-black">03</span>Review the design on desktop or mobile and send feedback.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
