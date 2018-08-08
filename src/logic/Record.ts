export enum EMonth {
  JANUARY = 0,
  FEBRUARY = 1,
  MARCH = 2,
  APRIL = 3,
  MAY = 4,
  JUNE = 5,
  JULY = 6,
  AUGUST = 7,
  SEPTEMBER = 8,
  OCTOBER = 9,
  NOVEMBER = 10,
  DECEMBER = 11,
}

export const monthsIterable = [
  EMonth.JANUARY,
  EMonth.FEBRUARY,
  EMonth.MARCH,
  EMonth.APRIL,
  EMonth.MAY,
  EMonth.JUNE,
  EMonth.JULY,
  EMonth.AUGUST,
  EMonth.SEPTEMBER,
  EMonth.OCTOBER,
  EMonth.NOVEMBER,
  EMonth.DECEMBER,
];

export const getMonthRussianName = (month: EMonth): string => {
  switch (month) {
    case EMonth.JANUARY:
      return 'Январь';
    case EMonth.FEBRUARY:
      return 'Февраль';
    case EMonth.MARCH:
      return 'Март';
    case EMonth.APRIL:
      return 'Апрель';
    case EMonth.MAY:
      return 'Май';
    case EMonth.JUNE:
      return 'Июнь';
    case EMonth.JULY:
      return 'Июль';
    case EMonth.AUGUST:
      return 'Август';
    case EMonth.SEPTEMBER:
      return 'Сентябрь';
    case EMonth.OCTOBER:
      return 'Октябрь';
    case EMonth.NOVEMBER:
      return 'Ноябрь';
    case EMonth.DECEMBER:
      return 'Декабрь';
    default:
      return `[MONTH ${month}]`;
  }
};

export interface IRecord {
  id: number;
  year: number;
  month: EMonth;
  hours: number;
}

export interface IRecordExtended extends IRecord {
  total: number;
  overflow: boolean;
}

export const recordsSorter = (a: IRecord, b: IRecord) => {
  if (a.year === b.year) {
    return a.month - b.month;
  } else {
    return a.year - b.year;
  }
};

export const sortRecords = (records: IRecord[]): IRecord[] =>
  [...records].sort(recordsSorter);

export const yearsSpan = (records: IRecord[]): number[] => {
  const mappedYears = records.reduce((result: any, record) => {
    if (!result[String(record.year)]) {
      result[String(record.year)] = true;
    }

    return result;
  }, {});

  return Object.keys(mappedYears)
    .map(Number)
    .sort();
};

export const getRecordsMap = (
  records: IRecordExtended[],
  year: number
): {
  [key: string]: IRecordExtended;
} =>
  records
    .filter(record => record.year === year)
    .reduce((result: any, record) => {
      result[String(record.month)] = record;
      return result;
    }, {});

export const extendRecords = (
  records: IRecord[],
  plan: number[],
  initialHours: number
): IRecordExtended[] => {
  const sortedRecords = sortRecords(records);
  const result = [] as IRecordExtended[];
  let total = initialHours;

  for (let i = 0; i < records.length / 3; ++i) {
    const quarterRecords = sortedRecords.slice(i * 3, i * 3 + 3);
    const quarterId = i % 3;
    const hoursInQuarter = quarterRecords.reduce(
      (result, record) => record.hours + result,
      0
    );

    for (let j = 0; j < 3; ++j) {
      const record = quarterRecords[j];
      total += record.hours;

      result.push({
        ...record,
        overflow: hoursInQuarter > plan[quarterId],
        total,
      });
    }
  }

  return result;
};
