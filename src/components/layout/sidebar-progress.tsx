'use client';

import { motion } from 'motion/react';

type SidebarProgressProps = {
  proRatio: number; // 0~1
  conRatio: number; // 0~1
};

const toPct = (r: number) => `${(r * 100).toFixed(1).replace(/\.0$/, '')}%`;

export const SidebarProgress = ({
  proRatio,
  conRatio,
}: SidebarProgressProps) => {
  const total = proRatio + conRatio || 1;
  const pro = proRatio / total;
  const con = conRatio / total;

  const proPct = toPct(pro);
  const conPct = toPct(con);

  const LABEL_W = '42px';

  return (
    <div
      className="grid items-center gap-1"
      style={{ gridTemplateColumns: `minmax(0,1fr) ${LABEL_W} ${LABEL_W}` }}
    >
      <div className="relative h-1 w-full overflow-hidden rounded-full bg-gray-200">
        <motion.div
          initial={false}
          animate={{ width: proPct }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="absolute inset-y-0 left-0 rounded-l-full bg-blue-500"
        />
        <motion.div
          initial={false}
          animate={{
            left: proPct,
            width: conPct,
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="absolute inset-y-0 rounded-r-full bg-red-500"
        />
      </div>
      <span
        className="text-right text-xs text-blue-600 tabular-nums"
        style={{ width: LABEL_W }}
      >
        {proPct}
      </span>
      <span
        className="text-right text-xs text-red-600 tabular-nums"
        style={{ width: LABEL_W }}
      >
        {conPct}
      </span>
    </div>
  );
};
