import {
  PROFILE_LOADED,
  SET_PROFILE_LOADING,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_ADMIN_PERSONAL_DETAILS,
  UPDATE_ADMIN_EDUCATION_DETAILS,
  UPDATE_ADMIN_EXPERIENCE_DETAILS,
  UPDATE_COORDINATOR_PERSONAL_DETAILS,
  UPDATE_COORDINATOR_EDUCATION_DETAILS,
  UPDATE_COORDINATOR_EXPERIENCE_DETAILS
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  errors: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_LOADED:
    case UPDATE_ADMIN_PERSONAL_DETAILS:
    case UPDATE_ADMIN_EDUCATION_DETAILS:
    case UPDATE_ADMIN_EXPERIENCE_DETAILS:
    case UPDATE_COORDINATOR_PERSONAL_DETAILS:
    case UPDATE_COORDINATOR_EDUCATION_DETAILS:
    case UPDATE_COORDINATOR_EXPERIENCE_DETAILS:
      return {
        ...state,
        profile: payload,
        loading: false,
        errors: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
        errors: null
      };
    case PROFILE_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    case SET_PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
