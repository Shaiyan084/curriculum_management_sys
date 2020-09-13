import axios from 'axios';
import { setAlert } from './alert';
import {
  COORDINATOR_PROFILE_LOADED,
  ADMIN_PROFILE_LOADED,
  COORDINATOR_PROFILES_LOADED,
  ADMIN_PROFILES_LOADED,
  SET_COORDINATOR_PROFILE_LOADING,
  SET_ADMIN_PROFILE_LOADING,
  COORDINATOR_PROFILE_ERROR,
  ADMIN_PROFILE_ERROR,
  CLEAR_COORDINATOR_PROFILE,
  CLEAR_ADMIN_PROFILE,
  UPDATE_ADMIN_PERSONAL_DETAILS,
  UPDATE_ADMIN_EDUCATION_DETAILS,
  UPDATE_ADMIN_EXPERIENCE_DETAILS,
  UPDATE_COORDINATOR_PERSONAL_DETAILS,
  UPDATE_COORDINATOR_EDUCATION_DETAILS,
  UPDATE_COORDINATOR_EXPERIENCE_DETAILS
} from './types';
import { loadUser } from './auth';

// // Get current Admin profile by id
// export const getCurrentAdminProfile = () => async dispatch => {
//   dispatch({
//     type: SET_ADMIN_PROFILE_LOADING
//   });
//   try {
//     const res = await axios.get(`/api/profile/${id}`);

//     dispatch({
//       type: ADMIN_PROFILE_LOADED,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: ADMIN_PROFILE_ERROR,
//       payload: { msg: err.reponse.statusText, status: err.response.status }
//     });
//   }
// };

// Get all Admins profile
export const getAllAdminsProfile = () => async dispatch => {
  dispatch({
    type: SET_ADMIN_PROFILE_LOADING
  });
  try {
    const res = await axios.get('/api/profile/admin');
    dispatch({
      type: ADMIN_PROFILES_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ADMIN_PROFILE_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Get current Coordinator profile by id
export const getCurrentCoordinatorProfile = id => async dispatch => {
  dispatch({
    type: SET_COORDINATOR_PROFILE_LOADING
  });
  try {
    const res = await axios.get(`/api/profile/${id}`);

    dispatch({
      type: COORDINATOR_PROFILE_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COORDINATOR_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all Coordinators profile
export const getAllCoordinatorsProfile = () => async dispatch => {
  dispatch({
    type: SET_COORDINATOR_PROFILE_LOADING
  });
  try {
    const res = await axios.get('/api/profile/coordinator');
    dispatch({
      type: COORDINATOR_PROFILE_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COORDINATOR_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update Admin personal details
export const updateAdminPersonalDetails = (
  formData,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.put(
      '/api/profile/personal-details',
      formData,
      config
    );

    dispatch({
      type: UPDATE_ADMIN_PERSONAL_DETAILS,
      payload: res.data
    });

    dispatch(setAlert('Personal details have been successfully updated'));

    history.push('/admin/experience-details');
  } catch (err) {
    dispatch({
      type: ADMIN_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update Admin experience details
export const updateAdminExperienceDetails = (
  formData,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.put(
      '/api/profile/experience-details',
      formData,
      config
    );

    dispatch({
      type: UPDATE_ADMIN_EXPERIENCE_DETAILS,
      payload: res.data
    });

    dispatch(setAlert('Experience details have been successfully updated'));

    history.push('/admin/education-details');
  } catch (err) {
    dispatch({
      type: ADMIN_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update Admin education details
export const updateAdminEducationDetails = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.put(
      '/api/profile/education-details',
      formData,
      config
    );

    dispatch({
      type: UPDATE_ADMIN_EDUCATION_DETAILS,
      payload: res.data
    });

    dispatch(setAlert('Education details have been successfully updated'));
  } catch (err) {
    dispatch({
      type: ADMIN_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
