import { ChevronDown, Plus } from 'lucide-react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const communities = [
  { name: '#총선', active: true },
  { name: '#AI규제', active: false },
  { name: '#부동산', active: false },
  { name: '#주4일제', active: false },
];

const recents = ['총선 공매도 금지', 'AI 기업 규제 필요?', '주4일제 시범 도입'];

type SidebarProps = ComponentProps<'aside'>;

export function LeftSidebar({ className, ...rest }: SidebarProps) {
  return (
    <aside
      className={cn(
        'sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pb-10',
        className,
      )}
      {...rest}
    >
      <section className="space-y-6">
        <ExclusiveOffer />

        <NavSection title="Communities">
          <ul className="space-y-1">
            {communities.map((c) => (
              <li key={c.name}>
                <button
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                    c.active ? 'bg-zinc-100 font-medium dark:bg-zinc-800' : ''
                  }`}
                >
                  <span>{c.name}</span>
                  {c.active && <ChevronDown className="ml-auto h-4 w-4" />}
                </button>
              </li>
            ))}
            <li>
              <button className="flex items-center gap-1 px-3 text-sm text-blue-600 hover:underline">
                <Plus className="h-4 w-4" /> 커뮤니티 생성
              </button>
            </li>
          </ul>
        </NavSection>
        <NavSection title="Recent">
          <ul className="space-y-1 text-sm">
            {recents.map((t) => (
              <li
                key={t}
                className="cursor-pointer rounded-md px-3 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                {t}
              </li>
            ))}
          </ul>
        </NavSection>
      </section>
    </aside>
  );
}

function ExclusiveOffer() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 p-4 text-white shadow-lg">
      <div className="absolute inset-0 bg-[url('https://source.unsplash.com/200x200?debate')] bg-cover opacity-20" />
      <div className="relative space-y-1">
        <p className="text-xs tracking-wider uppercase">Hot Issue</p>
        <p className="leading-tight font-semibold">
          실시간 토론 참여하고 의견을 올려보세요 ↗
        </p>
      </div>
    </div>
  );
}

function NavSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h2 className="px-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}
