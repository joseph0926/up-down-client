import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export function DebateCard({ data }) {
  return (
    <Link href={`/debates/${data.id}`}>
      <Card className="transition-shadow hover:shadow-md">
        {data.thumbUrl && (
          <img
            src={data.thumbUrl}
            alt=""
            className="h-36 w-full rounded-t-2xl object-cover"
          />
        )}
        <CardContent className="space-y-2 p-4">
          <h3 className="line-clamp-2 font-semibold">{data.title}</h3>
          <div className="flex justify-between text-xs">
            <span>🔥 {data.hotScore.toFixed(1)}</span>
            <span>D{data.dDay > 0 ? `-${data.dDay}` : '+1'}</span>
          </div>
          <div className="bg-muted h-1 w-full rounded-full">
            <div
              className="bg-primary h-1 rounded-full"
              style={{ width: `${data.proRatio * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
