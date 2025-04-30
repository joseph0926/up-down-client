'use client';

import { ChevronsDown } from 'lucide-react';
import { motion } from 'motion/react';

export const SidebarMoreIndicator = ({
  isLoading,
  onClick,
}: {
  isLoading: boolean;
  onClick: () => void;
}) => (
  <div className="flex justify-center py-2 pb-8">
    {isLoading ? (
      <motion.span
        className="relative h-9 w-9"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 1 }}
      >
        <svg className="h-full w-full" viewBox="0 0 36 36">
          <path
            className="stroke-blue-400/30"
            d="M18 2a16 16 0 110 32 16 16 0 010-32"
            strokeWidth="4"
            fill="none"
          />
          <motion.path
            className="stroke-blue-500"
            d="M18 2a16 16 0 110 32 16 16 0 010-32"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="100 100"
            initial={{ strokeDashoffset: 75 }}
            animate={{ strokeDashoffset: 25 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
            fill="none"
          />
        </svg>
      </motion.span>
    ) : (
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={onClick}
        aria-label="더 보기"
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white shadow ring-1 ring-gray-200 hover:bg-blue-50"
      >
        <ChevronsDown className="h-5 w-5 text-gray-700" />
      </motion.button>
    )}
  </div>
);
