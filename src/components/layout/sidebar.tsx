import {
  SidebarWrapper,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Suspense } from 'react';
import { SidebarDebatesServer } from './sidebar-debates.server';

export const Sidebar = () => {
  return (
    <SidebarWrapper>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <Suspense>
              <SidebarDebatesServer />
            </Suspense>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarWrapper>
  );
};
