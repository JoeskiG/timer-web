import { CONSTANTS } from "./constants";

export interface IMonthData {
  text: string;
  shortText: string;
  lastDate: number;
}


export function getMonthData(year: number, monthString: string): IMonthData | null {
  const monthIndex = CONSTANTS.months.findIndex(m => m.toLowerCase() === monthString.toLowerCase())
  if (typeof monthIndex === 'undefined') {
    return null
  }

  const monthIndex1 = monthIndex + 1;
  const month = CONSTANTS.months[monthIndex]

  // Get the last date of the current month and year
  const lastDate = new Date(year, monthIndex1, 0).getDate();

  return {
    text: month,
    shortText: month.substring(0, 3),
    lastDate
  };
}


export function formatDate(dateString: string): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  const date = new Date(dateString);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const ordinalSuffix = (dayOfMonth) => {
    if (dayOfMonth >= 11 && dayOfMonth <= 13) {
      return 'th';
    }
    switch (dayOfMonth % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const formattedDate = `${hours}:${minutes}:${seconds} ${dayOfWeek} ${dayOfMonth}${ordinalSuffix(dayOfMonth)} ${month}, ${year}`;
  return formattedDate;
}

