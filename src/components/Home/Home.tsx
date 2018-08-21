import * as React from 'react';
import * as style from './index.less';

class Home extends React.Component {
  render() {
    return (
      <div className={style['home']}>
        <h1>UVC MGMT</h1>

        <p>
          Программный комплекс для отслеживания наработки станций на ВК/УВЦ
          ИГЭУ.
        </p>

        <p>
          Доступные режимы: vk, uvc. Приложение работает в режиме: {__MODE}.
        </p>

        <p>
          Пожелания, баги, новые версии:{' '}
          <a href="mailto:danil.kamyshov@gmail.com">danil.kamyshov@gmail.com</a>
          ,{' '}
          <a target="_blank" href="https://vk.com/alhayat">
            vk
          </a>
        </p>
      </div>
    );
  }
}

export default Home;
