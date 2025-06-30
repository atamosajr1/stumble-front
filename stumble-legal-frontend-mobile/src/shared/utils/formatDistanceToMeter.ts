export function formatDistanceToMeters(distance: number): string {
  const kilometer = Math.floor(distance);
  const meter = Math.round((distance - kilometer) * 1000);

  if (kilometer) {
    return `${kilometer} km`;
  }
  if (meter) {
    return `${meter} m`;
  }

  return '';
}
