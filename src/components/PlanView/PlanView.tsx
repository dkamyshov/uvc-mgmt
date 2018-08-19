import * as React from 'react';
import * as style from './index.less';
import { PlanInput } from '..';

interface IPlanViewProps {
  plan: number[];
  update: (value: number, quarter: number) => void;
}

class PlanView extends React.Component<IPlanViewProps> {
  render() {
    const { plan, update } = this.props;

    return (
      <div className={style['plan-view']}>
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
              {plan.slice(0, 4).map((q, i) => (
                <td key={i}>
                  <PlanInput quarter={i} value={q} onChange={update} />
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
