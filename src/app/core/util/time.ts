export function secondsToTime(seconds: number): string {
  const minute: number = Math.floor(seconds / 60);
  const second: number = seconds == 0 ? 0 : seconds % 60;

  if (second < 10) {
    return `${minute}:0${second}`;
  } else {
    return `${minute}:${second}`;
  }
}
