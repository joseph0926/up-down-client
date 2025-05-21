import { HeadlineKeywords } from './headline-keywords';

export const HeadLine = () => {
  return (
    <section className="border-b border-zinc-200 dark:border-zinc-800">
      <h2 className="px-6 pt-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        실시간 트렌드
      </h2>
      <HeadlineKeywords />
    </section>
  );
};
