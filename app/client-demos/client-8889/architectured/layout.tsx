import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'NGUYEN Architecture & Engineering — Concept 04',
  description:
    'Private client demo for NGUYEN Architecture & Engineering featuring commercial, residential, ADU, engineering and permit services.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: 'NGUYEN Architecture & Engineering — Concept 04',
    description:
      'Architecture, engineering and permit solutions for commercial, residential and ADU projects.',
    type: 'website',
  },
};

export default function NguyenConcept04Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        section[aria-label="NGUYEN handbook"] {
          min-height: 900px !important;
          padding: 88px 24px 110px !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 34px !important;
          overflow: hidden !important;
        }

        section[aria-label="NGUYEN handbook"]::before {
          content: "NGUYEN PROJECT HANDBOOK";
          display: block;
          width: min(1180px, 100%);
          margin: 0 auto 6px;
          color: #f3f0e9;
          font-family: Arial, Helvetica, sans-serif;
          font-size: clamp(13px, 1.15vw, 17px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: .16em;
          text-align: center;
        }

        section[aria-label="NGUYEN handbook"] > div {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        section[aria-label="NGUYEN handbook"] [role="group"] {
          width: min(88vw, 940px) !important;
          max-width: 940px !important;
        }

        @media (max-width: 700px) {
          section[aria-label="NGUYEN handbook"] {
            min-height: 590px !important;
            padding: 62px 10px 72px !important;
            gap: 22px !important;
          }

          section[aria-label="NGUYEN handbook"] [role="group"] {
            width: min(96vw, 620px) !important;
          }
        }
      `}</style>
      {children}
    </>
  );
}
