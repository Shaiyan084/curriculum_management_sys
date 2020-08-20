import React, { Fragment } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Navbar from '../components/Navbars/Landing';
import Admin from '../views/Login/Admin';
import Applicant from '../views/Login/Applicant';
import Alert from '../components/Alert/Alert';

const Login = () => {
  const switchRoutes = (
    <Switch>
      <Route path='/login/admin' component={Admin} />
      <Route path='/login/applicant' component={Applicant} />
      <Redirect from='/login' to='/login/admin' />
    </Switch>
  );

  return (
    <Fragment>
      <Navbar />
      <Alert />
      {switchRoutes}
    </Fragment>
  );
};

export default Login;
