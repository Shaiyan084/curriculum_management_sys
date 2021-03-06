import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/Navbars/Admin';
import Footer from '../components/Footer/Footer.js';
import Sidebar from '../components/Sidebar/UndergraduateApplicant';
import Alert from '../components/Alert/Alert';

import Dashboard from '../views/Applicant/Dashboard';
import UndergraduateProgramList from '../views/Applicant/UndergraduateProgramList';
import GraduateProgramList from '../views/Applicant/GraduateProgramList';
import Settings from '../views/Applicant/Settings';

import routes from '../routes/Applicant';

import styles from '../assets/jss/material-dashboard-react/layouts/adminStyle.js';

import bgImage from '../assets/img/sidebar-2.jpg';
import logo from '../assets/img/reactlogo.png';

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/applicant') {
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
    <Route
      path='/applicant/undergraduate-program-selection-list'
      component={UndergraduateProgramList}
    />
    <Route
      path='/applicant/graduate-program-selection-list'
      component={GraduateProgramList}
    />
    <Route path='/applicant/settings' component={Settings} />
    <Route path='/applicant/dashboard' component={Dashboard} />
    {/* <Redirect from='/applicant' to='/applicant/personal-details' /> */}
  </Switch>
);

const useStyles = makeStyles(styles);

const Admin = ({ ...rest }) => {
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
        logoText={'Applicant Portal'}
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

export default Admin;
