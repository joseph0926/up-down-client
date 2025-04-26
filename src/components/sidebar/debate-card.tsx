'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.locale('ko');
dayjs.updateLocale('ko', {
  relativeTime: {
    future: '%s 남음',
    past: '%s 전',
    s: '몇 초',
    m: '1분',
    mm: '%d분',
    h: '1시간',
    hh: '%d시간',
    d: '1일',
    dd: '%d일',
    M: '1달',
    MM: '%d달',
    y: '1년',
    yy: '%d년',
  },
});

interface Props {
  id: string;
  title: string;
  deadline: string;
  proRatio: number;
  conRatio: number;
  smallUrl?: string | null;
  index: number;
}

const PRO_COLOR = 'bg-blue-500';
const CON_COLOR = 'bg-red-500';

export const SidebarDebateCard = ({
  id,
  title,
  deadline,
  proRatio,
  conRatio,
  smallUrl,
  index,
}: Props) => {
  const remain = dayjs(deadline).fromNow();
  const pro = Math.min(Math.max(proRatio, 0), 100);
  const con = Math.min(Math.max(conRatio, 0), 100 - pro);

  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
    >
      <Link
        href={`/debates/${id}`}
        className="focus-visible:ring-primary flex gap-3 rounded-md px-3 py-2 hover:bg-gray-100 focus-visible:ring-2"
      >
        {smallUrl ? (
          <Image
            src={smallUrl}
            alt={title}
            width={40}
            height={56}
            className="h-14 w-10 flex-shrink-0 rounded object-cover"
            sizes="40px"
          />
        ) : (
          <div className="h-10 w-10 flex-shrink-0 rounded bg-gray-200" />
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-gray-500">{remain}</p>
          <h3 className="line-clamp-2 text-sm leading-snug font-medium">
            {title}
          </h3>
          <div className="relative mt-2 h-1.5 w-full overflow-hidden rounded bg-gray-200">
            <div
              className={`${PRO_COLOR} absolute top-0 left-0 h-full`}
              style={{ width: `${pro}%` }}
            />
            <div
              className={`${CON_COLOR} absolute top-0 right-0 h-full`}
              style={{ width: `${con}%` }}
            />
          </div>
        </div>
      </Link>
    </motion.li>
  );
};
