import * as React from 'react';
import { IStation } from '../../logic';
import { Omit } from '../../utils';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Alert } from '..';

export interface ISingleStationProps {
  station: IStation;
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
      }
  > {
    render() {
      const {
        stations,
        match: {
          params: { id },
        },
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

      return <Component {...this.props} station={station} />;
    }
  }

  return withRouter(ExtractStationWrapper);
}
