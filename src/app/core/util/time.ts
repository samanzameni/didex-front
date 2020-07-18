export function secondsToTime(seconds: number): String {
  const minute: number = Math.floor(seconds / 60);
  const second: number = seconds % 60;

  return `${minute}:${second}`;
}
