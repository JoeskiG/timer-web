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

  const ordinalSuffix = (dayOfMonth: number) => {
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


export function makeID(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function getSavedBackground() {
  const savedBackground = localStorage.getItem('savedBackground')
  if (!savedBackground) {
    return null
  }

  const savedBackgroundParsed = JSON.parse(savedBackground)

  return savedBackgroundParsed
}

export function saveBackground(background: any) {
  localStorage.setItem('savedBackground', JSON.stringify(background))


}


interface CityTime {
  city: string;
  hours: number;
  minutes: number;
  seconds: number;
  date: Date;
}

export function getCurrentTime(city: string): CityTime {
  // const options: Intl.DateTimeFormatOptions = {
  //   timeZone: city,
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   second: 'numeric',
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  // };

  //const currentTime = new Date().toLocaleString('en-US', options);

  const date2 = new Date().toLocaleDateString('en-US', { timeZone: city });
  const date = new Date(date2)

  const time = new Date().toLocaleTimeString('en-US', { timeZone: city, hour12: false });

  const [hours, minutes, seconds] = time.split(':').map(Number);

  return {
    city,
    hours,
    minutes,
    seconds,
    date,
  };
}

export function getTextAfterChar(inputString: string, char: string): string | null {
  if (!inputString) {
    return null
  }
  const lastSlashIndex = inputString.lastIndexOf(char);
  if (lastSlashIndex !== -1) {
    return inputString.substring(lastSlashIndex + 1);
  }
  return null; // Return null if there is no slash in the string
}

export function zeroPad(num: number, places: number): string {
  return String(num).padStart(places, '0')
}
