export function CreateDebateCard() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-3">
        <img
          src="https://source.unsplash.com/40x40?face&sig=1"
          alt="avatar"
          className="h-9 w-9 rounded-full object-cover"
        />
        <input
          placeholder="어떤 주제로 토론을 열어볼까요?"
          className="flex-1 rounded-full bg-zinc-100 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-zinc-800"
        />
        <button className="ml-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          만들기
        </button>
      </div>
    </div>
  );
}
