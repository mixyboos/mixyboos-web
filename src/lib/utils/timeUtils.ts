import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const secondsToReadableString = (seconds: number) =>
  seconds <= 0 || isNaN(seconds)
    ? "00:00"
    : seconds >= 60
    ? new Date(seconds * 1000).toISOString().slice(11, 19)
    : new Date(seconds * 1000).toISOString().slice(14, 19);

const humanizeDate = (
  date: string = new Date().toISOString(),
  showSuffix = false
) => {
  dayjs.extend(relativeTime);
  return dayjs(date).fromNow(!showSuffix);
};

export { humanizeDate, secondsToReadableString };
