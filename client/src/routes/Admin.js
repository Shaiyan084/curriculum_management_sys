import DashboardIcon from '@material-ui/icons/Dashboard';
import BusinessIcon from '@material-ui/icons/Business';
import ViewListIcon from '@material-ui/icons/ViewList';
import SurroundSoundRoundedIcon from '@material-ui/icons/SurroundSoundRounded';
import AssignmentIndRoundedIcon from '@material-ui/icons/AssignmentIndRounded';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import TollIcon from '@material-ui/icons/Toll';
import FaceIcon from '@material-ui/icons/Face';
import SettingsIcon from '@material-ui/icons/Settings';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

import Dashboard from '../views/Admin/Dashboard';
import ManageDepartments from '../views/Admin/ManageDepartments';
import ManagePrograms from '../views/Admin/ManagePrograms';
import ManageCoordinators from '../views/Admin/ManageCoordinators';
import ManageApplicant from '../views/Admin/ManageApplicant';
import ManageMeritList from '../views/Admin/ManageMeritList';
import ManagePayroll from '../views/Admin/ManagePayroll';
import Settings from '../views/Admin/Settings';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: DashboardIcon,
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/manage-departments',
    name: 'Manage Departments',
    icon: BusinessIcon,
    component: ManageDepartments,
    layout: '/admin',
  },
  {
    path: '/manage-programs',
    name: 'Manage Programs',
    icon: ViewListIcon,
    component: ManagePrograms,
    layout: '/admin',
  },
  {
    path: '/manage-announcements',
    name: 'Manage Announcements',
    icon: SurroundSoundRoundedIcon,
    component: ManagePrograms,
    layout: '/admin',
  },
  {
    path: '/manage-coordinators',
    name: 'Manage Coordinators',
    icon: SupervisedUserCircleIcon,
    component: ManageCoordinators,
    layout: '/admin',
  },
  {
    path: '/manage-applicants',
    name: 'Manage Applicants',
    icon: AssignmentIndRoundedIcon,
    component: ManageApplicant,
    layout: '/admin',
  },
  {
    path: '/manage-merit-list',
    name: 'Manage List',
    icon: PlaylistAddCheckIcon,
    component: ManageMeritList,
    layout: '/admin',
  },
  {
    path: '/manage-payrolls',
    name: 'Manage Payrolls',
    icon: TollIcon,
    component: ManagePayroll,
    layout: '/admin',
  },
  {
    path: '/profile',
    name: 'Profile',
    icon: FaceIcon,
    component: ManageCoordinators,
    layout: '/admin',
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: SettingsIcon,
    component: Settings,
    layout: '/admin',
  },
  //   {
  //     path: '/user',
  //     name: 'User Profile',
  //     rtlName: 'ملف تعريفي للمستخدم',
  //     icon: Person,
  //     component: UserProfile,
  //     layout: '/admin',
  //   },
  //   {
  //     path: '/table',
  //     name: 'Table List',
  //     rtlName: 'قائمة الجدول',
  //     icon: 'content_paste',
  //     component: TableList,
  //     layout: '/admin',
  //   },
  //   {
  //     path: '/typography',
  //     name: 'Typography',
  //     rtlName: 'طباعة',
  //     icon: LibraryBooks,
  //     component: Typography,
  //     layout: '/admin',
  //   },
  //   {
  //     path: '/icons',
  //     name: 'Icons',
  //     rtlName: 'الرموز',
  //     icon: BubbleChart,
  //     component: Icons,
  //     layout: '/admin',
  //   },
  //   {
  //     path: '/maps',
  //     name: 'Maps',
  //     rtlName: 'خرائط',
  //     icon: LocationOn,
  //     component: Maps,
  //     layout: '/admin',
  //   },
  //   {
  //     path: '/notifications',
  //     name: 'Notifications',
  //     rtlName: 'إخطارات',
  //     icon: Notifications,
  //     component: NotificationsPage,
  //     layout: '/admin',
  //   },
  //   {
  //     path: '/rtl-page',
  //     name: 'RTL Support',
  //     rtlName: 'پشتیبانی از راست به چپ',
  //     icon: Language,
  //     component: RTLPage,
  //     layout: '/rtl',
  //   },
  //   {
  //     path: '/upgrade-to-pro',
  //     name: 'Upgrade To PRO',
  //     rtlName: 'التطور للاحترافية',
  //     icon: Unarchive,
  //     component: UpgradeToPro,
  //     layout: '/admin',
  //   },
];

export default routes;
