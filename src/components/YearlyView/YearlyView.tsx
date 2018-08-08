import * as React from 'react';
import * as style from './index.less';
import {
  IRecord,
  yearsSpan,
  getRecordsMap,
  extendRecords,
  IRecordExtended,
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
        {years.map(year => (
          <YearCard
            key={year}
            records={getRecordsMap(records, year)}
            onHoursChange={this.props.onHoursChange}
          />
        ))}
      </div>
    );
  }
}

export default YearlyView;
