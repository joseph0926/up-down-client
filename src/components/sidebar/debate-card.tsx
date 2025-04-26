'use client';

import { motion } from 'motion/react';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

type Props = {
  id: string;
  title: string;
  deadline: string;
  proRatio: number;
  conRatio: number;
  index: number;
};

export const SidebarDebateCard = ({
  id,
  title,
  deadline,
  proRatio,
  conRatio,
  index,
}: Props) => {
  const remain = dayjs().to(dayjs(deadline));

  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
    >
      <Link
        href={`/debates/${id}`}
        className="focus-visible:ring-primary block rounded-md px-3 py-2 hover:bg-gray-100 focus-visible:ring-2"
      >
        <p className="text-xs text-gray-500">{remain}</p>
        <h3 className="line-clamp-2 text-sm leading-snug font-medium">
          {title}
        </h3>
        <Progress className="mt-2 h-1.5 bg-gray-200" value={proRatio} />
      </Link>
    </motion.li>
  );
};
