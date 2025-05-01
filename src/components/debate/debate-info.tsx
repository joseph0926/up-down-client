import dayjs from 'dayjs';

type DebateInforops = {
  author?: string | null;
  createdAt: string;
  deadline: string;
  category?: string | null;
  views: number;
  comments: number;
};

export const DebateInfo = ({
  author,
  createdAt,
  deadline,
  category,
  views,
  comments,
}: DebateInforops) => (
  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
    {author && <span>작성자 · {author}</span>}
    <span>생성 · {dayjs(createdAt).format('YYYY-MM-DD')}</span>
    <span>마감 · {dayjs(deadline).format('YYYY-MM-DD')}</span>
    {category && <span>카테고리 · {category}</span>}
    <span>👁 {views.toLocaleString()}</span>
    <span>💬 {comments.toLocaleString()}</span>
  </div>
);
