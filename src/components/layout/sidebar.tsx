import {
  SidebarWrapper,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { Suspense } from 'react';
import { SidebarDebatesServer } from './sidebar-debates.server';

export const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <Suspense fallback={false}>
              <SidebarDebatesServer />
            </Suspense>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarWrapper>
  );
};
