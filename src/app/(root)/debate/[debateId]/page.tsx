import { DebateDetailHeader } from '@/components/debate/debate-detail-header';
import { DebateDetailServer } from '@/components/debate/debate-detail.server';
import { DebateHeaderSkeleton } from '@/components/loading/debate-header.loading';
import { Suspense } from 'react';

type DebateDetailPageProps = {
  params: Promise<{ debateId: string }>;
};

export default async function DebateDetailPage({
  params,
}: DebateDetailPageProps) {
  const { debateId } = await params;

  return (
    <section className="flex h-full flex-col overflow-y-auto px-8 py-6">
      <Suspense fallback={<DebateHeaderSkeleton />}>
        <DebateDetailHeader debateId={debateId} />
      </Suspense>
      <Suspense fallback={/** 여기 로딩 컴포넌트 */ false}>
        <DebateDetailServer debateId={debateId} />
      </Suspense>
    </section>
  );
}
