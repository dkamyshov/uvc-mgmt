import * as React from 'react';
import * as style from './index.less';
import { getStationData, encodeStation } from '../../utils/getData';

class Export extends React.Component {
  state = {
    exported: '',
  };

  export = () => {
    this.setState({
      exported: btoa(JSON.stringify(getStationData().map(encodeStation))),
    });
  };

  render() {
    return (
      <div className={style['export']}>
        <p>
          Нажмите кнопку "Экспорт", скопируйте текст и сохраните его в файл.
        </p>

        <input type="button" onClick={this.export} value="Экспорт" />

        <textarea value={this.state.exported} />
      </div>
    );
  }
}

export default Export;
