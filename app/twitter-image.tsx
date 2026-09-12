import { ImageResponse } from 'next/og';

export const alt = 'Designed by TD — Orange County Web Design';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f5f5f0',
          color: '#181818',
          padding: '54px 64px',
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            fontSize: 24,
            letterSpacing: '-0.02em',
          }}
        >
          <div style={{ display: 'flex' }}>DESIGNED BY TD</div>
          <div style={{ display: 'flex', opacity: 0.62 }}>ORANGE COUNTY · CA</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 1000 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 94,
              lineHeight: 0.92,
              letterSpacing: '-0.065em',
              fontWeight: 700,
            }}
          >
            Websites built to make every visit count.
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.25,
              opacity: 0.68,
            }}
          >
            Custom, mobile-friendly web design for local businesses.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            fontSize: 22,
          }}
        >
          <div style={{ display: 'flex' }}>designedbytd.com</div>
          <div style={{ display: 'flex', opacity: 0.62 }}>WEB DESIGN · DEVELOPMENT · SUPPORT</div>
        </div>
      </div>
    ),
    size,
  );
}
