import { Bell, Search } from 'lucide-react';
import { Link } from 'react-router';
import { MobileSidebar } from './mobile-sidebar';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800 dark:bg-zinc-900 dark:supports-[backdrop-filter]:bg-zinc-900/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 lg:px-8">
        <Link to="/">
          <h1 className="font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
            Up&nbsp;&amp;&nbsp;Down
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="search"
              placeholder="토론, 태그 검색…"
              className="rounded-md bg-zinc-100 py-1.5 pr-3 pl-8 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-zinc-800"
            />
          </div>
          <button className="relative rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-rose-500" />
          </button>
          <MobileSidebar />
        </div>
      </div>
    </header>
  );
}
