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

  