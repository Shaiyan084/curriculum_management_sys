import {
  APPLICANT_LOADED,
  APPLICANT_ERROR,
  UNDERGRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED,
  UNDERGRADUATE_APPLICANT_INCOME_DETAILS_UPDATED,
  UNDERGRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Get current applicant
export const getCurrentApplicant = () => async dispatch => {
  try {
    const res = await axios.get('/api/applicants/me');

    dispatch({
      type: APPLICANT_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update applicant personal details
export const updatePersonalDetails = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(
      '/api/applicants/personal-details',
      formData,
      config
    );

    dispatch({
      type: UNDERGRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED,
      payload: res.data
    });

    history.push('/applicant/income-details');
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    dispatch(setAlert('All fields are required'));
  }
};

// Update applicant income details
export const updateIncomeDetails = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(
      '/api/applicants/income-details',
      formData,
      config
    );

    dispatch({
      type: UNDERGRADUATE_APPLICANT_INCOME_DETAILS_UPDATED,
      payload: res.data
    });

    history.push('/applicant/education-details');
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    dispatch(setAlert('Error occured'));
  }
};

// Update applicant education details
export const updateEducationDetails = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(
      '/api/applicants/education-details',
      formData,
      config
    );

    dispatch({
      type: UNDERGRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });

    dispatch(setAlert('All fields are required'));
  }
};
