import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Router from 'pages';

import * as serviceWorker from './serviceWorker';
import 'assets/styles/global.css';
import ThemeWrapper from 'containers/ThemeWrapper';

ReactDOM.render(
  <React.StrictMode>
    <ThemeWrapper>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
