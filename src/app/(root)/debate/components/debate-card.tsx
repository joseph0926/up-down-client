import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { TSidebarItem } from '@/types/debate.type';

interface Props {
  data: TSidebarItem;
  small?: boolean;
  compact?: boolean;
}
export function DebateCard({ data, small, compact }: Props) {
  const ratio = Math.round(data.proRatio * 100);

  return (
    <Link href={`/debate/${data.id}`} prefetch>
      <Card
        className={
          compact
            ? 'flex items-center gap-2 px-2 py-1'
            : small
              ? 'p-3'
              : 'transition-shadow hover:shadow-md'
        }
      >
        {!compact && data.thumbUrl && (
          <img
            src={data.thumbUrl}
            alt=""
            className="h-32 w-full rounded-md object-cover"
          />
        )}

        <CardContent className={compact ? 'flex-1 p-0' : 'mt-2 space-y-1 p-0'}>
          <h3
            className={
              compact
                ? 'line-clamp-1 text-sm'
                : small
                  ? 'line-clamp-2 text-sm'
                  : 'line-clamp-2 font-semibold'
            }
          >
            {data.title}
          </h3>

          {!compact && (
            <>
              <div className="bg-muted h-1 w-full rounded">
                <div
                  className="bg-primary h-1 rounded"
                  style={{ width: `${ratio}%` }}
                />
              </div>
              <div className="text-muted-foreground flex justify-between text-xs">
                <span>D{data.dDay > 0 ? `-${data.dDay}` : '+1'}</span>
                <span>🔥 {data.hotScore.toFixed(1)}</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
