'use client';

import { motion } from 'motion/react';
import { Button } from '../ui/button';
import Image from 'next/image';

const FEATURED_DEBATE = {
  id: '1',
  category: '정치',
  title: '기본소득, 효과 있을까?',
  deadline: '3일 남음',
  thumb:
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
};

export const FeatureDebateCard = () => {
  return (
    <section className="border-b border-zinc-200 px-6 py-6 dark:border-zinc-800">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative h-56 w-full overflow-hidden rounded-2xl"
      >
        <Image
          src={FEATURED_DEBATE.thumb}
          alt={FEATURED_DEBATE.title}
          fill
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <p className="mb-1 text-xs opacity-80">
            #{FEATURED_DEBATE.category} · {FEATURED_DEBATE.deadline}
          </p>
          <h3 className="mb-4 text-xl font-bold">{FEATURED_DEBATE.title}</h3>
          <div className="flex gap-3">
            <Button size="sm" className="bg-green-500 hover:bg-green-600">
              찬성 투표
            </Button>
            <Button size="sm" className="bg-red-500 hover:bg-red-600">
              반대 투표
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
