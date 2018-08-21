import * as React from 'react';
import * as style from './index.less';
import { RouteComponentProps, withRouter } from 'react-router';
import { withStations, IStationsContextData } from '../../utils/context';
import { IStation } from '../../logic';
import Report from '../Report/Report';

type IReportSelectorProps = RouteComponentProps<{
  year: string;
}> &
  IStationsContextData;
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

const getYearFromRoute = (year?: string): number => {
  try {
    if (!year) throw null;
    const result = parseInt(year, 10);
    if (0 >= result || result >= 9999) {
      throw null;
    }
    return result;
  } catch (e) {
    return -1;
  }
};

class ReportSelector extends React.Component<
  IReportSelectorProps,
  IReportSelectorState
> {
  state = {
    year: getYearFromRoute(this.props.match.params.year),
  };

  componentDidUpdate(prevProps: IReportSelectorProps) {
    if (this.props.match.params.year !== prevProps.match.params.year) {
      this.setState({
        year: getYearFromRoute(this.props.match.params.year),
      });
    }
  }

  selectYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const numericYear = parseInt(e.target.value, 10);
    this.props.history.push(`/report/${numericYear}`);

    /*this.setState({
      year: parseInt(e.target.value, 10),
    });*/
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

export default withRouter(withStations(ReportSelector));
