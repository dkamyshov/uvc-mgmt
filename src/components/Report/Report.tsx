import * as React from 'react';
import * as style from './index.less';
import { withStations, IStationsContextData } from '../../utils/context';
import {
  extendRecords,
  getRecordsForPeriod,
  getMonthRussianName,
  reportMonthsIterable,
  getQuarters,
} from '../../logic';
import { Link } from 'react-router-dom';
import cn from 'classnames';

type IReportProps = IStationsContextData & {
  year: number;
};

class Report extends React.Component<IReportProps> {
  render() {
    const { stations, year } = this.props;

    const results = [] as JSX.Element[];

    stations.forEach(station => {
      const extendedRecords = extendRecords(
        station.records,
        station.plan,
        station.initialHours
      );

      try {
        const records = getRecordsForPeriod(extendedRecords, year);

        if (records.length < 12) {
          throw new Error();
        }

        results.push(
          <tr key={station.id}>
            <td>
              <Link to={`/station/${station.id}`}>{station.name}</Link>
            </td>
            <td>{records[0].total - records[0].hours}</td>
            {records.map(record => (
              <td
                className={cn(style['numeric-cell'], {
                  [style['overflow']]:
                    record.hours > station.plan[record.month],
                })}
                key={record.month}
              >
                {record.hours}
              </td>
            ))}
            <td className={style['numeric-cell']}>
              {records.reduce((result, current) => result + current.hours, 0)}
            </td>
            <td>{records[11].total}</td>
          </tr>
        );
      } catch (e) {
        results.push(
          <tr key={station.id}>
            <td>
              <Link to={`/station/${station.id}`}>{station.name}</Link>
            </td>
            <td colSpan={15}>нет записей за этот год</td>
          </tr>
        );
      }
    });

    return (
      <div>
        <table className={style['report-table']}>
          <thead>
            <tr>
              <th>Станция</th>
              <th>НА НАЧАЛО</th>
              {reportMonthsIterable.map(month => (
                <th key={month}>{getMonthRussianName(month)}</th>
              ))}
              <th>ЗА ГОД</th>
              <th>НА КОНЕЦ</th>
            </tr>
          </thead>
          <tbody>{results}</tbody>
        </table>
      </div>
    );
  }
}

export default withStations(Report);
