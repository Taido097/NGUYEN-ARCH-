'use client';

import { Shield, Award, Users, Zap } from 'lucide-react';

const badges = [
  {
    icon: Award,
    title: 'Award-Winning',
    description: 'Recognized for design excellence and innovation',
  },
  {
    icon: Users,
    title: 'Client-Focused',
    description: '50+ happy clients and growing',
  },
  {
    icon: Zap,
    title: 'Fast Turnaround',
    description: 'Most projects delivered in 2-4 weeks',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: '99.9% uptime guarantee on all sites',
  },
];

export function TrustSection() {
  return (
    <section className="py-12 bg-white border-y border-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <Icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="font-medium text-black mb-2 text-sm uppercase tracking-wider">
                  {badge.title}
                </h3>
                <p className="text-gray-700 text-sm font-light">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
