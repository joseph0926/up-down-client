import { cn } from '@/lib/utils';

type OptionCardProps = {
  side: 'pro' | 'con';
  label: string;
  summary: string;
  icon: string;
  ratio: number;
  votes: number;
};

export function OptionCard({ side, label, summary }: OptionCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border p-4 shadow-sm',
        side === 'pro'
          ? 'border-blue-200 bg-blue-50 dark:border-blue-400/40 dark:bg-blue-400/10'
          : 'border-red-200 bg-red-50 dark:border-red-400/40 dark:bg-red-400/10',
      )}
    >
      <p className="text-sm font-semibold md:text-base">{label}</p>
      <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
        {summary}
      </p>
    </div>
  );
}
