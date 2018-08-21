import * as React from 'react';
import * as style from './index.less';
import { ISingleStationProps, extractStation } from './extractStation';
import { withStations } from '../../utils/context';
import { IStation, copyStation, extendRecords, sortRecords } from '../../logic';
import { YearlyView, InitialHoursInput, PlanView } from '..';

const deviation = [2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0];

interface IStationProps extends ISingleStationProps {}
interface IStationState {
  station: IStation;
  modified: boolean;
  modifiedCritical: boolean;
}

class Station extends React.Component<IStationProps, IStationState> {
  constructor(props: IStationProps) {
    super(props);

    this.state = {
      station: copyStation(props.station),
      modified: false,
      modifiedCritical: false,
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
          order: this.props.station.order,
          name: this.props.station.name,
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

  updatePlan = (value: number, month: number) => {
    const newPlan = [...this.state.station.plan];
    newPlan[month] = value;
    this.setState({
      station: {
        ...this.state.station,
        plan: newPlan,
      },
      modified: true,
    });
  };

  cancelChanges = () => {
    this.setState({
      station: copyStation(this.props.station),
      modified: false,
    });
  };

  saveChange = () => {
    const { modifiedCritical } = this.state;

    if (modifiedCritical) {
      if (
        confirm(
          'В процессе редактирования станции были произведены критические манипуляции, например, удалены данные о наработке. Вы уверены, что хотите продолжить?'
        )
      ) {
        this.props.saveStation(this.state.station);

        this.setState({
          modified: false,
          modifiedCritical: false,
        });
      }
    } else {
      this.props.saveStation(this.state.station);

      this.setState({
        modified: false,
        modifiedCritical: false,
      });
    }
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

  removeLastYear = () => {
    if (
      confirm(
        'ВНИМАНИЕ! Это действие невозможно будет отменить после сохранения изменений'
      )
    ) {
      this.setState({
        station: {
          ...this.state.station,
          records: sortRecords(this.state.station.records).slice(
            0,
            this.state.station.records.length - 12
          ),
        },
        modified: true,
        modifiedCritical: true,
      });
    }
  };

  addYear = () => {
    const { records } = this.state.station;
    const newYear = records[records.length - 1].year;
    const baseRecords = records.slice(records.length - 12);

    const newYearRecords = baseRecords.map((baseRecord, i) => {
      return {
        id: baseRecord.id + 12,
        year: i < 4 ? newYear : newYear + 1,
        month: baseRecord.month,
        hours:
          baseRecord.hours + Math.round((Math.random() - 0.5) * deviation[i]),
      };
    });

    this.setState({
      station: {
        ...this.state.station,
        records: [...records, ...newYearRecords],
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

  changeName = () => {
    const newName = prompt(
      'Введите новое имя станции:',
      this.state.station.name
    );

    if (!newName) {
      return;
    }

    if (newName.trim().length === 0) {
      alert('Введите имя!');
      return;
    }

    this.setState({
      station: {
        ...this.state.station,
        name: newName,
      },
      modified: true,
    });
  };

  deleteStation = () => {
    this.props.deleteStation(this.state.station.id);
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
          <input
            type="button"
            onClick={this.saveChange}
            value="Сохранить изменения"
            disabled={!modified}
          />
          <input
            type="button"
            onClick={this.cancelChanges}
            value="Отменить изменения"
            disabled={!modified}
          />

          <br />

          <input
            type="button"
            onClick={this.orderUp}
            value="Переместить вверх"
            disabled={!(station.order > 0)}
          />

          <input
            type="button"
            onClick={this.orderDown}
            value="Переместить вниз"
            disabled={!(station.order < stationCount - 1)}
          />

          <br />

          <input type="button" onClick={this.addYear} value="Добавить год" />

          <input
            type="button"
            onClick={this.removeLastYear}
            value="Удалить последний год"
            disabled={station.records.length < 24}
          />

          <input
            type="button"
            onClick={this.deleteStation}
            value="Удалить станцию"
          />

          <br />

          <input type="button" onClick={this.changeName} value="Изменить имя" />
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

        <PlanView plan={station.plan} update={this.updatePlan} />
      </div>
    );
  }
}

export default withStations(extractStation(Station));
