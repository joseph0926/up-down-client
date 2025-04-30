'use client';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { useInfiniteDebates } from '@/services/debate.query';

export const SidebarDebatesClient = () => {
  const {
    data: debatesRes,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteDebates('latest', 10);

  const { sentinelRef } = useInfiniteScroll(hasNextPage, fetchNextPage);

  const debates = debatesRes?.pages.flatMap((d) => (d ? d.items : []));

  if (!debates) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton>test</SidebarMenuButton>
        <SidebarMenuSub>
          {debates.map((d) => (
            <SidebarMenuSubItem key={d.id}>{d.title}</SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </SidebarMenuItem>
      <div ref={sentinelRef} />
    </SidebarMenu>
  );
};
