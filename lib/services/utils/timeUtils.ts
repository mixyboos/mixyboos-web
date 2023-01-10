const secondsToReadableString = (seconds: number) =>
  seconds <= 0 || isNaN(seconds)
    ? '00:00'
    : seconds >= 60
    ? new Date(seconds * 1000).toISOString().slice(11, 19)
    : new Date(seconds * 1000).toISOString().slice(14, 19);
// seconds < 3600
//     ? new Date(seconds * 1000).toISOString().substr(14, 5)
//     : new Date(seconds * 1000).toISOString().substr(11, 8);

export { secondsToReadableString };
