import * as React from 'react';
import * as style from './index.less';
import { IStation } from '../../logic';
import { NavLink } from 'react-router-dom';

interface ISidebarProps {
  stations: IStation[];
}

class Sidebar extends React.Component<ISidebarProps> {
  render() {
    const { stations } = this.props;

    return (
      <div className={style['sidebar']}>
        <NavLink activeClassName={style['active']} exact to="/">
          Главная
        </NavLink>
        <NavLink activeClassName={style['active']} to="/report">
          Отчет
        </NavLink>
        <NavLink activeClassName={style['active']} to="/add">
          Добавить станцию
        </NavLink>
        <NavLink activeClassName={style['active']} to="/export">
          Экспорт
        </NavLink>
        <NavLink activeClassName={style['active']} to="/import">
          Импорт
        </NavLink>
        <NavLink to="/">---</NavLink>
        {stations.map((station, i) => (
          <NavLink
            key={station.id}
            activeClassName={style['active']}
            to={`/station/${station.id}`}
          >
            #{i + 1}. {station.name}
          </NavLink>
        ))}
      </div>
    );
  }
}

export default Sidebar;
