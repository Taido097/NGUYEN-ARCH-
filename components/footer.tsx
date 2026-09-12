import Link from 'next/link';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { label: 'Home', href: '/' },
        { label: 'All Demos', href: '/demos' },
        { label: 'Services', href: '/#portfolio' },
        { label: 'Pricing', href: '/#pricing' },
        { label: 'FAQ', href: '/#faq' },
      ],
    },
    {
      title: 'Local Web Design',
      links: [
        { label: 'Orange County Web Design', href: '/orange-county-web-design' },
        { label: 'Garden Grove Web Design', href: '/web-design-garden-grove' },
        { label: 'Irvine Web Design', href: '/web-design-irvine' },
        { label: 'Small Business Web Design', href: '/small-business-web-design' },
        { label: 'Affordable Web Design', href: '/affordable-web-design' },
      ],
    },
    {
      title: 'Get Started',
      links: [
        { label: 'Request a Website', href: '/contact' },
        { label: 'View Work', href: '/demos' },
        { label: 'See Pricing', href: '/#pricing' },
        { label: 'About', href: '/#about' },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#121212] text-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Link
          href="/"
          className="inline-block text-[clamp(2.8rem,5vw,4.5rem)] font-medium leading-[.9] tracking-[-0.06em] text-white"
        >
          DesignedbyTD Studio
        </Link>

        <div className="mt-12 grid gap-10 border-t border-white/15 pt-8 md:grid-cols-4 md:gap-8">
          <div>
            <p className="max-w-[34ch] text-sm font-light leading-relaxed text-white/60">
              Custom web design for Orange County business owners who want a clean, professional, mobile-friendly website.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <a
                href="mailto:designedbytd.studio@gmail.com"
                className="text-sm font-light text-white/55 transition-colors hover:text-white"
              >
                designedbytd.studio@gmail.com
              </a>
              <p className="text-sm font-light text-white/40">Orange County, CA</p>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
                {section.title}
              </h4>
              <ul className="mt-5 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-light text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-7 sm:flex-row sm:items-center">
          <p className="text-xs font-light text-white/35">
            © {currentYear} DesignedbyTD Studio. All rights reserved.
          </p>
          <a
            href="#hero"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/55 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
