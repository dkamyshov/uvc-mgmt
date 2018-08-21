import * as React from 'react';
import * as style from './index.less';
import { decodeStation, saveStationData } from '../../utils/getData';

class Import extends React.Component {
  state = {
    imported: '',
  };

  import = () => {
    try {
      const raw = atob(this.state.imported);
      const stations = JSON.parse(raw);
      const decodedStations = stations.map(decodeStation);
      saveStationData(decodedStations);
      alert('Импорт завершен!');
      window.location.reload();
    } catch (e) {
      alert(
        'Импорт завершился с ошибкой. Возможно, исходный файл был поврежден.'
      );
    }
  };

  update = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      imported: e.target.value,
    });
  };

  render() {
    return (
      <div className={style['import']}>
        <p>Вставьте текст из файла и нажмите кнопку "Импорт".</p>

        <p className={style['warning']}>
          ВНИМАНИЕ! Некорректные изменения в исходном файле могут привести к
          полной неработоспособности приложения. Кроме того, вся текущая
          наработка будет стерта и заменена наработкой из импортируемого файла.
        </p>

        <input type="button" onClick={this.import} value="Импорт" />

        <textarea onChange={this.update} />
      </div>
    );
  }
}

export default Import;
