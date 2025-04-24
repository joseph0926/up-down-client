import { intervalToDuration } from 'date-fns';

/**
 * @param ms   남은 시간(밀리초)
 * @returns    HH:mm:ss  |  mm:ss  |  "00:00" (만료)
 */
export function formatRemaining(ms: number): string {
  if (ms <= 0) return '00:00';

  const {
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = intervalToDuration({
    start: 0,
    end: ms,
  });

  const h = hours;
  const m = minutes;
  const s = seconds;

  return h
    ? `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    : `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function clampPct(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}
