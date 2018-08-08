import * as React from 'react';
import { IStation } from '../../logic';
import { Omit } from '..';

export const StationsContext = React.createContext({
  stations: [] as IStation[],
});

export interface IStationsContextData {
  stations: IStation[];
}

export function withStations<P extends IStationsContextData>(
  Component: React.ComponentType<P>
) {
  class StationsContextWrapper extends React.Component<
    Omit<P, IStationsContextData>
  > {
    render() {
      return (
        <StationsContext.Consumer>
          {value => <Component {...this.props} stations={value.stations} />}
        </StationsContext.Consumer>
      );
    }
  }

  return StationsContextWrapper;
}
