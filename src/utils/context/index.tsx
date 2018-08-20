import * as React from 'react';
import { IStation } from '../../logic';
import { Omit } from '..';

export const StationsContext = React.createContext({
  stations: [] as IStation[],
  orderUp: (id: number) => {},
  orderDown: (id: number) => {},
  addStation: (name: string, firstYear: number) => {},
  saveStation: (station: IStation) => {},
});

export interface IStationsContextData {
  stations: IStation[];
  orderUp: (id: number) => void;
  orderDown: (id: number) => void;
  addStation: (name: string, firstYear: number) => void;
  saveStation: (station: IStation) => void;
}

export function withStations<P extends IStationsContextData>(
  Component: React.ComponentType<P>
) {
  class StationsContextWrapper extends React.Component<
    Omit<P, keyof IStationsContextData>
  > {
    render() {
      return (
        <StationsContext.Consumer>
          {value => (
            <Component
              {...this.props}
              stations={value.stations}
              orderUp={value.orderUp}
              orderDown={value.orderDown}
              addStation={value.addStation}
              saveStation={value.saveStation}
            />
          )}
        </StationsContext.Consumer>
      );
    }
  }

  return StationsContextWrapper;
}
