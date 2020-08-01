import React, { Fragment, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Admin from './layouts/Admin.js';
import Login from './layouts/Login';

import store from './utils/store';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

import './assets/scss/App.scss';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Fragment>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/admin' component={Admin} />
            <Route path='/login' component={Login} />
            <Redirect from='/' to='/login' />
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
};

export default App;
