'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SidebarProps {
  isOpen?: boolean;
  side?: 'left' | 'right';
  width?: number | string;
  showOverlay?: boolean;
  className?: string;
  children: React.ReactNode;
}

const DEFAULT_WIDTH = 320;

export function Sidebar({
  isOpen = true,
  side = 'left',
  width = DEFAULT_WIDTH,
  showOverlay = true,
  className,
  children,
}: SidebarProps) {
  const [open, setOpen] = useState<boolean>(isOpen);
  const firstRenderRef = useRef(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    firstRenderRef.current = false;
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const Trigger = (
    <button
      type="button"
      aria-label="Open sidebar"
      className="focus-visible:ring-primary cursor-pointer rounded-full p-2 hover:bg-gray-100"
      onClick={() => setOpen(true)}
    >
      <Menu className="h-5 w-5" />
    </button>
  );

  const slideInitial: false | { x: string } = firstRenderRef.current
    ? false
    : { x: side === 'left' ? '-100%' : '100%' };

  const overlayInitial: false | { opacity: number } = firstRenderRef.current
    ? false
    : { opacity: 0 };

  return (
    <>
      {!open && Trigger}

      <AnimatePresence initial={false}>
        {open && (
          <>
            {showOverlay && (
              <motion.div
                key="overlay"
                className="fixed inset-0 z-40 bg-black/50"
                initial={overlayInitial}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setOpen(false)}
              />
            )}
            <motion.aside
              key="sidebar"
              ref={ref}
              role="dialog"
              aria-modal="true"
              tabIndex={-1}
              className={cn(
                'fixed top-0 bottom-0 z-50 flex flex-col bg-white shadow-xl outline-none',
                typeof width === 'number' ? undefined : width,
                side === 'left' ? 'left-0' : 'right-0',
                className,
              )}
              style={typeof width === 'number' ? { width } : undefined}
              initial={slideInitial}
              animate={{ x: 0 }}
              exit={{ x: side === 'left' ? '-100%' : '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            >
              <button
                onClick={() => setOpen(false)}
                className="focus-visible:ring-primary absolute top-4 right-4 cursor-pointer rounded-full p-2 hover:bg-gray-100"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="h-full overflow-y-auto">{children}</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
