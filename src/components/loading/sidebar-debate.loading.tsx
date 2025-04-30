export const SidebarDebateSkeletonList = () => (
  <ul className="flex flex-col gap-4 px-2 py-8">
    {Array.from({ length: 10 }).map((_, i) => (
      <li key={i} className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
          <div className="flex-1 space-y-1">
            <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
        <div className="h-1 animate-pulse rounded bg-gray-100" />
      </li>
    ))}
  </ul>
);
