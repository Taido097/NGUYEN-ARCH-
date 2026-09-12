export interface StyleOption {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

export interface CategoryStyles {
  category: string;
  slug: string;
  styles: StyleOption[];
}

export const styleShowcaseData: CategoryStyles[] = [
  {
    category: "Photography",
    slug: "photography-studio",
    styles: [
      {
        id: "photo-elegant-wedding",
        title: "Elegant Wedding Style",
        description: "Soft, romantic layout for wedding and couple photography brands.",
        tags: ["Wedding", "Soft Colors", "Booking CTA", "Gallery"],
        image: "/styles/photo-wedding.jpg",
      },
      {
        id: "photo-luxury-editorial",
        title: "Luxury Editorial Style",
        description: "Premium magazine-inspired design for high-end photography services.",
        tags: ["Luxury", "Editorial", "Portfolio", "Minimal"],
        image: "/styles/photo-editorial.jpg",
      },
      {
        id: "photo-minimal-portfolio",
        title: "Minimal Portfolio Style",
        description: "Clean image-first layout that lets the photography speak for itself.",
        tags: ["Minimal", "Gallery", "Fast Load", "Clean UI"],
        image: "/styles/photo-minimal.jpg",
      },
      {
        id: "photo-dark-cinematic",
        title: "Dark Cinematic Style",
        description: "Bold dark theme for photographers with dramatic visuals and storytelling.",
        tags: ["Dark Theme", "Cinematic", "Storytelling", "High Contrast"],
        image: "/styles/photo-cinematic.jpg",
      },
      {
        id: "photo-bright-lifestyle",
        title: "Bright Lifestyle Style",
        description: "Warm and friendly design for family, branding, and lifestyle photographers.",
        tags: ["Lifestyle", "Bright", "Friendly", "Lead Capture"],
        image: "/styles/photo-lifestyle.jpg",
      },
    ],
  },
  {
    category: "Auto Repair",
    slug: "auto-repair-shop",
    styles: [
      {
        id: "auto-professional-trust",
        title: "Professional & Trustworthy",
        description: "Clean, professional design that builds customer confidence and trust.",
        tags: ["Trust Signals", "Reviews", "Clean", "Booking"],
        image: "/styles/auto-professional.jpg",
      },
      {
        id: "auto-bold-industrial",
        title: "Bold Industrial Style",
        description: "Strong, masculine design with bold typography and industrial aesthetics.",
        tags: ["Bold", "Industrial", "Dark", "Strong CTA"],
        image: "/styles/auto-industrial.jpg",
      },
      {
        id: "auto-friendly-local",
        title: "Friendly Local Shop",
        description: "Warm, approachable design for neighborhood auto shops.",
        tags: ["Friendly", "Local", "Community", "Accessible"],
        image: "/styles/auto-friendly.jpg",
      },
      {
        id: "auto-modern-tech",
        title: "Modern Tech-Forward",
        description: "Sleek, modern design for tech-savvy auto service centers.",
        tags: ["Modern", "Tech", "Sleek", "Digital"],
        image: "/styles/auto-modern.jpg",
      },
    ],
  },
  {
    category: "Salon & Spa",
    slug: "salon-spa",
    styles: [
      {
        id: "salon-luxury-gold",
        title: "Luxury Rose Gold",
        description: "Elegant, premium design with rose gold accents and sophisticated typography.",
        tags: ["Luxury", "Rose Gold", "Elegant", "Premium"],
        image: "/styles/salon-luxury.jpg",
      },
      {
        id: "salon-minimal-zen",
        title: "Minimal Zen Style",
        description: "Calm, serene design inspired by spa and wellness aesthetics.",
        tags: ["Minimal", "Zen", "Calm", "Wellness"],
        image: "/styles/salon-zen.jpg",
      },
      {
        id: "salon-bold-modern",
        title: "Bold Modern Beauty",
        description: "Contemporary, fashion-forward design for trendy salons.",
        tags: ["Bold", "Modern", "Fashion", "Trendy"],
        image: "/styles/salon-modern.jpg",
      },
      {
        id: "salon-soft-natural",
        title: "Soft Natural Tones",
        description: "Earthy, organic design for eco-conscious beauty brands.",
        tags: ["Natural", "Organic", "Earthy", "Eco-friendly"],
        image: "/styles/salon-natural.jpg",
      },
      {
        id: "salon-glamorous",
        title: "Hollywood Glamour",
        description: "Dramatic, glamorous design for high-end beauty destinations.",
        tags: ["Glamour", "Dramatic", "High-end", "VIP"],
        image: "/styles/salon-glamour.jpg",
      },
    ],
  },
  {
    category: "Restaurant",
    slug: "restaurant-website",
    styles: [
      {
        id: "resto-farm-table",
        title: "Farm to Table Rustic",
        description: "Warm, rustic design for farm-fresh and organic restaurants.",
        tags: ["Rustic", "Farm Fresh", "Warm", "Organic"],
        image: "/styles/resto-farm.jpg",
      },
      {
        id: "resto-fine-dining",
        title: "Fine Dining Elegant",
        description: "Sophisticated, upscale design for premium dining experiences.",
        tags: ["Fine Dining", "Elegant", "Upscale", "Reservations"],
        image: "/styles/resto-fine.jpg",
      },
      {
        id: "resto-casual-modern",
        title: "Casual Modern Bistro",
        description: "Fresh, approachable design for casual dining and cafes.",
        tags: ["Casual", "Modern", "Friendly", "Menu Focus"],
        image: "/styles/resto-casual.jpg",
      },
      {
        id: "resto-dark-moody",
        title: "Dark & Moody Bar",
        description: "Atmospheric, intimate design for bars and evening venues.",
        tags: ["Dark", "Moody", "Bar", "Nightlife"],
        image: "/styles/resto-moody.jpg",
      },
      {
        id: "resto-bright-cafe",
        title: "Bright Cafe Style",
        description: "Light, airy design perfect for coffee shops and brunch spots.",
        tags: ["Bright", "Cafe", "Brunch", "Instagram-worthy"],
        image: "/styles/resto-cafe.jpg",
      },
    ],
  },
];

export function getStylesForCategory(slug: string): StyleOption[] {
  const category = styleShowcaseData.find((cat) => cat.slug === slug);
  return category?.styles || [];
}
