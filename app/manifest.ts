import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Designed by TD — Orange County Web Design',
    short_name: 'Designed by TD',
    description:
      'Custom, mobile-friendly websites for Orange County small businesses.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fafafa',
    theme_color: '#121212',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
