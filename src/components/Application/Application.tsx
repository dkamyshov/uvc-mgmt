import * as React from 'react';
import * as style from './index.less';
import {
  Sidebar,
  Home,
  Station,
  ReportSelector,
  AddStation,
  Export,
  CImport,
} from '..';
import { IStation, EMonth, sortStations } from '../../logic';
import {
  withRouter,
  RouteComponentProps,
  Switch,
  Route,
} from 'react-router-dom';
import { StationsContext } from '../../utils/context';
import { generateHours } from '../../utils';
import { convertLegacyData } from '../../utils/convertLegacyData';
import { getStationData, saveStationData } from '../../utils/getData';

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
      stations: getStationData(),
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

    this.setState(
      {
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
      },
      () => {
        saveStationData(this.state.stations);
      }
    );
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

    this.setState(
      {
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
      },
      () => {
        saveStationData(this.state.stations);
      }
    );
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
          plan: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          records: generateHours(firstYear),
        },
      ],
    });
    this.props.history.push(`/station/${newId}`);
  };

  saveStation = (updatedStation: IStation) => {
    const rest = this.state.stations.filter(
      station => station.id !== updatedStation.id
    );

    this.setState(
      {
        stations: [...rest, updatedStation],
      },
      () => {
        saveStationData(this.state.stations);
      }
    );
  };

  deleteStation = (id: number) => {
    if (
      confirm(
        'Вы уверены, что хотите удалить станцию? Это действие нельзя отменить!'
      )
    ) {
      const sortedStations = sortStations(this.state.stations).filter(
        station => station.id !== id
      );
      const newStations = [] as IStation[];

      for (let i = 0; i < sortedStations.length; ++i) {
        newStations.push({
          ...sortedStations[i],
          order: i,
        });
      }

      this.setState(
        {
          stations: newStations,
        },
        () => {
          saveStationData(this.state.stations);
        }
      );
    }
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
              saveStation: this.saveStation,
              deleteStation: this.deleteStation,
            }}
          >
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/station/:id" component={Station} />
              <Route path="/report" component={ReportSelector} />
              <Route path="/add" component={AddStation} />
              <Route path="/export" component={Export} />
              <Route path="/import" component={CImport} />
            </Switch>
          </StationsContext.Provider>
        </div>
      </div>
    );
  }
}

export default withRouter(Application);
