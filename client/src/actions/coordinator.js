import {
  ALL_COORDINATORS_LOADED,
  COORDINATOR_LOADED,
  COORDINATOR_NAME_UPDATED,
  COORDINATOR_PASSWORD_UPDATED,
  COORDINATOR_PROFILE_PICTURE_UPDATED,
  COORDINATOR_PROFILE_PICTURE_REMOVED,
  COORDINATORS_ERROR,
  AUTH_ERROR,
  SET_AUTH_COORDINATOR_LOADING,
  UNSET_AUTH_COORDINATOR_LOADING,
  DELETE_COORDINATOR_ACCOUNT
} from './types';
import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Load All Coordinators
export const loadAllCoordinators = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/coordinators');

    dispatch({
      type: ALL_COORDINATORS_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COORDINATORS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Load Current Coordinator
export const loadCoordinator = () => async dispatch => {
  if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'));
  }
  try {
    const res = await axios.get('/api/users/coordinator');

    dispatch({
      type: COORDINATOR_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Change Coordinator Name
export const changeCoordinatorName = formData => async dispatch => {
  dispatch({
    type: SET_AUTH_COORDINATOR_LOADING
  });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/users/name', formData, config);

    dispatch({
      type: COORDINATOR_NAME_UPDATED,
      payload: res.data
    });

    dispatch({
      type: UNSET_AUTH_COORDINATOR_LOADING
    });

    dispatch(setAlert('Name has been updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: UNSET_AUTH_COORDINATOR_LOADING
    });

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(err.message, 'danger')));
    }
  }
};

// Change Coordinator Password
export const changeCoordinatorPassword = password => async dispatch => {
  dispatch({
    type: SET_AUTH_COORDINATOR_LOADING
  });
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const pass = JSON.stringify({ password });

    const res = await axios.put('/api/user/password', pass, config);

    dispatch({
      type: COORDINATOR_PASSWORD_UPDATED,
      payload: res.data
    });

    dispatch({
      type: UNSET_AUTH_COORDINATOR_LOADING
    });

    dispatch(setAlert('Password updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: UNSET_AUTH_COORDINATOR_LOADING
    });

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
    }
  }
};

// Upload Coordinator Profile Picture
export const uploadCoordinatorProfilePicture = formData => async dispatch => {
  dispatch({
    type: SET_AUTH_COORDINATOR_LOADING
  });
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(
      '/api/users/profile-picture/upload',
      formData,
      config
    );

    dispatch({
      type: COORDINATOR_PROFILE_PICTURE_UPDATED,
      payload: res.data
    });

    dispatch({
      type: UNSET_AUTH_COORDINATOR_LOADING
    });

    dispatch(setAlert('Profile updated successfully', 'success'));
  } catch (err) {
    dispatch({
      type: UNSET_AUTH_COORDINATOR_LOADING
    });

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(error.message, 'danger'));
    }
  }
};

// Remove Coordinator Profile Picture
export const removeCoordinatorProfilePicture = formData => async dispatch => {
  dispatch({
    type: SET_AUTH_COORDINATOR_LOADING
  });
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(
      '/api/users/profile-picture/remove',
      formData,
      config
    );

    dispatch({
      type: COORDINATOR_PROFILE_PICTURE_REMOVED,
      payload: res.data
    });

    dispatch({
      type: UNSET_AUTH_COORDINATOR_LOADING
    });

    dispatch(setAlert('Profile picture removed successfully', 'success'));
  } catch (err) {
    dispatch({
      type: UNSET_AUTH_COORDINATOR_LOADING
    });
  }
  dispatch(
    setAlert('Error occured while removing the profile picture', 'danger')
  );
};

// Delete Coordinator Account
export const deleteCoordinatorAccount = id => async dispatch => {
  if (
    window.confirm(
      'Are you sure you want to delete this account? This can not be undone!'
    )
  ) {
    try {
      await axios.delete(`/api/users/delete-coordinator-account/${id}`);
      dispatch({
        type: DELETE_COORDINATOR_ACCOUNT,
        payload: id
      });

      dispatch(
        setAlert('User account has been removed successfully', 'success')
      );
    } catch (err) {
      console.log(err);
      dispatch(setAlert('Error occurerd while deleting account', 'danger'));
    }
  }
};
