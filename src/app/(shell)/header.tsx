'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/logo';
import Link from 'next/link';

export const Header = () => {
  const toggleSidebar = () => {
    window.dispatchEvent(new CustomEvent('sidebar-toggle'));
  };

  return (
    <header className="bg-background/70 sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 backdrop-blur sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="sm:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </Button>
      <Link href="/">
        <Logo className="glow-neon" />
      </Link>
    </header>
  );
};
