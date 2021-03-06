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
import CreateGraduateProgram from '../views/Admin/CreateGraduateProgram';
import UpdateProgram from '../views/Admin/UpdateProgram';
import CreateCoordinator from '../views/Admin/CreateCoordinator';
import PersonalDetails from '../views/Admin/PersonalDetails';
import ExperienceDetails from '../views/Admin/ExperienceDetails';
import EducationDetails from '../views/Admin/EducationDetails';
import ManageApplicant from '../views/Admin/ManageApplicant';
import ForwardApplicant from '../views/Admin/ForwardApplicant';
import CreateAdmissionSession from '../views/Admin/CreateAdmissionSession';
import Dashboard from '../views/Admin/Dashboard';
import UpdateAdmissionSession from '../views/Admin/UpdateAdmissionSession';

import routes from '../routes/Admin';

import styles from '../assets/jss/material-dashboard-react/layouts/adminStyle.js';

import bgImage from '../assets/img/sidebar-2.jpg';
import logo from '../assets/img/reactlogo.png';

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/admin') {
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
    <Route path='/admin/create-department' component={CreateDepartment} />
    <Route
      path='/admin/create-undergraduate-program'
      component={CreateUndergraduateProgram}
    />
    <Route
      path='/admin/create-graduate-program'
      component={CreateGraduateProgram}
    />
    <Route path='/admin/update-department/:id' component={UpdateDepartment} />
    <Route path='/admin/update-program/:id' component={UpdateProgram} />
    <Route path='/admin/add-coordinator' component={CreateCoordinator} />
    <Route path='/admin/create-profile' component={PersonalDetails} />
    <Route path='/admin/experience-details' component={ExperienceDetails} />
    <Route path='/admin/education-details' component={EducationDetails} />
    <Route path='/admin/manage-applicants' component={ManageApplicant} />
    <Route path='/admin/forward-applicant/:id' component={ForwardApplicant} />
    <Route
      path='/admin/create-admission-session'
      component={CreateAdmissionSession}
    />
    <Route path='/admin/dashboard' component={Dashboard} />
    <Route
      path='/admin/update-session-details/:id'
      component={UpdateAdmissionSession}
    />
    {/* <Redirect from='/admin' to='/admin/dashboard' /> */}
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
        logoText={'Admin Portal'}
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
