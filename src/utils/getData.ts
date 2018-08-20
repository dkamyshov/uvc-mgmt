import { IStation } from '../logic';
import { convertLegacyData } from './convertLegacyData';
import { legacyData } from '../assets/legacy';

const decodeStation = (rawStation: any): IStation => {
  return {
    ...rawStation,
    name: decodeURIComponent(rawStation.name),
  };
};

const encodeStation = (station: IStation): any => {
  return {
    ...station,
    name: encodeURIComponent(station.name),
  };
};

export const getStationData = (): IStation[] => {
  try {
    const rawData = localStorage.getItem('uvc_mgmt_new');
    const rawStations = JSON.parse(rawData!);
    const resultStations = rawStations.map(decodeStation);
    return resultStations;
  } catch (e) {
    return convertLegacyData(legacyData);
  }
};

export const saveStationData = (stations: IStation[]) => {
  try {
    const encodedStations = stations.map(encodeStation);
    localStorage.setItem('uvc_mgmt_new', JSON.stringify(encodedStations));
  } catch (e) {
    console.error('не удалось сохранить станции');
  }
};
