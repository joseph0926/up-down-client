import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

type SidebarProps = ComponentProps<'aside'>;

const topics = ['#총선', '#주4일제', '#AI규제', '#부동산', '#리모트워크'];

export function RightSidebar({ className, ...rest }: SidebarProps) {
  return (
    <aside
      className={cn(
        'sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pb-10',
        className,
      )}
      {...rest}
    >
      <section className="space-y-6">
        <ProfileCard />
        <TrendingTopics topics={topics} />
        <FeaturedDebate />
      </section>
    </aside>
  );
}

function ProfileCard() {
  return (
    <div className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
      <img
        src="https://source.unsplash.com/80x80?portrait"
        alt="profile"
        className="mx-auto h-20 w-20 rounded-full object-cover"
      />
      <div>
        <p className="font-medium">Kim YH</p>
        <p className="text-xs text-zinc-500">@younghoon</p>
      </div>
      <div className="flex justify-center gap-6 text-xs">
        <Stat label="토론" value="127" />
        <Stat label="댓글" value="1,248" />
        <Stat label="투표" value="8,532" />
      </div>
      <button className="mt-2 w-full rounded-md bg-blue-600 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
        프로필 편집
      </button>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <p className="leading-none font-semibold">{value}</p>
      <p className="text-zinc-500">{label}</p>
    </div>
  );
}

function TrendingTopics({ topics }: { topics: string[] }) {
  return (
    <div className="space-y-2 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="text-sm font-semibold">팔로우 중인 토픽</h3>
      <div className="flex flex-wrap gap-2">
        {topics.map((t) => (
          <span
            key={t}
            className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs transition hover:bg-blue-600 hover:text-white dark:bg-zinc-800"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function FeaturedDebate() {
  return (
    <article className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <img
        src="https://source.unsplash.com/400x200?voting,people"
        alt="featured"
        className="h-28 w-full object-cover"
      />
      <div className="space-y-1 p-4">
        <h4 className="text-sm leading-tight font-semibold">
          총선 공약별 효과, 어떻게 판단해야 할까?
        </h4>
        <p className="text-xs text-zinc-500">Featured Debate</p>
      </div>
    </article>
  );
}
