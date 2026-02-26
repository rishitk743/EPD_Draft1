import { cn } from '../lib/utils';

interface TagProps {
  label: string;
  variant?: 'success' | 'error' | 'default';
  className?: string;
}

export function Tag({ label, variant = 'default', className }: TagProps) {
  const variants = {
    success: 'bg-green-100 text-[#10B981] border-green-200',
    error: 'bg-red-100 text-[#EF4444] border-red-200',
    default: 'bg-blue-100 text-[#2563EB] border-blue-200',
  };

  return (
    <span className={cn('px-3 py-1 rounded-full text-sm font-medium border', variants[variant], className)}>
      {label}
    </span>
  );
}
