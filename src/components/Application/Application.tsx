import * as React from 'react';
import * as style from './index.less';
import { Sidebar, Home, Station } from '..';
import { IStation, EMonth, sortStations } from '../../logic';
import {
  withRouter,
  RouteComponentProps,
  Switch,
  Route,
} from 'react-router-dom';
import { StationsContext } from '../../utils/context';

interface IApplicationState {
  stations: IStation[];
}

type IApplicationProps = RouteComponentProps<any>;

class Application extends React.Component<
  IApplicationProps,
  IApplicationState
> {
  constructor(props: IApplicationProps) {
    super(props);

    this.state = {
      stations: [
        {
          id: 0,
          order: 0,
          name: 'Р-414',
          plan: [100, 100, 100, 100],
          initialHours: 10000,
          records: [
            { id: 0, year: 2015, month: EMonth.SEPTEMBER, hours: 1 },
            { id: 1, year: 2015, month: EMonth.OCTOBER, hours: 1 },
            { id: 2, year: 2015, month: EMonth.NOVEMBER, hours: 1 },
            { id: 3, year: 2015, month: EMonth.DECEMBER, hours: 1 },
            { id: 4, year: 2016, month: EMonth.JANUARY, hours: 1 },
            { id: 5, year: 2016, month: EMonth.FEBRUARY, hours: 1 },
            { id: 6, year: 2016, month: EMonth.MARCH, hours: 1 },
            { id: 7, year: 2016, month: EMonth.APRIL, hours: 1 },
            { id: 8, year: 2016, month: EMonth.MAY, hours: 1 },
            { id: 9, year: 2016, month: EMonth.JUNE, hours: 1 },
            { id: 10, year: 2016, month: EMonth.JULY, hours: 100 },
            { id: 11, year: 2016, month: EMonth.AUGUST, hours: 1 },
          ],
        },

        {
          id: 1,
          order: 1,
          name: 'Н-100',
          plan: [111, 111, 111, 111],
          initialHours: 10021,
          records: [
            { id: 0, year: 2015, month: EMonth.SEPTEMBER, hours: 2 },
            { id: 1, year: 2015, month: EMonth.OCTOBER, hours: 2 },
            { id: 2, year: 2015, month: EMonth.NOVEMBER, hours: 2 },
            { id: 3, year: 2015, month: EMonth.DECEMBER, hours: 2 },
            { id: 4, year: 2016, month: EMonth.JANUARY, hours: 2 },
            { id: 5, year: 2016, month: EMonth.FEBRUARY, hours: 2 },
            { id: 6, year: 2016, month: EMonth.MARCH, hours: 2 },
            { id: 7, year: 2016, month: EMonth.APRIL, hours: 2 },
            { id: 8, year: 2016, month: EMonth.MAY, hours: 2 },
            { id: 9, year: 2016, month: EMonth.JUNE, hours: 2 },
            { id: 10, year: 2016, month: EMonth.JULY, hours: 0 },
            { id: 11, year: 2016, month: EMonth.AUGUST, hours: 2 },
          ],
        },
      ],
    };
  }

  orderUp = (id: number) => {
    const station = this.state.stations.find(station => station.id === id);

    if (!station) {
      return;
    }

    const topStation = this.state.stations.find(
      station$ => station$.order === station.order - 1
    );

    if (!topStation) {
      return;
    }

    const stationNewOrder = topStation.order;
    const topStationNewOrder = station.order;

    this.setState({
      stations: [
        ...this.state.stations.filter(
          station =>
            station.id !== stationNewOrder && station.id !== topStationNewOrder
        ),
        {
          ...station,
          order: stationNewOrder,
        },
        {
          ...topStation,
          order: topStationNewOrder,
        },
      ],
    });
  };

  orderDown = (id: number) => {
    const station = this.state.stations.find(station => station.id === id);

    if (!station) {
      return;
    }

    const bottomStation = this.state.stations.find(
      station$ => station$.order === station.order + 1
    );

    if (!bottomStation) {
      return;
    }

    const stationNewOrder = bottomStation.order;
    const bottomStationNewOrder = station.order;

    this.setState({
      stations: [
        ...this.state.stations.filter(
          station =>
            station.id !== stationNewOrder &&
            station.id !== bottomStationNewOrder
        ),
        {
          ...station,
          order: stationNewOrder,
        },
        {
          ...bottomStation,
          order: bottomStationNewOrder,
        },
      ],
    });
  };

  render() {
    const { stations } = this.state;

    return (
      <div className={style['application']}>
        <Sidebar stations={sortStations(stations)} />

        <div className={style['content']}>
          <StationsContext.Provider
            value={{
              stations,
              orderUp: this.orderUp,
              orderDown: this.orderDown,
            }}
          >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/station/:id" component={Station} />
            </Switch>
          </StationsContext.Provider>
        </div>
      </div>
    );
  }
}

export default withRouter(Application);
