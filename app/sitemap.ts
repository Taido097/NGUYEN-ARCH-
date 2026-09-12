import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://designedbytd.com';
  const lastModified = new Date('2026-08-17T19:45:00.000Z');

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
    },
    {
      url: `${baseUrl}/orange-county-web-design`,
      lastModified,
    },
    {
      url: `${baseUrl}/web-design-garden-grove`,
      lastModified,
    },
    {
      url: `${baseUrl}/web-design-irvine`,
      lastModified,
    },
    {
      url: `${baseUrl}/small-business-web-design`,
      lastModified,
    },
    {
      url: `${baseUrl}/affordable-web-design`,
      lastModified,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
    },
    {
      url: `${baseUrl}/demos`,
      lastModified,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
    },
  ];
}
