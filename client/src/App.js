import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Admin from './layouts/Admin.js';
import Login from './layouts/Login';

import './assets/scss/App.scss';

const App = () => {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route path='/admin' component={Admin} />
          <Route path='/login' component={Login} />
          <Redirect from='/' to='/login' />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
