import * as React from 'react';
import * as style from './index.less';

class Alert extends React.Component<{
  message: string;
}> {
  render() {
    return <div className={style['alert']}>{this.props.message}</div>;
  }
}

export default Alert;
