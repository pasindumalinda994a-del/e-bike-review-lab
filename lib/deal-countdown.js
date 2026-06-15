export function getCountdownParts(endAt) {
  const end = new Date(endAt);
  if (Number.isNaN(end.getTime())) return null;

  const diff = end.getTime() - Date.now();
  if (diff <= 0) return null;

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

export function formatCountdown(endAt) {
  const parts = getCountdownParts(endAt);
  if (!parts) return null;

  const segments = [];
  if (parts.days > 0) segments.push(`${parts.days}d`);
  segments.push(`${parts.hours}h`);
  segments.push(`${parts.minutes}m`);
  if (parts.days === 0) segments.push(`${parts.seconds}s`);

  return segments.join(" ");
}
