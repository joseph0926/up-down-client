export function buildQuery(params: Record<string, unknown>) {
  const usp = new URLSearchParams();

  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    usp.append(k, String(v));
  });

  return `?${usp.toString()}`;
}
