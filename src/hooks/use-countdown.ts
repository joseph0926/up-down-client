import { useEffect, useState } from 'react';

export const useCountdown = (target: Date) => {
  const targetMs = target.getTime();
  const [remain, setRemain] = useState(() =>
    Math.max(0, targetMs - Date.now()),
  );

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const tick = () => {
      const diff = Math.max(0, targetMs - Date.now());
      setRemain(diff);

      if (diff > 0) {
        const delay = (1000 - (Date.now() % 1000)) % 1000 || 1;
        id = setTimeout(tick, delay);
      }
    };

    tick();
    return () => clearTimeout(id);
  }, [targetMs]);

  return remain;
};
