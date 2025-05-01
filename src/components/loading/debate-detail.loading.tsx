import { Skeleton } from '@/components/ui/skeleton';

export const DebateDetailSkeleton = () => (
  <>
    <div className="grid items-center gap-2">
      <Skeleton className="h-2 w-full" />
    </div>
    <div className="space-y-6 py-6">
      <div className="flex gap-4">
        <Skeleton className="h-11 flex-1" />
        <Skeleton className="h-11 flex-1" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-10/12" />
        <Skeleton className="h-4 w-9/12" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  </>
);
