'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: "Owner, Sarah's Photography",
    content:
      "Tai completely transformed my online presence. My website is beautiful, loads fast, and I've gotten more inquiries than ever before. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: 'Mike Chen',
    role: 'Manager, Auto Repair Plus',
    content:
      'We needed a professional website with an online booking system. Tai delivered exactly what we needed on time and under budget. Great communication throughout.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Lisa Rodriguez',
    role: 'Founder, Luxe Salon & Spa',
    content:
      'The website is stunning and our clients love how easy it is to book appointments. The mobile optimization is excellent. This was a great investment for our business.',
    rating: 5,
  },
  {
    id: 4,
    name: 'James Thompson',
    role: "Owner, Thompson's Restaurant",
    content:
      'Working with Tai was seamless. They understood our vision and created a website that truly represents our brand. Our online reservations increased by 40%.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-5xl sm:text-6xl font-light text-black leading-tight mb-6 max-w-3xl">
            Loved by Small Business Owners
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl font-light">
            See what our clients have to say about working with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="p-8 border border-gray-300 rounded-none h-full flex flex-col">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black" />
                  ))}
                </div>

                <p className="text-gray-800 mb-8 leading-relaxed flex-grow font-light">
                  &quot;{testimonial.content}&quot;
                </p>

                <div className="pt-6 border-t border-gray-300">
                  <p className="font-medium text-black">{testimonial.name}</p>
                  <p className="text-sm text-gray-600 mt-1 font-light">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
