const stats = [
  { label: '전체 토론', value: 128 },
  { label: '누적 투표', value: '9,421' },
  { label: '오늘 댓글', value: 312 },
];

export const Meta = () => {
  return (
    <section className="grid grid-cols-3 gap-4 px-6 py-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl bg-zinc-100 py-6 text-center text-zinc-800 dark:bg-white/5 dark:text-zinc-100"
        >
          <p className="mb-1 text-sm opacity-60 dark:text-zinc-400">
            {s.label}
          </p>
          <p className="text-2xl font-semibold">{s.value}</p>
        </div>
      ))}
    </section>
  );
};
