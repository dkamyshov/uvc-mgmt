import { IStation, IRecord, EMonth } from '../logic';

export const convertLegacyData = (legacy: any[]): IStation[] => {
  const result = [] as IStation[];

  for (let i = 0; i < legacy.length; ++i) {
    const legacyStation = legacy[i];

    const newStation = {} as IStation;

    newStation.id = legacyStation.id;
    newStation.name = decodeURIComponent(legacyStation.name);
    newStation.initialHours = legacyStation.initialEntry;
    newStation.order = i;
    newStation.plan = legacyStation.plan;

    const firstFourRecords = legacyStation.records.slice(0, 4);
    const firstYear = legacyStation.initialOffset;
    const allRecords = [] as IRecord[];

    let recordId = 0;

    for (let j = 0; j < 4; ++j) {
      allRecords.push({
        id: recordId++,
        hours: firstFourRecords[j],
        year: firstYear,
        month: EMonth.SEPTEMBER + j,
      });
    }

    const restRecords = legacyStation.records.slice(4);

    for (let j = 0; j < restRecords.length / 12; ++j) {
      const year = firstYear + j + 1;

      const yearRecords = restRecords.slice(j * 12, j * 12 + 12);

      for (let k = 0; k < yearRecords.length; ++k) {
        allRecords.push({
          id: recordId++,
          hours: yearRecords[k],
          month: k,
          year,
        });
      }
    }

    newStation.records = allRecords;

    result.push(newStation);
  }

  return result;
};
