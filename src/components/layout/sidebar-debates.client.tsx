'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import { useInfiniteDebates } from '@/services/debate.query';
import { motion } from 'motion/react';
import Image from 'next/image';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';

import { SidebarDebateSkeletonList } from '../loading/sidebar-debate.loading';
import { SidebarDebateErrorFallback } from '../error/sidebar-debate.error';
import { SidebarProgress } from './sidebar-progress';
import { cn } from '@/lib/utils';
import { SidebarMoreIndicator } from './sidebar-more-indicator';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const ITEMS_PER_PAGE = 10;

const STATUS_META = {
  upcoming: { label: '예정', color: 'text-amber-500' },
  ongoing: { label: '진행중', color: 'text-green-600' },
  closed: { label: '종료', color: 'text-gray-400' },
} as const;
type Status = keyof typeof STATUS_META;

export const SidebarDebatesClient = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    status,
    error,
    isFetchingNextPage,
    refetch,
  } = useInfiniteDebates('latest', ITEMS_PER_PAGE);

  if (status === 'pending') return <SidebarDebateSkeletonList />;
  if (status === 'error')
    return <SidebarDebateErrorFallback error={error} reset={refetch} />;

  const debates = data?.pages.flatMap((p) => p?.items ?? []) ?? [];

  const grouped = debates.reduce<Record<Status, typeof debates>>(
    (acc, d) => {
      acc[d.status].push(d);
      return acc;
    },
    { upcoming: [], ongoing: [], closed: [] },
  );

  return (
    <>
      <div className="h-full overflow-y-auto">
        {(['upcoming', 'ongoing', 'closed'] as Status[]).map((statusKey) =>
          grouped[statusKey].length ? (
            <section key={statusKey} className="mb-4">
              <h3
                className={`sticky top-0 z-10 mb-2 bg-white/90 px-2 py-1 text-sm font-semibold backdrop-blur ${STATUS_META[statusKey].color}`}
              >
                {STATUS_META[statusKey].label}
              </h3>
              <SidebarMenu className="gap-4">
                {grouped[statusKey].map((d) => {
                  const isClosed = d.status === 'closed';

                  return (
                    <SidebarMenuItem
                      key={d.id}
                      className={cn(
                        'flex flex-col gap-1',
                        isClosed && 'cursor-not-allowed opacity-60',
                      )}
                    >
                      <SidebarMenuButton asChild>
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                          }}
                          className={cn(
                            'flex w-full items-center gap-2 px-2',
                            isClosed && 'pointer-events-none',
                          )}
                        >
                          {d.thumbUrl ? (
                            <Image
                              src={d.thumbUrl}
                              alt={d.title}
                              width={32}
                              height={32}
                              className="h-8 w-8 shrink-0 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-8 w-8 shrink-0 rounded-full bg-gray-200" />
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {d.title}
                            </p>
                            <div className="flex items-center gap-1 text-[11px] text-gray-500">
                              <span>
                                {d.dDay > 0
                                  ? `${d.dDay}일 남음`
                                  : d.dDay === 0
                                    ? '오늘 마감'
                                    : `${Math.abs(d.dDay)}일 지남`}
                              </span>
                              <span>·</span>
                              <span className="flex items-center gap-0.5">
                                💬 {d.commentCount}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </SidebarMenuButton>
                      <SidebarMenuSub className="w-full">
                        <SidebarMenuSubItem>
                          <SidebarProgress
                            proRatio={d.proRatio}
                            conRatio={d.conRatio}
                          />
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </section>
          ) : null,
        )}
      </div>
      {hasNextPage && (
        <SidebarMoreIndicator
          isLoading={isFetchingNextPage}
          onClick={fetchNextPage}
        />
      )}
    </>
  );
};
