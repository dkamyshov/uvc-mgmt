import * as React from 'react';
import * as style from './index.less';
import { ISingleStationProps, extractStation } from './extractStation';
import { withStations } from '../../utils/context';
import { IStation, copyStation, extendRecords } from '../../logic';
import { YearlyView } from '..';

interface IStationProps extends ISingleStationProps {}
interface IStationState {
  station: IStation;
}

class Station extends React.Component<IStationProps, IStationState> {
  constructor(props: IStationProps) {
    super(props);

    this.state = {
      station: copyStation(props.station),
    };
  }

  onHoursChange = (value: number, year: number, month: number) => {
    const {
      station,
      station: { records },
    } = this.state;

    const targetRecord = records.filter(
      record => record.year === year && record.month === month
    )[0];

    if (targetRecord) {
      this.setState({
        station: {
          ...station,
          records: [
            ...records.filter(
              record => record.year !== year || record.month !== month
            ),
            {
              ...targetRecord,
              hours: value,
            },
          ],
        },
      });
    }
  };

  render() {
    const { station } = this.state;

    return (
      <div className={style['station']}>
        <h1>{station.name}</h1>

        <YearlyView
          records={extendRecords(
            station.records,
            station.plan,
            station.initialHours
          )}
          onHoursChange={this.onHoursChange}
        />
      </div>
    );
  }
}

export default withStations(extractStation(Station));
