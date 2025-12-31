import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function formatSmartDate(isoString: string) {
  const date = dayjs(isoString);
  const now = dayjs();
  
  const diffInYears = now.diff(date, 'year');

  if (diffInYears >= 2) {
    return date.format('MMM D, YYYY'); // Example: "Dec 31, 2022"
  } else {
    return date.fromNow(); // Example: "8 months ago"
  }
}