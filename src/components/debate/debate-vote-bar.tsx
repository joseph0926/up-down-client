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

  const BAR_HEIGHT = 'h-6 sm:h-8';

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className="w-full space-y-2"
        aria-label={`찬성 ${pct(pro)}, 반대 ${pct(con)}`}
      >
        <motion.div
          whileHover={{ scaleY: 1.04 }}
          transition={{ duration: 0.25 }}
          className={cn(
            'relative w-full overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-300/60',
            BAR_HEIGHT,
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={false}
                animate={{ width: pct(pro) }}
                transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
                className={cn(
                  'absolute inset-y-0 left-0 flex items-center justify-end px-2 text-[13px] font-bold text-white',
                  'rounded-l-full',
                  'bg-gradient-to-r from-blue-600 to-blue-500',
                )}
              >
                {pct(pro)}
              </motion.div>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="border-0 bg-blue-600 px-2 py-1 text-xs font-semibold text-white"
            >
              찬성 {pct(pro)}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={false}
                animate={{ left: pct(pro), width: pct(con) }}
                transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
                className={cn(
                  'absolute inset-y-0 flex items-center justify-start px-2 text-[13px] font-bold text-white',
                  'rounded-r-full',
                  'bg-gradient-to-r from-red-600 to-red-500',
                )}
              >
                {pct(con)}
              </motion.div>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="border-0 bg-red-600 px-2 py-1 text-xs font-semibold text-white"
            >
              반대 {pct(con)}
            </TooltipContent>
          </Tooltip>
        </motion.div>
      </div>
    </TooltipProvider>
  );
};
