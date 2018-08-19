import * as React from 'react';
import * as style from './index.less';
import { RouteComponentProps } from 'react-router';
import { withStations, IStationsContextData } from '../../utils/context';
import { IStation } from '../../logic';
import Report from '../Report/Report';

type IReportSelectorProps = RouteComponentProps<any> & IStationsContextData;
interface IReportSelectorState {
  year: number;
}

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

class ReportSelector extends React.Component<
  IReportSelectorProps,
  IReportSelectorState
> {
  state = {
    year: -1,
  };

  selectYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      year: parseInt(e.target.value),
    });
  };

  render() {
    const { year } = this.state;
    const allStationYears = getAllStationYears(this.props.stations);

    return (
      <div className={style['report-selector']}>
        <div className={style['selector']}>
          <label>Год:</label>
          <select value={year} onChange={this.selectYear}>
            <option value={-1}>выберите год</option>
            {allStationYears.map(year => (
              <option key={year} value={year}>
                {year}/{year + 1}
              </option>
            ))}
          </select>
        </div>

        {year === -1 && <div>Выберите год</div>}

        {year !== -1 && <Report year={year} />}
      </div>
    );
  }
}

export default withStations(ReportSelector);
