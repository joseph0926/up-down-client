import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DebateGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Skeleton className="h-40 w-full" />}>
      {children}
    </Suspense>
  );
}
