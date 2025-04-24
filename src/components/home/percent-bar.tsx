/*
  src/components/percent-bar.tsx  — 개선 버전 (date‑fns + cn)
  추가 파일:
    📁 src/utils/time.ts   → formatRemaining() & clampPct()
  ※ util 파일은 별도 작성 필요.
*/

'use client';

import { motion } from 'motion/react';
import { useCountdown } from '@/hooks/use-countdown';
import { clampPct, formatRemaining } from '@/lib/time';
import { cn } from '@/lib/utils';

type PercentBarProps = {
  up: number;
  down: number;
  expiresAt: Date;
};

export const PercentBar = ({ up, expiresAt }: PercentBarProps) => {
  const remainMs = useCountdown(expiresAt);
  const closed = remainMs === 0;

  const upPct = clampPct(up);
  const downPct = 100 - upPct;

  return (
    <div className="flex flex-col gap-2">
      <span
        className={cn(
          'w-max rounded-md px-1.5 py-0.5 font-mono text-xs',
          closed
            ? 'bg-muted text-muted-foreground'
            : 'bg-secondary text-secondary-foreground animate-pulseFast',
        )}
      >
        {closed ? '토론 종료' : `⏰ ${formatRemaining(remainMs)}`}
      </span>
      <div className="bg-muted relative h-4 w-full overflow-hidden rounded-full">
        <motion.div
          layout
          style={{ originX: 0 }}
          animate={{ width: `${upPct}%` }}
          className="bg-up glow-up h-full"
          transition={{ type: 'spring', stiffness: 300, damping: 35 }}
        />
        <motion.div
          layout
          style={{ right: 0, originX: 1, position: 'absolute' }}
          animate={{ width: `${downPct}%` }}
          className="bg-down glow-down h-full"
          transition={{ type: 'spring', stiffness: 300, damping: 35 }}
        />
      </div>
      <div className="flex justify-between text-xs font-medium tabular-nums">
        <span className="text-up">🔵 {upPct}%</span>
        <span className="text-down">🔴 {downPct}%</span>
      </div>
    </div>
  );
};
