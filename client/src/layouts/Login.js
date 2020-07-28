import React, { Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Navbar from '../components/Navbars/Landing';
import Admin from '../views/Login/Admin';

const Login = () => {
  const switchRoutes = (
    <Switch>
      <Route path='/login/admin' component={Admin} />
      <Redirect from='/login' to='/login/admin' />
    </Switch>
  );

  return (
    <Fragment>
      <Navbar />
      {switchRoutes}
    </Fragment>
  );
};

export default Login;
