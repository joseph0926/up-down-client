import { AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
  return (
    <li className="list-none overflow-hidden rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-2/3 rounded" />
        <Skeleton className="ml-auto h-3 w-10 rounded" />
      </div>
      <Skeleton className="mt-3 h-3 w-full rounded-full" />
      <div className="mt-3 grid grid-cols-[1fr_auto] gap-3">
        <div className="space-y-2">
          <Skeleton className="h-3 w-full rounded" />
          <Skeleton className="h-3 w-5/6 rounded" />
        </div>
        <Skeleton className="h-24 w-24 rounded-lg" />
      </div>
      <div className="mt-2 flex justify-around">
        {Array.from({ length: 4 }).map((_, j) => (
          <Skeleton key={j} className="h-4 w-10 rounded" />
        ))}
      </div>
    </li>
  );
}

export function SkeletonList({ count }: { count: number }) {
  return (
    <AnimatePresence initial={false}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={`sk-${i}`}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SkeletonCard />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

export function ErrorView({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-8 text-sm text-red-600 dark:text-red-400">
      <AlertCircle className="h-5 w-5" />
      <p>토론 목록을 불러오지 못했습니다.</p>
      <button
        onClick={onRetry}
        className="rounded-md border px-3 py-1 text-red-600 hover:bg-red-50 dark:border-red-400 dark:hover:bg-red-900/20"
      >
        다시 시도
      </button>
    </div>
  );
}
