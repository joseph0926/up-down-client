import dayjs from 'dayjs';
import { ThumbsDown, ThumbsUp, User } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

type CommentProps = {
  id: string;
  user: string;
  side: 'pro' | 'con';
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
};

export function CommentItem({
  user,
  side,
  content,
  likes,
  dislikes,
  createdAt,
}: CommentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3"
    >
      <User className="h-8 w-8 rounded-full bg-zinc-300 p-1 text-white" />
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2 text-sm font-medium">
          <span>{user}</span>
          <span
            className={cn(
              'text-xs',
              side === 'pro' ? 'text-blue-600' : 'text-red-600',
            )}
          >
            {side === 'pro' ? '찬성' : '반대'}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {dayjs(createdAt).fromNow()}
          </span>
        </div>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{content}</p>
        <div className="flex gap-4 pt-1 text-xs text-zinc-500">
          <button className="flex items-center gap-1 hover:text-blue-600">
            <ThumbsUp className="h-3.5 w-3.5" /> {likes}
          </button>
          <button className="flex items-center gap-1 hover:text-red-600">
            <ThumbsDown className="h-3.5 w-3.5" /> {dislikes}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
