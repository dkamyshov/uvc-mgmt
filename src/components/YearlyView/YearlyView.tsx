import * as React from 'react';
import * as style from './index.less';
import {
  IRecord,
  yearsSpan,
  getRecordsMap,
  extendRecords,
  IRecordExtended,
  getQuarters,
} from '../../logic';
import { YearCard } from '..';

interface IYearlyViewProps {
  records: IRecordExtended[];
  onHoursChange: (value: number, year: number, month: number) => void;
}

class YearlyView extends React.Component<IYearlyViewProps> {
  private ref: React.RefObject<HTMLDivElement>;

  constructor(props: IYearlyViewProps) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    if (this.ref.current) {
      const e = this.ref.current!;

      try {
        e.scrollLeft = e.scrollWidth - e.clientWidth;
      } catch (e) {}
    }
  }

  render() {
    const { records } = this.props;

    const years = yearsSpan(records);

    return (
      <div ref={this.ref} className={style['yearly-view']}>
        {years.map(year => {
          try {
            return (
              <YearCard
                key={year}
                year={year}
                records={getRecordsMap(records, year)}
                quarters={getQuarters(records, year)}
                onHoursChange={this.props.onHoursChange}
              />
            );
          } catch (e) {
            return (
              <YearCard
                key={year}
                year={year}
                records={getRecordsMap(records, year)}
                quarters={void 0}
                onHoursChange={this.props.onHoursChange}
              />
            );
          }
        })}
      </div>
    );
  }
}

export default YearlyView;
