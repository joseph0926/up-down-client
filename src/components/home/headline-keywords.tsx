'use client';

import Marquee from 'react-fast-marquee';
import { HotGauge } from './hot-gague';

const DUMMY_KEYWORDS = [
  { word: '총선', index: 100 },
  { word: '공매도', index: 70 },
  { word: '주4일제', index: 66 },
  { word: 'AI규제', index: 63 },
  { word: '부동산', index: 40 },
];

export const HeadlineKeywords = () => {
  return (
    <Marquee
      gradient={false}
      speed={40}
      pauseOnHover
      className="flex gap-8 px-6 py-2"
    >
      {DUMMY_KEYWORDS.map((k) => (
        <div key={k.word} className="mr-8 flex items-center gap-2">
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {k.word}
          </span>
          <HotGauge index={k.index} />
        </div>
      ))}
    </Marquee>
  );
};
