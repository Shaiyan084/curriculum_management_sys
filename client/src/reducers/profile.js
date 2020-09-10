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
    case COORDINATOR_PROFILE_LOADED:
    case ADMIN_PROFILE_LOADED:
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
    case ADMIN_PROFILES_LOADED:
    case COORDINATOR_PROFILES_LOADED:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case CLEAR_COORDINATOR_PROFILE:
    case CLEAR_ADMIN_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
        errors: null
      };
    case COORDINATOR_PROFILE_ERROR:
    case ADMIN_PROFILE_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      };
    case SET_COORDINATOR_PROFILE_LOADING:
    case SET_ADMIN_PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
