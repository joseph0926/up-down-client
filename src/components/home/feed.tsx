import dayjs from 'dayjs';
import { AnimatePresence } from 'motion/react';
import { type ComponentProps, useState } from 'react';
import { cn } from '@/lib/utils';
import type { Debate } from '@/types/debate.type';
import { CreateDebateCard } from './create-debate-card';
import { DebateCard } from './debate-card';

function generateDummyDebates(): Debate[] {
  return [
    {
      id: 'd-1',
      title: '주4일제, 지금 도입해야 할까?',
      deadline: dayjs().add(2, 'day').toISOString(),
      proRatio: 66,
      conRatio: 34,
      thumbUrl: 'https://source.unsplash.com/600x300?office',
      smallUrl: null,
      status: 'ongoing',
    },
    {
      id: 'd-2',
      title: '부동산 가격 안정화를 위한 공매도 연장',
      deadline: dayjs().add(1, 'day').toISOString(),
      proRatio: 42,
      conRatio: 58,
      thumbUrl: 'https://source.unsplash.com/600x300?real-estate',
      smallUrl: null,
      status: 'ongoing',
    },
    {
      id: 'd-3',
      title: 'AI 기업에 대한 강력한 규제가 필요하다',
      deadline: dayjs().subtract(1, 'hour').toISOString(),
      proRatio: 49,
      conRatio: 51,
      thumbUrl: 'https://source.unsplash.com/600x300?ai,robot',
      smallUrl: null,
      status: 'closed',
    },
  ];
}

type FeedProps = ComponentProps<'section'>;

export function Feed({ className, ...rest }: FeedProps) {
  const [debates] = useState(() => generateDummyDebates());

  return (
    <section className={cn('space-y-6', className)} {...rest}>
      <CreateDebateCard />
      <AnimatePresence>
        {debates.map((p) => (
          <DebateCard key={p.id} debate={p} />
        ))}
      </AnimatePresence>
    </section>
  );
}
