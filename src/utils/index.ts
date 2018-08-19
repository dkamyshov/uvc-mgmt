import { EMonth } from '../logic';

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export const generateHours = (year: number) => {
  return [
    { id: 0, year: year, month: EMonth.SEPTEMBER, hours: 0 },
    { id: 0, year: year, month: EMonth.OCTOBER, hours: 0 },
    { id: 0, year: year, month: EMonth.NOVEMBER, hours: 0 },
    { id: 0, year: year, month: EMonth.DECEMBER, hours: 0 },
    { id: 0, year: year + 1, month: EMonth.JANUARY, hours: 0 },
    { id: 0, year: year + 1, month: EMonth.FEBRUARY, hours: 0 },
    { id: 0, year: year + 1, month: EMonth.MARCH, hours: 0 },
    { id: 0, year: year + 1, month: EMonth.APRIL, hours: 0 },
    { id: 0, year: year + 1, month: EMonth.MAY, hours: 0 },
    { id: 0, year: year + 1, month: EMonth.JUNE, hours: 0 },
    { id: 0, year: year + 1, month: EMonth.JULY, hours: 0 },
    { id: 0, year: year + 1, month: EMonth.AUGUST, hours: 0 },
  ];
};
