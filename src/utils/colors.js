export function getHeatColor(value, max) {
  const percent = value / max;

  const hue = (1 - percent) * 240;

  return `hsl(${hue}, 100%, 50%)`;
}