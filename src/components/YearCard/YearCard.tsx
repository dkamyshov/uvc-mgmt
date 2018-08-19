import * as React from 'react';
import * as style from './index.less';
import cn from 'classnames';
import {
  IRecord,
  monthsIterable,
  EMonth,
  IRecordExtended,
  getMonthRussianName,
} from '../../logic';
import RecordHoursInput from '../RecordHoursInput';

interface IYearCardProps {
  year: number;
  records: {
    [key: string]: IRecordExtended;
  };
  quarters?: number[];
  onHoursChange: (value: number, year: number, month: number) => void;
}

const getSeasonClassname = (month: EMonth) => {
  switch (month) {
    case EMonth.DECEMBER:
    case EMonth.JANUARY:
    case EMonth.FEBRUARY:
      return style['winter'];

    case EMonth.MARCH:
    case EMonth.APRIL:
    case EMonth.MAY:
      return style['spring'];

    case EMonth.JUNE:
    case EMonth.JULY:
    case EMonth.AUGUST:
      return style['summer'];

    case EMonth.SEPTEMBER:
    case EMonth.OCTOBER:
    case EMonth.NOVEMBER:
      return style['fall'];

    default:
      return style['blank'];
  }
};

const totalThisYear = (records: { [key: string]: IRecordExtended }): number => {
  return Object.keys(records).reduce((result, currentKey) => {
    const record = records[currentKey];
    return result + record.hours;
  }, 0);
};

class YearCard extends React.Component<IYearCardProps> {
  render() {
    const { records, year, quarters } = this.props;

    return (
      <div className={style['year-card']}>
        <h2>{year}</h2>
        <table>
          <thead>
            <tr>
              <th>Месяц</th>
              <th>Наработка</th>
              <th>Всего</th>
            </tr>
          </thead>
          <tbody>
            {monthsIterable.map(month => {
              const record = records[String(month)];

              if (record) {
                return (
                  <tr
                    key={month}
                    className={cn(getSeasonClassname(month), {
                      [style['overflow']]: record.overflow,
                    })}
                  >
                    <td className={style['text']}>
                      {getMonthRussianName(month)}
                    </td>
                    <td className={style['input']}>
                      <RecordHoursInput
                        value={record.hours}
                        year={record.year}
                        month={record.month}
                        onChange={this.props.onHoursChange}
                      />
                    </td>
                    <td className={style['text']}>{record.total}</td>
                  </tr>
                );
              } else {
                return (
                  <tr key={month}>
                    <td className={style['text']}>
                      {getMonthRussianName(month)}
                    </td>
                    <td className={style['text']}>-</td>
                    <td className={style['text']}>-</td>
                  </tr>
                );
              }
            })}
            <tr>
              <td>ВСЕГО</td>
              <td>
                {records[EMonth.JANUARY] && records[EMonth.DECEMBER]
                  ? totalThisYear(records)
                  : '-'}
              </td>
              <td>
                {records[EMonth.DECEMBER]
                  ? records[EMonth.DECEMBER].total
                  : '-'}
              </td>
            </tr>
          </tbody>
        </table>
        {quarters && (
          <table>
            <thead>
              <tr>
                <th>КВ1</th>
                <th>КВ2</th>
                <th>КВ3</th>
                <th>КВ4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{quarters[0]}</td>
                <td>{quarters[1]}</td>
                <td>{quarters[2]}</td>
                <td>{quarters[3]}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default YearCard;
