'use client';

import { Button } from '@/components/ui/button';
import { useAddVote } from '@/services/debate.query';
import type { TDebateDetail } from '@/types/debate.type';
import { motion } from 'motion/react';

interface Props {
  debate: TDebateDetail;
}
export default function VoteButtons({ debate }: Props) {
  const addVote = useAddVote();

  const onVote = (side: 'PRO' | 'CON') =>
    addVote.mutate({ debateId: debate.id, side });

  return (
    <div className="my-4 flex gap-3">
      <Button
        asChild
        className="flex-1"
        disabled={addVote.isPending}
        onClick={() => onVote('PRO')}
      >
        <motion.span whileTap={{ scale: 0.9 }}>👍 찬성</motion.span>
      </Button>

      <Button
        variant="secondary"
        className="flex-1"
        disabled={addVote.isPending}
        onClick={() => onVote('CON')}
      >
        <motion.span whileTap={{ scale: 0.9 }}>👎 반대</motion.span>
      </Button>
    </div>
  );
}
