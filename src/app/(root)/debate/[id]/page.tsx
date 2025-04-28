import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { fetchDebate } from '@/services/debate.service';
import { DetailBody } from '../components/detail-body';

export default async function DebateDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const debate = await fetchDebate(id).catch(() => null);
  if (!debate) return notFound();

  const VoteButtons = dynamic(
    () => import('@/app/(root)/debate/components/vote-buttons'),
  );
  // const CommentStream = dynamic(
  //   () => import('@/app/(root)/debate/components/comment-stream'),
  //   { ssr: false },
  // );

  return (
    <>
      <DetailBody data={debate} />
      <VoteButtons debate={debate} />
      {/* <CommentStream debateId={debate.id} /> */}
    </>
  );
}
