import { fetchDebate } from '@/services/debate.service';
import { formatDate } from 'date-fns';
import { Clock, Eye, MessageCircle } from 'lucide-react';
import { Badge } from '../ui/badge';

type DebateDetailHeaderProps = {
  debateId: string;
};

export const DebateDetailHeader = async ({
  debateId,
}: DebateDetailHeaderProps) => {
  const debateDetail = await fetchDebate(debateId);

  const date = {
    created: formatDate(debateDetail.createdAt, 'yyyy-MM-dd'),
    deadline: formatDate(debateDetail.deadline, 'yyyy-MM-dd'),
  };
  const statusColor: Record<typeof debateDetail.status, string> = {
    upcoming: 'bg-yellow-500',
    ongoing: 'bg-green-600',
    closed: 'bg-gray-500',
  };

  return (
    <header className="mb-6 space-y-3">
      <h1 className="flex items-center gap-2 text-xl leading-tight font-bold">
        {debateDetail.title}
        <Badge className={statusColor[debateDetail.status]}>
          {debateDetail.status}
        </Badge>
      </h1>
      <ul className="flex flex-wrap gap-4 text-xs text-gray-500">
        <li className="flex items-center gap-1">
          <Clock size={14} /> 시작 {date.created}
        </li>
        <li className="flex items-center gap-1">
          <Clock size={14} /> 마감 {date.deadline}
        </li>
        <li className="flex items-center gap-1">
          <Eye size={14} /> {debateDetail.viewCount.toLocaleString()}
        </li>
        <li className="flex items-center gap-1">
          <MessageCircle size={14} />{' '}
          {debateDetail.commentCount.toLocaleString()}
        </li>
        <li className="ml-auto text-blue-700">{debateDetail.category.name}</li>
      </ul>
    </header>
  );
};
