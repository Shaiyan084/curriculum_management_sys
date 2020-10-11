import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import department from './department';
import program from './program';
import applicant from './applicant';
import coordinator from './coordinator';
import profile from './profile';
import admission from './admission';

export default combineReducers({
  auth,
  alert,
  department,
  program,
  applicant,
  coordinator,
  profile,
  admission
});
