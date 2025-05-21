'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

export type HotGaugeProps = ComponentProps<'div'> & {
  index: number;
};

export function HotGauge({ index, className, ...rest }: HotGaugeProps) {
  const percent = Math.max(0, Math.min(100, Math.round(index)));

  return (
    <div
      aria-label={`열기 ${percent}퍼센트`}
      className={cn(
        'h-1.5 w-16 rounded-full bg-gray-200/60 md:w-24',
        className,
      )}
      {...rest}
    >
      <motion.div
        className="h-full rounded-full bg-red-500"
        style={{ width: `${percent}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </div>
  );
}
