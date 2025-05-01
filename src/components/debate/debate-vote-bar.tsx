'use client';

import { motion } from 'motion/react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type Props = { proRatio: number; conRatio: number };

const pct = (n: number) => `${(n * 100).toFixed(1).replace(/\.0$/, '')}%`;

export const DebateVoteBar = ({ proRatio, conRatio }: Props) => {
  const total = proRatio + conRatio || 1;
  const pro = proRatio / total;
  const con = conRatio / total;

  const isProMajor = pro >= con;

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className="flex w-full flex-col gap-1"
        aria-label={`찬성 ${pct(pro)}, 반대 ${pct(con)}`}
      >
        <motion.div
          whileHover={{ scaleY: 1.06 }}
          transition={{ duration: 0.25 }}
          className="relative h-3 w-full overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-300/60"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={false}
                animate={{ width: pct(pro) }}
                transition={{ type: 'spring', duration: 0.45, bounce: 0.25 }}
                className={cn(
                  'absolute inset-y-0 left-0 flex items-center justify-end px-1',
                  'rounded-l-full',
                  isProMajor
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500'
                    : 'bg-gradient-to-r from-blue-400 to-blue-300',
                )}
              >
                {pro >= 0.15 && (
                  <span className="text-[11px] font-semibold text-white tabular-nums">
                    {pct(pro)}
                  </span>
                )}
              </motion.div>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="mb-2 border-0 bg-blue-600 px-2 py-1 text-xs font-medium text-white"
            >
              찬성 {pct(pro)}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={false}
                animate={{ left: pct(pro), width: pct(con) }}
                transition={{ type: 'spring', duration: 0.45, bounce: 0.25 }}
                className={cn(
                  'absolute inset-y-0 flex items-center justify-start px-1',
                  'rounded-r-full',
                  !isProMajor
                    ? 'bg-gradient-to-r from-red-600 to-red-500'
                    : 'bg-gradient-to-r from-red-400 to-red-300',
                )}
              >
                {con >= 0.15 && (
                  <span className="text-[11px] font-semibold text-white tabular-nums">
                    {pct(con)}
                  </span>
                )}
              </motion.div>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="mb-2 border-0 bg-red-600 px-2 py-1 text-xs font-medium text-white"
            >
              반대 {pct(con)}
            </TooltipContent>
          </Tooltip>
        </motion.div>

        {(pro < 0.15 || con < 0.15) && (
          <div className="flex justify-between text-[11px] font-semibold tabular-nums">
            <span className="text-blue-600">{pct(pro)}</span>
            <span className="text-red-600">{pct(con)}</span>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};
