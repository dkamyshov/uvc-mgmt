import './style/reset.less';

import * as React from 'react';
import { render } from 'react-dom';
import { Application } from './components';
import { HashRouter } from 'react-router-dom';

render(
  <HashRouter>
    <Application />
  </HashRouter>,
  document.getElementById('root')
);
