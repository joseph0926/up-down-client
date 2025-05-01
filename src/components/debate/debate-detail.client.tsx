'use client';

import { DebateVoteBar } from './debate-vote-bar';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { useDebate } from '@/services/debate.query';
import { DebateDetailSkeleton } from '../loading/debate-detail.loading';

export const DebateDetailClient = ({ debateId }: { debateId: string }) => {
  const { data, status } = useDebate(debateId);

  if (status === 'pending') return <DebateDetailSkeleton />;
  if (status === 'error') return <DebateDetailError />;

  const {
    content,
    status: debateStatus,
    proRatio,
    conRatio,
    proCount,
    conCount,
  } = data!;

  return (
    <>
      <DebateVoteBar proRatio={proRatio} conRatio={conRatio} />
      {debateStatus === 'ongoing' && (
        <div className="my-6 flex gap-4">
          <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
            <Button
              size="lg"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => vote('PRO')}
            >
              👍 찬성 ({proCount})
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
            <Button
              size="lg"
              variant="destructive"
              className="w-full"
              onClick={() => vote('CON')}
            >
              👎 반대 ({conCount})
            </Button>
          </motion.div>
        </div>
      )}
      {content && (
        <article className="prose prose-sm max-w-none py-4">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      )}
      <h2 className="mt-8 mb-2 text-lg font-semibold">댓글</h2>
      {/* <CommentInput debateId={id} />
      <CommentList debateId={id} /> */}
    </>
  );
};

const DebateDetailError = () => (
  <div className="flex h-full items-center justify-center">
    <p className="text-gray-500">토론 정보를 불러오지 못했습니다.</p>
  </div>
);

async function vote(side: 'PRO' | 'CON') {
  /* 추후 mutate 로직 */
}
