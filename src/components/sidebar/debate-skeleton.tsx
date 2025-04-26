'use client';

import { motion } from 'motion/react';

export const DebateCardSkeleton = ({ index = 0 }: { index?: number }) => (
  <motion.li
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 0.6, y: 0 }}
    transition={{ delay: index * 0.03 }}
    className="animate-pulse rounded-md px-3 py-2"
  >
    <div className="h-3 w-20 rounded bg-gray-200" />
    <div className="mt-2 space-y-1">
      <div className="h-4 w-full rounded bg-gray-300" />
      <div className="h-4 w-5/6 rounded bg-gray-300" />
    </div>
    <div className="mt-2 h-1.5 w-full rounded bg-gray-200" />
  </motion.li>
);
