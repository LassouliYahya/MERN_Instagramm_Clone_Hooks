import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store_redux/index';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { onLodingLogin } from './store_redux/actions/authAction';

store.dispatch(onLodingLogin());


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
       <App />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
