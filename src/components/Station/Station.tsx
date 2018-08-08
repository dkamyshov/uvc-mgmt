import * as React from 'react';
import * as style from './index.less';
import { ISingleStationProps, extractStation } from './extractStation';
import { withStations } from '../../utils/context';
import { IStation, copyStation } from '../../logic';

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

  render() {
    const { station } = this.state;

    return (
      <div className={style['station']}>
        <h1>{station.name}</h1>
      </div>
    );
  }
}

export default withStations(extractStation(Station));
