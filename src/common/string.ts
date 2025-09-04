/* eslint-disable no-var */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60);
  const paddedSecs = secs.toString().padStart(2, "0");

  return `${minutes}:${paddedSecs}`;
}
