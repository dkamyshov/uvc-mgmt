import * as React from 'react';
import * as style from './index.less';
import { Sidebar, Home, Station, ReportSelector, AddStation } from '..';
import { IStation, EMonth, sortStations } from '../../logic';
import {
  withRouter,
  RouteComponentProps,
  Switch,
  Route,
} from 'react-router-dom';
import { StationsContext } from '../../utils/context';
import { generateHours } from '../../utils';

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

        {
          id: 2,
          order: 2,
          name: 'Р-444',
          plan: [5, 5, 5, 5],
          initialHours: 1000,
          records: [
            { id: 0, year: 2017, month: EMonth.SEPTEMBER, hours: 2 },
            { id: 1, year: 2017, month: EMonth.OCTOBER, hours: 2 },
            { id: 2, year: 2017, month: EMonth.NOVEMBER, hours: 2 },
            { id: 3, year: 2017, month: EMonth.DECEMBER, hours: 2 },
            { id: 4, year: 2018, month: EMonth.JANUARY, hours: 2 },
            { id: 5, year: 2018, month: EMonth.FEBRUARY, hours: 2 },
            { id: 6, year: 2018, month: EMonth.MARCH, hours: 2 },
            { id: 7, year: 2018, month: EMonth.APRIL, hours: 2 },
            { id: 8, year: 2018, month: EMonth.MAY, hours: 2 },
            { id: 9, year: 2018, month: EMonth.JUNE, hours: 2 },
            { id: 10, year: 2018, month: EMonth.JULY, hours: 0 },
            { id: 11, year: 2018, month: EMonth.AUGUST, hours: 2 },

            { id: 12, year: 2018, month: EMonth.SEPTEMBER, hours: 2 },
            { id: 13, year: 2018, month: EMonth.OCTOBER, hours: 2 },
            { id: 14, year: 2018, month: EMonth.NOVEMBER, hours: 2 },
            { id: 15, year: 2018, month: EMonth.DECEMBER, hours: 2 },
            { id: 16, year: 2019, month: EMonth.JANUARY, hours: 2 },
            { id: 17, year: 2019, month: EMonth.FEBRUARY, hours: 2 },
            { id: 18, year: 2019, month: EMonth.MARCH, hours: 2 },
            { id: 19, year: 2019, month: EMonth.APRIL, hours: 2 },
            { id: 20, year: 2019, month: EMonth.MAY, hours: 2 },
            { id: 21, year: 2019, month: EMonth.JUNE, hours: 2 },
            { id: 22, year: 2019, month: EMonth.JULY, hours: 0 },
            { id: 23, year: 2019, month: EMonth.AUGUST, hours: 2 },
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
            station.order !== stationNewOrder &&
            station.order !== topStationNewOrder
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
            station.order !== stationNewOrder &&
            station.order !== bottomStationNewOrder
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

  addStation = (name: string, firstYear: number) => {
    const newOrder =
      (Math.max(...this.state.stations.map(station => station.order)) | 0) + 1;
    const newId =
      (Math.max(...this.state.stations.map(station => station.id)) | 0) + 1;
    this.setState({
      stations: [
        ...this.state.stations,
        {
          id: newId,
          order: newOrder,
          initialHours: 0,
          name,
          plan: [0, 0, 0, 0],
          records: generateHours(firstYear),
        },
      ],
    });
    this.props.history.push(`/station/${newId}`);
  };

  render() {
    const { stations } = this.state;
    const sortedStations = sortStations(stations);

    return (
      <div className={style['application']}>
        <Sidebar stations={sortedStations} />

        <div className={style['content']}>
          <StationsContext.Provider
            value={{
              stations: sortedStations,
              orderUp: this.orderUp,
              orderDown: this.orderDown,
              addStation: this.addStation,
            }}
          >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/station/:id" component={Station} />
              <Route path="/report" component={ReportSelector} />
              <Route path="/add" component={AddStation} />
            </Switch>
          </StationsContext.Provider>
        </div>
      </div>
    );
  }
}

export default withRouter(Application);
