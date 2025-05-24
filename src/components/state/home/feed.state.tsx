import { AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
  return (
    <article className="rounded-2xl border p-4 shadow-sm dark:border-zinc-700">
      <Skeleton className="mb-4 h-4 w-1/3" />
      <Skeleton className="mb-3 aspect-video w-full rounded-lg" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-2/3" />
    </article>
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
