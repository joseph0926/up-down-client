import { motion } from 'motion/react';

const PRO_COLOR = 'bg-blue-500';
const CON_COLOR = 'bg-red-500';

type BarProps = { pro: number; con: number };

export const DebateProgressBar = ({ pro, con }: BarProps) => (
  <div className="relative mt-2 h-1.5 w-full overflow-hidden rounded bg-gray-200">
    <motion.div
      className={`${PRO_COLOR} absolute inset-y-0 left-0 origin-left`}
      style={{ width: '100%' }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: pro / 100 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
    />
    <motion.div
      className={`${CON_COLOR} absolute inset-y-0 right-0 origin-right`}
      style={{ width: '100%' }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: con / 100 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30, delay: 0.05 }}
    />
  </div>
);
