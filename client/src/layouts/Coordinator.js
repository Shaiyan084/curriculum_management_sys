import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/Navbars/Admin';
import Footer from '../components/Footer/Footer.js';
import Sidebar from '../components/Sidebar/Admin';
import Alert from '../components/Alert/Alert';

import CreateDepartment from '../views/Admin/CreateDepartment';
import UpdateDepartment from '../views/Admin/UpdateDepartment';
import CreateUndergraduateProgram from '../views/Admin/CreateUndergraduateProgram';
import UpdateProgram from '../views/Admin/UpdateProgram';
import ManageApplicant from '../views/Coordinator/ManageApplicant';
import ApplicantDetails from '../views/Coordinator/ApplicantDetails';

import routes from '../routes/Coordinator';

import styles from '../assets/jss/material-dashboard-react/layouts/adminStyle.js';

import bgImage from '../assets/img/sidebar-2.jpg';
import logo from '../assets/img/reactlogo.png';

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/coordinator') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Route path='/coordinator/manage-applicants' component={ManageApplicant} />
    <Route
      path='/coordinator/applicant-details/:id'
      component={ApplicantDetails}
    />
    {/* <Route path='/admin/create-department' component={CreateDepartment} />
    <Route path='/admin/create-program' component={CreateProgram} />
    <Route path='/admin/update-department/:id' component={UpdateDepartment} />
    <Route path='/admin/update-program/:id' component={UpdateProgram} /> */}
    {/* <Redirect from='/admin' to='/admin/dashboard' /> */}
  </Switch>
);

const useStyles = makeStyles(styles);

const Coordinator = ({ ...rest }) => {
  const classes = useStyles();

  const mainPanel = React.createRef();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy();
      }
      window.removeEventListener('resize', resizeFunction);
    };
  }, [mainPanel]);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={'Coordinator Portal'}
        logo={logo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={'blue'}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <Alert />
        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Coordinator;
