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
  render() {
    const { records } = this.props;

    const years = yearsSpan(records);

    return (
      <div className={style['yearly-view']}>
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
