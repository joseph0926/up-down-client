'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';

import { useDebate } from '@/services/debate.query';
import { DebateVoteBar } from './debate-vote-bar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CommentInput } from '../commnet/comment-input';
import { CommentList } from '../commnet/comment-list';

const COLOR = {
  PRO: {
    bg: 'bg-blue-50',
    border: 'border-blue-400',
    text: 'text-blue-600',
  },
  CON: {
    bg: 'bg-red-50',
    border: 'border-red-400',
    text: 'text-red-600',
  },
};

export const DebateDetailClient = ({ debateId }: { debateId: string }) => {
  const { data, status } = useDebate(debateId);
  const proRef = useRef<HTMLDivElement>(null);
  const conRef = useRef<HTMLDivElement>(null);

  if (status === 'error') return <DetailError />;

  const {
    title,
    content,
    status: debateStatus,
    proRatio,
    conRatio,
    proCount,
    conCount,
    thumbUrl,
    smallUrl,
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
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
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
      {(thumbUrl || smallUrl) && (
        <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={thumbUrl ?? smallUrl!}
            alt={`${title} 썸네일`}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      {content && (
        <article
          className="prose prose-sm max-w-none py-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      <section className="mt-12 space-y-6">
        <h2 className="text-lg font-semibold">댓글</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div
            className={cn(
              'space-y-4 rounded-lg p-4',
              'border-l-4',
              COLOR.PRO.bg,
              COLOR.PRO.border,
            )}
          >
            <h3 className={cn('text-base font-semibold', COLOR.PRO.text)}>
              🔵 찬성 ({proCount})
            </h3>
            <CommentList debateId={debateId} side="PRO" />
            <CommentInput
              scrollAnchor={proRef}
              debateId={debateId}
              side="PRO"
              placeholder="찬성 의견을 남겨주세요"
            />
          </div>
          <div
            className={cn(
              'space-y-4 rounded-lg p-4',
              'border-l-4',
              COLOR.CON.bg,
              COLOR.CON.border,
            )}
          >
            <h3 className={cn('text-base font-semibold', COLOR.CON.text)}>
              🔴 반대 ({conCount})
            </h3>
            <CommentList debateId={debateId} side="CON" />
            <CommentInput
              scrollAnchor={conRef}
              debateId={debateId}
              side="CON"
              placeholder="반대 의견을 남겨주세요"
            />
          </div>
        </div>
      </section>
    </>
  );
};

const DetailError = () => (
  <p className="text-center text-sm text-red-500">
    토론 정보를 불러오지 못했습니다.
  </p>
);
