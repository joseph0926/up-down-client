'use client';

import { AnimatePresence, motion } from 'motion/react';

export function RankList({ items }: { items: string[] }) {
  return (
    <motion.ul layout className="space-y-3">
      <AnimatePresence initial={false}>
        {items.map((title) => (
          <motion.li
            key={title}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="cursor-pointer rounded-lg bg-zinc-100 px-4 py-3 text-sm text-zinc-800 hover:bg-zinc-200 dark:bg-white/5 dark:text-zinc-100 dark:hover:bg-white/10"
          >
            {title}
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
