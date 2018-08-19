import * as React from 'react';
import { withStations, IStationsContextData } from '../../utils/context';
import { extendRecords, getRecordsForPeriod, getQuarters } from '../../logic';

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
        const quarters = getQuarters(extendedRecords, year);

        results.push(
          <tr key={station.id}>
            <td>{station.name}</td>
            <td>{quarters[0]}</td>
            <td>{quarters[1]}</td>
            <td>{quarters[2]}</td>
            <td>{quarters[3]}</td>
            <td>{quarters.reduce((result, current) => result + current, 0)}</td>
          </tr>
        );
      } catch (e) {
        results.push(
          <tr key={station.id}>
            <td>{station.name}</td>
            <td colSpan={5}>нет записей за этот год</td>
          </tr>
        );
      }
    });

    return (
      <div>
        <table>
          <thead>
            <tr>
              <td>Станция</td>
              <td>КВ1</td>
              <td>КВ2</td>
              <td>КВ3</td>
              <td>КВ4</td>
              <td>ЗА ГОД</td>
            </tr>
          </thead>
          <tbody>{results}</tbody>
        </table>
      </div>
    );
  }
}

export default withStations(Report);
