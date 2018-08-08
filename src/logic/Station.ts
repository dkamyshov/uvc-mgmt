import { IRecord } from './Record';

export interface IStation {
  id: number;
  order: number;
  name: string;
  initialHours: number;
  plan: number[];
  records: IRecord[];
}

export const stationsSorter = (a: IStation, b: IStation) => a.order - b.order;
export const sortStations = (stations: IStation[]): IStation[] =>
  [...stations].sort(stationsSorter);

export const copyStation = (station: IStation): IStation => {
  return {
    ...station,
    plan: [...station.plan],
    records: station.records.map(record => ({ ...record })),
  };
};
