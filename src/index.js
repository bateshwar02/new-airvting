import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import Apps from './containers/App/app';
import { unregister } from './registerServiceWorker';
import store from './store';
import history from './utils/history';


const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router basename={process.env.REACT_APP_ROUTER_BASE || '/sh/airvtingweb/'} history={history}>
        <Apps />
      </Router>
    </Provider>,
    window.document.getElementById('root'),
  );
};
render();
unregister();
