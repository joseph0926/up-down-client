import { useEffect, useMemo, useState } from 'react';

export const useCountdown = (target: Date) => {
  const targetMs = useMemo(() => target.getTime(), [target]);
  const [remain, setRemain] = useState(() =>
    Math.max(0, targetMs - Date.now()),
  );

  useEffect(() => {
    if (remain <= 0) return;
    const id = setInterval(() => {
      setRemain(Math.max(0, targetMs - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [targetMs, remain]);

  return remain;
};
