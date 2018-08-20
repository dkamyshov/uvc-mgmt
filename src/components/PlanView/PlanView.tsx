import * as React from 'react';
import * as style from './index.less';
import { PlanInput } from '..';
import { monthsIterable, getMonthRussianName } from '../../logic';

interface IPlanViewProps {
  plan: number[];
  update: (value: number, month: number) => void;
}

class PlanView extends React.Component<IPlanViewProps> {
  render() {
    const { plan, update } = this.props;

    return (
      <div className={style['plan-view']}>
        <table>
          <thead>
            <tr>
              {monthsIterable.map(month => (
                <th key={month}>{getMonthRussianName(month)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {plan.slice(0, 12).map((q, i) => (
                <td key={i}>
                  <PlanInput month={i} value={q} onChange={update} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default PlanView;
