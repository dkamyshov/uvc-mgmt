import * as React from 'react';
import * as style from './index.less';
import { ISingleStationProps, extractStation } from './extractStation';
import { withStations } from '../../utils/context';
import { IStation, copyStation, extendRecords } from '../../logic';
import { YearlyView, InitialHoursInput, PlanView } from '..';

interface IStationProps extends ISingleStationProps {}
interface IStationState {
  station: IStation;
  modified: boolean;
}

class Station extends React.Component<IStationProps, IStationState> {
  constructor(props: IStationProps) {
    super(props);

    this.state = {
      station: copyStation(props.station),
      modified: false,
    };
  }

  componentDidUpdate(prevProps: IStationProps) {
    if (
      this.props.station.order !== prevProps.station.order ||
      this.props.station.name !== prevProps.station.name
    ) {
      this.setState({
        station: {
          ...this.state.station,
          name: this.props.station.name,
          order: this.props.station.order,
        },
      });
    }
  }

  orderUp = () => {
    this.props.orderUp(this.state.station.id);
  };

  orderDown = () => {
    this.props.orderDown(this.state.station.id);
  };

  cancelChanges = () => {
    this.setState({
      station: copyStation(this.props.station),
      modified: false,
    });
  };

  onInitialHoursChange = (value: number) => {
    this.setState({
      station: {
        ...this.state.station,
        initialHours: value,
      },
      modified: true,
    });
  };

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
        modified: true,
      });
    }
  };

  render() {
    const { stationCount } = this.props;
    const { station, modified } = this.state;

    return (
      <div className={style['station']}>
        <h1>
          {station.name}
          {modified ? '*' : ''}
        </h1>

        <div className={style['controls']}>
          {station.order > 0 && (
            <input
              type="button"
              onClick={this.orderUp}
              value="Переместить вверх"
            />
          )}
          {station.order < stationCount - 1 && (
            <input
              type="button"
              onClick={this.orderDown}
              value="Переместить вниз"
            />
          )}
          {modified && (
            <input
              type="button"
              onClick={this.cancelChanges}
              value="Отменить изменения"
            />
          )}
        </div>

        <InitialHoursInput
          value={station.initialHours}
          onInitialHoursChange={this.onInitialHoursChange}
        />

        <YearlyView
          records={extendRecords(
            station.records,
            station.plan,
            station.initialHours
          )}
          onHoursChange={this.onHoursChange}
        />

        <PlanView plan={station.plan} />
      </div>
    );
  }
}

export default withStations(extractStation(Station));
