'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useState } from 'react';
import { RankList } from './rank-list';

const RANKING = {
  hot: [
    '기본소득, 효과 있을까?',
    '원자력 발전 확대, 효과 있나?',
    'BTS 병역 특례, 찬성 vs 반대?',
  ],
  new: ['탄소세 확대, 효과 있을까?', '대마초 합법화, 도입 필요할까?'],
  due: ['주 4일제, 도입해야 할까?'],
};

export const Rank = () => {
  const [tab, setTab] = useState<string>('hot');

  return (
    <section className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
      <Tabs value={tab} onValueChange={(value) => setTab(value as any)}>
        <TabsList className="mx-auto mb-4 grid w-full max-w-xs grid-cols-3">
          <TabsTrigger value="hot">🥵 실시간</TabsTrigger>
          <TabsTrigger value="new">🆕 신규</TabsTrigger>
          <TabsTrigger value="due">⏰ 마감임박</TabsTrigger>
        </TabsList>
        {(['hot', 'new', 'due'] as const).map((key) => (
          <TabsContent key={key} value={key} asChild>
            <RankList items={RANKING[key]} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};
