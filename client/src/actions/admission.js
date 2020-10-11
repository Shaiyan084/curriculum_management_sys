import {
  CURRENT_SESSION_LOADED,
  ALL_ADMISSION_SESSIONS_LOADED,
  ADMISSION_SESSION_CREATED,
  ADMISSION_SESSION_UPDATED,
  ADMISSION_SESSION_ENABLED,
  ADMISSION_SESSION_DISABLED,
  ADMISSION_SESSION_LOADING,
  ADMISSION_SESSION_LOADED,
  ADMISSION_SESSION_REMOVED,
  ADMISSION_SESSION_ERROR
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Get all admission sessions
export const getAdmissionSessions = () => async dispatch => {
  try {
    const res = await axios.get('/api/admissions');

    dispatch({
      type: ALL_ADMISSION_SESSIONS_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ADMISSION_SESSION_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Get current session
export const getCurrentSession = () => async dispatch => {
  try {
    console.log('call hua ha');
    const res = await axios.get('/api/admissions/current');

    dispatch({
      type: CURRENT_SESSION_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ADMISSION_SESSION_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Get admission sessions by id
export const getAdmissionSessionsById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/admissions/${id}`);

    dispatch({
      type: ADMISSION_SESSION_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ADMISSION_SESSION_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Create an admission session
export const createAdmissionSession = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(
      '/api/admissions/create-admission-session',
      formData,
      config
    );

    dispatch({
      type: ADMISSION_SESSION_CREATED,
      payload: res.data
    });

    dispatch(setAlert('Admission session created successfully'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: ADMISSION_SESSION_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Update an admission session
export const updateAdmissionSession = (
  id,
  formData,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.put(`/api/admissions/${id}`, formData, config);

    dispatch({
      type: ADMISSION_SESSION_UPDATED,
      payload: res.data
    });

    dispatch(setAlert('Admission session updated successfully'));

    history.goBack();
  } catch (err) {
    dispatch({
      type: ADMISSION_SESSION_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Enable admission session
export const enableAdmissionSession = id => async dispatch => {
  dispatch({
    type: ADMISSION_SESSION_LOADING
  });
  try {
    const res = await axios.put(
      `/api/admissions/enable-admission-session/${id}`
    );

    dispatch({
      type: ADMISSION_SESSION_ENABLED,
      payload: res.data
    });

    dispatch(setAlert('Admission session has been successfully enabled'));
  } catch (err) {
    dispatch({
      type: ADMISSION_SESSION_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Disable admission session
export const disableAdmissionSession = id => async dispatch => {
  dispatch({
    type: ADMISSION_SESSION_LOADING
  });
  try {
    const res = await axios.put(
      `/api/admissions/disable-admission-session/${id}`
    );

    dispatch({
      type: ADMISSION_SESSION_DISABLED,
      payload: res.data
    });

    dispatch(setAlert('Admission session has been disabled successfully'));
  } catch (err) {
    dispatch({
      type: ADMISSION_SESSION_ERROR,
      payload: { msg: err.message.statusText, status: err.message.status }
    });
  }
};

// Remove admission session by id
export const removeAdmissionSession = (id, history) => async dispatch => {
  if (
    window.confirm(
      'Are you sure you want to delete this session? Once deleted it can not be undone?'
    )
  ) {
    try {
      await axios.delete(`/api/admissions/remove-admission-session/${id}`);

      dispatch({
        type: ADMISSION_SESSION_REMOVED
      });

      dispatch(setAlert('Admission session removed successfully'));
      history.goBack();
    } catch (err) {
      dispatch({
        type: ADMISSION_SESSION_ERROR,
        payload: { msg: err.message.statusText, status: err.message.status }
      });
    }
  }
};
