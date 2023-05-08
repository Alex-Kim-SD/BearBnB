// frontend/src/index.js
import React from 'react';

import './index.css';
import * as sessionActions from './store/session';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { login } from './store/session'
import App from './App';
import { restoreCSRF, csrfFetch } from './store/csrf';


import configureStore from './store';

const store = configureStore();

if (process.env.NODE_ENV !== "production") {

  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.login = login; // Add this line to expose the login thunk action
  window.sessionActions = sessionActions;
}

// const rootReducer = combineReducers({ // might not need
//   session: sessionReducer,
// });


function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
