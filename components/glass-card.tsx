import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass rounded-2xl p-6 border border-white/30',
        hover && 'hover:border-white/50 hover:bg-white/90 transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
}
