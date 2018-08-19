import * as React from 'react';
import * as style from './index.less';
import { RouteComponentProps } from 'react-router';
import { withStations, IStationsContextData } from '../../utils/context';
import { IStation } from '../../logic';

type IReportSelectorProps = RouteComponentProps<any> & IStationsContextData;

const getAllStationYears = (stations: IStation[]) => {
  let minYear = 9999;
  let maxYear = -9999;

  stations.forEach(station => {
    if (station.records[0].year < minYear) {
      minYear = station.records[0].year;
    }

    if (station.records[station.records.length - 1].year > maxYear) {
      maxYear = station.records[station.records.length - 1].year;
    }
  });

  return Array.from({ length: maxYear - minYear }, (_v, k) => k + minYear);
};

class ReportSelector extends React.Component<IReportSelectorProps> {
  render() {
    const allStationYears = getAllStationYears(this.props.stations);

    return (
      <div className={style['report-selector']}>
        <div className={style['selector']}>
          <label>Год:</label>
          <select>
            {allStationYears.map(year => (
              <option key={year}>
                {year}/{year + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default withStations(ReportSelector);
