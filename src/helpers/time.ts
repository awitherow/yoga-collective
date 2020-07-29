export const getMyTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const diffMinutes = (start, finish) =>
  Math.floor(Math.abs(finish.seconds - start.seconds) / 60);

export const timeZoned = ({ seconds }) =>
  new Date(
    new Date(seconds).toLocaleString("en-US", {
      timeZone: getMyTimezone(),
    })
  );

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const days = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];

function suffixOf(i) {
  const j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

export const defaultFormatDate = (d) =>
  `${days[d.getDay()]}, ${months[d.getMonth()]} ${suffixOf(
    d.getDate()
  )}, ${d.getHours()}:${d.getMinutes()}`;
