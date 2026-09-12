export type ServiceDemo = {
  title: string;
  category: string;
  image: string;
};

export type ServiceProduct = {
  slug: string;
  title: string;
  label: string;
  description: string;
  image: string;
  previewTitle: string;
  heroTitle: string;
  heroDescription: string;
  features: string[];
  demos: ServiceDemo[];
};

export const serviceProducts: ServiceProduct[] = [
  {
    slug: 'custom-website',
    title: 'Custom Website',
    label: 'Local business website',
    description:
      'Includes a custom home page, service pages, mobile-friendly design, contact form, and basic search setup.',
    image: '/portfolio-auto-repair.jpg',
    previewTitle: 'Make a strong first impression online.',
    heroTitle: 'A custom website built to make your business look established.',
    heroDescription:
      'Your website is designed around your services, customers, and goals—not forced into a generic template. The final site is clear, mobile-friendly, and ready to turn visitors into inquiries.',
    features: [
      'Custom home page and service pages',
      'Mobile and tablet-friendly layout',
      'Contact form with email notifications',
      'Domain and launch setup',
      'Basic local search optimization',
      'Clear calls to action throughout the site',
    ],
    demos: [
      {
        title: 'Auto service website',
        category: 'Local service business',
        image: '/portfolio-auto-repair.jpg',
      },
      {
        title: 'Restaurant website',
        category: 'Food and hospitality',
        image: '/portfolio-restaurant.jpg',
      },
      {
        title: 'Salon website',
        category: 'Beauty and appointments',
        image: '/portfolio-salon.jpg',
      },
      {
        title: 'Home services website',
        category: 'Contractor and repair',
        image:
          'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1500&q=88',
      },
      {
        title: 'Dental office website',
        category: 'Healthcare business',
        image:
          'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1500&q=88',
      },
      {
        title: 'Cleaning company website',
        category: 'Local service company',
        image:
          'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1500&q=88',
      },
    ],
  },
  {
    slug: 'ecommerce',
    title: 'eCommerce',
    label: 'Online store',
    description:
      'Includes product pages, collections, shopping cart, secure checkout, payment setup, and a simple mobile shopping experience.',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=88',
    previewTitle: 'Turn your products into an online storefront.',
    heroTitle: 'An online store that makes your products easy to browse and buy.',
    heroDescription:
      'Show your products clearly, organize them into collections, and give customers a simple path from browsing to checkout. Your store will be designed to feel professional on both desktop and mobile.',
    features: [
      'Product and collection pages',
      'Shopping cart and secure checkout',
      'Payment provider setup',
      'Shipping or local pickup options',
      'Mobile shopping experience',
      'Order notification and management setup',
    ],
    demos: [
      {
        title: 'Modern apparel shop',
        category: 'Fashion store',
        image:
          'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1500&q=88',
      },
      {
        title: 'Product-focused storefront',
        category: 'Lifestyle products',
        image:
          'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1500&q=88',
      },
      {
        title: 'Clean beauty store',
        category: 'Beauty and wellness',
        image:
          'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1500&q=88',
      },
      {
        title: 'Home goods shop',
        category: 'Home and decor',
        image:
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1500&q=88',
      },
      {
        title: 'Jewelry storefront',
        category: 'Accessories',
        image:
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1500&q=88',
      },
      {
        title: 'Specialty food shop',
        category: 'Food products',
        image:
          'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1500&q=88',
      },
    ],
  },
  {
    slug: 'scheduling',
    title: 'Scheduling',
    label: 'Booking website',
    description:
      'Includes service options, available times, appointment requests, customer details, and booking confirmation for your business.',
    image: '/portfolio-salon.jpg',
    previewTitle: 'Make booking simple for you and your customers.',
    heroTitle: 'A booking website that helps customers schedule without calling.',
    heroDescription:
      'Customers can review your services, choose what they need, and request an appointment through a clear booking flow. It works well for salons, consultants, clinics, and appointment-based businesses.',
    features: [
      'Service and appointment options',
      'Available date and time selection',
      'Customer information collection',
      'Booking confirmation messages',
      'Mobile-friendly scheduling flow',
      'Contact and policy information',
    ],
    demos: [
      {
        title: 'Salon booking website',
        category: 'Beauty business',
        image: '/portfolio-salon.jpg',
      },
      {
        title: 'Consultation booking',
        category: 'Professional services',
        image:
          'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1500&q=88',
      },
      {
        title: 'Service appointment site',
        category: 'Local service business',
        image: '/portfolio-auto-repair.jpg',
      },
      {
        title: 'Wellness appointment site',
        category: 'Health and wellness',
        image:
          'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1500&q=88',
      },
      {
        title: 'Fitness class booking',
        category: 'Fitness studio',
        image:
          'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1500&q=88',
      },
      {
        title: 'Clinic scheduling website',
        category: 'Healthcare appointments',
        image:
          'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1500&q=88',
      },
    ],
  },
  {
    slug: 'lead-capture',
    title: 'Lead Capture',
    label: 'Inquiry system',
    description:
      'Includes custom inquiry forms, required contact fields, email notifications, and organized lead tracking in Google Sheets.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=88',
    previewTitle: 'Turn website visitors into real inquiries.',
    heroTitle: 'A lead system that collects and organizes every new inquiry.',
    heroDescription:
      'Instead of relying on visitors to call later, your website can collect their contact details and project information right away. Each lead can be sent to your email and saved in an organized Google Sheet.',
    features: [
      'Custom inquiry and quote forms',
      'Required email and phone fields',
      'Automatic email notifications',
      'Google Sheets lead tracking',
      'Spam protection and form validation',
      'Clear follow-up status organization',
    ],
    demos: [
      {
        title: 'Website quote form',
        category: 'Creative services',
        image:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1500&q=88',
      },
      {
        title: 'Local service inquiry',
        category: 'Service business',
        image: '/portfolio-auto-repair.jpg',
      },
      {
        title: 'Property estimate form',
        category: 'Home services',
        image:
          'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1500&q=88',
      },
      {
        title: 'Consultation request',
        category: 'Professional services',
        image:
          'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1500&q=88',
      },
    ],
  },
  {
    slug: 'portfolio',
    title: 'Portfolio',
    label: 'Showcase website',
    description:
      'Includes project galleries, featured work, service information, testimonials, and a clear way for visitors to contact you.',
    image: '/portfolio-photography.jpg',
    previewTitle: 'Let your work speak before the first conversation.',
    heroTitle: 'A visual portfolio that helps your best work sell your services.',
    heroDescription:
      'Showcase your strongest projects in a clean, image-focused layout. The site gives potential clients an easy way to understand your style, services, and experience before contacting you.',
    features: [
      'Project galleries and featured work',
      'Individual project or case-study pages',
      'Service and about sections',
      'Testimonials and trust elements',
      'Mobile-friendly image presentation',
      'Contact and inquiry options',
    ],
    demos: [
      {
        title: 'Photography portfolio',
        category: 'Creative studio',
        image: '/portfolio-photography.jpg',
      },
      {
        title: 'Interior design showcase',
        category: 'Design business',
        image:
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1500&q=88',
      },
      {
        title: 'Beauty work gallery',
        category: 'Salon and beauty',
        image: '/portfolio-salon.jpg',
      },
      {
        title: 'Architecture portfolio',
        category: 'Architecture studio',
        image:
          'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1500&q=88',
      },
      {
        title: 'Creative direction work',
        category: 'Brand and design',
        image:
          'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1500&q=88',
      },
      {
        title: 'Event photography gallery',
        category: 'Events and lifestyle',
        image:
          'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1500&q=88',
      },
    ],
  },
];

export function getServiceProduct(slug: string) {
  return serviceProducts.find((product) => product.slug === slug);
}
