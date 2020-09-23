import DashboardIcon from '@material-ui/icons/Dashboard';

import Dashboard from '../views/Applicant/Dashboard';
import PersonalDetails from '../views/Applicant/PersonalDetails';
import IncomeDetails from '../views/Applicant/IncomeDetails';
import EducationDetails from '../views/Applicant/EducationDetails';
import Settings from '../views/Applicant/Settings';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard,
    layout: '/applicant'
  },
  {
    path: '/personal-details',
    name: 'Personal Details',
    icon: DashboardIcon,
    component: PersonalDetails,
    layout: '/applicant'
  },
  {
    path: '/income-details',
    name: 'Income Details',
    icon: DashboardIcon,
    component: IncomeDetails,
    layout: '/applicant'
  },
  {
    path: '/education-details',
    name: 'Education Details',
    icon: DashboardIcon,
    component: EducationDetails,
    layout: '/applicant'
  },

  {
    path: '/settings',
    name: 'Settings',
    icon: DashboardIcon,
    component: Dashboard,
    layout: '/applicant'
  }
];

export default routes;
