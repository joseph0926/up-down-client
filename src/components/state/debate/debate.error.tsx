import { AlertCircle } from 'lucide-react';

type DebateDetailErrorProps = {
  onRetry?: () => void;
  message?: string;
};

export function DebateDetailError({
  onRetry,
  message = '토론 정보를 불러오지 못했습니다.',
}: DebateDetailErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-red-600 dark:text-red-400">
      <AlertCircle className="h-10 w-10" />
      <p className="text-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-md border px-4 py-1 text-sm hover:bg-red-50 dark:border-red-400 dark:hover:bg-red-900/20"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
