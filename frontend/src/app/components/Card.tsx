import { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function Card({ children, className, title }: CardProps) {
  return (
    <div className={cn('bg-white border border-gray-200 rounded-lg p-6', className)}>
      {title && <h3 className="text-xl font-semibold text-[#111827] mb-4">{title}</h3>}
      {children}
    </div>
  );
}