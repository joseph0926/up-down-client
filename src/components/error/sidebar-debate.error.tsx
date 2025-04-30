import { AlertOctagon } from 'lucide-react';

export const SidebarDebateErrorFallback = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => (
  <div className="flex flex-col items-center gap-3 py-6 text-center">
    <AlertOctagon className="h-6 w-6 text-red-500" />
    <p className="text-sm text-gray-700">목록을 불러오지 못했어요.</p>
    <button
      onClick={reset}
      className="rounded bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 active:bg-red-200"
    >
      다시 시도
    </button>
  </div>
);
