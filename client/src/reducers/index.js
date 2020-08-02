import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import department from './department';

export default combineReducers({
  auth,
  alert,
  department,
});
