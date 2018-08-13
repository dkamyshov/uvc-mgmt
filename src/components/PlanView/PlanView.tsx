import * as React from 'react';
import * as style from './index.less';

interface IPlanViewProps {
  plan: number[];
}

class PlanView extends React.Component<IPlanViewProps> {
  render() {
    const { plan } = this.props;

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
                <td key={i}>{q}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default PlanView;
