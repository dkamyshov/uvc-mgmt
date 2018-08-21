import { IStation } from '../logic';
import { convertLegacyData } from './convertLegacyData';
import * as legacy from '../assets/legacy';

if ((__MODE as string) !== 'vk' && (__MODE as string) !== 'uvc') {
  alert('Приложение собрано в неверном режиме.');
}

const getLSKey = () => {
  return `mgmt_v4_${__MODE}`;
};

export const decodeStation = (rawStation: any): IStation => {
  return {
    ...rawStation,
    name: decodeURIComponent(rawStation.name),
  };
};

export const encodeStation = (station: IStation): any => {
  return {
    ...station,
    name: encodeURIComponent(station.name),
  };
};

export const getStationData = (): IStation[] => {
  try {
    const rawData = localStorage.getItem(getLSKey());
    const rawStations = JSON.parse(rawData!);
    const resultStations = rawStations.map(decodeStation);
    return resultStations;
  } catch (e) {
    return convertLegacyData(legacy[__MODE]);
  }
};

export const saveStationData = (stations: IStation[]) => {
  try {
    const encodedStations = stations.map(encodeStation);
    localStorage.setItem(getLSKey(), JSON.stringify(encodedStations));
  } catch (e) {
    console.error('не удалось сохранить станции');
  }
};
