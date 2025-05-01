'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import { useDebate } from '@/services/debate.query';
import { DebateVoteBar } from './debate-vote-bar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CommentInput } from '../commnet/comment-input';
import { CommentList } from '../commnet/comment-list';

export const DebateDetailClient = ({ debateId }: { debateId: string }) => {
  const { data, status } = useDebate(debateId);
  const proRef = useRef<HTMLInputElement>(null);
  const conRef = useRef<HTMLInputElement>(null);

  if (status === 'error') return <DetailError />;

  const {
    content,
    status: debateStatus,
    proRatio,
    conRatio,
    proCount,
    conCount,
  } = data!;

  const focusInput = (side: 'PRO' | 'CON') =>
    (side === 'PRO' ? proRef.current : conRef.current)?.scrollIntoView({
      behavior: 'smooth',
    });

  return (
    <>
      <DebateVoteBar proRatio={proRatio} conRatio={conRatio} />
      {debateStatus === 'ongoing' && (
        <div className="my-6 grid grid-cols-2 gap-3">
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button
              className={cn('w-full bg-blue-600 text-white hover:bg-blue-700')}
              onClick={() => focusInput('PRO')}
            >
              ✍️ 찬성 의견 쓰기 ({proCount})
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => focusInput('CON')}
            >
              ✍️ 반대 의견 쓰기 ({conCount})
            </Button>
          </motion.div>
        </div>
      )}

      {content && (
        <article
          className="prose prose-sm max-w-none py-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      <section className="mt-10 space-y-6">
        <h2 className="text-lg font-semibold">댓글</h2>

        <CommentInput
          scrollAnchor={proRef}
          debateId={debateId}
          side="PRO"
          placeholder="찬성 의견을 남겨주세요"
        />
        <CommentList debateId={debateId} side="PRO" />

        <CommentInput
          scrollAnchor={conRef}
          debateId={debateId}
          side="CON"
          placeholder="반대 의견을 남겨주세요"
        />
        <CommentList debateId={debateId} side="CON" />
      </section>
    </>
  );
};

const DetailError = () => (
  <p className="text-center text-sm text-red-500">
    토론 정보를 불러오지 못했습니다.
  </p>
);
