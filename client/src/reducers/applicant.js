import {
  APPLICANT_LOADED,
  APPLICANT_ERROR,
  APPLICANT_PROGRAM_APPLIED,
  APPLICANT_PROGRAM_REMOVED,
  APPLICANT_FORWARDED,
  UNDERGRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED,
  UNDERGRADUATE_APPLICANT_INCOME_DETAILS_UPDATED,
  UNDERGRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED,
  UNDERGRADUATE_PROGRAM_APPLIED,
  GRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED,
  GRADUATE_APPLICANT_INCOME_DETAILS_UPDATED,
  GRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED,
  GRADUATE_APPLICANT_NTS_MARKS_UPDATED,
  GRADUATE_PROGRAM_APPLIED
} from '../actions/types';

const initialState = {
  applicant: null,
  loading: true,
  errors: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case APPLICANT_LOADED:
    case UNDERGRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED:
    case UNDERGRADUATE_APPLICANT_INCOME_DETAILS_UPDATED:
    case UNDERGRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED:
    case UNDERGRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED:
    case UNDERGRADUATE_APPLICANT_INCOME_DETAILS_UPDATED:
    case UNDERGRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED:
    case GRADUATE_APPLICANT_PERSONAL_DETAILS_UPDATED:
    case GRADUATE_APPLICANT_INCOME_DETAILS_UPDATED:
    case GRADUATE_APPLICANT_EDUCATION_DETAILS_UPDATED:
    case GRADUATE_APPLICANT_NTS_MARKS_UPDATED:
    case APPLICANT_PROGRAM_APPLIED:
    case APPLICANT_PROGRAM_REMOVED:
      return {
        ...state,
        loading: false,
        errors: null,
        applicant: payload
      };
    case APPLICANT_FORWARDED:
      return {
        ...state,
        loading: false,
        errors: null,
        applicant: { ...state.applicant, applicantForwarded: true }
      };
    case APPLICANT_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload
      };
    default:
      return state;
  }
}
