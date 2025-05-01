import { Skeleton } from '@/components/ui/skeleton';

export const DebateHeaderSkeleton = () => (
  <header className="mb-4 space-y-2">
    <Skeleton className="h-8 w-3/5" />
    <Skeleton className="h-4 w-2/3" />
  </header>
);
