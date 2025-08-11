import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const secondsToReadableString = (seconds: number) =>
  seconds <= 0 || isNaN(seconds)
    ? '00:00'
    : seconds >= 60
      ? new Date(seconds * 1000).toISOString().slice(11, 19)
      : new Date(seconds * 1000).toISOString().slice(14, 19)

const humanizeDate = (date: Date = new Date(), showSuffix = false) => {
  dayjs.extend(relativeTime)
  return dayjs(date).fromNow(!showSuffix)
}
export const secondsToHHMMSS = (sec: number) => {
  let totalSec = Math.floor(sec)
  const hours = Math.floor(totalSec / 3600)
  totalSec %= 3600
  const minutes = Math.floor(totalSec / 60)
  const seconds = Math.floor(totalSec % 60)
  let result = ''

  if (hours >= 1) {
    result += hours + ':'
  }

  if (minutes >= 10) {
    result += minutes + ':'
  } else if (minutes >= 1 && hours >= 1) {
    result += '0' + minutes + ':'
  } else if (minutes >= 1) {
    result += minutes + ':'
  } else if (minutes === 0 && hours >= 1) {
    result += '00:'
  }

  if (seconds >= 10) {
    result += seconds
  } else if (seconds >= 1) {
    result += '0' + seconds
  } else {
    result += '00'
  }

  if (result.length === 2) {
    result = '0:' + result
  }

  if (result.length === 1) {
    result = '0:0' + result
  }

  return result
}

export { humanizeDate, secondsToReadableString }
