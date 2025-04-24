'use client';

import { useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, animate } from 'motion/react';
import { X } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { Logo } from '@/components/common/logo';

const SIDEBAR_WIDTH = 256;
const EDGE_WIDTH = 20;
const THRESHOLD = SIDEBAR_WIDTH / 3;

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="hover:bg-secondary/40 block rounded-md px-3 py-2"
    >
      {children}
    </Link>
  );
}

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const x = useMotionValue(-SIDEBAR_WIDTH);

  useLayoutEffect(() => {
    const handler = () => setOpen((p) => !p);
    window.addEventListener('sidebar-toggle', handler);
    return () => window.removeEventListener('sidebar-toggle', handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const pop = () => setOpen(false);
    window.addEventListener('keydown', esc);
    window.addEventListener('popstate', pop);
    return () => {
      window.removeEventListener('keydown', esc);
      window.removeEventListener('popstate', pop);
    };
  }, [open]);

  useEffect(() => {
    const target = open ? 0 : -SIDEBAR_WIDTH;
    const controls = animate(x, target, {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    });
    return controls.stop;
  }, [open, x]);

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number } }) => {
      const offsetX = info.offset.x;

      if (open && offsetX < -THRESHOLD) {
        setOpen(false);
        return;
      }

      if (!open && offsetX > THRESHOLD) {
        setOpen(true);
        return;
      }
    },
    [open],
  );

  const Overlay = open ? (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-30 bg-black/50 sm:hidden"
    />
  ) : null;

  const Edge = !open ? (
    <motion.div
      key="edge"
      drag="x"
      dragConstraints={{ left: 0, right: EDGE_WIDTH }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      className="fixed inset-y-0 left-0 z-20 w-5 bg-transparent sm:hidden"
    />
  ) : null;

  return (
    <>
      {Overlay}
      {Edge}
      <motion.aside
        drag="x"
        style={{ x }}
        dragConstraints={{ left: -SIDEBAR_WIDTH, right: 0 }}
        dragElastic={0}
        onDragEnd={handleDragEnd}
        className={clsx(
          'bg-sidebar text-sidebar-foreground fixed inset-y-0 left-0 z-40 flex flex-col shadow-lg sm:static sm:translate-x-0',
          'w-64',
        )}
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          <Logo />
          <button
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
            className="hover:bg-secondary/40 rounded-md p-1.5"
          >
            <X className="h-5 w-5 cursor-pointer" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-4 font-medium">
          <NavItem href="/">홈</NavItem>
          <NavItem href="/debates/new">새 토론 개설</NavItem>
          <NavItem href="/results">종료된 토론</NavItem>
          <NavItem href="/profile">내 프로필</NavItem>
        </nav>
      </motion.aside>
    </>
  );
};
