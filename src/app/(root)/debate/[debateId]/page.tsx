import { DebateDetailHeader } from '@/components/debate/debate-detail-header';
import { DebateDetailServer } from '@/components/debate/debate-detail.server';
import { DebateDetailSkeleton } from '@/components/loading/debate-detail.loading';
import { DebateHeaderSkeleton } from '@/components/loading/debate-header.loading';
import { fetchDebate } from '@/services/debate.service';
import { Metadata } from 'next';
import { Suspense } from 'react';

type DebateDetailPageProps = {
  params: Promise<{ debateId: string }>;
};

export async function generateMetadata({
  params,
}: DebateDetailPageProps): Promise<Metadata> {
  const { debateId } = await params;
  const data = await fetchDebate(debateId).catch(() => null);
  if (!data) return {};

  return {
    title: data.title,
    description: data.content?.slice(0, 120),
    openGraph: {
      title: data.title,
      images: data.thumbUrl ?? data.smallUrl ?? undefined,
    },
  };
}

export default async function DebateDetailPage({
  params,
}: DebateDetailPageProps) {
  const { debateId } = await params;

  return (
    <section className="flex h-full flex-col overflow-y-auto px-8 py-6">
      <Suspense fallback={<DebateHeaderSkeleton />}>
        <DebateDetailHeader debateId={debateId} />
      </Suspense>
      <Suspense fallback={<DebateDetailSkeleton />}>
        <DebateDetailServer debateId={debateId} />
      </Suspense>
    </section>
  );
}
