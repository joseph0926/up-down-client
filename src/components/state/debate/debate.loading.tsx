import { Skeleton } from '@/components/ui/skeleton';

export function DebateDetailLoading() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-6">
      <Skeleton className="mx-auto h-8 w-2/3 rounded" />
      <Skeleton className="mx-auto h-4 w-1/4 rounded" />
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
      </div>
      <Skeleton className="mx-auto h-3 w-full rounded" />
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export function CommentsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full rounded-xl" />
      ))}
    </div>
  );
}
