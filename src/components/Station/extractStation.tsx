import * as React from 'react';
import { IStation } from '../../logic';
import { Omit } from '../../utils';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Alert } from '..';

export interface ISingleStationProps {
  station: IStation;
  orderUp: (id: number) => void;
  orderDown: (id: number) => void;
  saveStation: (station: IStation) => void;
  deleteStation: (id: number) => void;
  stationCount: number;
}

type OwnProps<P> = Omit<P, ISingleStationProps>;

export function extractStation<P extends ISingleStationProps>(
  Component: React.ComponentType<P>
) {
  class ExtractStationWrapper extends React.Component<
    OwnProps<P> &
      RouteComponentProps<{
        id: string;
      }> & {
        stations: IStation[];
        orderUp: (id: number) => void;
        orderDown: (id: number) => void;
        addStation: (name: string, firstYear: number) => void;
        saveStation: (station: IStation) => void;
        deleteStation: (id: number) => void;
      }
  > {
    render() {
      const {
        stations,
        match: {
          params: { id },
        },
        orderUp,
        orderDown,
        saveStation,
      } = this.props;

      if (!/^\d+$/.test(id)) {
        return <Alert message="Неверно задан идентификатор станции" />;
      }

      const station = stations.filter(
        station => station.id === parseInt(id)
      )[0];

      if (!station) {
        return <Alert message="Станция удалена или еще не создана" />;
      }

      return (
        <Component
          key={id}
          {...this.props}
          station={station}
          stationCount={stations.length}
          orderUp={orderUp}
          orderDown={orderDown}
          saveStation={saveStation}
        />
      );
    }
  }

  return withRouter(ExtractStationWrapper);
}
