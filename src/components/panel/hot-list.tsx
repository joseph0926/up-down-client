import { DebateCard } from '@/app/(root)/debate/components/debate-card';
import { fetchHot } from '@/services/debate.service';
import { notFound } from 'next/navigation';

export async function HotPanel() {
  const hot = await fetchHot(10).catch(() => null);
  if (!hot) {
    notFound();
  }

  return (
    <div className="space-y-2">
      <h3 className="mb-2 text-lg font-semibold">HOT Top10</h3>
      {hot.items.map((d, i) => (
        <div key={d.id} className="flex items-center gap-2">
          <span className="text-muted-foreground w-5 text-sm">{i + 1}</span>
          <DebateCard data={d} compact />
        </div>
      ))}
    </div>
  );
}
