import {
  APPLICANT_LOADED,
  APPLICANT_ERROR,
  APPLICANT_PROGRAM_APPLIED,
  APPLICANT_PROGRAM_REMOVED,
  APPLICANT_FORWARDED,
  APPLICANT_FORWARDED_LOADED,
  SET_APPLICANT_LOADING,
  APPLICANT_TEST_SCORE_ADDED,
  UNDERGRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED,
  UNDERGRADUATE_APPLICANT_INCOME_DETAILS_UPDATED,
  UNDERGRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED,
  ALL_UNDERGRADUATE_APPLICANT_LOADED,
  GRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED,
  GRADUATE_APPLICANT_INCOME_DETAILS_UPDATED,
  GRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED,
  GRADUATE_APPLICANT_NTS_MARKS_UPDATED,
  ALL_GRADUATE_APPLICANT_LOADED
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

// Get applicant by id
export const getApplicantById = id => async dispatch => {
  dispatch({
    type: SET_APPLICANT_LOADING
  });
  try {
    const res = await axios.get(`/api/applicants/${id}`);

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

// Get applicants forwarded applications
export const getApplicationForwardedApplicants = () => async dispatch => {
  try {
    const res = await axios.get('/api/applicants/application-forwarded');

    dispatch({
      type: APPLICANT_FORWARDED_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all undergraduate applicants
export const getAllUndergraduateApplicants = () => async dispatch => {
  try {
    const res = await axios.get('/api/applicants');

    dispatch({
      type: ALL_UNDERGRADUATE_APPLICANT_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update undergraduate applicant personal details
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

// Update undergraduate applicant income details
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

    dispatch(setAlert('All fields are required'));
  }
};

// Update undergraduate applicant education details
export const updateEducationDetails = formData => async dispatch => {
  if (
    window.confirm(
      'After submission you will not be able to make any changes, do you want to continue?'
    )
  ) {
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

      return true;
    } catch (err) {
      dispatch({
        type: APPLICANT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });

      dispatch(setAlert('All fields are required'));
    }
  }

  return false;
};

// Update graduate applicant personal details
export const updateGraduatePersonalDetails = (
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
      '/api/applicants/personal-details',
      formData,
      config
    );

    dispatch({
      type: GRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED,
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

// Update graduate applicant income details
export const updateGraduateIncomeDetails = (
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
      '/api/applicants/income-details',
      formData,
      config
    );

    dispatch({
      type: GRADUATE_APPLICANT_INCOME_DETAILS_UPDATED,
      payload: res.data
    });

    history.push('/applicant/education-details');
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert('All fields are required'));
  }
};

// Update graduate applicant education details
export const updateGraduateEducationDetails = (
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
      '/api/applicants/education-details',
      formData,
      config
    );

    dispatch({
      type: GRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED,
      payload: res.data
    });

    history.push('/applicant/nts-details');
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
    dispatch(setAlert('All fields are required'));
  }
};

// Update graduate applicant nts marks details
export const updateGraduateNTSDetails = (
  formData,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.put('/api/applicants/ntsMarks', formData, config);

    dispatch({
      type: GRADUATE_APPLICANT_NTS_MARKS_UPDATED,
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

// Apply for program
export const applyProgram = id => async dispatch => {
  try {
    const res = await axios.put(`/api/applicants/apply/${id}`);

    dispatch({
      type: APPLICANT_PROGRAM_APPLIED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove for program
export const removeProgram = id => async dispatch => {
  try {
    const res = await axios.put(`/api/applicants/remove/${id}`);

    dispatch({
      type: APPLICANT_PROGRAM_REMOVED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Applicant forwarded
export const applicantForwarded = () => async dispatch => {
  try {
    await axios.put('/api/applicants/forwarded');

    dispatch({
      type: APPLICANT_FORWARDED
    });

    dispatch(setAlert('Application has been forwaded'));
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Applicant Test Score Added
export const testScoreAdded = (id, universityTestScore) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ universityTestScore });

  try {
    const res = await axios.put(
      `/api/applicants/update-test-score/${id}`,
      body,
      config
    );

    dispatch({
      type: APPLICANT_TEST_SCORE_ADDED,
      payload: res.data
    });

    dispatch(setAlert('Test score is added successfully'));
  } catch (err) {
    dispatch({
      type: APPLICANT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
