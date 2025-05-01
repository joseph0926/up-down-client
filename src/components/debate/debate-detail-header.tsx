import { fetchDebate } from '@/services/debate.service';
import { DebateInfo } from './debate-info';

type DebateDetailHeaderProps = {
  debateId: string;
};

export const DebateDetailHeader = async ({
  debateId,
}: DebateDetailHeaderProps) => {
  const debateDetail = await fetchDebate(debateId);

  if (!debateDetail) {
    return (
      <header className="mb-4 space-y-2">
        {/* TODO: 데이터 없음을 표시 */}
      </header>
    );
  }

  const { title, createdAt, deadline, viewCount, commentCount, category } =
    debateDetail;

  return (
    <header className="mb-4 space-y-2">
      <h1 className="text-xl font-bold">{title}</h1>
      <DebateInfo
        createdAt={createdAt}
        deadline={deadline}
        category={category.name}
        views={viewCount}
        comments={commentCount}
      />
    </header>
  );
};
